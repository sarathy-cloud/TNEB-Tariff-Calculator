'use client';

import React from 'react';
import { SlabBreakdownItem } from '../lib/calculator';

interface TariffProgressionBarProps {
  slabs: SlabBreakdownItem[];
  unitsConsumed: number;
  onSelectSlabUnits?: (units: number) => void;
}

export const TariffProgressionBar: React.FC<TariffProgressionBarProps> = ({
  slabs,
  unitsConsumed,
  onSelectSlabUnits,
}) => {
  if (!slabs || slabs.length === 0) return null;

  // Calculate overall progress % up to 1200
  const progressPercent = Math.min(100, Math.max(0, (unitsConsumed / 1200) * 100));

  return (
    <div className="space-y-3 py-2">
      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-artifact-muted-light dark:text-artifact-muted-dark">
        <span>Tariff Progression</span>
        <span className="text-[11px] font-mono lowercase text-artifact-muted-light dark:text-artifact-muted-dark font-normal">
          Click any slab to set units
        </span>
      </div>

      {/* Progress Bar Track */}
      <div className="w-full bg-artifact-panel-light dark:bg-artifact-panel-dark h-2 rounded-full overflow-hidden p-0.5 border border-artifact-border-light/60 dark:border-artifact-border-dark/60">
        <div
          className="bg-gradient-to-r from-amber-500 to-artifact-accent h-full rounded-full transition-all duration-300 shadow-sm"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Clickable Slab Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {slabs.map((slab, idx) => {
          const isActive = slab.isActive;
          const isApplicable = slab.isApplicable;

          // Midpoint for click handler
          const midpoint = slab.to === Infinity ? slab.from + 100 : Math.round((slab.from + slab.to) / 2);

          return (
            <button
              key={idx}
              onClick={() => onSelectSlabUnits && onSelectSlabUnits(midpoint)}
              className={`rounded-xl p-2.5 text-center transition-all cursor-pointer border focus:outline-none hover:scale-105 active:scale-95 ${
                isActive
                  ? 'bg-artifact-accent/15 border-artifact-accent text-artifact-accent ring-2 ring-artifact-accent/40 shadow-lg shadow-artifact-accent/10 font-bold'
                  : isApplicable
                  ? 'glass-panel border-artifact-border-light dark:border-artifact-border-dark text-artifact-text-light dark:text-artifact-text-dark hover:border-artifact-accent/50'
                  : 'bg-artifact-surface-light/40 dark:bg-artifact-surface-dark/40 border-artifact-border-light/40 dark:border-artifact-border-dark/40 text-artifact-muted-light/50 dark:text-artifact-muted-dark/50 opacity-50 hover:opacity-80'
              }`}
              title={`Click to set consumption to ${midpoint} kWh`}
            >
              <div className="text-[11px] font-mono font-semibold truncate">
                {slab.to === Infinity ? `${slab.from}+` : `${slab.from}–${slab.to}`}
              </div>
              <div className="text-xs font-bold font-mono mt-0.5">
                {slab.rate === 0 ? 'FREE' : `₹${slab.rate.toFixed(2)}`}
              </div>
              {isActive && (
                <div className="text-[10px] font-mono mt-1 pt-1 border-t border-artifact-accent/40 text-artifact-accent font-extrabold">
                  {slab.unitsInSlab} kWh
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
