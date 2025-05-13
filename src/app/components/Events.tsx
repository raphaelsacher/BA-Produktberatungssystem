"use client";

import React, { useRef, useEffect, useMemo } from "react";
import { useTranscript } from "@/app/contexts/TranscriptContext";
import type { TranscriptItem, Product } from "@/app/types";
import { ProductGrid } from "@/app/components/ProductGrid";

/**
 * Props for ProductsPanel.
 */
export interface ProductsPanelProps {
  isProductsPaneExpanded: boolean;
}

function ProductsPanel({ isProductsPaneExpanded }: ProductsPanelProps) {
  const productContainerRef = useRef<HTMLDivElement | null>(null);
  const { transcriptItems } = useTranscript();

  // Filtere Transcript-Items, die Produkt-Ergebnisse enthalten
  const productResults: TranscriptItem[] = useMemo(() => {
    return transcriptItems.filter((item) => item.type === "PRODUCT_RESULT");
  }, [transcriptItems]);

  // Gruppiere Produkt-Ergebnisse
  const mergedProductGroups: { timestamp: string; products: Product[] }[] =
    useMemo(() => {
      return productResults.map((result) => {
        const comparyProducts: Product[] =
          result.data && Array.isArray(result.data.compary)
            ? result.data.compary.map((cp: any) => ({
                id: cp.prod_id,
                name: cp.text_name || "N/A",
                brand: cp.brand_name || cp.brand || "N/A",
                price: Number(cp.price_buynow) || 0,
                rating: Number(cp.avg_rating) || 0,
                numRatings: Number(cp.custom3) || 0,
                image: cp.uri_m_image || "/placeholder.svg",
                pros: [],
                cons: [],
                description: cp.text_desc || "N/A",
                label: "N/A",
                rank: 0,
                uri_aw_track: cp.uri_aw_track || "",
              }))
            : [];

        const presentProducts: Partial<Product>[] =
          result.data && Array.isArray(result.data.present)
            ? result.data.present.map((ap: any) => ({
                id: ap.id,
                pros: ap.pros || [],
                cons: ap.cons || [],
                description: ap.description || "N/A",
                label: ap.label || "N/A",
                rank: ap.rank || 0,
              }))
            : [];

        const mergedMap: Record<string, Product> = {};

        comparyProducts.forEach((cp) => {
          mergedMap[cp.id] = cp;
        });
        presentProducts.forEach((ap) => {
          if (ap.id) {
            mergedMap[ap.id] = mergedMap[ap.id]
              ? { ...mergedMap[ap.id], ...ap }
              : {
                  id: ap.id,
                  name: "N/A",
                  brand: "N/A",
                  price: 0,
                  rating: 0,
                  numRatings: 0,
                  image: "/placeholder.svg",
                  pros: ap.pros || [],
                  cons: ap.cons || [],
                  description: ap.description || "N/A",
                  label: ap.label || "N/A",
                  rank: ap.rank || 0,
                  uri_aw_track: "",
                };
          }
        });

        return {
          timestamp: result.timestamp,
          products: Object.values(mergedMap),
        };
      });
    }, [productResults]);

  useEffect(() => {
    if (isProductsPaneExpanded && productContainerRef.current) {
      productContainerRef.current.scrollTop =
        productContainerRef.current.scrollHeight;
    }
  }, [productResults, isProductsPaneExpanded]);

  return (
    <div
      ref={productContainerRef}
      className={`hidden md:flex transition-all duration-200 ease-in-out rounded-xl flex-col bg-white ${
        isProductsPaneExpanded && productResults.length > 0
          ? "md:w-1/2 overflow-auto"
          : "md:w-0 overflow-hidden opacity-0"
      }`}
    >
      {isProductsPaneExpanded && productResults.length > 0 && (
        <div>
          <h2 className="font-semibold px-6 py-4 sticky top-0 z-10 text-base border-b bg-white">
            Featured Products
          </h2>
          {mergedProductGroups.map((group, index) => (
            <div key={index}>
              <div className="border-t border-gray-300 my-4">
                <span className="text-sm text-gray-500">
                  Suchergebnisse von {group.timestamp}
                </span>
              </div>
              <ProductGrid products={group.products} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductsPanel;
