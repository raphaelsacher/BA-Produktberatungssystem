# main.py
import logging
import time
import json
import re
import configparser
from typing import List, Dict, Tuple, Union
from fastapi import FastAPI, Header, HTTPException, Depends
from psycopg2.pool import ThreadedConnectionPool
import psycopg2.extras
from openai import OpenAI
import ollama
from contextlib import contextmanager

# Einrichtung des Loggings
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# FastAPI-App initialisieren
app = FastAPI()

# Konfiguration laden
def load_config() -> configparser.ConfigParser:
    """
    Lädt die Konfigurationsdaten aus der config.ini Datei.
    """
    config = configparser.ConfigParser()
    config.read("config.ini")
    return config

config = load_config()

# API-Schlüssel für die Authentifizierung
API_KEY = config.get("API", "api_key")  # Annahme: Der API-Schlüssel befindet sich in config.ini unter [API]

# Datenbankverbindungsparameter
DB_CONFIG = {
    "host": config.get("DATABASE", "host"),
    "port": config.getint("DATABASE", "port"),
    "database": config.get("DATABASE", "database"),
    "user": config.get("DATABASE", "user"),
    "password": config.get("DATABASE", "password"),
}

# Modellname für das lokale LLM
EMBED_MODEL_NAME = config.get("EMBEDDINGS", "model_name")
# Modellname für das DeepInfra LLM
LM_MODEL_NAME = config.get("DEEPINFRA", "model_name")

# Datenbankverbindungspool einrichten
MIN_CONN = 1
MAX_CONN = 10  # Passen Sie dies je nach Bedarf an

try:
    db_pool = ThreadedConnectionPool(
        MIN_CONN,
        MAX_CONN,
        **DB_CONFIG
    )
    logger.info("Datenbankverbindungspool erstellt.")
except Exception as e:
    logger.error(f"Fehler beim Erstellen des Datenbankverbindungspools: {e}")
    db_pool = None

# Funktion zur Überprüfung des API-Schlüssels
def verify_api_key(x_api_key: str = Header(None)):
    if x_api_key != API_KEY:
        raise HTTPException(status_code=401, detail="Unauthorized")

# Kontextmanager für Datenbankverbindung
@contextmanager
def get_db_connection():
    if db_pool is None:
        raise HTTPException(status_code=500, detail="Database connection pool not available")
    conn = db_pool.getconn()
    try:
        yield conn
    finally:
        db_pool.putconn(conn)

# Funktionen für Embeddings und LLM
def get_embedding(text: str, model: str = EMBED_MODEL_NAME) -> List[float]:
    """
    Generiert ein Embedding für den gegebenen Text über die Ollama API.
    """
    try:
        start_time = time.perf_counter()
        response = ollama.embed(model=model, input=text)
        end_time = time.perf_counter()
        logger.info(f"Embedding Anfrage dauerte {end_time - start_time:.4f} Sekunden")
        embedding = response["embeddings"][0]
        return embedding
    except Exception as e:
        logger.error(f"Fehler beim Abrufen des Embeddings: {e}")
        return []

def execute_query(
    conn: psycopg2.extensions.connection, query: str, params: Tuple
) -> Tuple[float, List[Dict]]:
    """
    Führt eine SQL-Abfrage aus und misst die Ausführungszeit.
    """
    start_time = time.perf_counter()
    try:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cur:
            num_placeholders = query.count("%s")
            if num_placeholders != len(params):
                logger.error(
                    f"Anzahl der Platzhalter ({num_placeholders}) stimmt nicht mit der Anzahl der Parameter ({len(params)}) überein."
                )
                return 0.0, []

            cur.execute(query, params)
            results = cur.fetchall()
        end_time = time.perf_counter()
        execution_time = end_time - start_time
        logger.info(f"Datenbankabfrage dauerte {execution_time:.4f} Sekunden")
        return execution_time, results
    except Exception as e:
        conn.rollback()
        logger.error(f"SQL-Fehler: {e} | Query: {query} | Params: {params}")
        return 0.0, []

# Suchmethoden
def priority_combined_search(
    conn: psycopg2.extensions.connection, term: str, brand: str = None
) -> Tuple[float, List[Dict]]:
    """
    Priorisierte Kombination von Embedding-Suche und ILIKE mit Brand Search.
    """
    execution_time_embedding, query_results_embedding = embedding_search(
        conn, term, brand
    )
    if query_results_embedding:
        return execution_time_embedding, query_results_embedding

    execution_time_ilike, query_results_ilike = ilike_brand_search(conn, term, brand)
    return execution_time_ilike, query_results_ilike

def embedding_search(
    conn: psycopg2.extensions.connection, term: str, brand: str = None
) -> Tuple[float, List[Dict]]:
    """
    Vektorsuche mit Embeddings, zweistufige Markenfilterung:
    1. Exakte Übereinstimmung
    2. Ähnlichkeitsbasierte Suche
    """
    query_embedding = get_embedding(term)
    if not query_embedding:
        logger.error("Embedding konnte nicht generiert werden.")
        return 0.0, []

    # Erste Stufe: Exakte Markensuche
    query = """
    SELECT prod_id, text_name, brand_name, price_buynow, text_desc,
    uri_aw_track, uri_m_image, avg_rating, custom3,
    1 - (embedding <#> %s::vector) AS similarity
    FROM products
    WHERE embedding IS NOT NULL
    """
    params = [query_embedding]
    if brand:
        query += " AND brand_name = %s"
        params.append(brand)

    query += " ORDER BY similarity DESC LIMIT 10;"
    execution_time, results = execute_query(conn, query, tuple(params))

    # Wenn keine Ergebnisse, zweite Stufe mit Ähnlichkeitssuche für die Marke
    if brand and not results:
        query = """
        SELECT prod_id, text_name, brand_name, price_buynow, text_desc,
        uri_aw_track, uri_m_image, avg_rating, custom3,
        1 - (embedding <#> %s::vector) AS similarity
        FROM products
        WHERE embedding IS NOT NULL
        AND similarity(lower(brand_name), %s) > 0.3
        ORDER BY similarity DESC LIMIT 10;
        """
        execution_time, results = execute_query(
            conn, query, (query_embedding, brand.lower())
        )

    return execution_time, results

def ilike_brand_search(
    conn: psycopg2.extensions.connection, term: str, brand: str = None
) -> Tuple[float, List[Dict]]:
    """
    ILIKE-Suche mit zweistufiger Markenfilterung:
    1. Exakte Übereinstimmung
    2. ILIKE-Suche für die Marke
    """
    query = """
    SELECT prod_id, text_name, brand_name, price_buynow, text_desc,
    uri_aw_track, uri_m_image, avg_rating, custom3
    FROM products
    WHERE text_name ILIKE %s
    """
    params = [f"%{term}%"]
    if brand:
        query += " AND brand_name = %s"
        params.append(brand)

    query += " ORDER BY similarity(text_name, %s) DESC LIMIT 10;"
    params.append(term)

    execution_time, results = execute_query(conn, query, tuple(params))

    # Wenn keine Ergebnisse, zweite Stufe mit ILIKE für die Marke
    if brand and not results:
        query = """
        SELECT prod_id, text_name, brand_name, price_buynow, text_desc,
        uri_aw_track, uri_m_image, avg_rating, custom3
        FROM products
        WHERE text_name ILIKE %s
        AND brand_name ILIKE %s
        ORDER BY similarity(text_name, %s) DESC LIMIT 10;
        """
        execution_time, results = execute_query(
            conn, query, (f"%{term}%", f"%{brand}%", term)
        )

    return execution_time, results

def fulltext_search(
    conn: psycopg2.extensions.connection, term: str, brand: str = None
) -> Tuple[float, List[Dict]]:
    """
    Volltextsuche mit zweistufiger Markenfilterung:
    1. Exakte Übereinstimmung
    2. Volltextsuche für die Marke
    """
    ts_term = " & ".join(term.split())
    query = """
    SELECT prod_id, text_name, brand_name, price_buynow, text_desc,
    uri_aw_track, uri_m_image, avg_rating, custom3,
    ts_rank(to_tsvector('german', text_name || ' ' || text_desc), to_tsquery('german', %s)) AS rank
    FROM products
    WHERE to_tsvector('german', text_name || ' ' || text_desc) @@ to_tsquery('german', %s)
    """
    params = [ts_term, ts_term]
    if brand:
        query += " AND brand_name = %s"
        params.append(brand)

    query += " ORDER BY rank DESC LIMIT 10;"
    execution_time, results = execute_query(conn, query, tuple(params))

    # Wenn keine Ergebnisse, zweite Stufe mit Volltextsuche für die Marke
    if brand and not results:
        query = """
        SELECT prod_id, text_name, brand_name, price_buynow, text_desc,
        uri_aw_track, uri_m_image, avg_rating, custom3,
        ts_rank(to_tsvector('german', text_name || ' ' || text_desc), to_tsquery('german', %s)) AS rank
        FROM products
        WHERE to_tsvector('german', text_name || ' ' || text_desc) @@ to_tsquery('german', %s)
        AND to_tsvector('german', brand_name) @@ to_tsquery('german', %s)
        ORDER BY rank DESC LIMIT 10;
        """
        brand_terms = " & ".join(brand.split())
        execution_time, results = execute_query(
            conn, query, (ts_term, ts_term, brand_terms)
        )

    return execution_time, results

def phonetic_search(
    conn: psycopg2.extensions.connection, term: str, brand: str = None
) -> Tuple[float, List[Dict]]:
    """
    Phonetische Suche mit Soundex, optional gefiltert nach brand_name.
    """
    query = """
    SELECT prod_id, text_name, brand_name, price_buynow, text_desc,
    uri_aw_track, uri_m_image, avg_rating, custom3
    FROM products
    WHERE soundex(text_name) = soundex(%s)
    """
    params = [term]
    if brand:
        query += " AND brand_name = %s"
        params.append(brand)

    query += " ORDER BY levenshtein(lower(text_name), lower(%s)) ASC LIMIT 10;"
    params.append(term)
    return execute_query(conn, query, tuple(params))

# LLM-Klasse
class DeepInfraLLMClient:
    def __init__(self, model: str = LM_MODEL_NAME):
        self.model = model
        self.client = OpenAI(
            api_key=config.get("DEEPINFRA", "api_key"),
            base_url="https://api.deepinfra.com/v1/openai",
        )

    def get_product_id(
        self, term: str, products: List[Dict[str, str]]
    ) -> Tuple[int, float]:
        """
        Fragt DeepInfra nach der passenden Produkt-ID.
        Gibt die Produkt-ID und die benötigte Zeit zurück.
        """
        if not products:
            logger.warning("Keine Produkte zum Abfragen des LLM vorhanden.")
            return 0, 0.0

        product_list = "\n".join(
            [f"{p['prod_id']}: {p['text_name']}" for p in products]
        )

        prompt = f"""
        You are a product matching assistant. Check if there is a matching product for the term '{term}'. 
        A matching product exactly represents the term and is not a similar product or an accessory. A matching product is if it is the exact model. Example: iPhone 15 Pro is not the same as iPhone 15 Pro Max.
        Return only the product ID of the matching product. (only one product ID and nothing else) If there is no matching product, return 0.

        Here is the list of products:
        {product_list}

        Please respond with only the product ID. Only respond with one product ID and nothing else.
        """

        start_time = time.perf_counter()
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": prompt},
                ],
                stream=False,
            )
            reply = response.choices[0].message.content.strip()
            end_time = time.perf_counter()
            execution_time = end_time - start_time
            logger.info(f"LLM Anfrage dauerte {execution_time:.4f} Sekunden")

            match = re.search(r"\d+", reply)
            if match:
                return int(match.group()), execution_time
            else:
                logger.warning(f"Keine gültige ID gefunden in der Antwort: '{reply}'")
                return 0, execution_time
        except Exception as e:
            logger.error(f"LLM-Fehler: {e}")
            end_time = time.perf_counter()
            execution_time = end_time - start_time
            return 0, execution_time

# Hauptfunktion zur Produktsuche
def find_product(
    conn: psycopg2.extensions.connection,
    llm_client: DeepInfraLLMClient,
    term: str,
    brand: str = None,
) -> Dict[str, str]:
    """
    Findet ein Produkt basierend auf dem Suchbegriff und der Marke unter Verwendung einer
    optimierten Suchreihenfolge mit Fallback-Methoden.
    Gibt die Produktdetails und die benötigten Zeiten zurück.
    """
    total_start_time = time.perf_counter()

    search_methods = [
        ("Priority Combined Search", priority_combined_search),
        ("Fulltext Search", fulltext_search),
        ("Phonetic Search", phonetic_search),
    ]

    method_times = []
    db_query_times = []

    for method_name, method_function in search_methods:
        logger.info(f"Verwende Suchmethode: {method_name}")
        method_start_time = time.perf_counter()
        execution_time, query_results = method_function(conn, term, brand)
        method_end_time = time.perf_counter()
        method_duration = method_end_time - method_start_time
        method_times.append((method_name, method_duration))
        db_query_times.append((method_name, execution_time))

        if query_results:
            products = []
            for row in query_results:
                try:
                    prod_id = int(row["prod_id"])
                    products.append({"prod_id": prod_id, "text_name": row["text_name"]})
                except ValueError:
                    logger.warning(
                        f"Ungültige Produkt-ID '{row['prod_id']}' konnte nicht in einen Integer umgewandelt werden."
                    )

            product_id, llm_time = llm_client.get_product_id(term, products)
            method_times.append(("LLM Anfrage", llm_time))

            if product_id != 0:
                product = next(
                    (p for p in query_results if int(p["prod_id"]) == product_id), None
                )
                if product:
                    logger.info(
                        f"Produkt gefunden: {product['text_name']} (ID: {product['prod_id']})"
                    )
                    total_end_time = time.perf_counter()
                    total_duration = total_end_time - total_start_time
                    return {
                        "prod_id": str(product["prod_id"]),
                        "text_name": product["text_name"],
                        "brand_name": product["brand_name"],
                        "price_buynow": str(product["price_buynow"]),
                        "text_desc": product["text_desc"],
                        "uri_aw_track": product["uri_aw_track"],
                        "uri_m_image": product["uri_m_image"],
                        "avg_rating": str(product["avg_rating"]),
                        "custom3": str(product["custom3"]),
                        "db_query_times": db_query_times,
                        "llm_time": llm_time,
                        "total_time": total_duration,
                        "term": term,
                        "brand": brand,
                    }
                else:
                    logger.warning(
                        f"Produkt-ID {product_id} wurde nicht in den Suchergebnissen gefunden."
                    )
            else:
                logger.info(
                    f"LLM hat keine passende Produkt-ID für die Sucherfrage '{term}' gefunden."
                )
        else:
            logger.info(f"Keine Ergebnisse gefunden mit der Methode: {method_name}")

    total_end_time = time.perf_counter()
    total_duration = total_end_time - total_start_time
    logger.info(f"Kein passendes Produkt für '{term}' gefunden.")
    return {
        "prod_id": "0",
        "text_name": "Keine Ergebnisse",
        "brand_name": "",
        "price_buynow": "",
        "text_desc": "",
        "uri_aw_track": "",
        "uri_m_image": "",
        "avg_rating": "",
        "custom3": "",
        "db_query_times": db_query_times,
        "llm_time": 0.0,
        "total_time": total_duration,
        "term": term,
        "brand": brand,
    }

# Funktion zur Verarbeitung mehrerer Produkte
def find_products(
    conn: psycopg2.extensions.connection,
    llm_client: DeepInfraLLMClient,
    products: List[Dict[str, str]],
) -> List[Dict[str, str]]:
    results = []
    for product in products:
        term = product.get("term")
        brand = product.get("brand")
        result = find_product(conn, llm_client, term, brand)
        results.append(result)
    return results

# Hauptsuchfunktion
def search_products(
    conn: psycopg2.extensions.connection,
    products_input: Union[str, List[Dict[str, str]]]
) -> List[Dict[str, str]]:
    try:
        llm_client = DeepInfraLLMClient()

        if isinstance(products_input, str):
            try:
                products = json.loads(products_input)
            except json.JSONDecodeError as e:
                logger.error(f"Fehler beim Parsen von products_input: {e}")
                return []
        elif isinstance(products_input, list):
            products = products_input
        else:
            logger.error("Ungültiger Typ für products_input. Erwartet str oder list.")
            return []

        if not isinstance(products, list):
            logger.error("Products sollte eine Liste sein.")
            return []
        for product in products:
            if not isinstance(product, dict):
                logger.error("Jedes Produkt sollte ein Dictionary sein.")
                return []
            if "term" not in product or "brand" not in product:
                logger.error("Jedes Produkt sollte 'term' und 'brand' enthalten.")
                return []

        results = find_products(conn, llm_client, products)

        return results

    except Exception as e:
        logger.error(f"Fehler bei der Produktsuche: {e}")
        return []

# API-Endpunkt für die Produktsuche
@app.post("/search")
def search_products_api(
    products: List[Dict[str, str]],
    x_api_key: str = Depends(verify_api_key)
):
    """
    API-Endpunkt zur Produktsuche.
    Erwartet ein JSON-Array von Produkten, jeweils mit den Schlüsseln 'term' und 'brand'.
    """
    # Input-Validierung
    if not products:
        raise HTTPException(status_code=400, detail="Keine Produkte angegeben.")
    for product in products:
        if 'term' not in product or 'brand' not in product:
            raise HTTPException(status_code=400, detail="Jedes Produkt muss 'term' und 'brand' enthalten.")

    with get_db_connection() as conn:
        try:
            results = search_products(conn, products)
            return results
        except Exception as e:
            logger.error(f"Fehler bei der Verarbeitung der Suche: {e}")
            raise HTTPException(status_code=500, detail="Interner Serverfehler")

# Beispielaufruf der Funktion (optional, kann entfernt werden)
if __name__ == "__main__":
    # Dieser Block wird nicht ausgeführt, wenn das Skript als Modul importiert wird
    pass
