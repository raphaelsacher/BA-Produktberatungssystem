"use client";

import { useMemo, useEffect } from "react";
import type { Product } from "@/app/types";
import { ProductCard } from "./ProductCard";

/**
 * Komponente für das Produkt-Grid.
 *
 * Filtert Produkte, die ungültige IDs, ID "0", den Namen "Keine Ergebnisse" oder das Label "Not relevant" haben.
 * Zudem werden Duplikate (basierend auf der Produkt-ID) entfernt und die Produkte nach dem Rang aufsteigend sortiert.
 *
 * @param props - Die Eigenschaften der Komponente.
 * @param props.products - Array von Produktobjekten.
 * @returns  - Das gerenderte Produkt-Grid oder eine Nachricht, wenn keine gültigen Produkte gefunden wurden.
 */
export function ProductGrid({ products }: { products: Product[] }) {
  // Berechnet einzigartige, gefilterte und sortierte Produkte
  const filteredAndSortedProducts = useMemo(() => {
    // Erzeuge einzigartige Produkte basierend auf der Produkt-ID
    const uniqueProducts = Array.from(
      new Map(products.map((product) => [product.id, product])).values()
    );

    // Filtere Produkte mit ungültigen IDs, ID "0", Namen "Keine Ergebnisse" oder Label "Not relevant"
    const validProducts = uniqueProducts.filter(
      (product) =>
        product.id &&
        product.id !== "0" &&
        product.rank !== 0 &&
        product.name !== "Keine Ergebnisse" &&
        product.label !== "Not relevant" &&
        product.label !== "N/A"
    );

    // Sortiere die gültigen Produkte nach dem Rang (aufsteigend)
    const sortedProducts = validProducts.sort((a, b) => a.rank - b.rank);
    console.log("Filtered and sorted products in ProductGrid:", sortedProducts);
    return sortedProducts;
  }, [products]);

  // Logging beim Aktualisieren der Produkte
  useEffect(() => {
    console.log("Products passed to ProductGrid:", products);
  }, [products]);

  // Rückgabe einer Nachricht, falls keine gültigen Produkte vorhanden sind
  if (filteredAndSortedProducts.length === 0) {
    return <p>Keine Produkte gefunden.</p>;
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {filteredAndSortedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
