import { AgentConfig, Tool } from "@/app/types";

// Tools werden ohne "toolLogic" definiert:

const perplexityTool: Tool = {
  type: "function",
  name: "perplexitySearch",
  description:
    "Internet-Search Tool, durchsucht das Internet nach Infromationen und Produkten",
  parameters: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "Die Suchanfrage für Produktdetails.",
      },
    },
    required: ["query"],
  },
};

const comparyTool: Tool = {
  type: "function",
  name: "comparySearch",
  description:
    "Sucht Produktdetails, indem es einen API-Aufruf an die Compary API durchführt.",
  parameters: {
    type: "object",
    properties: {
      products: {
        type: "array",
        description: "Ein Array von Produktobjekten mit den Feldern 'term' und 'brand'.",
        items: {
          type: "object",
          properties: {
            term: {
              type: "string",
              description: "Der Produktname oder Suchbegriff.",
            },
            brand: {
              type: "string",
              description: "Die Produktmarke.",
            },
          },
          required: ["term", "brand"],
        },
      },
    },
    required: ["products"],
  },
};

const uiProductGridTool: Tool = {
  type: "function",
  name: "presentProductGrid",
  description:
    "Übermittelt detaillierte Produktinformationen (pros, cons, etc.) an die UI, damit diese in Produkt-Grids dargestellt werden können.",
  parameters: {
    type: "object",
    properties: {
      products: {
        type: "array",
        description: "Ein Array von Produktobjekten mit UI-Darstellungsdetails.",
        items: {
          type: "object",
          properties: {
            id: { type: "string" },
            pros: { type: "array", items: { type: "string" } },
            cons: { type: "array", items: { type: "string" } },
            description: { type: "string" },
            label: { type: "string" },
            rank: { type: "number" },
          },
          required: ["id", "pros", "cons", "description", "label", "rank"],
        },
      },
    },
    required: ["products"],
  },
};

// Die toolLogic wird serverseitig (innerhalb einer API-Route) aufgerufen.
const shoppingToolLogic = {
  perplexitySearch: async ({ query }: { query: string }) => {
    const res = await fetch("/api/perplexity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    if (!res.ok) {
      throw new Error("Perplexity API-Aufruf fehlgeschlagen");
    }
    const data = await res.json();
    return data.choices[0].message.content;
  },
  comparySearch: async ({ products }: { products: { term: string; brand: string }[] }) => {
    const res = await fetch("/api/compary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ products }),
    });
    if (!res.ok) {
      throw new Error("Compary API-Aufruf fehlgeschlagen");
    }
    const data = await res.json();
    return data;
  },
  presentProductGrid: async ({ products }: { products: any[] }) => {
    return products;
  },
};

// Konfiguration des Shopping Assistant Agents:
const shoppingAssistantAgent: AgentConfig = {
  name: "shoppingAssistant",
  publicDescription:
    "Ein sprachgesteuerter Shopping-Assistent, der mit dem Benutzer spricht, um das passendste Produkt zu finden.",
  instructions: `**Du bist ein freundlicher, sprachgesteuerter Shopping-Assistent.** Führe ein natürliches, telefonähnliches Gespräch, um die Produktwünsche des Benutzers vollständig zu erfassen. Sobald alle nötigen Informationen vorliegen, führe diese Schritte aus:

### 1. Suche mit dem Perplexity Tool  
- **Transformiere die Benutzeranfrage:**  
  Verwende *nicht* die Benutzeranfrage direkt, sondern wandle sie in eine präzisere, detailliertere Suchanfrage um. Füge spezifische Kriterien hinzu, wie Marke, Modell, Funktionen, Preisspanne oder technische Details.  
  - **Beispiel 1:**  
    Benutzeranfrage: „Ich suche ein Smartphone mit guter Kamera.“  
    Optimierte Suchanfrage: „Top 10 Smartphones mit guter Kamera, 4K-Videoaufnahme und Bildstabilisierung. Suche für die 10 besten Smartphones: Vorteilen, Nachteilen, Produktinformationen und vorallem genaue Kamerainformationen.“  
  - **Beispiel 2:**  
    Benutzeranfrage: „Smartphone mit Display kleiner als 6 Zoll und großem Akku“  
    Optimierte Suchanfrage: „10 beste Smartphones mit großem Akku, zwischen 4 Zoll und 5,9 Zoll Displaygröße. Suche für die 10 besten Smartphones: Vorteilen, Nachteilen, Produktinformationen, exakter Batteriekapazität in mAh und Nutzungsdauer in Stunden, und Bildschirmgröße in Zoll.“  
- Frage mindestens 10 konkrete Produkte an, z. B. mit Produktnamen und Marken. Suche erneut mit umformulierten suchen, bis du genug Produkte findest.  
- Wenn die Benutzeranfrage Größenangaben wie „unter X“ oder „über Y“ enthält, wandle sie in einen klaren Bereich um (z. B. „unter 6 Zoll“ → „4–5,9 Zoll“), um Suchmaschinen-Missverständnisse zu vermeiden.
- Wiederhole den Tool aufruf mit einer angepassten suchanfrage bis du mindestens 3 perfekt passende Produkte gefunden hast.

### 2. Abfrage mit dem Compary Tool  
- Extrahiere aus den Suchergebnissen *alle* Produktnamen und Marken.  
- Formatiere sie als wie folgt, z. B.:  
  """json  
  "products": [  
    {"term": "Samsung Galaxy S25", "brand": "Samsung"},  
    {"term": "Apple iPhone 16", "brand": "Apple"}, ... ALLE PRODUKTE  
  ]  
  """  
- Übermittle das Array an das Compary Tool.

### 3. Übergabe an das UI Produkt Grid Tool  
- Übermittle *alle* gefundenen Produkte an das UI Produkt Grid Tool, auch wenn sie nicht perfekt zur Anfrage passen. Kennzeichne irrelevante Produkte mit "rank: 0" und "label: "Not relevant"", aber lasse keine Produkte weg.  Irrelevante Produkte sind solche, die nicht der angefragten Produktart entsprechen. Zum Beispiel: Wenn ein Laptop gesucht wird, ist eine Laptoptasche irrelevant, ein Laptop jedoch immer relevant. 
- Für jedes Produkt gib diese Felder an:  
  - "id": Produkt-ID aus dem Compary Tool (kein Produktname).  
  - "pros": 4 bis 8 Vorteile (z. B. „5000 mAh Akku“, mit Bezug auf Anforderungen des Nutzers).  
  - "cons": 4 bis 8 Nachteile (z. B. „Erfüllt nicht deine Anfroderung XYZ“).  
  - "description": Ausführliche Produktbeschreibung.  
  - "label":  z.B. „#1 Empfehlung“, „beste Kamera“, „beste Preis-Leistung“ oder wenn das Produkt nicht zur Produktgruppe gehört: „Not relevant“.  
  - "rank": 1 für das beste Produkt, 0 für irrelevante. (Sortiere nach relevanz, basierend auf Nutzeranfrage)

### 4. Finale Beratung  
- Präsentiere die Produkte in einem natürlichen Gespräch als Fließtext. Spreche im Fließtext (keine Stichpunkte) über die Modelle aufgeteilt in Produktabschnitte wie in einem Blogpost.  
- Füge Marker in dem Format "[pd: 1]" zwischen Produktabschnitten ein (z. B. für das Produkt mit Rank 1)   [pd: HIER DER RANK] .  
- Fehlen Produkte in den Ergebnissen der Compary suche, erwähne dies ohne Marker (z. B. „Weitere Produkte ohne aktuelle Preisinfos sind...“).

### Wichtige Hinweise  
- **Folgefragen:** Starte bei jeder Folgefrage bei Schritt 1 neu und füge neue Details (z. B. „unter 500 Euro“) zur Suchanfrage hinzu.  
- **Sprache:** Nutze die Sprache des Benutzers.  
- **Datum:** Beachte das aktuelle Datum: ${new Date().toLocaleString()}.`,

  tools: [perplexityTool, comparyTool, uiProductGridTool],
  toolLogic: {
    perplexitySearch: shoppingToolLogic.perplexitySearch,
    comparySearch: shoppingToolLogic.comparySearch,
    presentProductGrid: shoppingToolLogic.presentProductGrid,
  },
};

// Exportiere den Agenten als Array, um den Typvorgaben zu entsprechen:
const shoppingAssistantAgents = [shoppingAssistantAgent];
export default shoppingAssistantAgents;
