/**
 * Multiplies each number in an array by 1, 2, and 3, returning a flattened array
 * @param numbers Array of base numbers
 * @returns Array with original numbers plus 2x and 3x versions
 * 
 * @example
 * multiplyDimensions([100, 200]) // returns [100, 200, 300, 200, 400, 600]
 */
export function multiplyDimensions(numbers: number[]): number[] {
  return numbers.flatMap(num => [num, num * 2, num * 3]);
}

/**
 * For demo purposes, we may want to read the dynamic content
 * from the public folder instead of the data folder
 */
export function isDemoMode(): boolean {
    const searchParams = new URLSearchParams(window.location.search);
    const value = searchParams.get('demo');
    return value === 'true' || value === '1';
}
