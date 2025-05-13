"use client";
import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="w-full p-2 md:p-4">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <Link
            href="/impressum"
            className="text-muted-foreground hover:text-foreground"
          >
            Impressum
          </Link>
          <Link
            href="/datenschutz"
            className="text-muted-foreground hover:text-foreground"
          >
            Datenschutzerklärung
          </Link>
        </div>
        {/*
        <div className="flex space-x-2">
          <Link
            href="/survey"
            className="text-muted-foreground hover:text-foreground"
          >
            Umfrage
          </Link>
        </div>*/}
      </div>
    </footer>
  );
};

export default Footer;
