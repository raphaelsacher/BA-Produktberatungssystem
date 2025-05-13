"use client";

import { useMemo } from "react";
import { useTranscript } from "@/app/contexts/TranscriptContext";
import type { Product } from "@/app/types";

/**
 * useProducts hook.
 *
 * Extrahiert und kombiniert Produktdaten aus allen Transkript-Einträgen vom Typ PRODUCT_RESULT.
 *
 * @returns Array von zusammengeführten Produktobjekten.
 */
export function useProducts(): Product[] {
  const { transcriptItems } = useTranscript();

  const products = useMemo(() => {
    const productResults = transcriptItems.filter((item) => item.type === "PRODUCT_RESULT");
    const mergedProductsMap: Record<string, Product> = {};

    productResults.forEach((result) => {
      if (result.data) {
        const comparyProducts = Array.isArray(result.data.compary) ? result.data.compary : [];
        const presentProducts = Array.isArray(result.data.present) ? result.data.present : [];

        comparyProducts.forEach((cp: any) => {
          const product: Product = {
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
          };
          mergedProductsMap[product.id] = product;
        });

        presentProducts.forEach((ap: any) => {
          if (ap.id) {
            if (mergedProductsMap[ap.id]) {
              mergedProductsMap[ap.id] = { ...mergedProductsMap[ap.id], ...ap };
            } else {
              mergedProductsMap[ap.id] = {
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
          }
        });
      }
    });

    return Object.values(mergedProductsMap);
  }, [transcriptItems]);

  return products;
}
