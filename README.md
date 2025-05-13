

# KI-gestütztes E-Commerce Produktberatungssystem (Prototyp)

Dieses Repository enthält den Quellcode für den Prototyp eines KI-gestützten E-Commerce-Produktberatungssystems. Das System wurde im Rahmen einer Bachelorarbeit mit dem Titel "Entwicklung eines Prototyps für ein KI-gestütztes E-Commerce-Produktberatungssystem" im Studiengang E-Commerce entwickelt.

Der Prototyp demonstriert, wie durch den Einsatz eines multimodalen Large Language Models (OpenAI GPT-4o-mini) in Kombination mit Retrieval-Augmented Generation (RAG) eine interaktive und präzise Produktberatung realisiert werden kann. Das System verarbeitet sowohl Text- als auch Spracheingaben, integriert dynamisch Informationen aus externen Datenquellen und präsentiert die Ergebnisse audiovisuell sowie in Form von dynamisch generierten UI-Elementen.

## Inhaltsverzeichnis

1.  [Kernfunktionen des Prototyps](#1-kernfunktionen-des-prototyps)
2.  [Systemarchitektur](#2-systemarchitektur)
    *   [2.1 Frontend](#21-frontend)
    *   [2.2 Backend API-Routen (Serverless)](#22-backend-api-routen-serverless)
    *   [2.3 KI-Agent und Tools](#23-ki-agent-und-tools)
    *   [2.4 Externe Datenquellen](#24-externe-datenquellen)
3.  [Wichtige Implementierungsdetails](#3-wichtige-implementierungsdetails)
    *   [3.1 Frontend-Komponenten](#31-frontend-komponenten)
    *   [3.2 Zustandsmanagement (Context API)](#32-zustandsmanagement-context-api)
    *   [3.3 Echtzeitkommunikation (WebRTC)](#33-echtzeitkommunikation-webrtc)
    *   [3.4 Tool-Definition und Prompt Design](#34-tool-definition-und-prompt-design)
4.  [Screenshot](#4-screenshot)
5.  [Verwendete Technologien](#5-verwendete-technologien)
6.  [Installation und Ausführung](#6-installation-und-ausführung)
7.  [Basisprojekt und Eigenleistung](#7-basisprojekt-und-eigenleistung)
8.  [Core Contributors](#8-core-contributors)

## 1. Kernfunktionen des Prototyps

*   **Multimodale Interaktion:** Verarbeitung von Nutzereingaben per Text und Sprache (Mikrofon). Ausgabe von Antworten als Text und synthetisierte Sprache.
*   **Dialogführung durch KI-Agent:** Ein konfigurierter KI-Agent (GPT-4o-mini) führt ein natürliches Gespräch, stellt Rückfragen zur Präzisierung und merkt sich den Kontext.
*   **Retrieval-Augmented Generation (RAG):** Der Agent nutzt definierte "Tools", um dynamisch Informationen abzurufen:
    *   Internetrecherche über die Perplexity API für allgemeine Produktinformationen und Trends.
    *   Abruf spezifischer Produktdetails (Preise, Verfügbarkeit, Attribute) aus einer angebundenen Produktdatenbank (gespeist durch AWIN Datafeeds).
*   **Dynamische Produktvisualisierung:**
    *   Generierung und Anzeige von `ProductCard`-Komponenten direkt im Chatverlauf, gesteuert durch das LLM.
    *   Anzeige einer `ProductGrid`-Übersicht für gefundene Produkte im rechten Panel.
*   **Personalisierte Empfehlungen:** Das LLM erstellt basierend auf den Nutzerbedürfnissen und den abgerufenen Daten personalisierte Produkt-Rankings, Vergleiche sowie Vor- und Nachteile.
*   **Echtzeit-Kommunikation:** Nutzung von WebRTC für eine latenzarme Sprachinteraktion mit dem OpenAI Realtime API.
*   **Serverless Architektur:** Implementierung mit Next.js und Vercel für Skalierbarkeit und einfache Bereitstellung.

## 2. Systemarchitektur

Der Prototyp ist als Next.js-Anwendung konzipiert und nutzt eine serverless Architektur auf Vercel.

### 2.1 Frontend

Das Frontend ist mit React und TypeScript erstellt. Es beinhaltet:
*   Die Hauptanwendung (`App.tsx`), die die Benutzeroberfläche rendert, Zustände verwaltet und die Kommunikation mit dem Backend und der Realtime API steuert.
*   Eine `Transcript`-Komponente (`Transcript.tsx`) zur Anzeige des Dialogverlaufs.
*   Dynamisch generierte `ProductCard`-Komponenten (`ProductCard.tsx`) zur Darstellung einzelner Produkte. Diese werden durch die `FormattedMessage`-Komponente (`FormattedMessage.tsx`) an passenden Stellen im Chatverlauf eingefügt, basierend auf Markern (`[pd:RANK]`), die das LLM in seiner Antwort setzt.
*   Ein `ProductsPanel` (`Events.tsx`), das eine `ProductGrid` (`ProductGrid.tsx`) mit den aggregierten Produktempfehlungen anzeigt.
*   Layout-Komponenten wie `Header` (`header.tsx`) und `Footer` (`footer.tsx`).
*   Eine `BottomToolbar` (`BottomToolbar.tsx`) für Steuerungsoptionen (Verbindung, Push-to-Talk, Audiowiedergabe, Produktpanel-Toggle).

### 2.2 Backend API-Routen (Serverless)

In Next.js integrierte API-Routen dienen als Proxies und für serverseitige Logik:
*   `/api/session`: Ruft einen temporären Ephemeral Key von OpenAI ab, um eine Realtime-Sitzung zu initiieren.
*   `/api/perplexity`: Leitet Suchanfragen an die Perplexity API weiter, um Internetrecherchen durchzuführen.
*   `/api/compary`: Dient als Schnittstelle zur (separat gehosteten) Produktdatenbank-API, um spezifische Produktdaten basierend auf AWIN-Feeds abzurufen.
*   `/api/chat/completions` (optional, für reine Text-Chat-Interaktionen, falls benötigt).

### 2.3 KI-Agent und Tools

Das Herzstück des Systems ist der KI-Agent, konfiguriert in `src/app/agentConfigs/shoppingAssistant.ts`.
*   **LLM:** OpenAI GPT-4o-mini (über Realtime API).
*   **System Prompt:** Eine detaillierte Anweisung (`instructions`) definiert die Rolle, das Verhalten und den Workflow des Agenten.
*   **Tools (Function Calling):**
    *   `perplexitySearch`: Ruft die `/api/perplexity` Route auf, um das Web nach Produktinformationen zu durchsuchen.
    *   `comparySearch`: Ruft die `/api/compary` Route auf, um strukturierte Produktdaten aus der Datenbank zu holen.
    *   `presentProductGrid`: Wird vom LLM genutzt, um die gesammelten und aufbereiteten Produktinformationen (inkl. Pros, Cons, Description, Label, Rank) für die Darstellung im Frontend (insbesondere für `ProductCard` und `ProductGrid`) zu strukturieren.

### 2.4 Externe Datenquellen

*   **Perplexity API:** Für aktuelle Informationen und Recherche im Internet.
*   **AWIN Datafeeds:** Stellen die Basis für die Produktdatenbank dar (aktuell für Otto.de implementiert). Diese Daten werden periodisch in eine PostgreSQL-Datenbank importiert, die über die `/api/compary` Route abgefragt wird.

## 3. Wichtige Implementierungsdetails

### 3.1 Frontend-Komponenten

*   **`App.tsx`**: Die zentrale Komponente, die die Anwendungslogik, Zustandsverwaltung und die Verbindung zur Realtime-API handhabt. Sie integriert Context Provider und rendert die Haupt-UI-Elemente.
*   **`Transcript.tsx`**: Zeigt den chronologischen Verlauf des Gesprächs an. Enthält die `FormattedMessage`-Komponente.
*   **`FormattedMessage.tsx`**: Parst die Antworten des Assistenten auf spezielle Marker (z.B. `[pd:1]`) und rendert an diesen Stellen `ProductCard`-Komponenten mit den entsprechenden Produktdaten.
*   **`ProductCard.tsx`**: Stellt ein einzelnes Produkt mit Bild, Preis, Bewertung, Vor-/Nachteilen, Beschreibung und Kauflink dar.
*   **`ProductsPanel.tsx` (ursprünglich `Events.tsx`)**: Zeigt eine Übersicht der im Gespräch erwähnten Produkte in einem `ProductGrid`.
*   **`ProductGrid.tsx`**: Filtert, sortiert (nach Rang) und rendert eine Liste von `ProductCard`-Komponenten.

### 3.2 Zustandsmanagement (Context API)

*   **`TranscriptProvider` (`TranscriptContext.tsx`)**: Verwaltet global den Zustand der Konversation (Nachrichten, Breadcrumbs, Produktresultate). Funktionen wie `addTranscriptMessage`, `addTranscriptBreadcrumb`, `addProductResult` ermöglichen die Modifikation des Transkripts von verschiedenen Stellen der Anwendung.
*   **`EventProvider` (`EventContext.tsx`)**: Dient dem Logging von Client- und Server-Events für Debugging-Zwecke.

### 3.3 Echtzeitkommunikation (WebRTC)

*   Die Datei `src/app/lib/realtimeConnection.ts` implementiert die Logik zum Aufbau einer WebRTC-Verbindung mit der OpenAI Realtime API. Sie nutzt `navigator.mediaDevices.getUserMedia` für den Zugriff auf das Mikrofon und `RTCPeerConnection` für den Datenaustausch.
*   Die Verarbeitung serverseitiger Events erfolgt im Hook `useHandleServerEvent.ts`. Dieser Hook interpretiert die JSON-Nachrichten vom Server, aktualisiert den `TranscriptContext` (z.B. neue Nachrichten, Text-Deltas, Tool-Aufrufe) und löst ggf. Tool-Ausführungen aus.

### 3.4 Tool-Definition und Prompt Design

*   Die Konfiguration des Shopping-Assistenten erfolgt in `src/app/agentConfigs/shoppingAssistant.ts`.
*   Hier sind die Tools `perplexitySearch`, `comparySearch` und `presentProductGrid` mit ihren Beschreibungen und Parameter-Schemata definiert.
*   Der `instructions`-Teil (System Prompt) ist entscheidend für das Verhalten des Agenten. Er leitet den Agenten an, wie er mit dem Nutzer interagieren, Informationen sammeln und die Tools in einer bestimmten Reihenfolge verwenden soll, um die Produktberatung durchzuführen. Insbesondere wird dem Agenten erklärt, wie er die Marker für die `ProductCard`-Darstellung setzen soll.

## 4. Screenshot

![Screenshot des Produktberatungs-Assistenten](/public/screenshot.png)

## 5. Verwendete Technologien

*   **Frontend:** Next.js 14+, React 18+, TypeScript
*   **UI-Komponenten:** Shadcn/UI, Radix UI, Tailwind CSS
*   **KI-Modell:** OpenAI GPT-4o-mini (über Realtime API & Chat Completions API)
*   **Echtzeit-Kommunikation:** WebRTC
*   **Datenabruf (Tools):**
    *   Perplexity API
    *   Eigene Produktdatenbank-API (basierend auf AWIN Datafeeds, PostgreSQL mit pgvector)
*   **Hosting & Deployment:** Vercel
*   **Versionskontrolle:** Git, GitHub
*   **Zusätzliche Bibliotheken:** `uuid` (für eindeutige IDs), `lucide-react` (Icons)

## 6. Installation und Ausführung

1.  **Repository klonen:**
    ```bash
    git clone https://github.com/RaphaelSacher/Produktberatungs-Assistent.git
    cd Produktberatungs-Assistent
    ```
2.  **Abhängigkeiten installieren:**
    ```bash
    npm install
    # oder
    yarn install
    ```
3.  **Umgebungsvariablen einrichten:**
    Erstelle eine `.env.local`-Datei im Hauptverzeichnis des Projekts und füge deine API-Schlüssel hinzu:
    ```env
    OPENAI_API_KEY=dein_openai_api_schlüssel
    PERPLEXITY_API_KEY=dein_perplexity_api_schlüssel
    COMPARY_API_KEY=dein_compary_api_schlüssel # Für die Produktdatenbank-API
    # Ggf. URL zur Compary API, falls nicht localhost
    # COMPARY_API_URL=https://deine-compary-api-url.com
    ```
4.  **Entwicklungsserver starten:**
    ```bash
    npm run dev
    # oder
    yarn dev
    ```
    Die Anwendung ist dann unter `http://localhost:3000` erreichbar.

## 7. Basisprojekt und Eigenleistung

Dieser Prototyp basiert auf der von OpenAI bereitgestellten "Realtime API Agents Demo" ([openai/openai-realtime-agents](https://github.com/openai/openai-realtime-agents)).

**Übernommene Funktionen aus dem Basisprojekt:**
*   Grundlegende Struktur einer Next.js-Anwendung für Echtzeit-Agenten.
*   Mechanismen für den Aufbau der WebRTC-Verbindung zur OpenAI Realtime API.
*   Basiskomponenten für das Chat-Interface und das Event-Logging.
*   Grundlegendes Konzept für Agentenkonfiguration und Agentenwechsel.

**Eigenleistungen im Rahmen der Bachelorarbeit:**
*   **Spezifischer Shopping-Assistent-Agent:** Entwicklung des detaillierten System Prompts und der Tool-Logik in `shoppingAssistant.ts` für den E-Commerce-Anwendungsfall.
*   **Entwicklung und Integration der Tools:**
    *   `perplexitySearch`: Anbindung der Perplexity API für Web-Recherchen.
    *   `comparySearch`: Anbindung einer externen Produktdatenbank (gespeist durch AWIN Feeds, hier spezifisch Otto.de).
    *   `presentProductGrid`: Ermöglicht dem LLM, strukturierte Daten für die UI-Darstellung zu generieren.
*   **Dynamische UI-Elemente für Produktanzeige:**
    *   `ProductCard`-Komponente zur detaillierten Anzeige einzelner Produkte.
    *   `FormattedMessage`-Komponente zur intelligenten Platzierung von Produktkarten im Chatverlauf.
    *   `ProductGrid` und `ProductsPanel` zur übersichtlichen Darstellung mehrerer Produkte.
*   **Anpassung des Zustandsmanagements:** Erweiterung des `TranscriptContext` zur Speicherung und Verwaltung von Produkt-Suchergebnissen (`addProductResult`).
*   **Entwicklung der Backend API-Routen:** Erstellung der serverseitigen Routen (`/api/perplexity`, `/api/compary`, `/api/session`) als Proxies zu den externen Diensten.
*   **Konzeption und Implementierung der Produktdatenintegration:** Design des Prozesses zum Abruf und zur Nutzung von AWIN Datafeeds.
*   **Anpassung und Erweiterung des Frontends:** Überarbeitung der UI für den spezifischen Anwendungsfall der Produktberatung, inklusive Layout-Anpassungen und neuer Steuerungs-Elemente.
*   **Fokus auf Retrieval-Augmented Generation (RAG):** Konsequente Umsetzung des RAG-Prinzips durch die Tool-Nutzung des Agenten.
*   **Gesamte inhaltliche Ausrichtung** auf das Thema Produktberatung im E-Commerce.

## 8. Core Contributors

- Raphael Sacher

"Realtime API Agents Demo" Basis Projekt:
- Noah MacCallum - [noahmacca](https://x.com/noahmacca)
- Ilan Bigio - [ibigio](https://github.com/ibigio)
