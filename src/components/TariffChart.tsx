'use client';

import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ReferenceDot,
  CartesianGrid,
} from 'recharts';
import { calculateBill } from '../lib/calculator';
import { TariffCategory, AdditionalCharges } from '../data/tariffs';
import { formatCurrency, formatNumber } from '../lib/formatCurrency';
import { Activity, Layers } from 'lucide-react';

interface TariffChartProps {
  unitsConsumed: number;
  category: TariffCategory;
  additionalCharges: AdditionalCharges;
  darkMode: boolean;
}

export const TariffChart: React.FC<TariffChartProps> = ({
  unitsConsumed,
  category,
  additionalCharges,
  darkMode,
}) => {
  // Dynamically compute xMax based on consumption input
  const xMax = useMemo(() => {
    if (unitsConsumed > 1200) {
      return Math.max(1200, Math.ceil((unitsConsumed + 100) / 200) * 200);
    }
    return 1200;
  }, [unitsConsumed]);

  // Dynamic X-axis ticks
  const xTicks = useMemo(() => {
    const defaultTicks = [0, 100, 200, 400, 500, 600, 800, 1000, 1200];
    if (xMax > 1200) {
      const extraTicks: number[] = [];
      const step = (xMax - 1200) > 1000 ? 500 : 200;
      for (let t = 1400; t <= xMax; t += step) {
        extraTicks.push(t);
      }
      return [...defaultTicks, ...extraTicks];
    }
    return defaultTicks;
  }, [xMax]);

  // Generate dynamic dataset up to xMax
  const data = useMemo(() => {
    const pointsSet = new Set<number>();
    const step = xMax > 2000 ? 25 : 10;

    for (let u = 0; u <= xMax; u += step) {
      pointsSet.add(u);
    }

    // Explicit boundary points
    [0, 100, 101, 200, 201, 400, 401, 500, 501, 600, 601, 800, 801, 1000, 1001, 1200].forEach((pt) => {
      if (pt <= xMax) pointsSet.add(pt);
    });

    // Current user units
    if (unitsConsumed >= 0) {
      pointsSet.add(Math.round(unitsConsumed));
    }

    const sortedUnits = Array.from(pointsSet).sort((a, b) => a - b);

    return sortedUnits.map((units) => {
      const calc = calculateBill(units, category, additionalCharges);
      return {
        units,
        bill: calc.finalAmount,
        energyCharge: calc.energyCharge,
        tier: calc.appliedTier,
      };
    });
  }, [category, additionalCharges, unitsConsumed, xMax]);

  // Current user's calculated bill
  const currentCalc = useMemo(() => {
    return calculateBill(unitsConsumed, category, additionalCharges);
  }, [unitsConsumed, category, additionalCharges]);

  // Theme colors
  const strokeColor = '#F97316';
  const gridColor = darkMode ? '#333330' : '#E2DFD8';
  const textColor = darkMode ? '#9E9C96' : '#77736D';
  const accentColor = '#F97316';

  return (
    <div className="glass-card rounded-3xl p-5 sm:p-6 shadow-xl border border-artifact-border-light/80 dark:border-artifact-border-dark/80 space-y-4 relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-artifact-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-artifact-border-light/60 dark:border-artifact-border-dark/60 pb-3">
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-artifact-accent" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-artifact-text-light dark:text-artifact-text-dark">
            Interactive Tariff Cost Curve
          </h3>
        </div>
        <div className="flex items-center space-x-3 text-xs font-mono">
          <span className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-md bg-gradient-to-r from-amber-500 to-artifact-accent inline-block shadow-sm" />
            <span className="text-artifact-muted-light dark:text-artifact-muted-dark">Cumulative Bill</span>
          </span>
          <span className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-artifact-accent/15 text-artifact-accent font-bold">
            <span className="w-2 h-2 rounded-full bg-artifact-accent inline-block animate-ping" />
            <span>{formatNumber(unitsConsumed)} kWh</span>
          </span>
        </div>
      </div>

      {/* Recharts AreaChart Container */}
      <div className="w-full h-80 sm:h-[420px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 20, left: 15, bottom: 25 }}
          >
            <defs>
              <linearGradient id="billGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={accentColor} stopOpacity={0.4} />
                <stop offset="95%" stopColor={accentColor} stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis
              dataKey="units"
              stroke={textColor}
              fontSize={11}
              fontFamily="monospace"
              tickLine={false}
              domain={[0, xMax]}
              ticks={xTicks}
              label={{
                value: `Units consumed (kWh) ${xMax > 1200 ? '• Scale auto-shrunk' : ''}`,
                position: 'insideBottom',
                offset: -18,
                fill: textColor,
                fontSize: 11,
              }}
            />
            <YAxis
              stroke={textColor}
              fontSize={11}
              fontFamily="monospace"
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `₹${val}`}
              label={{
                value: 'Estimated bill (₹)',
                angle: -90,
                position: 'insideLeft',
                offset: -8,
                fill: textColor,
                fontSize: 11,
              }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const dataPoint = payload[0].payload;
                  const hoveredCalc = calculateBill(dataPoint.units, category, additionalCharges);

                  return (
                    <div className="glass-card rounded-2xl p-3.5 shadow-2xl border border-artifact-accent/40 font-mono text-xs space-y-2 max-w-xs">
                      <div className="flex items-center justify-between border-b border-artifact-border-light dark:border-artifact-border-dark pb-1.5 font-bold text-artifact-text-light dark:text-artifact-text-dark">
                        <span>{formatNumber(dataPoint.units)} kWh</span>
                        <span className="text-[10px] text-artifact-muted-light dark:text-artifact-muted-dark font-normal">
                          {hoveredCalc.appliedTier === 'tierA' ? 'Tier 1 (≤500)' : 'Tier 2 (>500)'}
                        </span>
                      </div>
                      <div className="text-base font-extrabold text-artifact-accent">
                        Bill: {formatCurrency(dataPoint.bill)}
                      </div>
                      <div className="text-[11px] text-artifact-muted-light dark:text-artifact-muted-dark pt-1 border-t border-artifact-border-light/60 dark:border-artifact-border-dark/60 space-y-0.5">
                        {hoveredCalc.slabBreakdown
                          .filter((s) => s.isActive)
                          .map((s, i) => (
                            <div key={i} className="flex justify-between">
                              <span>
                                {s.from}–{s.to === Infinity ? '+' : s.to}: {s.unitsInSlab}u @ ₹{s.rate}
                              </span>
                              <span className="font-semibold text-artifact-text-light dark:text-artifact-text-dark">
                                ₹{s.charge}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />

            {/* Glowing Gradient Area */}
            <Area
              type="linear"
              dataKey="bill"
              stroke={strokeColor}
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#billGradient)"
              activeDot={{ r: 6, fill: accentColor, stroke: '#FFFFFF', strokeWidth: 2 }}
              isAnimationActive={true}
              animationDuration={500}
            />

            {/* Tariff Jump Markers */}
            {[200, 400, 500, 600, 800, 1000].map((boundary) => (
              <ReferenceLine
                key={boundary}
                x={boundary}
                stroke={gridColor}
                strokeDasharray="2 2"
                strokeWidth={1}
              />
            ))}

            {/* User current position guide line */}
            {unitsConsumed >= 0 && (
              <ReferenceLine
                x={unitsConsumed}
                stroke={accentColor}
                strokeDasharray="4 4"
                strokeWidth={2}
              />
            )}

            {/* User current position highlighted glowing dot */}
            {unitsConsumed >= 0 && (
              <ReferenceDot
                x={unitsConsumed}
                y={currentCalc.finalAmount}
                r={8}
                fill={accentColor}
                stroke="#FFFFFF"
                strokeWidth={3}
                className="animate-pulse"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between text-[11px] text-artifact-muted-light dark:text-artifact-muted-dark pt-2 border-t border-artifact-border-light/60 dark:border-artifact-border-dark/60 font-mono">
        <span className="flex items-center space-x-1">
          <Layers className="w-3.5 h-3.5 text-artifact-accent" />
          <span>Slab boundary rate jumps: 200, 400, 500, 600, 800, 1000 kWh</span>
        </span>
        <span>{unitsConsumed > 1200 ? `Auto-shrunk X-Axis (0–${xMax} kWh)` : 'Linear piecewise calculation'}</span>
      </div>
    </div>
  );
};
