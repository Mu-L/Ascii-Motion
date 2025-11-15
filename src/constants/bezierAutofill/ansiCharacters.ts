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
      priority: 100,
      description: 'All regions filled - use dense character',
    },

    // ========== HORIZONTAL FILLS ==========
    {
      regions: new Set(['TL', 'TC', 'TR']),
      character: '_',
      priority: 90,
      description: 'Top row only',
    },
    {
      regions: new Set(['ML', 'MC', 'MR']),
      character: '=',
      priority: 90,
      description: 'Middle row only',
    },
    {
      regions: new Set(['BL', 'BC', 'BR']),
      character: '-',
      priority: 90,
      description: 'Bottom row only',
    },

    // ========== VERTICAL FILLS ==========
    {
      regions: new Set(['TL', 'ML', 'BL']),
      character: '|',
      priority: 90,
      description: 'Left column only',
    },
    {
      regions: new Set(['TC', 'MC', 'BC']),
      character: '|',
      priority: 90,
      description: 'Center column only',
    },
    {
      regions: new Set(['TR', 'MR', 'BR']),
      character: '|',
      priority: 90,
      description: 'Right column only',
    },

    // ========== DIAGONAL PATTERNS ==========
    {
      regions: new Set(['TL', 'MC', 'BR']),
      character: '\\',
      priority: 85,
      description: 'Diagonal top-left to bottom-right',
    },
    {
      regions: new Set(['TR', 'MC', 'BL']),
      character: '/',
      priority: 85,
      description: 'Diagonal top-right to bottom-left',
    },

    // ========== LARGE REGIONS (7-8 filled) ==========
    {
      regions: new Set(['TL', 'TC', 'TR', 'ML', 'MC', 'MR', 'BL', 'BC']),
      character: '@',
      priority: 95,
      description: 'Nearly full - missing bottom-right',
    },
    {
      regions: new Set(['TC', 'TR', 'ML', 'MC', 'MR', 'BL', 'BC', 'BR']),
      character: '@',
      priority: 95,
      description: 'Nearly full - missing top-left',
    },
    {
      regions: new Set(['TL', 'TC', 'TR', 'ML', 'MC', 'MR', 'BC', 'BR']),
      character: '@',
      priority: 95,
      description: 'Nearly full - missing bottom-left',
    },
    {
      regions: new Set(['TL', 'TC', 'ML', 'MC', 'MR', 'BL', 'BC', 'BR']),
      character: '@',
      priority: 95,
      description: 'Nearly full - missing top-right',
    },

    // ========== QUADRANTS ==========
    {
      regions: new Set(['TL', 'TC', 'ML', 'MC']),
      character: '%',
      priority: 80,
      description: 'Top-left quadrant',
    },
    {
      regions: new Set(['TC', 'TR', 'MC', 'MR']),
      character: '%',
      priority: 80,
      description: 'Top-right quadrant',
    },
    {
      regions: new Set(['ML', 'MC', 'BL', 'BC']),
      character: '%',
      priority: 80,
      description: 'Bottom-left quadrant',
    },
    {
      regions: new Set(['MC', 'MR', 'BC', 'BR']),
      character: '%',
      priority: 80,
      description: 'Bottom-right quadrant',
    },

    // ========== HALF FILLS ==========
    {
      regions: new Set(['TL', 'TC', 'TR', 'ML', 'MC', 'MR']),
      character: '=',
      priority: 85,
      description: 'Top half',
    },
    {
      regions: new Set(['ML', 'MC', 'MR', 'BL', 'BC', 'BR']),
      character: '=',
      priority: 85,
      description: 'Bottom half',
    },
    {
      regions: new Set(['TL', 'ML', 'BL']),
      character: '|',
      priority: 85,
      description: 'Left half',
    },
    {
      regions: new Set(['TR', 'MR', 'BR']),
      character: '|',
      priority: 85,
      description: 'Right half',
    },

    // ========== CORNER FILLS ==========
    {
      regions: new Set(['TL']),
      character: '`',
      priority: 75,
      description: 'Top-left corner only',
    },
    {
      regions: new Set(['TR']),
      character: '\'',
      priority: 75,
      description: 'Top-right corner only',
    },
    {
      regions: new Set(['BL']),
      character: ',',
      priority: 75,
      description: 'Bottom-left corner only',
    },
    {
      regions: new Set(['BR']),
      character: '.',
      priority: 75,
      description: 'Bottom-right corner only',
    },

    // ========== L-SHAPES ==========
    {
      regions: new Set(['TL', 'TC', 'ML', 'BL']),
      character: '&',
      priority: 70,
      description: 'L-shape: top-left',
    },
    {
      regions: new Set(['TC', 'TR', 'MR', 'BR']),
      character: '&',
      priority: 70,
      description: 'L-shape: top-right',
    },
    {
      regions: new Set(['TL', 'ML', 'BL', 'BC']),
      character: '&',
      priority: 70,
      description: 'L-shape: bottom-left',
    },
    {
      regions: new Set(['TR', 'MR', 'BC', 'BR']),
      character: '&',
      priority: 70,
      description: 'L-shape: bottom-right',
    },

    // ========== CENTER + CROSS PATTERNS ==========
    {
      regions: new Set(['TC', 'ML', 'MC', 'MR', 'BC']),
      character: '+',
      priority: 80,
      description: 'Center cross',
    },
    {
      regions: new Set(['MC']),
      character: '·',
      priority: 65,
      description: 'Center dot only',
    },
    {
      regions: new Set(['TL', 'TR', 'MC', 'BL', 'BR']),
      character: 'X',
      priority: 75,
      description: 'X pattern (diagonal cross)',
    },

    // ========== EDGE COMBINATIONS ==========
    {
      regions: new Set(['TL', 'TC', 'TR', 'BL', 'BC', 'BR']),
      character: 'H',
      priority: 70,
      description: 'Top and bottom edges',
    },
    {
      regions: new Set(['TL', 'ML', 'BL']),
      character: 'I',
      priority: 70,
      description: 'Left edge only',
    },
    {
      regions: new Set(['TR', 'MR', 'BR']),
      character: 'I',
      priority: 70,
      description: 'Right edge only',
    },

    // ========== T-SHAPES ==========
    {
      regions: new Set(['TL', 'TC', 'TR', 'MC']),
      character: 'T',
      priority: 75,
      description: 'T-shape pointing down',
    },
    {
      regions: new Set(['MC', 'BL', 'BC', 'BR']),
      character: 'T',
      priority: 75,
      description: 'T-shape pointing up (inverted)',
    },
    {
      regions: new Set(['TL', 'ML', 'MC', 'MR', 'BL']),
      character: 'T',
      priority: 75,
      description: 'T-shape pointing right',
    },
    {
      regions: new Set(['TR', 'ML', 'MC', 'MR', 'BR']),
      character: 'T',
      priority: 75,
      description: 'T-shape pointing left',
    },

    // ========== MEDIUM DENSITY PATTERNS ==========
    {
      regions: new Set(['TL', 'TC', 'ML', 'MC', 'MR', 'BC', 'BR']),
      character: '*',
      priority: 65,
      description: 'Medium density - diagonal band',
    },
    {
      regions: new Set(['TC', 'TR', 'ML', 'MC', 'MR', 'BL', 'BC']),
      character: '*',
      priority: 65,
      description: 'Medium density - opposite diagonal',
    },
    {
      regions: new Set(['TL', 'TR', 'BL', 'BR']),
      character: 'O',
      priority: 60,
      description: 'Four corners only',
    },

    // ========== SPARSE PATTERNS ==========
    {
      regions: new Set(['TL', 'BR']),
      character: ':',
      priority: 55,
      description: 'Opposite corners: TL and BR',
    },
    {
      regions: new Set(['TR', 'BL']),
      character: ':',
      priority: 55,
      description: 'Opposite corners: TR and BL',
    },
    {
      regions: new Set(['TC', 'BC']),
      character: ':',
      priority: 60,
      description: 'Top and bottom center',
    },
    {
      regions: new Set(['ML', 'MR']),
      character: '-',
      priority: 60,
      description: 'Left and right center',
    },

    // ========== MINIMAL PATTERNS ==========
    {
      regions: new Set(['TC']),
      character: '^',
      priority: 50,
      description: 'Top center only',
    },
    {
      regions: new Set(['BC']),
      character: '_',
      priority: 50,
      description: 'Bottom center only',
    },
    {
      regions: new Set(['ML']),
      character: '<',
      priority: 50,
      description: 'Middle-left only',
    },
    {
      regions: new Set(['MR']),
      character: '>',
      priority: 50,
      description: 'Middle-right only',
    },

    // ========== FALLBACK (empty cell) ==========
    {
      regions: new Set([]),
      character: ' ',
      priority: 0,
      description: 'Empty cell - no fill',
    },
  ],
};
