'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Zap, Moon, Sun, ChevronDown, Check, Github } from 'lucide-react';
import { TariffCategory, TARIFF_CATEGORIES } from '../data/tariffs';

// Set your GitHub repository URL here when ready
const GITHUB_REPO_URL = 'https://github.com/sarathy-cloud/TNEB-Tariff-Calculator';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  selectedCategory: TariffCategory;
  onSelectCategory: (category: TariffCategory) => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleDarkMode,
  selectedCategory,
  onSelectCategory,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or escape press
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="w-full px-4 pt-4 sm:pt-6 relative z-50">
      <header className="max-w-6xl mx-auto rounded-full backdrop-blur-2xl bg-white/70 dark:bg-[#1E1E1C]/70 border border-artifact-border-light/80 dark:border-artifact-border-dark/80 shadow-2xl px-5 sm:px-6 h-14 flex items-center justify-between transition-all">
        {/* Left: Minimal Sleek Branding */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-artifact-accent fill-artifact-accent animate-pulse" />
            <span className="text-sm font-black font-sans tracking-tight text-artifact-text-light dark:text-artifact-text-dark">
              TNEB
            </span>
            <span className="text-xs text-artifact-muted-light dark:text-artifact-muted-dark font-medium hidden sm:inline-block">
              Tariff Calculator
            </span>
          </div>

          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-artifact-accent/15 text-artifact-accent border border-artifact-accent/30 shadow-sm">
            {selectedCategory.code}
          </span>
        </div>

        {/* Right: Controls (Custom Category Dropdown, Glass Dark Mode Toggle & GitHub Link) */}
        <div className="flex items-center space-x-2.5">
          {/* Custom Glass Category Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center space-x-2 text-xs font-semibold bg-artifact-panel-light/80 dark:bg-artifact-panel-dark/80 text-artifact-text-light dark:text-artifact-text-dark border border-artifact-border-light/60 dark:border-artifact-border-dark/60 rounded-full px-3.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-artifact-accent/40 shadow-sm cursor-pointer hover:border-artifact-accent/50 hover:bg-artifact-accent/5 transition-all"
            >
              <span className="truncate max-w-[160px] sm:max-w-none">{selectedCategory.name}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-artifact-muted-light dark:text-artifact-muted-dark transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-artifact-accent' : ''
                }`}
              />
            </button>

            {/* Custom Floating Glass Dropdown Panel */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white/95 dark:bg-[#1E1E1C]/95 backdrop-blur-2xl border border-artifact-border-light dark:border-artifact-border-dark shadow-2xl p-1.5 space-y-1 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-artifact-muted-light dark:text-artifact-muted-dark border-b border-artifact-border-light/50 dark:border-artifact-border-dark/50 mb-1">
                  Select Tariff Category
                </div>
                {Object.values(TARIFF_CATEGORIES).map((cat) => {
                  const isSelected = cat.id === selectedCategory.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        onSelectCategory(cat);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-artifact-accent/15 text-artifact-accent font-bold border border-artifact-accent/25'
                          : 'text-artifact-text-light dark:text-artifact-text-dark hover:bg-artifact-panel-light dark:hover:bg-artifact-panel-dark font-medium'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span>{cat.name}</span>
                        <span className="text-[10px] text-artifact-muted-light dark:text-artifact-muted-dark font-normal">
                          {cat.code} • {cat.isAutoTiered ? 'Auto Slabs' : 'Flat Slabs'}
                        </span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-artifact-accent ml-2 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Dark / Light Mode Toggle Button */}
          <button
            onClick={onToggleDarkMode}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-8 h-8 rounded-full border border-artifact-border-light/80 dark:border-artifact-border-dark/80 bg-artifact-panel-light/80 dark:bg-artifact-panel-dark/80 text-artifact-text-light dark:text-artifact-text-dark flex items-center justify-center hover:bg-artifact-accent/15 hover:text-artifact-accent hover:border-artifact-accent/50 hover:scale-105 active:scale-95 shadow-sm transition-all focus:outline-none"
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? (
              <Sun className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-slate-700" />
            )}
          </button>

          {/* GitHub Repository Link Button */}
          <a
            href={GITHUB_REPO_URL || '#'}
            target={GITHUB_REPO_URL ? '_blank' : undefined}
            rel={GITHUB_REPO_URL ? 'noopener noreferrer' : undefined}
            aria-label="GitHub Repository"
            title="View source code on GitHub"
            className="w-8 h-8 rounded-full border border-artifact-border-light/80 dark:border-artifact-border-dark/80 bg-artifact-panel-light/80 dark:bg-artifact-panel-dark/80 text-artifact-text-light dark:text-artifact-text-dark flex items-center justify-center hover:bg-artifact-accent/15 hover:text-artifact-accent hover:border-artifact-accent/50 hover:scale-105 active:scale-95 shadow-sm transition-all focus:outline-none"
          >
            <Github className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>
    </div>
  );
};


