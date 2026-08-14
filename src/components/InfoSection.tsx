'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const InfoSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-xl border border-artifact-border-light dark:border-artifact-border-dark bg-artifact-surface-light dark:bg-artifact-surface-dark overflow-hidden shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-artifact-panel-light/40 dark:hover:bg-artifact-panel-dark/40 transition-colors focus:outline-none"
      >
        <div className="flex items-center space-x-2">
          <HelpCircle className="w-4 h-4 text-artifact-accent" />
          <span className="text-xs font-semibold uppercase tracking-wider text-artifact-text-light dark:text-artifact-text-dark">
            How Progressive Slab Billing Works
          </span>
        </div>
        <div className="text-xs text-artifact-muted-light dark:text-artifact-muted-dark">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-4 pt-0 border-t border-artifact-border-light/60 dark:border-artifact-border-dark/60 text-xs text-artifact-text-light/90 dark:text-artifact-text-dark/90 leading-relaxed space-y-3 bg-artifact-panel-light/20 dark:bg-artifact-panel-dark/20">
          <p className="pt-3">
            In Tamil Nadu (TNEB / TANGEDCO), electricity is billed using <strong>progressive slab-wise rates</strong> rather than charging your entire consumption at a single flat rate.
          </p>

          <div className="space-y-2">
            <h4 className="font-semibold text-artifact-text-light dark:text-artifact-text-dark">
              1. Slab Allocation
            </h4>
            <p>
              Your total electricity consumption is divided into blocks (slabs). Units falling inside each slab are charged only at the rate applicable to that specific slab.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-artifact-text-light dark:text-artifact-text-dark">
              2. Free & Subsidized Slabs (≤ 500 units)
            </h4>
            <p>
              For residential domestic connections (LT Tariff I-A), the first 100 units are 100% free (₹0.00). If your total consumption is up to 500 units, the next 100 units (101–200) are also ₹0.00.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-artifact-text-light dark:text-artifact-text-dark">
              3. Automatic Tier Shift (&gt; 500 units)
            </h4>
            <p>
              If total consumption exceeds 500 units bi-monthly (e.g. 550 units), the tariff structure automatically shifts to Tier 2 rates where units from 101–400 are billed at ₹4.70/unit.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
