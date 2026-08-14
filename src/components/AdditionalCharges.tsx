'use client';

import React, { useState } from 'react';
import { Settings2, ChevronDown, ChevronUp } from 'lucide-react';
import { AdditionalCharges } from '../data/tariffs';

interface AdditionalChargesProps {
  additionalCharges: AdditionalCharges;
  onChangeAdditionalCharges: (charges: AdditionalCharges) => void;
  onResetCharges: () => void;
}

export const AdditionalChargesSection: React.FC<AdditionalChargesProps> = ({
  additionalCharges,
  onChangeAdditionalCharges,
  onResetCharges,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (field: keyof AdditionalCharges, value: string) => {
    const num = Math.max(0, parseFloat(value) || 0);
    onChangeAdditionalCharges({
      ...additionalCharges,
      [field]: num,
    });
  };

  return (
    <div className="rounded-xl border border-artifact-border-light dark:border-artifact-border-dark bg-artifact-surface-light dark:bg-artifact-surface-dark overflow-hidden shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-artifact-panel-light/40 dark:hover:bg-artifact-panel-dark/40 transition-colors focus:outline-none"
      >
        <div className="flex items-center space-x-2">
          <Settings2 className="w-4 h-4 text-artifact-muted-light dark:text-artifact-muted-dark" />
          <span className="text-xs font-semibold uppercase tracking-wider text-artifact-muted-light dark:text-artifact-muted-dark">
            Additional Charges & Taxes
          </span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-artifact-muted-light dark:text-artifact-muted-dark font-mono">
          <span>
            Fixed: ₹{additionalCharges.fixedCost} | Tax: {additionalCharges.eTaxPercent}% | Welding: {additionalCharges.weldingPercent}%
          </span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-4 pt-0 border-t border-artifact-border-light/60 dark:border-artifact-border-dark/60 space-y-3 bg-artifact-panel-light/20 dark:bg-artifact-panel-dark/20 text-xs">
          <p className="text-artifact-muted-light dark:text-artifact-muted-dark pt-3">
            Configure additional tariff components (e.g. Fixed charges, Welding Surcharge, Electricity Tax). Default for domestic is ₹0.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-artifact-text-light dark:text-artifact-text-dark mb-1">
                Fixed Cost (₹)
              </label>
              <input
                type="number"
                min="0"
                value={additionalCharges.fixedCost}
                onChange={(e) => handleInputChange('fixedCost', e.target.value)}
                className="w-full bg-artifact-surface-light dark:bg-artifact-surface-dark border border-artifact-border-light dark:border-artifact-border-dark rounded-lg px-2.5 py-1.5 font-mono text-artifact-text-light dark:text-artifact-text-dark focus:outline-none focus:ring-1 focus:ring-artifact-accent"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-artifact-text-light dark:text-artifact-text-dark mb-1">
                Minimum Charge (₹)
              </label>
              <input
                type="number"
                min="0"
                value={additionalCharges.minimumCharge}
                onChange={(e) => handleInputChange('minimumCharge', e.target.value)}
                className="w-full bg-artifact-surface-light dark:bg-artifact-surface-dark border border-artifact-border-light dark:border-artifact-border-dark rounded-lg px-2.5 py-1.5 font-mono text-artifact-text-light dark:text-artifact-text-dark focus:outline-none focus:ring-1 focus:ring-artifact-accent"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-artifact-text-light dark:text-artifact-text-dark mb-1">
                Welding Charge (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={additionalCharges.weldingPercent}
                onChange={(e) => handleInputChange('weldingPercent', e.target.value)}
                className="w-full bg-artifact-surface-light dark:bg-artifact-surface-dark border border-artifact-border-light dark:border-artifact-border-dark rounded-lg px-2.5 py-1.5 font-mono text-artifact-text-light dark:text-artifact-text-dark focus:outline-none focus:ring-1 focus:ring-artifact-accent"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-artifact-text-light dark:text-artifact-text-dark mb-1">
                Electricity Tax / E-Tax (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={additionalCharges.eTaxPercent}
                onChange={(e) => handleInputChange('eTaxPercent', e.target.value)}
                className="w-full bg-artifact-surface-light dark:bg-artifact-surface-dark border border-artifact-border-light dark:border-artifact-border-dark rounded-lg px-2.5 py-1.5 font-mono text-artifact-text-light dark:text-artifact-text-dark focus:outline-none focus:ring-1 focus:ring-artifact-accent"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={onResetCharges}
              className="text-xs text-artifact-accent hover:underline font-medium focus:outline-none"
            >
              Reset to Defaults
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
