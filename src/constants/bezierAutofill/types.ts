/**
 * Bezier Autofill - Type Definitions
 * 
 * Defines the structure for autofill character palettes used by the bezier shape tool.
 * Each palette maps 9-region overlap patterns to appropriate ASCII/Unicode characters.
 */

/**
 * 9-region cell division names
 * TL = Top-Left, TC = Top-Center, TR = Top-Right
 * ML = Middle-Left, MC = Middle-Center, MR = Middle-Right
 * BL = Bottom-Left, BC = Bottom-Center, BR = Bottom-Right
 */
export type RegionName = 'TL' | 'TC' | 'TR' | 'ML' | 'MC' | 'MR' | 'BL' | 'BC' | 'BR';

/**
 * A single pattern-to-character mapping
 * Describes which regions must be covered to use a specific character
 */
export interface RegionPattern {
  /** Set of regions that must be covered by the bezier shape */
  regions: Set<RegionName>;
  
  /** The character to use when this pattern matches */
  character: string;
  
  /** Priority when multiple patterns match (higher = prefer) */
  priority: number;
  
  /** Human-readable description for documentation */
  description?: string;
}

/**
 * A complete autofill palette
 * Contains all pattern mappings for a specific character set style
 */
export interface AutofillPalette {
  /** Unique identifier for this palette */
  id: string;
  
  /** Display name shown in UI */
  name: string;
  
  /** Description of the palette's style/purpose */
  description: string;
  
  /** All pattern-to-character mappings for this palette */
  patterns: RegionPattern[];
}
