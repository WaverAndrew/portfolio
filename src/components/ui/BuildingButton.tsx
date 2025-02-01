import React from "react";

export const BuildingButton = () => {
  return (
    <div className="mb-10">
      {" "}
      {/* Increased margin for more spacing */}
      <a
        href="https://ubooks.it"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 hover:border-emerald-300 transition-all hover:shadow-[0_0_15px_rgba(16,185,129,0.25)] group"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        Currently building ubooks.it
      </a>
    </div>
  );
};
