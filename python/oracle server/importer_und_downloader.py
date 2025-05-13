#!/usr/bin/env python3
"""
feed_downloader.py – Lädt XML-Feeds herunter, parst Produktdaten,
führt Inserts/Aktualisierungen in der Datenbank durch (inkl. last_updated)
und generiert Embeddings via Ollama API.
"""

import gzip
import aiohttp
import asyncio
import logging
import psycopg2
from psycopg2.extras import execute_values, execute_batch
from lxml import etree
import configparser
import os
import time
import sys
from datetime import datetime
from pgvector.psycopg2 import register_vector
import ollama

# Logging-Konfiguration
logger = logging.getLogger(__name__)


def load_config() -> configparser.ConfigParser:
    """Lädt Konfiguration aus config.ini."""
    config = configparser.ConfigParser()
    config.read("config.ini")
    return config


def create_table_if_not_exists(conn: psycopg2.extensions.connection) -> None:
    """Erstellt die Tabelle 'products', falls sie nicht existiert."""
    create_table_query = """
    CREATE TABLE IF NOT EXISTS products (
        prod_id TEXT PRIMARY KEY,
        brand_name TEXT,
        aw_cat_id TEXT,
        aw_cat TEXT,
        m_cat TEXT,
        merchant_product_category_path TEXT,
        merchant_product_second_category TEXT,
        merchant_product_third_category TEXT,
        price_currency TEXT,
        price_buynow NUMERIC,
        price_delivery NUMERIC,
        price_product_price_old NUMERIC,
        price_base_price_text TEXT,
        text_name TEXT,
        text_desc TEXT,
        uri_aw_track TEXT,
        uri_alternate_image TEXT,
        uri_alternate_image_two TEXT,
        uri_alternate_image_three TEXT,
        uri_m_image TEXT,
        uri_m_link TEXT,
        vertical_id TEXT,
        vertical_name TEXT,
        p_id TEXT,
        avg_rating NUMERIC,
        colour TEXT,
        custom3 TEXT,
        custom4 TEXT,
        del_time TEXT,
        dimensions TEXT,
        ean TEXT,
        embedding VECTOR(768),
        document_with_weights TSVECTOR,
        last_updated TIMESTAMP DEFAULT NOW()
    )
    """
    with conn.cursor() as cur:
        cur.execute(create_table_query)
        conn.commit()


def convert_to_numeric(value: str) -> float:
    """Konvertiert einen String in einen float."""
    if value is None:
        return None
    try:
        value = value.replace(",", ".")
        return float(value)
    except ValueError:
        logger.warning(f"Konnte Wert '{value}' nicht in float konvertieren.")
        return None


def process_product(elem: etree.Element) -> dict:
    """Verarbeitet ein einzelnes Produkt-Element aus der XML."""

    def get_text(element: etree.Element, xpath_expr: str) -> str:
        result = element.find(xpath_expr)
        return result.text.strip() if result is not None and result.text else None

    def get_attribute(element: etree.Element, attr_name: str) -> str:
        return element.get(attr_name)

    prod_id = get_attribute(elem, "id")
    brand = elem.find("brand")
    brand_name = get_text(brand, "brandName") if brand is not None else None

    cat_elem = elem.find("cat")
    aw_cat_id = get_text(cat_elem, "awCatId") if cat_elem is not None else None
    aw_cat = get_text(cat_elem, "awCat") if cat_elem is not None else None
    m_cat = get_text(cat_elem, "mCat") if cat_elem is not None else None
    merchant_product_category_path = (
        get_text(cat_elem, "merchantProductCategoryPath")
        if cat_elem is not None
        else None
    )
    merchant_product_second_category = (
        get_text(cat_elem, "merchantProductSecondCategory")
        if cat_elem is not None
        else None
    )
    merchant_product_third_category = (
        get_text(cat_elem, "merchantProductThirdCategory")
        if cat_elem is not None
        else None
    )

    price_elem = elem.find("price")
    price_currency = (
        get_attribute(price_elem, "curr") if price_elem is not None else None
    )
    price_buynow = get_text(price_elem, "buynow") if price_elem is not None else None
    price_delivery = (
        get_text(price_elem, "delivery") if price_elem is not None else None
    )
    price_product_price_old = (
        get_text(price_elem, "productPriceOld") if price_elem is not None else None
    )
    price_base_price_text = (
        get_text(price_elem, "basePriceText") if price_elem is not None else None
    )

    text_elem = elem.find("text")
    text_name = get_text(text_elem, "name") if text_elem is not None else None
    text_desc = get_text(text_elem, "desc") if text_elem is not None else None

    uri_elem = elem.find("uri")
    uri_aw_track = get_text(uri_elem, "awTrack") if uri_elem is not None else None
    uri_alternate_image = (
        get_text(uri_elem, "alternateImage") if uri_elem is not None else None
    )
    uri_alternate_image_two = (
        get_text(uri_elem, "alternateImageTwo") if uri_elem is not None else None
    )
    uri_alternate_image_three = (
        get_text(uri_elem, "alternateImageThree") if uri_elem is not None else None
    )
    uri_m_image = get_text(uri_elem, "mImage") if uri_elem is not None else None
    uri_m_link = get_text(uri_elem, "mLink") if uri_elem is not None else None

    vertical_elem = elem.find("vertical")
    vertical_id = (
        get_attribute(vertical_elem, "id") if vertical_elem is not None else None
    )
    vertical_name = (
        get_attribute(vertical_elem, "name") if vertical_elem is not None else None
    )

    p_id = get_text(elem, "pId")
    avg_rating = get_text(elem, "avgRating")
    colour = get_text(elem, "colour")
    custom3 = get_text(elem, "custom3")
    custom4 = get_text(elem, "custom4")
    del_time = get_text(elem, "delTime")
    dimensions = get_text(elem, "dimensions")
    ean = get_text(elem, "ean")

    return {
        "prod_id": prod_id,
        "brand_name": brand_name,
        "aw_cat_id": aw_cat_id,
        "aw_cat": aw_cat,
        "m_cat": m_cat,
        "merchant_product_category_path": merchant_product_category_path,
        "merchant_product_second_category": merchant_product_second_category,
        "merchant_product_third_category": merchant_product_third_category,
        "price_currency": price_currency,
        "price_buynow": convert_to_numeric(price_buynow),
        "price_delivery": convert_to_numeric(price_delivery),
        "price_product_price_old": convert_to_numeric(price_product_price_old),
        "price_base_price_text": price_base_price_text,
        "text_name": text_name,
        "text_desc": text_desc,
        "uri_aw_track": uri_aw_track,
        "uri_alternate_image": uri_alternate_image,
        "uri_alternate_image_two": uri_alternate_image_two,
        "uri_alternate_image_three": uri_alternate_image_three,
        "uri_m_image": uri_m_image,
        "uri_m_link": uri_m_link,
        "vertical_id": vertical_id,
        "vertical_name": vertical_name,
        "p_id": p_id,
        "avg_rating": convert_to_numeric(avg_rating),
        "colour": colour,
        "custom3": custom3,
        "custom4": custom4,
        "del_time": del_time,
        "dimensions": dimensions,
        "ean": ean,
    }


def parse_xml(xml_file):
    """Parst die XML-Datei und liefert Produktdaten."""
    context = etree.iterparse(
        xml_file, events=("end",), tag="prod", recover=True, huge_tree=True
    )
    for event, elem in context:
        try:
            yield process_product(elem)
        except Exception as e:
            logger.error(
                f"Fehler beim Verarbeiten von Produkt-ID {elem.get('id')}: {e}"
            )
        finally:
            elem.clear()
            while elem.getprevious() is not None:
                del elem.getparent()[0]


def insert_products(conn: psycopg2.extensions.connection, products: list) -> None:
    """Führt Batch-Inserts/Aktualisierungen der Produktdaten durch."""
    insert_query = """
    INSERT INTO products (
        prod_id,
        brand_name,
        aw_cat_id,
        aw_cat,
        m_cat,
        merchant_product_category_path,
        merchant_product_second_category,
        merchant_product_third_category,
        price_currency,
        price_buynow,
        price_delivery,
        price_product_price_old,
        price_base_price_text,
        text_name,
        text_desc,
        uri_aw_track,
        uri_alternate_image,
        uri_alternate_image_two,
        uri_alternate_image_three,
        uri_m_image,
        uri_m_link,
        vertical_id,
        vertical_name,
        p_id,
        avg_rating,
        colour,
        custom3,
        custom4,
        del_time,
        dimensions,
        ean
    ) VALUES %s
    ON CONFLICT (prod_id) DO UPDATE SET
        brand_name = EXCLUDED.brand_name,
        aw_cat_id = EXCLUDED.aw_cat_id,
        aw_cat = EXCLUDED.aw_cat,
        m_cat = EXCLUDED.m_cat,
        merchant_product_category_path = EXCLUDED.merchant_product_category_path,
        merchant_product_second_category = EXCLUDED.merchant_product_second_category,
        merchant_product_third_category = EXCLUDED.merchant_product_third_category,
        price_currency = EXCLUDED.price_currency,
        price_buynow = EXCLUDED.price_buynow,
        price_delivery = EXCLUDED.price_delivery,
        price_product_price_old = EXCLUDED.price_product_price_old,
        price_base_price_text = EXCLUDED.price_base_price_text,
        text_name = EXCLUDED.text_name,
        text_desc = EXCLUDED.text_desc,
        uri_aw_track = EXCLUDED.uri_aw_track,
        uri_alternate_image = EXCLUDED.uri_alternate_image,
        uri_alternate_image_two = EXCLUDED.uri_alternate_image_two,
        uri_alternate_image_three = EXCLUDED.uri_alternate_image_three,
        uri_m_image = EXCLUDED.uri_m_image,
        uri_m_link = EXCLUDED.uri_m_link,
        vertical_id = EXCLUDED.vertical_id,
        vertical_name = EXCLUDED.vertical_name,
        p_id = EXCLUDED.p_id,
        avg_rating = EXCLUDED.avg_rating,
        colour = EXCLUDED.colour,
        custom3 = EXCLUDED.custom3,
        custom4 = EXCLUDED.custom4,
        del_time = EXCLUDED.del_time,
        dimensions = EXCLUDED.dimensions,
        ean = EXCLUDED.ean,
        last_updated = NOW()
    """
    values = [
        (
            p["prod_id"],
            p["brand_name"],
            p["aw_cat_id"],
            p["aw_cat"],
            p["m_cat"],
            p["merchant_product_category_path"],
            p["merchant_product_second_category"],
            p["merchant_product_third_category"],
            p["price_currency"],
            p["price_buynow"],
            p["price_delivery"],
            p["price_product_price_old"],
            p["price_base_price_text"],
            p["text_name"],
            p["text_desc"],
            p["uri_aw_track"],
            p["uri_alternate_image"],
            p["uri_alternate_image_two"],
            p["uri_alternate_image_three"],
            p["uri_m_image"],
            p["uri_m_link"],
            p["vertical_id"],
            p["vertical_name"],
            p["p_id"],
            p["avg_rating"],
            p["colour"],
            p["custom3"],
            p["custom4"],
            p["del_time"],
            p["dimensions"],
            p["ean"],
        )
        for p in products
    ]
    try:
        with conn.cursor() as cur:
            execute_values(cur, insert_query, values)
            conn.commit()
            logger.info(f"{len(products)} Produkte eingefügt/aktualisiert.")
    except Exception as e:
        logger.error(f"Fehler beim Einfügen/Aktualisieren von Produkten: {e}")


def get_embedding(text: str, model: str = "nomic-embed-text") -> list:
    """
    Generiert ein Embedding über die Ollama API.

    Args:
        text: Eingabetext.
        model: Modellname.

    Returns:
        Liste von Floats (Embedding) oder leere Liste.
    """
    try:
        start_time = time.perf_counter()
        response = ollama.embed(model=model, input=text)
        end_time = time.perf_counter()
        logger.info(f"Embedding Anfrage dauerte {end_time - start_time:.4f} Sekunden")
        return response["embeddings"][0]
    except Exception as e:
        logger.error(f"Fehler beim Abrufen des Embeddings: {e}")
        return []


def update_embeddings(
    conn: psycopg2.extensions.connection, model_name: str, batch_size: int = 100
) -> None:
    """
    Aktualisiert Embeddings für Produkte ohne vorhandenes Embedding.

    Args:
        conn: Datenbankverbindung.
        model_name: Modellname für Embeddings.
        batch_size: Anzahl der Produkte pro Batch.
    """
    try:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT prod_id, brand_name, text_name, text_desc FROM products WHERE embedding IS NULL"
            )
            products = cur.fetchall()

        total_products = len(products)
        logger.info(f"{total_products} Produkte ohne Embedding gefunden.")

        for i in range(0, total_products, batch_size):
            batch = products[i : i + batch_size]
            values = []
            for prod in batch:
                prod_id, brand_name, text_name, text_desc = prod
                text = f"{brand_name}. {text_name}. {text_desc}"
                embedding = get_embedding(text, model=model_name)
                if (
                    embedding
                    and isinstance(embedding, list)
                    and all(isinstance(x, (float, int)) for x in embedding)
                ):
                    values.append((embedding, prod_id))
                else:
                    logger.warning(
                        f"Embedding für Produkt {prod_id} hat das falsche Format oder konnte nicht generiert werden."
                    )
            if values:
                try:
                    with conn.cursor() as cur:
                        query = "UPDATE products SET embedding = %s WHERE prod_id = %s"
                        execute_batch(cur, query, values)
                        conn.commit()
                        logger.info(
                            f"Embeddings für {len(values)} Produkte aktualisiert."
                        )
                except Exception as e:
                    logger.error(f"Fehler beim Aktualisieren der Embeddings: {e}")
    except Exception as e:
        logger.error(f"Fehler beim Abrufen der Produkte ohne Embedding: {e}")


async def download_feed(
    session: aiohttp.ClientSession,
    url: str,
    feed_index: int,
    feed_directory: str,
    max_retries: int,
    retry_delay: int,
) -> str:
    """
    Lädt einen Feed herunter und speichert ihn als gzip-Datei.
    """
    
    feed_filename = f"feed_{feed_index}.xml.gz"
    file_path = os.path.join(feed_directory, feed_filename)
    success = False
    attempt = 1
    timeout = aiohttp.ClientTimeout(total=800)
    headers = {"User-Agent": "Mozilla/5.0 (compatible; FeedDownloader/1.0)"}

    while attempt <= max_retries and not success:
        try:
            logger.info(
                f"Starte Download von Feed {feed_index + 1}: {url} (Versuch {attempt})"
            )
            async with session.get(url, timeout=timeout, headers=headers) as response:
                if response.status == 200:
                    downloaded_bytes = 0
                    with open(file_path, "wb") as f:
                        async for chunk in response.content.iter_chunked(1024):
                            if chunk:
                                f.write(chunk)
                                downloaded_bytes += len(chunk)
                                if downloaded_bytes % (10 * 1024 * 1024) < 1024:
                                    logger.debug(
                                        f"Feed {feed_index + 1}: {downloaded_bytes} Bytes heruntergeladen"
                                    )
                    logger.info(
                        f"Feed {feed_index + 1} erfolgreich heruntergeladen: {file_path} (Gesamt: {downloaded_bytes} Bytes)"
                    )
                    success = True
                else:
                    logger.error(
                        f"HTTP-Fehler {response.status} beim Herunterladen von Feed {feed_index + 1}: {url} "
                        f"Response-Header: {response.headers} "
                        f"Content-Length: {response.headers.get('Content-Length')}"
                    )
                    attempt += 1
                    if attempt <= max_retries:
                        logger.info(
                            f"Wiederhole Versuch {attempt} nach {retry_delay} Sekunden..."
                        )
                        await asyncio.sleep(retry_delay)
        except Exception as e:
            logger.exception(
                f"Fehler beim Herunterladen von Feed {feed_index + 1} (Versuch {attempt}): {e}"
            )
            attempt += 1
            if attempt <= max_retries:
                logger.info(
                    f"Wiederhole Versuch {attempt} nach {retry_delay} Sekunden..."
                )
                await asyncio.sleep(retry_delay)

    if not success:
        logger.error(
            f"Feed {feed_index + 1} konnte nach {max_retries} Versuchen nicht heruntergeladen werden."
        )
        return None
    return file_path


async def download_and_process_feeds(
    conn: psycopg2.extensions.connection,
    feed_urls: list,
    feed_directory: str,
    max_retries: int,
    retry_delay: int,
    model_name: str,
) -> None:
    """
    Lädt Feeds seriell herunter, verarbeitet sie und löscht die Datei unmittelbar danach,
    um den Speicherplatz zu schonen.

    Args:
        conn: Datenbankverbindung.
        feed_urls: Liste der Feed-URLs.
        feed_directory: Verzeichnis für den Download.
        max_retries: Maximale Versuche pro Download.
        retry_delay: Wartezeit zwischen Versuchen.
        model_name: Modellname für Embeddings.
    """
    async with aiohttp.ClientSession() as session:
        for index, url in enumerate(feed_urls):
            file_path = await download_feed(
                session, url, index, feed_directory, max_retries, retry_delay
            )
            if file_path:
                try:
                    logger.info(f"Verarbeite Feed {index + 1}: {file_path}")
                    # Da die entpackte XML-Datei sehr groß sein kann, wird sie direkt aus der gzip-Datei geparst.
                    with gzip.open(file_path, "rb") as f:
                        products = []
                        batch_size = 1000  # Anpassbare Batch-Größe
                        for product_data in parse_xml(f):
                            products.append(product_data)
                            if len(products) >= batch_size:
                                insert_products(conn, products)
                                products = []
                        if products:
                            insert_products(conn, products)
                    update_embeddings(conn, model_name)
                    os.remove(file_path)
                    logger.info(
                        f"Feed {index + 1} erfolgreich verarbeitet und gelöscht: {file_path}"
                    )
                except Exception as e:
                    logger.error(f"Fehler beim Verarbeiten von Feed {index + 1}: {e}")


def delete_old_products(conn: psycopg2.extensions.connection) -> None:
    """
    Löscht Produkte, deren last_updated älter als eine Woche ist.

    Args:
        conn: Datenbankverbindung.
    """
    delete_query = "DELETE FROM products WHERE last_updated < NOW() - INTERVAL '1 week'"
    try:
        with conn.cursor() as cur:
            cur.execute(delete_query)
            deleted_count = cur.rowcount
            conn.commit()
            logger.info(f"{deleted_count} alte Produkte gelöscht.")
    except Exception as e:
        logger.error(f"Fehler beim Löschen alter Produkte: {e}")


def main() -> None:
    """Hauptfunktion zum Ausführen des Feed-Downloads und der Verarbeitung."""
    config = load_config()
    db_config = {
        "host": config.get("DATABASE", "host"),
        "port": config.getint("DATABASE", "port"),
        "database": config.get("DATABASE", "database"),
        "user": config.get("DATABASE", "user"),
        "password": config.get("DATABASE", "password"),
    }
    model_name = config.get("EMBEDDINGS", "model_name", fallback="nomic-embed-text")
    feed_urls = config.get("FEEDS", "feed_urls").split("|")
    feed_urls = [url.strip() for url in feed_urls if url.strip()]
    # Wähle ein Download-Verzeichnis, das auf dem Block-Volume liegt, um den Speicher optimal zu nutzen.
    feed_directory = config.get("DOWNLOAD", "feed_directory", fallback="feeds")
    max_retries = config.getint("DOWNLOAD", "max_retries", fallback=5)
    retry_delay = config.getint("DOWNLOAD", "retry_delay", fallback=5)

    if not os.path.exists(feed_directory):
        os.makedirs(feed_directory)

    try:
        with psycopg2.connect(**db_config) as conn:
            register_vector(conn)
            create_table_if_not_exists(conn)
            asyncio.run(
                download_and_process_feeds(
                    conn,
                    feed_urls,
                    feed_directory,
                    max_retries,
                    retry_delay,
                    model_name,
                )
            )
            # Lösche Produkte, die seit über einer Woche nicht aktualisiert wurden
            delete_old_products(conn)
    except Exception as e:
        logger.error(f"Ein Fehler ist aufgetreten: {e}")
        sys.exit(1)


if __name__ == "__main__":
    logging.basicConfig(
        level=logging.INFO,
        filename="feed_downloader.log",
        format="%(asctime)s %(levelname)s:%(message)s",
    )
    main()
