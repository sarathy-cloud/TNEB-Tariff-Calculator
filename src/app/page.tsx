'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Header } from '../components/Header';
import { UnitsInput } from '../components/UnitsInput';
import { BillSummary } from '../components/BillSummary';
import { TariffProgressionBar } from '../components/TariffProgressionBar';
import { BillBreakdown } from '../components/BillBreakdown';
import { AdditionalChargesSection } from '../components/AdditionalCharges';
import { TariffChart } from '../components/TariffChart';
import { InfoSection } from '../components/InfoSection';
import { Footer } from '../components/Footer';

import { TNEB_DOMESTIC_CATEGORY, TariffCategory, AdditionalCharges } from '../data/tariffs';
import { calculateBill } from '../lib/calculator';

export default function Home() {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Initialize theme from system / localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('tneb_theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('tneb_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('tneb_theme', 'light');
      }
      return next;
    });
  };

  // Application calculation states
  const [selectedCategory, setSelectedCategory] = useState<TariffCategory>(TNEB_DOMESTIC_CATEGORY);
  const [unitsInput, setUnitsInput] = useState<string>('0');
  const [additionalCharges, setAdditionalCharges] = useState<AdditionalCharges>(
    TNEB_DOMESTIC_CATEGORY.defaultAdditionalCharges
  );

  // When category changes, sync default additional charges
  const handleCategoryChange = (cat: TariffCategory) => {
    setSelectedCategory(cat);
    setAdditionalCharges(cat.defaultAdditionalCharges);
  };

  // Reset input
  const handleReset = () => {
    setUnitsInput('0');
  };

  // Set units directly when a slab pill is clicked
  const handleSelectSlabUnits = (units: number) => {
    setUnitsInput(String(units));
  };

  // Calculate bill result memoized
  const parsedUnits = parseFloat(unitsInput) || 0;
  const calculationResult = useMemo(() => {
    return calculateBill(parsedUnits, selectedCategory, additionalCharges);
  }, [parsedUnits, selectedCategory, additionalCharges]);

  return (
    <div className="min-h-screen flex flex-col bg-artifact-bg-light dark:bg-artifact-bg-dark text-artifact-text-light dark:text-artifact-text-dark transition-colors duration-200 relative overflow-x-hidden">
      {/* Ambient Radial Background Light Glows */}
      <div className="fixed top-12 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-amber-500/10 via-artifact-accent/15 to-orange-400/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-orange-500/10 via-amber-500/10 to-amber-600/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Top Header Navigation */}
      <Header
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategoryChange}
      />

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8">
        {/* Hero Title Section */}
        <div className="space-y-1.5 max-w-3xl">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-artifact-text-light dark:text-artifact-text-dark">
            Calculate your electricity bill
          </h2>
          <p className="text-xs sm:text-base text-artifact-muted-light dark:text-artifact-muted-dark leading-relaxed">
            Enter your monthly electricity consumption or drag the slider to see the progressive slab-wise billing breakdown.
          </p>
        </div>

        {/* 2-Column Responsive Layout (40% Left Calculator | 60% Right Graph Visualization) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Column (Calculator Controls & Breakdown) - 5 Cols (~42%) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Dual Units Input Box & Slider */}
            <UnitsInput
              unitsInput={unitsInput}
              onUnitsChange={setUnitsInput}
              onReset={handleReset}
              errorMessage={!calculationResult.isValid ? calculationResult.errorMessage : undefined}
            />

            {/* Final Bill Result Hero Card */}
            <BillSummary result={calculationResult} />

            {/* Interactive Tariff Progression Bar */}
            <TariffProgressionBar
              slabs={calculationResult.slabBreakdown}
              unitsConsumed={calculationResult.unitsConsumed}
              onSelectSlabUnits={handleSelectSlabUnits}
            />

            {/* Detailed Slab Breakdown Table */}
            <BillBreakdown result={calculationResult} />

            {/* Expandable Additional Charges & Surcharges Settings */}
            <AdditionalChargesSection
              additionalCharges={additionalCharges}
              onChangeAdditionalCharges={setAdditionalCharges}
              onResetCharges={() => setAdditionalCharges(selectedCategory.defaultAdditionalCharges)}
            />
          </div>

          {/* Right Column (Graph Visualization & Info) - 7 Cols (~58%) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Interactive Piecewise Linear Recharts AreaChart */}
            <TariffChart
              unitsConsumed={calculationResult.unitsConsumed}
              category={selectedCategory}
              additionalCharges={additionalCharges}
              darkMode={darkMode}
            />

            {/* Expandable How This Works Section */}
            <InfoSection />
          </div>
        </div>
      </main>

      {/* Footer Disclaimer */}
      <Footer />
    </div>
  );
}
