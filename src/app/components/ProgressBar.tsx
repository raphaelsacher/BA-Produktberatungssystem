"use client";

import React from "react";

const ProgressBar: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      <span className="ml-2 text-gray-600">Verarbeitung läuft...</span>
    </div>
  );
};

export default ProgressBar;
