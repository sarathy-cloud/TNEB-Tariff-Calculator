export interface TariffSlab {
  from: number;
  to: number;
  rate: number;
  maxUnit?: number;
  label?: string;
}

export interface AdditionalCharges {
  minimumCharge: number;
  fixedCost: number;
  bpscPercent: number;
  weldingPercent: number;
  eTaxPercent: number;
}

export interface TariffCategory {
  id: string;
  name: string;
  code: string;
  description: string;
  isAutoTiered: boolean;
  tierThreshold?: number;
  slabsTierA?: TariffSlab[]; // Used when units <= tierThreshold (e.g. <= 500 units)
  slabsTierB?: TariffSlab[]; // Used when units > tierThreshold (e.g. > 500 units)
  slabs?: TariffSlab[];      // Static slabs if not auto-tiered
  defaultAdditionalCharges: AdditionalCharges;
}

export const TNEB_DOMESTIC_CATEGORY: TariffCategory = {
  id: 'domestic-lt1a',
  name: 'Domestic (LT Tariff I-A)',
  code: 'LT-1A',
  description: 'Standard residential domestic tariff (Subsidized for first 100 units). Auto-switches tariff slabs at 500 units.',
  isAutoTiered: true,
  tierThreshold: 500,
  // Section A: For total consumption <= 500 units
  slabsTierA: [
    { from: 1, to: 100, rate: 0.0, maxUnit: 500, label: '0 – 100 units' },
    { from: 101, to: 200, rate: 0.0, maxUnit: 500, label: '101 – 200 units' },
    { from: 201, to: 400, rate: 4.70, maxUnit: 500, label: '201 – 400 units' },
    { from: 401, to: 500, rate: 6.30, maxUnit: 500, label: '401 – 500 units' },
  ],
  // Section B: For total consumption > 500 units
  slabsTierB: [
    { from: 1, to: 100, rate: 0.0, maxUnit: Infinity, label: '0 – 100 units' },
    { from: 101, to: 400, rate: 4.70, maxUnit: Infinity, label: '101 – 400 units' },
    { from: 401, to: 500, rate: 6.30, maxUnit: Infinity, label: '401 – 500 units' },
    { from: 501, to: 600, rate: 8.40, maxUnit: Infinity, label: '501 – 600 units' },
    { from: 601, to: 800, rate: 9.45, maxUnit: Infinity, label: '601 – 800 units' },
    { from: 801, to: 1000, rate: 10.50, maxUnit: Infinity, label: '801 – 1000 units' },
    { from: 1001, to: Infinity, rate: 11.55, maxUnit: Infinity, label: '1001+ units' },
  ],
  defaultAdditionalCharges: {
    minimumCharge: 0,
    fixedCost: 0,
    bpscPercent: 0,
    weldingPercent: 0,
    eTaxPercent: 0,
  },
};

export const TNEB_COMMERCIAL_CATEGORY: TariffCategory = {
  id: 'commercial-lt3a',
  name: 'Commercial / Shop (LT Tariff V)',
  code: 'LT-V',
  description: 'General commercial, shop, and office electricity tariff.',
  isAutoTiered: false,
  slabs: [
    { from: 1, to: 100, rate: 6.00, label: '0 – 100 units' },
    { from: 101, to: 500, rate: 9.50, label: '101 – 500 units' },
    { from: 501, to: Infinity, rate: 11.00, label: '501+ units' },
  ],
  defaultAdditionalCharges: {
    minimumCharge: 70,
    fixedCost: 140,
    bpscPercent: 0,
    weldingPercent: 0,
    eTaxPercent: 5,
  },
};

export const TARIFF_CATEGORIES: Record<string, TariffCategory> = {
  [TNEB_DOMESTIC_CATEGORY.id]: TNEB_DOMESTIC_CATEGORY,
  [TNEB_COMMERCIAL_CATEGORY.id]: TNEB_COMMERCIAL_CATEGORY,
};
