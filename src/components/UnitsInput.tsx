'use client';

import React from 'react';
import { RotateCcw, Sliders } from 'lucide-react';

interface UnitsInputProps {
  unitsInput: string;
  onUnitsChange: (value: string) => void;
  onReset: () => void;
  errorMessage?: string;
}

const PRESET_UNITS = [100, 250, 350, 450, 650, 900, 1500];

export const UnitsInput: React.FC<UnitsInputProps> = ({
  unitsInput,
  onUnitsChange,
  onReset,
  errorMessage,
}) => {
  const currentVal = parseFloat(unitsInput) || 0;
  const sliderMax = currentVal > 1200 ? Math.max(1200, Math.ceil((currentVal + 100) / 200) * 200) : 1200;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label
          htmlFor="units-consumed-input"
          className="text-xs font-bold uppercase tracking-wider text-artifact-muted-light dark:text-artifact-muted-dark flex items-center space-x-1.5"
        >
          <Sliders className="w-3.5 h-3.5 text-artifact-accent" />
          <span>Units Consumed</span>
        </label>
        <button
          onClick={onReset}
          className="inline-flex items-center space-x-1 text-xs text-artifact-muted-light dark:text-artifact-muted-dark hover:text-artifact-accent transition-all focus:outline-none hover:scale-105 active:scale-95"
          title="Reset input to 0"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Main Glass Input Card */}
      <div className="glass-card rounded-3xl p-5 shadow-lg border border-artifact-border-light/80 dark:border-artifact-border-dark/80 focus-within:border-artifact-accent/80 focus-within:ring-4 focus-within:ring-artifact-accent/15 transition-all">
        <div className="flex items-baseline justify-between mb-4">
          <input
            id="units-consumed-input"
            type="number"
            min="0"
            step="1"
            inputMode="decimal"
            value={unitsInput}
            onChange={(e) => onUnitsChange(e.target.value)}
            placeholder="0"
            className="w-full text-4xl sm:text-5xl font-extrabold font-mono text-artifact-text-light dark:text-artifact-text-dark bg-transparent border-none focus:outline-none p-0 tracking-tight"
          />
          <span className="text-xl font-bold font-mono text-artifact-accent select-none ml-2">
            kWh
          </span>
        </div>

        {/* Range Slider for Interactive Dragging */}
        <div className="space-y-1.5 pt-2 border-t border-artifact-border-light/50 dark:border-artifact-border-dark/50">
          <input
            type="range"
            min="0"
            max={sliderMax}
            step="5"
            value={currentVal}
            onChange={(e) => onUnitsChange(e.target.value)}
            className="w-full h-2 rounded-lg accent-artifact-accent bg-artifact-panel-light dark:bg-artifact-panel-dark cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-artifact-muted-light dark:text-artifact-muted-dark font-medium px-0.5">
            <span>0 kWh</span>
            <span>500 kWh (Tier Limit)</span>
            <span>{sliderMax}+ kWh</span>
          </div>
        </div>
      </div>

      {/* Error Message if Any */}
      {errorMessage && (
        <p className="text-xs text-rose-500 font-medium tracking-wide bg-rose-500/10 border border-rose-500/20 rounded-lg p-2.5">
          ⚠️ {errorMessage}
        </p>
      )}

      {/* Quick Select Presets */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-artifact-muted-light dark:text-artifact-muted-dark select-none">
          Presets:
        </span>
        {PRESET_UNITS.map((preset) => {
          const isSelected = unitsInput === String(preset);
          return (
            <button
              key={preset}
              onClick={() => onUnitsChange(String(preset))}
              className={`text-xs px-3 py-1.5 rounded-full font-mono font-medium transition-all shadow-sm ${
                isSelected
                  ? 'bg-artifact-accent text-white shadow-artifact-accent/30 shadow-md scale-105'
                  : 'bg-artifact-surface-light/80 dark:bg-artifact-surface-dark/80 text-artifact-text-light dark:text-artifact-text-dark hover:border-artifact-accent/50 hover:bg-artifact-accent/10 border border-artifact-border-light/80 dark:border-artifact-border-dark/80'
              }`}
            >
              {preset} kWh
            </button>
          );
        })}
      </div>
    </div>
  );
};
