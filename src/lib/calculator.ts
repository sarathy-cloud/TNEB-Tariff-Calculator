import { TariffCategory, TariffSlab, AdditionalCharges, TNEB_DOMESTIC_CATEGORY } from '../data/tariffs';

export interface SlabBreakdownItem {
  from: number;
  to: number;
  rate: number;
  unitsInSlab: number;
  charge: number;
  isActive: boolean;
  isApplicable: boolean;
  label?: string;
}

export interface BillCalculationResult {
  unitsConsumed: number;
  isValid: boolean;
  errorMessage?: string;
  category: TariffCategory;
  appliedTier: 'tierA' | 'tierB' | 'standard';
  slabBreakdown: SlabBreakdownItem[];
  energyCharge: number;
  fixedCharge: number;
  minimumCharge: number;
  bpsc: number;
  weldingCharge: number;
  tax: number;
  additionalCharges: AdditionalCharges;
  finalAmount: number;
}

/**
 * Rounds currency values safely to 2 decimal places to avoid floating point precision glitches.
 */
export function roundCurrency(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

/**
 * Pure calculation engine for slab-based progressive electricity tariff calculation.
 */
export function calculateBill(
  rawUnits: number,
  category: TariffCategory = TNEB_DOMESTIC_CATEGORY,
  customCharges?: Partial<AdditionalCharges>
): BillCalculationResult {
  // 1. Validate inputs
  const units = Number(rawUnits);
  
  if (isNaN(units) || !isFinite(units)) {
    return createEmptyResult(0, category, false, 'Please enter a valid number of units.', customCharges);
  }

  if (units < 0) {
    return createEmptyResult(units, category, false, 'Units cannot be negative.', customCharges);
  }

  // Combine additional charges
  const additionalCharges: AdditionalCharges = {
    ...category.defaultAdditionalCharges,
    ...customCharges,
  };

  // 2. Determine applicable slab set
  let slabs: TariffSlab[] = [];
  let appliedTier: 'tierA' | 'tierB' | 'standard' = 'standard';

  if (category.isAutoTiered) {
    const threshold = category.tierThreshold ?? 500;
    if (units <= threshold) {
      slabs = category.slabsTierA ?? [];
      appliedTier = 'tierA';
    } else {
      slabs = category.slabsTierB ?? [];
      appliedTier = 'tierB';
    }
  } else {
    slabs = category.slabs ?? [];
  }

  // 3. Perform slab-wise progressive billing calculation
  let energyCharge = 0;
  const slabBreakdown: SlabBreakdownItem[] = [];

  for (const slab of slabs) {
    const slabFrom = slab.from;
    const slabTo = slab.to;
    let unitsInSlab = 0;

    if (units >= slabFrom) {
      if (units >= slabTo) {
        unitsInSlab = slabTo - slabFrom + 1;
      } else {
        unitsInSlab = units - slabFrom + 1;
      }
    }

    unitsInSlab = Math.max(0, unitsInSlab);
    const charge = roundCurrency(unitsInSlab * slab.rate);
    energyCharge += charge;

    const isActive = unitsInSlab > 0;
    const isApplicable = units >= slabFrom;

    slabBreakdown.push({
      from: slabFrom,
      to: slabTo,
      rate: slab.rate,
      unitsInSlab: roundCurrency(unitsInSlab),
      charge,
      isActive,
      isApplicable,
      label: slab.label,
    });
  }

  energyCharge = roundCurrency(energyCharge);

  // 4. Calculate fixed & additional charges
  const fixedCharge = roundCurrency(additionalCharges.fixedCost);
  const minimumCharge = roundCurrency(additionalCharges.minimumCharge);
  
  // Base bill before percentage additions
  const baseBill = Math.max(energyCharge + fixedCharge, minimumCharge);

  const weldingCharge = roundCurrency(baseBill * (additionalCharges.weldingPercent / 100));
  const bpsc = roundCurrency(baseBill * (additionalCharges.bpscPercent / 100));

  const taxBase = baseBill + weldingCharge + bpsc;
  const tax = roundCurrency(taxBase * (additionalCharges.eTaxPercent / 100));

  const finalAmount = roundCurrency(baseBill + weldingCharge + bpsc + tax);

  return {
    unitsConsumed: units,
    isValid: true,
    category,
    appliedTier,
    slabBreakdown,
    energyCharge,
    fixedCharge,
    minimumCharge,
    bpsc,
    weldingCharge,
    tax,
    additionalCharges,
    finalAmount,
  };
}

function createEmptyResult(
  unitsConsumed: number,
  category: TariffCategory,
  isValid: boolean,
  errorMessage?: string,
  customCharges?: Partial<AdditionalCharges>
): BillCalculationResult {
  const additionalCharges: AdditionalCharges = {
    ...category.defaultAdditionalCharges,
    ...customCharges,
  };

  return {
    unitsConsumed,
    isValid,
    errorMessage,
    category,
    appliedTier: 'standard',
    slabBreakdown: [],
    energyCharge: 0,
    fixedCharge: 0,
    minimumCharge: 0,
    bpsc: 0,
    weldingCharge: 0,
    tax: 0,
    additionalCharges,
    finalAmount: 0,
  };
}
