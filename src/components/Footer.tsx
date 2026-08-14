'use client';

import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-artifact-border-light dark:border-artifact-border-dark py-6 text-center text-xs text-artifact-muted-light dark:text-artifact-muted-dark space-y-1">
      <p className="font-medium">
        TNEB Tariff Calculator • Independent Estimation Tool
      </p>
      <p className="text-[11px] opacity-75">
        This is an independent open-source calculator for educational and estimation purposes. It is not an official TNEB / TANGEDCO website.
      </p>
    </footer>
  );
};
