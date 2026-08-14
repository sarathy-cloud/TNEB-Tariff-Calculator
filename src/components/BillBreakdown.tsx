'use client';

import React from 'react';
import { formatCurrency, formatNumber } from '../lib/formatCurrency';
import { BillCalculationResult } from '../lib/calculator';
import { FileText } from 'lucide-react';

interface BillBreakdownProps {
  result: BillCalculationResult;
}

export const BillBreakdown: React.FC<BillBreakdownProps> = ({ result }) => {
  const {
    slabBreakdown,
    energyCharge,
    fixedCharge,
    weldingCharge,
    bpsc,
    tax,
    finalAmount,
    additionalCharges,
  } = result;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-artifact-muted-light dark:text-artifact-muted-dark flex items-center space-x-1.5">
          <FileText className="w-3.5 h-3.5 text-artifact-accent" />
          <span>Slab-wise Bill Breakdown</span>
        </h3>
        <span className="text-xs font-mono text-artifact-muted-light dark:text-artifact-muted-dark">
          Itemized calculation
        </span>
      </div>

      {/* Glass Table Container */}
      <div className="glass-card rounded-2xl overflow-hidden shadow-lg border border-artifact-border-light/80 dark:border-artifact-border-dark/80">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-artifact-border-light/80 dark:border-artifact-border-dark/80 bg-artifact-panel-light/80 dark:bg-artifact-panel-dark/80 text-artifact-muted-light dark:text-artifact-muted-dark uppercase tracking-wider font-bold">
                <th className="py-3 px-4">Slab Range</th>
                <th className="py-3 px-4 text-right">Units</th>
                <th className="py-3 px-4 text-right">Rate</th>
                <th className="py-3 px-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-artifact-border-light/50 dark:divide-artifact-border-dark/50 font-mono">
              {slabBreakdown.map((slab, idx) => {
                const isActive = slab.isActive;
                const costSharePercent = energyCharge > 0 ? (slab.charge / energyCharge) * 100 : 0;

                return (
                  <tr
                    key={idx}
                    className={`transition-all ${
                      isActive
                        ? 'bg-artifact-accent/10 dark:bg-artifact-accent/15 text-artifact-text-light dark:text-artifact-text-dark font-semibold'
                        : 'text-artifact-muted-light/60 dark:text-artifact-muted-dark/60 opacity-60'
                    }`}
                  >
                    <td className="py-3 px-4 font-sans">
                      <div className="flex items-center space-x-2">
                        {isActive ? (
                          <span className="w-2 h-2 rounded-full bg-artifact-accent inline-block animate-ping" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-stone-300 dark:bg-stone-700 inline-block" />
                        )}
                        <span>
                          {slab.to === Infinity
                            ? `${slab.from} units & above`
                            : `${slab.from} – ${slab.to} units`}
                        </span>
                      </div>

                      {/* Visual Cost Share Bar for Active Slabs */}
                      {isActive && slab.charge > 0 && (
                        <div className="w-24 bg-artifact-accent/20 h-1 rounded-full overflow-hidden mt-1">
                          <div
                            className="bg-artifact-accent h-full rounded-full"
                            style={{ width: `${costSharePercent}%` }}
                          />
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {formatNumber(slab.unitsInSlab)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {slab.rate === 0 ? '₹0.00 (Free)' : formatCurrency(slab.rate)}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-artifact-text-light dark:text-artifact-text-dark">
                      {formatCurrency(slab.charge)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Totals Summary Footer */}
        <div className="p-4 border-t border-artifact-border-light/80 dark:border-artifact-border-dark/80 bg-artifact-panel-light/40 dark:bg-artifact-panel-dark/40 space-y-2 text-xs">
          <div className="flex items-center justify-between font-bold text-artifact-text-light dark:text-artifact-text-dark">
            <span>Energy Charge Subtotal</span>
            <span className="font-mono text-sm">{formatCurrency(energyCharge)}</span>
          </div>

          {fixedCharge > 0 && (
            <div className="flex items-center justify-between text-artifact-muted-light dark:text-artifact-muted-dark">
              <span>Fixed Charge</span>
              <span className="font-mono">{formatCurrency(fixedCharge)}</span>
            </div>
          )}

          {weldingCharge > 0 && (
            <div className="flex items-center justify-between text-artifact-muted-light dark:text-artifact-muted-dark">
              <span>Welding Surcharge ({additionalCharges.weldingPercent}%)</span>
              <span className="font-mono">{formatCurrency(weldingCharge)}</span>
            </div>
          )}

          {bpsc > 0 && (
            <div className="flex items-center justify-between text-artifact-muted-light dark:text-artifact-muted-dark">
              <span>BPSC ({additionalCharges.bpscPercent}%)</span>
              <span className="font-mono">{formatCurrency(bpsc)}</span>
            </div>
          )}

          {tax > 0 && (
            <div className="flex items-center justify-between text-artifact-muted-light dark:text-artifact-muted-dark">
              <span>Electricity Tax ({additionalCharges.eTaxPercent}%)</span>
              <span className="font-mono">{formatCurrency(tax)}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-artifact-border-light/80 dark:border-artifact-border-dark/80 text-sm font-black text-artifact-text-light dark:text-artifact-text-dark">
            <span>Final Estimated Amount</span>
            <span className="font-mono text-artifact-accent text-lg drop-shadow-[0_0_10px_rgba(249,115,22,0.3)]">
              {formatCurrency(finalAmount)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
