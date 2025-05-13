import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Compary AI Shopping Assistant",
  description:
    "AI Shopping Assistant - Entdecke, Vergleiche und Finde Dein Wunschprodukt.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
