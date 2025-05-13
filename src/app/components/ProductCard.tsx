"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, X, ChevronDown, ChevronUp } from "lucide-react";
import { StarRating } from "@/app/components/StarRating";
import type { Product } from "@/app/types";
import { Button } from "@/app/components/ui/button";

/**
 * Rendert eine Produktkarte mit allen Details und zeigt die Pros/Cons
 * vollständig in einer vertikalen Anordnung an.
 *
 * @param props - Enthält das Produktobjekt.
 * @returns Die gerenderte Produktkarte.
 */
export function ProductCard({ product }: { product: Product }) {
  // Fallback-Werte für fehlende Daten
  const name = product.name || "N/A";
  const brand = product.brand || "N/A";
  const price =
    typeof product.price === "number"
      ? new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "EUR",
        }).format(product.price)
      : "N/A";
  const rating = typeof product.rating === "number" ? product.rating : null;
  const numRatings =
    typeof product.numRatings === "number" ? `(${product.numRatings})` : "N/A";
  const image = product.image || "/placeholder.svg";
  const label = product.label || "N/A";
  const pros =
    Array.isArray(product.pros) && product.pros.length > 0
      ? product.pros
      : ["N/A"];
  const cons =
    Array.isArray(product.cons) && product.cons.length > 0
      ? product.cons
      : ["N/A"];
  const description = product.description || "N/A";
  const uri_aw_track = product.uri_aw_track || "";

  // State für Umschalten der Beschreibung
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        {/* Linke Spalte: Produktbild */}
        <div className="sm:w-1/2 p-4">
          <div className="relative aspect-square">
            <Image
              src={image}
              alt={name}
              layout="fill"
              objectFit="contain"
              className="rounded-md"
            />
          </div>
        </div>

        {/* Rechte Spalte: Produktdetails */}
        <div className="sm:w-1/2 p-4 flex flex-col">
          <div className="mb-2 flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold line-clamp-2">{name}</h3>
              <p className="text-sm text-gray-600">{brand}</p>
            </div>
            {label !== "N/A" && (
              <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                {label}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between mb-2">
            <span className="text-xl font-bold">{price}</span>
            <div className="flex items-center">
              {rating !== null ? (
                <>
                  <StarRating rating={rating} />
                  <span className="text-sm text-gray-600 ml-2">
                    {numRatings}
                  </span>
                </>
              ) : (
                <span className="text-sm text-gray-600">N/A</span>
              )}
            </div>
          </div>

          {/* Pros und Cons in vertikaler Anordnung */}
          <div className="mb-4 space-y-4">
            {/* Pros */}
            <div>
              <h4 className="font-semibold mb-1">Vorteile:</h4>
              <ul className="text-sm space-y-1">
                {pros.map((pro, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="whitespace-normal">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div>
              <h4 className="font-semibold mb-1">Nachteile:</h4>
              <ul className="text-sm space-y-1">
                {cons.map((con, index) => (
                  <li key={index} className="flex items-start">
                    <X className="w-4 h-4 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="whitespace-normal">{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Beschreibung mit Umschaltfunktion */}
          {description !== "N/A" && (
            <div className="mb-4">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-200"
              >
                {isExpanded
                  ? "Beschreibung Ausblenden"
                  : "Beschreibung Anzeigen"}
                {isExpanded ? (
                  <ChevronUp className="ml-1 w-4 h-4" />
                ) : (
                  <ChevronDown className="ml-1 w-4 h-4" />
                )}
              </button>
              {isExpanded && (
                <p className="mt-2 text-sm text-gray-600 transition-all duration-300 ease-in-out">
                  {description}
                </p>
              )}
            </div>
          )}

          {/* Kauf-Button */}
          <div className="mt-auto">
            {uri_aw_track ? (
              <Button className="w-full h-12 text-lg" asChild>
                <a
                  href={uri_aw_track}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {uri_aw_track.includes("buy")
                    ? "Jetzt kaufen"
                    : "Zum Angebot"}
                </a>
              </Button>
            ) : (
              <div className="text-center text-sm text-gray-600">N/A</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
