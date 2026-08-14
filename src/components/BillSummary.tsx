'use client';

import React, { useMemo } from 'react';
import { formatCurrency, formatNumber } from '../lib/formatCurrency';
import { BillCalculationResult, calculateBill } from '../lib/calculator';
import { TrendingDown, Lightbulb } from 'lucide-react';

interface BillSummaryProps {
  result: BillCalculationResult;
}

export const BillSummary: React.FC<BillSummaryProps> = ({ result }) => {
  const { finalAmount, unitsConsumed, appliedTier, category, additionalCharges } = result;

  // Calculate potential savings if user reduces consumption by 50 units
  const savingsResult = useMemo(() => {
    if (unitsConsumed <= 50) return null;
    const reducedUnits = unitsConsumed - 50;
    const reducedCalc = calculateBill(reducedUnits, category, additionalCharges);
    const savedAmount = finalAmount - reducedCalc.finalAmount;
    return savedAmount > 0 ? { reducedUnits, savedAmount } : null;
  }, [unitsConsumed, category, additionalCharges, finalAmount]);

  return (
    <div className="glass-card rounded-2xl p-6 shadow-xl border border-artifact-border-light/80 dark:border-artifact-border-dark/80 relative overflow-hidden transition-all group">
      {/* Background Radial Glow */}
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-gradient-to-br from-artifact-accent/20 to-amber-500/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />

      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-artifact-muted-light dark:text-artifact-muted-dark">
          Estimated Bill
        </span>
        {category.isAutoTiered && (
          <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-artifact-accent/15 text-artifact-accent border border-artifact-accent/30 shadow-sm">
            {appliedTier === 'tierA' ? 'Tier 1 (≤ 500 units)' : 'Tier 2 (> 500 units)'}
          </span>
        )}
      </div>

      {/* Main Hero Amount with Drop Shadow Aura */}
      <div className="mb-3">
        <span className="text-4xl sm:text-5xl font-black font-mono text-artifact-accent tracking-tight drop-shadow-[0_0_15px_rgba(249,115,22,0.35)]">
          {formatCurrency(finalAmount)}
        </span>
      </div>

      {/* Supporting Summary */}
      <div className="flex items-center justify-between text-xs text-artifact-muted-light dark:text-artifact-muted-dark pt-3 border-t border-artifact-border-light/60 dark:border-artifact-border-dark/60 font-mono">
        <span>
          for <strong className="text-artifact-text-light dark:text-artifact-text-dark font-bold">{formatNumber(unitsConsumed)} kWh</strong> consumed
        </span>
        <span className="text-[11px] italic font-sans">
          Progressive slab billing
        </span>
      </div>

      {/* Interactive Savings Tip Widget */}
      {savingsResult && (
        <div className="mt-4 pt-3 border-t border-dashed border-artifact-border-light/80 dark:border-artifact-border-dark/80 flex items-center justify-between text-xs bg-artifact-accent/10 dark:bg-artifact-accent/15 rounded-xl p-3 text-artifact-text-light dark:text-artifact-text-dark">
          <div className="flex items-center space-x-2">
            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
            <span>
              Reduce by 50 kWh ({savingsResult.reducedUnits} kWh total) to save{' '}
              <strong className="text-artifact-accent font-mono font-bold">
                {formatCurrency(savingsResult.savedAmount)}
              </strong>
            </span>
          </div>
          <TrendingDown className="w-4 h-4 text-emerald-500 shrink-0 ml-2" />
        </div>
      )}
    </div>
  );
};
