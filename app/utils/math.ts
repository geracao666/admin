/**
 * Re-maps a number from one range to another.
 */
export const remapRange = (
  value: number,
  low1: number,
  high1: number,
  low2: number,
  high2: number
) => low2 + (high2 - low2) * (value - low1) / (high1 - low1)