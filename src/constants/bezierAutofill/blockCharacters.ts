/**
 * Block Characters Autofill Palette
 * 
 * Uses Unicode block drawing characters for precise shape representation.
 * Best for: Technical diagrams, geometric shapes, pixel-art style
 * 
 * Character Reference:
 * █ Full block
 * ▀ Upper half block
 * ▄ Lower half block
 * ▌ Left half block  
 * ▐ Right half block
 * ▖ Lower left quadrant
 * ▗ Lower right quadrant
 * ▘ Upper left quadrant
 * ▝ Upper right quadrant
 * ▛ Upper left to lower right filled
 * ▜ Upper right to lower left filled
 * ▙ Lower left to upper right filled
 * ▟ Lower right to upper left filled
 * ▁ Lower one eighth block
 * ▔ Upper one eighth block
 * │ Vertical line
 * ─ Horizontal line
 * / Forward slash
 * \ Backslash
 * · Middle dot
 */

import type { AutofillPalette } from './types';

export const BLOCK_CHARACTERS_PALETTE: AutofillPalette = {
  id: 'block',
  name: 'Block Characters',
  description: 'Unicode block elements for precise geometric fills',
  patterns: [
    // ========================================
    // FULL COVERAGE (all 9 regions)
    // ========================================
    {
      regions: new Set(['TL', 'TC', 'TR', 'ML', 'MC', 'MR', 'BL', 'BC', 'BR']),
      character: '█',
      priority: 100,
      description: 'Full block - all regions covered'
    },
    
    // ========================================
    // HORIZONTAL FILLS (3 regions wide)
    // ========================================
    {
      regions: new Set(['BL', 'BC', 'BR']),
      character: '▁',
      priority: 90,
      description: 'Bottom third - lower one eighth block'
    },
    {
      regions: new Set(['TL', 'TC', 'TR']),
      character: '▔',
      priority: 90,
      description: 'Top third - upper one eighth block'
    },
    {
      regions: new Set(['ML', 'MC', 'MR', 'BL', 'BC', 'BR']),
      character: '▄',
      priority: 85,
      description: 'Bottom two-thirds - lower half block'
    },
    {
      regions: new Set(['TL', 'TC', 'TR', 'ML', 'MC', 'MR']),
      character: '▀',
      priority: 85,
      description: 'Top two-thirds - upper half block'
    },
    {
      regions: new Set(['ML', 'MC', 'MR']),
      character: '─',
      priority: 85,
      description: 'Middle row - horizontal line'
    },
    
    // ========================================
    // VERTICAL FILLS (3 regions tall)
    // ========================================
    {
      regions: new Set(['TL', 'ML', 'BL']),
      character: '▌',
      priority: 90,
      description: 'Left third - left half block'
    },
    {
      regions: new Set(['TR', 'MR', 'BR']),
      character: '▐',
      priority: 90,
      description: 'Right third - right half block'
    },
    {
      regions: new Set(['TC', 'MC', 'BC']),
      character: '│',
      priority: 85,
      description: 'Center column - vertical line'
    },
    
    // ========================================
    // QUARTER BLOCKS (CORNERS - single region)
    // ========================================
    {
      regions: new Set(['BL']),
      character: '▖',
      priority: 80,
      description: 'Bottom-left corner only'
    },
    {
      regions: new Set(['BR']),
      character: '▗',
      priority: 80,
      description: 'Bottom-right corner only'
    },
    {
      regions: new Set(['TL']),
      character: '▘',
      priority: 80,
      description: 'Top-left corner only'
    },
    {
      regions: new Set(['TR']),
      character: '▝',
      priority: 80,
      description: 'Top-right corner only'
    },
    
    // ========================================
    // QUADRANT BLOCKS (4 regions)
    // ========================================
    {
      regions: new Set(['TL', 'TC', 'ML', 'MC']),
      character: '▛',
      priority: 82,
      description: 'Top-left quadrant - 4 regions'
    },
    {
      regions: new Set(['TC', 'TR', 'MC', 'MR']),
      character: '▜',
      priority: 82,
      description: 'Top-right quadrant - 4 regions'
    },
    {
      regions: new Set(['ML', 'MC', 'BL', 'BC']),
      character: '▙',
      priority: 82,
      description: 'Bottom-left quadrant - 4 regions'
    },
    {
      regions: new Set(['MC', 'MR', 'BC', 'BR']),
      character: '▟',
      priority: 82,
      description: 'Bottom-right quadrant - 4 regions'
    },
    
    // ========================================
    // DIAGONAL PATTERNS
    // ========================================
    {
      regions: new Set(['TL', 'MC', 'BR']),
      character: '\\',
      priority: 78,
      description: 'Diagonal backslash - 3 regions'
    },
    {
      regions: new Set(['TR', 'MC', 'BL']),
      character: '/',
      priority: 78,
      description: 'Diagonal forward slash - 3 regions'
    },
    {
      regions: new Set(['TL', 'ML', 'MC', 'MR', 'BR']),
      character: '/',
      priority: 75,
      description: 'Wide diagonal forward - 5 regions'
    },
    {
      regions: new Set(['TR', 'ML', 'MC', 'MR', 'BL']),
      character: '\\',
      priority: 75,
      description: 'Wide diagonal back - 5 regions'
    },
    
    // ========================================
    // CENTER DOT (single center region)
    // ========================================
    {
      regions: new Set(['MC']),
      character: '·',
      priority: 70,
      description: 'Center only - middle dot'
    },
    
    // ========================================
    // TWO-REGION PATTERNS (corners/edges)
    // ========================================
    {
      regions: new Set(['TL', 'TC']),
      character: '▔',
      priority: 68,
      description: 'Top-left duo'
    },
    {
      regions: new Set(['TC', 'TR']),
      character: '▔',
      priority: 68,
      description: 'Top-right duo'
    },
    {
      regions: new Set(['BL', 'BC']),
      character: '▁',
      priority: 68,
      description: 'Bottom-left duo'
    },
    {
      regions: new Set(['BC', 'BR']),
      character: '▁',
      priority: 68,
      description: 'Bottom-right duo'
    },
    {
      regions: new Set(['TL', 'ML']),
      character: '▌',
      priority: 68,
      description: 'Left-top duo'
    },
    {
      regions: new Set(['ML', 'BL']),
      character: '▌',
      priority: 68,
      description: 'Left-bottom duo'
    },
    {
      regions: new Set(['TR', 'MR']),
      character: '▐',
      priority: 68,
      description: 'Right-top duo'
    },
    {
      regions: new Set(['MR', 'BR']),
      character: '▐',
      priority: 68,
      description: 'Right-bottom duo'
    },
    
    // ========================================
    // THREE-REGION PATTERNS (L-shapes, T-shapes)
    // ========================================
    {
      regions: new Set(['TL', 'ML', 'BL', 'BC']),
      character: '▙',
      priority: 76,
      description: 'L-shape bottom-left - 4 regions'
    },
    {
      regions: new Set(['TR', 'MR', 'BR', 'BC']),
      character: '▟',
      priority: 76,
      description: 'L-shape bottom-right - 4 regions'
    },
    {
      regions: new Set(['TL', 'ML', 'BL', 'TC']),
      character: '▛',
      priority: 76,
      description: 'L-shape top-left - 4 regions'
    },
    {
      regions: new Set(['TR', 'MR', 'BR', 'TC']),
      character: '▜',
      priority: 76,
      description: 'L-shape top-right - 4 regions'
    },
    
    // ========================================
    // FIVE-REGION PATTERNS (cross shapes)
    // ========================================
    {
      regions: new Set(['TC', 'ML', 'MC', 'MR', 'BC']),
      character: '│',
      priority: 73,
      description: 'Cross vertical emphasis - 5 regions'
    },
    {
      regions: new Set(['TL', 'TC', 'TR', 'MC', 'BC']),
      character: '│',
      priority: 72,
      description: 'Vertical heavy top - 5 regions'
    },
    {
      regions: new Set(['TC', 'ML', 'MC', 'MR', 'BC', 'BL', 'BR']),
      character: '│',
      priority: 71,
      description: 'Vertical with wide bottom - 7 regions'
    },
    
    // ========================================
    // FALLBACK (no coverage)
    // ========================================
    {
      regions: new Set([]),
      character: ' ',
      priority: 0,
      description: 'Empty - no coverage'
    }
  ]
};
