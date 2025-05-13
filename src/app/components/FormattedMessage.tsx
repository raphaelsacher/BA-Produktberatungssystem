"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/app/types";

/**
 * Props for FormattedMessage.
 */
interface FormattedMessageProps {
  /** Der zu parsende Text, der optional Produkt-ID-Marker enthält. */
  text: string;
  /** Liste der verfügbaren Produkte, aus denen zugehörige Produktdaten gesucht werden. */
  products: Product[];
}

/**
 * FormattedMessage rendert einen Text, der spezielle Marker im Format [prod:ProduktID] enthalten kann.
 * An den Stellen der Marker wird, sofern das Produkt gefunden wird, eine ProductCard angezeigt.
 */
export function FormattedMessage({ text, products }: FormattedMessageProps) {
  // Regex, der Marker wie [prod:12345] erkennt
  const regex = /\[pd:([^\]]+)\]/gi;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  // Iteriere über alle Vorkommen des Markers
  while ((match = regex.exec(text)) !== null) {
    // Füge den Text vor dem Marker hinzu
    if (match.index > lastIndex) {
      parts.push(
        <ReactMarkdown key={lastIndex}>
          {text.slice(lastIndex, match.index)}
        </ReactMarkdown>
      );
    }

    const markerValue = match[1].trim();
    // Suche das Produkt anhand des Rangs (als String-Vergleich)
    const product = products.find((p) => p.rank.toString() === markerValue);
    if (product) {
      parts.push(
        <div key={match.index} className="my-2">
          <ProductCard product={product} />
        </div>
      );
    } else {
      // Falls kein Produkt gefunden wird, wird der Marker als normaler Text gerendert.
      parts.push(<ReactMarkdown key={match.index}>{match[0]}</ReactMarkdown>);
    }
    lastIndex = match.index + match[0].length;
  }

  // Restlichen Text anhängen
  if (lastIndex < text.length) {
    parts.push(
      <ReactMarkdown key={lastIndex}>{text.slice(lastIndex)}</ReactMarkdown>
    );
  }

  return <>{parts}</>;
}
