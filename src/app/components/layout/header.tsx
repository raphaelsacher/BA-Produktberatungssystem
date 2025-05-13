"use client";
// /Users/raphaelsacher/Documents/GitHub/frontend_shopping_assistant/components/layout/header.tsx

//import { Button } from "@/app/components/ui/button";
//import { ThemeToggle } from "@/app/components/layout/theme-toggle";
// Importiere das IconLogo
import { IconLogo } from "@/app/components/ui/icons";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="sticky top-0 z-10 border-b bg-background">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-4">
          {/* Verwende das IconLogo anstelle des Platzhalter-<div> */}
          <IconLogo className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">compary.ai</span>
        </Link>
        <div className="flex items-center space-x-4">
          {/*
          <Link href="/survey">
            <Button variant="outline">Umfrage</Button>
          </Link>#
          
          <ThemeToggle />*/}
        </div>
      </div>
    </header>
  );
};
