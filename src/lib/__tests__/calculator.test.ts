import { describe, it, expect } from 'vitest';
import { calculateBill } from '../calculator';
import { TNEB_DOMESTIC_CATEGORY } from '../../data/tariffs';

describe('TNEB Electricity Tariff Calculator Engine', () => {
  it('handles 0 units correctly', () => {
    const result = calculateBill(0, TNEB_DOMESTIC_CATEGORY);
    expect(result.isValid).toBe(true);
    expect(result.energyCharge).toBe(0);
    expect(result.finalAmount).toBe(0);
  });

  it('handles 1 unit correctly (free slab 0-100)', () => {
    const result = calculateBill(1, TNEB_DOMESTIC_CATEGORY);
    expect(result.energyCharge).toBe(0);
    expect(result.finalAmount).toBe(0);
  });

  it('handles 50 units correctly', () => {
    const result = calculateBill(50, TNEB_DOMESTIC_CATEGORY);
    expect(result.energyCharge).toBe(0);
    expect(result.finalAmount).toBe(0);
  });

  it('handles 100 units correctly (boundary of slab 1)', () => {
    const result = calculateBill(100, TNEB_DOMESTIC_CATEGORY);
    expect(result.energyCharge).toBe(0);
    expect(result.finalAmount).toBe(0);
  });

  it('handles 101 units correctly (starts slab 2)', () => {
    const result = calculateBill(101, TNEB_DOMESTIC_CATEGORY);
    // <= 500 units tier: 101-200 is rate 0
    expect(result.energyCharge).toBe(0);
    expect(result.finalAmount).toBe(0);
  });

  it('handles 200 units correctly', () => {
    const result = calculateBill(200, TNEB_DOMESTIC_CATEGORY);
    expect(result.energyCharge).toBe(0);
    expect(result.finalAmount).toBe(0);
  });

  it('handles 201 units correctly (starts slab 3 @ 4.70)', () => {
    const result = calculateBill(201, TNEB_DOMESTIC_CATEGORY);
    // 1 unit in slab 201-400 @ 4.70 = 4.70
    expect(result.energyCharge).toBe(4.70);
    expect(result.finalAmount).toBe(4.70);
  });

  it('handles 250 units correctly', () => {
    const result = calculateBill(250, TNEB_DOMESTIC_CATEGORY);
    // 50 units in slab 201-400 @ 4.70 = 235.00
    expect(result.energyCharge).toBe(235.00);
    expect(result.finalAmount).toBe(235.00);
  });

  it('handles 350 units correctly (example from prompt: ₹705.00)', () => {
    const result = calculateBill(350, TNEB_DOMESTIC_CATEGORY);
    // 1-100: 100 @ 0 = 0
    // 101-200: 100 @ 0 = 0
    // 201-350: 150 @ 4.70 = 705.00
    expect(result.energyCharge).toBe(705.00);
    expect(result.finalAmount).toBe(705.00);
  });

  it('handles 400 units correctly', () => {
    const result = calculateBill(400, TNEB_DOMESTIC_CATEGORY);
    // 200 units @ 4.70 = 940.00
    expect(result.energyCharge).toBe(940.00);
    expect(result.finalAmount).toBe(940.00);
  });

  it('handles 401 units correctly (starts slab 4 @ 6.30)', () => {
    const result = calculateBill(401, TNEB_DOMESTIC_CATEGORY);
    // 200 @ 4.70 + 1 @ 6.30 = 940 + 6.30 = 946.30
    expect(result.energyCharge).toBe(946.30);
    expect(result.finalAmount).toBe(946.30);
  });

  it('handles 500 units correctly (max of Tier A)', () => {
    const result = calculateBill(500, TNEB_DOMESTIC_CATEGORY);
    // 200 @ 4.70 + 100 @ 6.30 = 940 + 630 = 1570.00
    expect(result.energyCharge).toBe(1570.00);
    expect(result.finalAmount).toBe(1570.00);
    expect(result.appliedTier).toBe('tierA');
  });

  it('handles 501 units correctly (switches to Tier B)', () => {
    const result = calculateBill(501, TNEB_DOMESTIC_CATEGORY);
    // Tier B (>500 units):
    // 1-100: 100 @ 0 = 0
    // 101-400: 300 @ 4.70 = 1410.00
    // 401-500: 100 @ 6.30 = 630.00
    // 501-600: 1 @ 8.40 = 8.40
    // Total = 1410 + 630 + 8.40 = 2048.40
    expect(result.appliedTier).toBe('tierB');
    expect(result.energyCharge).toBe(2048.40);
    expect(result.finalAmount).toBe(2048.40);
  });

  it('handles 600 units correctly', () => {
    const result = calculateBill(600, TNEB_DOMESTIC_CATEGORY);
    // 300 @ 4.70 (1410) + 100 @ 6.30 (630) + 100 @ 8.40 (840) = 2880.00
    expect(result.energyCharge).toBe(2880.00);
    expect(result.finalAmount).toBe(2880.00);
  });

  it('handles 601 units correctly', () => {
    const result = calculateBill(601, TNEB_DOMESTIC_CATEGORY);
    // 2880 + 1 @ 9.45 = 2889.45
    expect(result.energyCharge).toBe(2889.45);
    expect(result.finalAmount).toBe(2889.45);
  });

  it('handles 800 units correctly', () => {
    const result = calculateBill(800, TNEB_DOMESTIC_CATEGORY);
    // 1410 + 630 + 840 + 200 @ 9.45 (1890) = 4770.00
    expect(result.energyCharge).toBe(4770.00);
    expect(result.finalAmount).toBe(4770.00);
  });

  it('handles 801 units correctly', () => {
    const result = calculateBill(801, TNEB_DOMESTIC_CATEGORY);
    // 4770 + 1 @ 10.50 = 4780.50
    expect(result.energyCharge).toBe(4780.50);
    expect(result.finalAmount).toBe(4780.50);
  });

  it('handles 1000 units correctly', () => {
    const result = calculateBill(1000, TNEB_DOMESTIC_CATEGORY);
    // 4770 + 200 @ 10.50 (2100) = 6870.00
    expect(result.energyCharge).toBe(6870.00);
    expect(result.finalAmount).toBe(6870.00);
  });

  it('handles 1001 units correctly', () => {
    const result = calculateBill(1001, TNEB_DOMESTIC_CATEGORY);
    // 6870 + 1 @ 11.55 = 6881.55
    expect(result.energyCharge).toBe(6881.55);
    expect(result.finalAmount).toBe(6881.55);
  });

  it('handles 1200 units correctly', () => {
    const result = calculateBill(1200, TNEB_DOMESTIC_CATEGORY);
    // 6870 + 200 @ 11.55 (2310) = 9180.00
    expect(result.energyCharge).toBe(9180.00);
    expect(result.finalAmount).toBe(9180.00);
  });

  it('handles validation error for negative numbers', () => {
    const result = calculateBill(-50, TNEB_DOMESTIC_CATEGORY);
    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toBe('Units cannot be negative.');
  });
});
