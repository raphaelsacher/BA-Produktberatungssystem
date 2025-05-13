import os
import re
import sys

# Project root directory (adjust as needed)
PROJECT_ROOT = "/Users/raphaelsacher/Documents/GitHub/Produktberatungs-Assistent"

# In diesem Projekt entspricht "@" dem "src"-Ordner
ALIASES = {"@": os.path.join(PROJECT_ROOT, "src")}

# Set of already processed files
processed_files = set()

# List of file paths to exclude
EXCLUDE_PATHS = [
    os.path.join(PROJECT_ROOT, "frontend_shopping_assistant", "ui", "icons.tsx"),
    # Füge weitere Pfade hinzu, die du ausschließen möchtest
]

# Liste der Dateiendungen, die als relevante Quellcode-Dateien betrachtet werden sollen
RELEVANT_EXTENSIONS = [".tsx", ".ts", ".jsx", ".js", ".txt", ".css"]


def get_code_language(file_path):
    """Gibt die Syntax-Hervorhebungs-Sprache für Markdown basierend auf der Dateiendung zurück."""
    ext = os.path.splitext(file_path)[1]
    mapping = {
        ".ts": "typescript",
        ".tsx": "typescript",
        ".js": "javascript",
        ".jsx": "javascript",
        ".css": "css",
        ".txt": "",  # Für reinen Text ohne Syntax-Highlighting
    }
    return mapping.get(ext, "")


def parse_imports(file_content):
    # Regex to match import statements
    import_regex = r'import\s+(?:[^;]+?\s+from\s+)?[\'"]([^\'"]+)[\'"];?'
    matches = re.findall(import_regex, file_content)
    return matches


def parse_api_calls(file_content):
    # Regex to match API calls like fetch('/api/...')
    api_regex = r'[\'"`](/api/[^\'"`]+)[\'"`]'
    matches = re.findall(api_regex, file_content)
    return matches


def resolve_module_path(module_path, current_file_dir):
    if module_path.startswith("@/"):
        # Resolve alias '@' to the "src"-folder
        resolved_path = module_path.replace("@", ALIASES["@"])
    elif module_path.startswith("./") or module_path.startswith("../"):
        resolved_path = os.path.normpath(os.path.join(current_file_dir, module_path))
    else:
        # Skip external modules (z. B. node_modules)
        return None
    # Possible file extensions
    extensions = RELEVANT_EXTENSIONS[
        :-1
    ]  # Für Ordner wird meist kein .txt/.css etc. erwartet
    if os.path.isdir(resolved_path):
        # Wenn es ein Verzeichnis ist, suche nach einer index-Datei
        for ext in extensions:
            index_file = os.path.join(resolved_path, f"index{ext}")
            if os.path.exists(index_file):
                return index_file
    else:
        for ext in extensions:
            candidate = resolved_path + ext
            if os.path.exists(candidate):
                return candidate
    return None


def resolve_api_path(api_path):
    # Remove leading '/api/'
    api_route = api_path[len("/api/") :]
    # Possible API directories
    api_dirs = [
        os.path.join(PROJECT_ROOT, "app", "api"),
        os.path.join(PROJECT_ROOT, "pages", "api"),
    ]
    # Possible file extensions
    extensions = [".ts", ".js"]
    for api_dir in api_dirs:
        for ext in extensions:
            route_file = os.path.join(api_dir, api_route, f"route{ext}")
            if os.path.exists(route_file):
                return route_file
            route_file = os.path.join(api_dir, f"{api_route}{ext}")
            if os.path.exists(route_file):
                return route_file
    return None


def should_exclude(file_path):
    # Check if the file path matches any in the exclusion list
    return any(
        os.path.abspath(file_path) == os.path.abspath(exclude)
        for exclude in EXCLUDE_PATHS
    )


def process_file(file_path, parent_path=None, markdown_file=None):
    file_path = os.path.abspath(file_path)
    if file_path in processed_files or should_exclude(file_path):
        return
    processed_files.add(file_path)
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
    except Exception as e:
        print(f"Fehler beim Öffnen von {file_path}: {e}")
        return

    # Schreibe den Code in Markdown-Format
    markdown_file.write(f"# Pfad des Codes\n{file_path}\n")
    if parent_path:
        markdown_file.write(f"# Pfad der Abhängigkeit\n{parent_path}\n")
    language = get_code_language(file_path)
    if language:
        markdown_file.write(f"# Gesamter Code\n```{language}\n{content}\n```\n\n")
    else:
        markdown_file.write(f"# Gesamter Code\n```\n{content}\n```\n\n")

    current_dir = os.path.dirname(file_path)
    # Verarbeite Importe
    imports = parse_imports(content)
    for module_path in imports:
        resolved_path = resolve_module_path(module_path, current_dir)
        if resolved_path:
            process_file(resolved_path, file_path, markdown_file)
    # Verarbeite API-Aufrufe
    api_calls = parse_api_calls(content)
    for api_path in api_calls:
        api_file_path = resolve_api_path(api_path)
        if api_file_path:
            process_file(api_file_path, file_path, markdown_file)


def process_directory(directory, markdown_file):
    """
    Durchläuft rekursiv alle Dateien im angegebenen Verzeichnis und
    verarbeitet relevante Dateien (basierend auf RELEVANT_EXTENSIONS),
    sofern sie noch nicht verarbeitet wurden.
    """
    for root, dirs, files in os.walk(directory):
        for file in files:
            ext = os.path.splitext(file)[1]
            if ext in RELEVANT_EXTENSIONS:
                full_path = os.path.join(root, file)
                process_file(full_path, markdown_file=markdown_file)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Bitte geben Sie den Pfad zur Startdatei oder zum Startverzeichnis an.")
        sys.exit(1)

    input_path = sys.argv[1]
    output_file = "output.md"  # Hier kann der Name der Ausgabedatei geändert werden

    with open(output_file, "w", encoding="utf-8") as markdown_file:
        abs_input_path = os.path.abspath(input_path)
        if os.path.isdir(abs_input_path):
            # Falls ein Verzeichnis angegeben wurde, verarbeite es rekursiv
            process_directory(abs_input_path, markdown_file)
        else:
            # Starte mit der angegebenen Datei
            process_file(abs_input_path, markdown_file=markdown_file)
            # Zusätzlich: Durchsuche den gesamten src-Ordner, um auch unreferenzierte Dateien zu erfassen
            src_path = os.path.join(PROJECT_ROOT, "src")
            process_directory(src_path, markdown_file)

    print(f"Markdown-Ausgabe wurde in '{output_file}' gespeichert.")
