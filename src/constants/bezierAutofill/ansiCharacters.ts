/**
 * Classic ANSI Characters Autofill Palette
 * 
 * Uses traditional ASCII characters (letters, numbers, punctuation) to represent
 * filled regions within bezier shapes. This palette is organized by density
 * and visual pattern similarity.
 * 
 * Character Selection Philosophy:
 * - High density: # @ & % W M
 * - Medium density: = + * X O
 * - Low density: . : - ' `
 * - Directional: | _ / \ 
 * - Corner/edge combinations
 */

import type { AutofillPalette } from './types';

export const ANSI_CHARACTERS_PALETTE: AutofillPalette = {
  id: 'ansi',
  name: 'Classic ANSI',
  description: 'Traditional ASCII art characters using letters, numbers, and symbols',
  patterns: [
    // ========== FULL COVERAGE (all 9 regions filled) ==========
    {
      regions: new Set(['TL', 'TC', 'TR', 'ML', 'MC', 'MR', 'BL', 'BC', 'BR']),
      character: '#',
      description: 'All regions filled - use dense character',
    },

    // ========== HORIZONTAL FILLS ==========
    {
      regions: new Set(['TL', 'TC', 'TR']),
      character: '_',
      description: 'Top row only',
    },
    {
      regions: new Set(['ML', 'MC', 'MR']),
      character: '=',
      description: 'Middle row only',
    },
    {
      regions: new Set(['BL', 'BC', 'BR']),
      character: '-',
      description: 'Bottom row only',
    },

    // ========== VERTICAL FILLS ==========
    {
      regions: new Set(['TL', 'ML', 'BL']),
      character: '|',
      description: 'Left column only',
    },
    {
      regions: new Set(['TC', 'MC', 'BC']),
      character: '|',
      description: 'Center column only',
    },
    {
      regions: new Set(['TR', 'MR', 'BR']),
      character: '|',
      description: 'Right column only',
    },

    // ========== DIAGONAL PATTERNS ==========
    {
      regions: new Set(['TL', 'MC', 'BR']),
      character: '\\',
      description: 'Diagonal top-left to bottom-right',
    },
    {
      regions: new Set(['TR', 'MC', 'BL']),
      character: '/',
      description: 'Diagonal top-right to bottom-left',
    },

    // ========== LARGE REGIONS (7-8 filled) ==========
    {
      regions: new Set(['TL', 'TC', 'TR', 'ML', 'MC', 'MR', 'BL', 'BC']),
      character: '@',
      description: 'Nearly full - missing bottom-right',
    },
    {
      regions: new Set(['TC', 'TR', 'ML', 'MC', 'MR', 'BL', 'BC', 'BR']),
      character: '@',
      description: 'Nearly full - missing top-left',
    },
    {
      regions: new Set(['TL', 'TC', 'TR', 'ML', 'MC', 'MR', 'BC', 'BR']),
      character: '@',
      description: 'Nearly full - missing bottom-left',
    },
    {
      regions: new Set(['TL', 'TC', 'ML', 'MC', 'MR', 'BL', 'BC', 'BR']),
      character: '@',
      description: 'Nearly full - missing top-right',
    },

    // ========== QUADRANTS ==========
    {
      regions: new Set(['TL', 'TC', 'ML', 'MC']),
      character: '%',
      description: 'Top-left quadrant',
    },
    {
      regions: new Set(['TC', 'TR', 'MC', 'MR']),
      character: '%',
      description: 'Top-right quadrant',
    },
    {
      regions: new Set(['ML', 'MC', 'BL', 'BC']),
      character: '%',
      description: 'Bottom-left quadrant',
    },
    {
      regions: new Set(['MC', 'MR', 'BC', 'BR']),
      character: '%',
      description: 'Bottom-right quadrant',
    },

    // ========== HALF FILLS ==========
    {
      regions: new Set(['TL', 'TC', 'TR', 'ML', 'MC', 'MR']),
      character: '=',
      description: 'Top half',
    },
    {
      regions: new Set(['ML', 'MC', 'MR', 'BL', 'BC', 'BR']),
      character: '=',
      description: 'Bottom half',
    },
    {
      regions: new Set(['TL', 'ML', 'BL']),
      character: '|',
      description: 'Left half',
    },
    {
      regions: new Set(['TR', 'MR', 'BR']),
      character: '|',
      description: 'Right half',
    },

    // ========== CORNER FILLS ==========
    {
      regions: new Set(['TL']),
      character: '`',
      description: 'Top-left corner only',
    },
    {
      regions: new Set(['TR']),
      character: '\'',
      description: 'Top-right corner only',
    },
    {
      regions: new Set(['BL']),
      character: ',',
      description: 'Bottom-left corner only',
    },
    {
      regions: new Set(['BR']),
      character: '.',
      description: 'Bottom-right corner only',
    },

    // ========== L-SHAPES ==========
    {
      regions: new Set(['TL', 'TC', 'ML', 'BL']),
      character: '&',
      description: 'L-shape: top-left',
    },
    {
      regions: new Set(['TC', 'TR', 'MR', 'BR']),
      character: '&',
      description: 'L-shape: top-right',
    },
    {
      regions: new Set(['TL', 'ML', 'BL', 'BC']),
      character: '&',
      description: 'L-shape: bottom-left',
    },
    {
      regions: new Set(['TR', 'MR', 'BC', 'BR']),
      character: '&',
      description: 'L-shape: bottom-right',
    },

    // ========== CENTER + CROSS PATTERNS ==========
    {
      regions: new Set(['TC', 'ML', 'MC', 'MR', 'BC']),
      character: '+',
      description: 'Center cross',
    },
    {
      regions: new Set(['MC']),
      character: '·',
      description: 'Center dot only',
    },
    {
      regions: new Set(['TL', 'TR', 'MC', 'BL', 'BR']),
      character: 'X',
      description: 'X pattern (diagonal cross)',
    },

    // ========== EDGE COMBINATIONS ==========
    {
      regions: new Set(['TL', 'TC', 'TR', 'BL', 'BC', 'BR']),
      character: 'H',
      description: 'Top and bottom edges',
    },
    {
      regions: new Set(['TL', 'ML', 'BL']),
      character: 'I',
      description: 'Left edge only',
    },
    {
      regions: new Set(['TR', 'MR', 'BR']),
      character: 'I',
      description: 'Right edge only',
    },

    // ========== T-SHAPES ==========
    {
      regions: new Set(['TL', 'TC', 'TR', 'MC']),
      character: 'T',
      description: 'T-shape pointing down',
    },
    {
      regions: new Set(['MC', 'BL', 'BC', 'BR']),
      character: 'T',
      description: 'T-shape pointing up (inverted)',
    },
    {
      regions: new Set(['TL', 'ML', 'MC', 'MR', 'BL']),
      character: 'T',
      description: 'T-shape pointing right',
    },
    {
      regions: new Set(['TR', 'ML', 'MC', 'MR', 'BR']),
      character: 'T',
      description: 'T-shape pointing left',
    },

    // ========== MEDIUM DENSITY PATTERNS ==========
    {
      regions: new Set(['TL', 'TC', 'ML', 'MC', 'MR', 'BC', 'BR']),
      character: '*',
      description: 'Medium density - diagonal band',
    },
    {
      regions: new Set(['TC', 'TR', 'ML', 'MC', 'MR', 'BL', 'BC']),
      character: '*',
      description: 'Medium density - opposite diagonal',
    },
    {
      regions: new Set(['TL', 'TR', 'BL', 'BR']),
      character: 'O',
      description: 'Four corners only',
    },

    // ========== SPARSE PATTERNS ==========
    {
      regions: new Set(['TL', 'BR']),
      character: ':',
      description: 'Opposite corners: TL and BR',
    },
    {
      regions: new Set(['TR', 'BL']),
      character: ':',
      description: 'Opposite corners: TR and BL',
    },
    {
      regions: new Set(['TC', 'BC']),
      character: ':',
      description: 'Top and bottom center',
    },
    {
      regions: new Set(['ML', 'MR']),
      character: '-',
      description: 'Left and right center',
    },

    // ========== MINIMAL PATTERNS ==========
    {
      regions: new Set(['TC']),
      character: '^',
      description: 'Top center only',
    },
    {
      regions: new Set(['BC']),
      character: '_',
      description: 'Bottom center only',
    },
    {
      regions: new Set(['ML']),
      character: '<',
      description: 'Middle-left only',
    },
    {
      regions: new Set(['MR']),
      character: '>',
      description: 'Middle-right only',
    },

    // ========== FALLBACK (empty cell) ==========
    {
      regions: new Set([]),
      character: ' ',
      description: 'Empty cell - no fill',
    },
  ],
};
