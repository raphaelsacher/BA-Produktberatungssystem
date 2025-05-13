#!/usr/bin/env python3
"""
Dieses Skript demonstriert, wie man eine GET-Anfrage an das Deals-Endpoint
der OTTO API sendet, um die heutigen Deals abzurufen.
"""

import requests
from typing import Any, Dict


def get_deals_today(api_key: str) -> Dict[str, Any]:
    """Holt die heutigen Deals über die OTTO API.

    Baut einen REST-GET-Request zusammen, indem der API Base URL und
    der Resource URI kombiniert werden. Der API-Key wird als Bearer-Token
    in den Request-Headern mitgesendet.

    Args:
        api_key (str): API-Key für die Authentifizierung.

    Returns:
        Dict[str, Any]: Das JSON-Antwortobjekt, welches die heutigen Deals enthält.

    Raises:
        requests.HTTPError: Falls der HTTP-Request fehlschlägt.
    """
    # API Basis-URL und Endpoint definieren
    base_url: str = "https://api.otto.de"
    endpoint: str = "/products/deals/today"
    url: str = base_url + endpoint

    # Request-Header definieren
    headers: Dict[str, str] = {
        "Authorization": f"Bearer {api_key}",
        "Accept": "application/hal+json",
    }

    # GET-Request an das Deals-Endpoint senden
    response = requests.get(url, headers=headers)
    response.raise_for_status()  # Fehler werfen bei unerfolgreichen HTTP-Statuscodes

    # Rückgabe des JSON-Antwortobjekts
    return response.json()


def main() -> None:
    """Beispielhafter Einstiegspunkt zum Abruf der heutigen Deals."""
    API_KEY: str = "796d1a0c18fd25d819b451b0580f3748"  # Angegebener API-Key

    try:
        deals: Dict[str, Any] = get_deals_today(API_KEY)
        print("Today's Deals:")
        print(deals)
    except requests.HTTPError as http_err:
        print(f"HTTP-Fehler aufgetreten: {http_err}")
    except Exception as err:
        print(f"Ein Fehler ist aufgetreten: {err}")


if __name__ == "__main__":
    main()
