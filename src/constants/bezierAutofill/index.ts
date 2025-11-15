/**
 * Bezier Autofill - Palette Registry
 * 
 * Central registry for all available autofill palettes. Provides lookup,
 * pattern matching, and character selection utilities.
 */

import { BLOCK_CHARACTERS_PALETTE } from './blockCharacters';
import { ANSI_CHARACTERS_PALETTE } from './ansiCharacters';
import type { AutofillPalette, RegionName, RegionPattern } from './types';

/**
 * Available autofill palettes
 * Add new palettes here as they are created
 */
export const AUTOFILL_PALETTES: AutofillPalette[] = [
  BLOCK_CHARACTERS_PALETTE,
  ANSI_CHARACTERS_PALETTE,
];

/**
 * Default palette ID to use when none is specified
 */
export const DEFAULT_PALETTE_ID = 'block';

/**
 * Get a palette by its unique ID
 * 
 * @param id - The palette ID to look up
 * @returns The matching palette, or undefined if not found
 */
export function getPaletteById(id: string): AutofillPalette | undefined {
  return AUTOFILL_PALETTES.find((palette) => palette.id === id);
}

/**
 * Get all available palette IDs
 * Useful for populating UI dropdowns/selectors
 * 
 * @returns Array of palette IDs
 */
export function getAvailablePaletteIds(): string[] {
  return AUTOFILL_PALETTES.map((palette) => palette.id);
}

/**
 * Get display information for all palettes
 * Useful for UI rendering
 * 
 * @returns Array of objects with id, name, and description
 */
export function getPaletteDisplayInfo(): Array<{ id: string; name: string; description: string }> {
  return AUTOFILL_PALETTES.map((palette) => ({
    id: palette.id,
    name: palette.name,
    description: palette.description,
  }));
}

/**
 * Build a pattern matching map from a palette's patterns
 * Organizes patterns by priority for efficient matching
 * 
 * @param palette - The palette to build a map from
 * @returns Sorted array of patterns (highest priority first)
 */
export function buildPatternMap(palette: AutofillPalette): RegionPattern[] {
  // Sort patterns by priority (descending) for best-match-first strategy
  return [...palette.patterns].sort((a, b) => b.priority - a.priority);
}

/**
 * Check if a region pattern matches a set of filled regions
 * 
 * @param pattern - The pattern to check
 * @param filledRegions - Set of regions that are filled by the shape
 * @returns True if the pattern matches exactly
 */
export function doesPatternMatch(pattern: RegionPattern, filledRegions: Set<RegionName>): boolean {
  // Pattern matches if both sets contain exactly the same regions
  if (pattern.regions.size !== filledRegions.size) {
    return false;
  }
  
  for (const region of pattern.regions) {
    if (!filledRegions.has(region)) {
      return false;
    }
  }
  
  return true;
}

/**
 * Get the best matching character for a given set of filled regions
 * 
 * @param paletteId - The ID of the palette to use
 * @param filledRegions - Set of regions filled by the shape
 * @returns The character to use, or ' ' if no match found
 */
export function getCharacterForPattern(
  paletteId: string,
  filledRegions: Set<RegionName>
): string {
  const palette = getPaletteById(paletteId);
  
  if (!palette) {
    console.warn(`[bezierAutofill] Palette '${paletteId}' not found, using space`);
    return ' ';
  }
  
  const sortedPatterns = buildPatternMap(palette);
  
  // Find first matching pattern (already sorted by priority)
  for (const pattern of sortedPatterns) {
    if (doesPatternMatch(pattern, filledRegions)) {
      return pattern.character;
    }
  }
  
  // Fallback to space if no pattern matches
  console.warn(
    `[bezierAutofill] No pattern match found for regions: ${Array.from(filledRegions).join(', ')}`
  );
  return ' ';
}

/**
 * Re-export types for convenience
 */
export type { AutofillPalette, RegionName, RegionPattern } from './types';
