/**
 * Formats a numeric amount in Indian Rupees (INR).
 * Examples: ₹0.00, ₹705.00, ₹1,250.50, ₹12,450.00
 */
export function formatCurrency(amount: number, showDecimals: boolean = true): string {
  if (isNaN(amount) || !isFinite(amount)) {
    return '₹0.00';
  }

  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: 2,
  });

  return formatter.format(amount);
}

/**
 * Formats a plain number with Indian number grouping (e.g. 1,200).
 */
export function formatNumber(num: number): string {
  if (isNaN(num) || !isFinite(num)) {
    return '0';
  }

  return new Intl.NumberFormat('en-IN').format(num);
}
