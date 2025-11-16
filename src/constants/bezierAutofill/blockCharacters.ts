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
      description: 'Full block - all regions covered'
    },
    
    // ========================================
    // HORIZONTAL FILLS (3 regions wide)
    // ========================================
    {
      regions: new Set(['BL', 'BC', 'BR']),
      character: '▄',
      description: 'Bottom row only - lower half block'
    },
    {
      regions: new Set(['TL', 'TC', 'TR']),
      character: '▀',
      description: 'Top row only - upper half block'
    },
    {
      regions: new Set(['ML', 'MC', 'MR', 'BL', 'BC', 'BR']),
      character: '▄',
      description: 'Bottom two rows - lower half block'
    },
    {
      regions: new Set(['TL', 'TC', 'TR', 'ML', 'MC', 'MR']),
      character: '▀',
      description: 'Top two rows - upper half block'
    },
    {
      regions: new Set(['ML', 'MC', 'MR']),
      character: '─',
      description: 'Middle row only - horizontal line'
    },
    
    // ========================================
    // VERTICAL FILLS (3 regions tall)
    // ========================================
    {
      regions: new Set(['TL', 'ML', 'BL']),
      character: '▌',
      description: 'Left column only - left half block'
    },
    {
      regions: new Set(['TR', 'MR', 'BR']),
      character: '▐',
      description: 'Right column only - right half block'
    },
    {
      regions: new Set(['TC', 'MC', 'BC']),
      character: '│',
      description: 'Center column only - vertical line'
    },
    {
      regions: new Set(['TL', 'TC', 'ML', 'MC', 'BL', 'BC']),
      character: '▌',
      description: 'Left two columns - left half block'
    },
    {
      regions: new Set(['TC', 'TR', 'MC', 'MR', 'BC', 'BR']),
      character: '▐',
      description: 'Right two columns - right half block'
    },
    
    // ========================================
    // QUARTER BLOCKS (2x2 regions)
    // ========================================
    {
      regions: new Set(['BL', 'BC', 'ML', 'MC']),
      character: '▖',
      description: 'Bottom-left quadrant'
    },
    {
      regions: new Set(['BR', 'BC', 'MR', 'MC']),
      character: '▗',
      description: 'Bottom-right quadrant'
    },
    {
      regions: new Set(['TL', 'TC', 'ML', 'MC']),
      character: '▘',
      description: 'Top-left quadrant'
    },
    {
      regions: new Set(['TR', 'TC', 'MR', 'MC']),
      character: '▝',
      description: 'Top-right quadrant'
    },
    
    // ========================================
    // THREE-QUADRANT BLOCKS (6 regions)
    // ========================================
    {
      regions: new Set(['TL', 'TC', 'ML', 'MC', 'BL', 'BC']),
      character: '▛',
      description: 'Top-left and bottom-left quadrants'
    },
    {
      regions: new Set(['TC', 'TR', 'MC', 'MR', 'BC', 'BR']),
      character: '▜',
      description: 'Top-right and bottom-right quadrants'
    },
    {
      regions: new Set(['TL', 'TC', 'ML', 'MC', 'MC', 'MR', 'TC', 'TR']),
      character: '▛',
      description: 'Top-left and top-right quadrants'
    },
    {
      regions: new Set(['ML', 'MC', 'BL', 'BC', 'MC', 'MR', 'BC', 'BR']),
      character: '▙',
      description: 'Bottom-left and bottom-right quadrants'
    },
    
    // ========================================
    // DIAGONAL EDGE PATTERNS (smooth corners)
    // ========================================
    {
      regions: new Set(['TL', 'MC', 'BR']),
      character: '\\',
      description: 'Diagonal backslash - 3 regions'
    },
    {
      regions: new Set(['TR', 'MC', 'BL']),
      character: '/',
      description: 'Diagonal forward slash - 3 regions'
    },
    {
      regions: new Set(['TL', 'TC', 'ML']),
      character: '▛',
      description: 'Top-left corner - 3 regions'
    },
    {
      regions: new Set(['TC', 'TR', 'MR']),
      character: '▜',
      description: 'Top-right corner - 3 regions'
    },
    {
      regions: new Set(['ML', 'BL', 'BC']),
      character: '▙',
      description: 'Bottom-left corner - 3 regions'
    },
    {
      regions: new Set(['MR', 'BC', 'BR']),
      character: '▟',
      description: 'Bottom-right corner - 3 regions'
    },
    
    // ========================================
    // EDGE SMOOTHING (2 regions)
    // ========================================
    {
      regions: new Set(['TL', 'TC']),
      character: '▀',
      description: 'Top-left edge'
    },
    {
      regions: new Set(['TC', 'TR']),
      character: '▀',
      description: 'Top-right edge'
    },
    {
      regions: new Set(['BL', 'BC']),
      character: '▄',
      description: 'Bottom-left edge'
    },
    {
      regions: new Set(['BC', 'BR']),
      character: '▄',
      description: 'Bottom-right edge'
    },
    {
      regions: new Set(['TL', 'ML']),
      character: '▌',
      description: 'Left-top edge'
    },
    {
      regions: new Set(['ML', 'BL']),
      character: '▌',
      description: 'Left-bottom edge'
    },
    {
      regions: new Set(['TR', 'MR']),
      character: '▐',
      description: 'Right-top edge'
    },
    {
      regions: new Set(['MR', 'BR']),
      character: '▐',
      description: 'Right-bottom edge'
    },
    {
      regions: new Set(['TL', 'MC']),
      character: '▘',
      description: 'Top-left diagonal edge'
    },
    {
      regions: new Set(['TR', 'MC']),
      character: '▝',
      description: 'Top-right diagonal edge'
    },
    {
      regions: new Set(['BL', 'MC']),
      character: '▖',
      description: 'Bottom-left diagonal edge'
    },
    {
      regions: new Set(['BR', 'MC']),
      character: '▗',
      description: 'Bottom-right diagonal edge'
    },
    {
      regions: new Set(['TC', 'MC']),
      character: '▀',
      description: 'Top-center edge'
    },
    {
      regions: new Set(['BC', 'MC']),
      character: '▄',
      description: 'Bottom-center edge'
    },
    {
      regions: new Set(['ML', 'MC']),
      character: '▌',
      description: 'Left-center edge'
    },
    {
      regions: new Set(['MR', 'MC']),
      character: '▐',
      description: 'Right-center edge'
    },
    
    // ========================================
    // FIVE-REGION EDGE PATTERNS
    // ========================================
    {
      regions: new Set(['TL', 'TC', 'TR', 'ML', 'MC']),
      character: '▛',
      description: 'Top edge with left center'
    },
    {
      regions: new Set(['TL', 'TC', 'TR', 'MC', 'MR']),
      character: '▜',
      description: 'Top edge with right center'
    },
    {
      regions: new Set(['ML', 'MC', 'BL', 'BC', 'BR']),
      character: '▙',
      description: 'Bottom edge with left center'
    },
    {
      regions: new Set(['MC', 'MR', 'BL', 'BC', 'BR']),
      character: '▟',
      description: 'Bottom edge with right center'
    },
    {
      regions: new Set(['TL', 'ML', 'BL', 'BC', 'MC']),
      character: '▙',
      description: 'Left edge with bottom center'
    },
    {
      regions: new Set(['TL', 'TC', 'ML', 'MC', 'BL']),
      character: '▛',
      description: 'Left edge with top center'
    },
    {
      regions: new Set(['TR', 'MR', 'BR', 'BC', 'MC']),
      character: '▟',
      description: 'Right edge with bottom center'
    },
    {
      regions: new Set(['TR', 'TC', 'MR', 'MC', 'BR']),
      character: '▜',
      description: 'Right edge with top center'
    },
    
    // ========================================
    // COMPLEX CORNER PATTERNS (5-7 regions)
    // ========================================
    {
      regions: new Set(['TL', 'TC', 'ML', 'MC', 'MR']),
      character: '▛',
      description: 'Top-left extended'
    },
    {
      regions: new Set(['TC', 'TR', 'ML', 'MC', 'MR']),
      character: '▜',
      description: 'Top-right extended'
    },
    {
      regions: new Set(['ML', 'MC', 'MR', 'BL', 'BC']),
      character: '▙',
      description: 'Bottom-left extended'
    },
    {
      regions: new Set(['ML', 'MC', 'MR', 'BC', 'BR']),
      character: '▟',
      description: 'Bottom-right extended'
    },
    {
      regions: new Set(['TL', 'TC', 'TR', 'ML', 'MC', 'BL', 'BC']),
      character: '▛',
      description: 'All but bottom-right region'
    },
    {
      regions: new Set(['TL', 'TC', 'TR', 'MC', 'MR', 'BC', 'BR']),
      character: '▜',
      description: 'All but bottom-left region'
    },
    {
      regions: new Set(['TL', 'ML', 'MC', 'MR', 'BL', 'BC', 'BR']),
      character: '▙',
      description: 'All but top-right region'
    },
    {
      regions: new Set(['TC', 'TR', 'ML', 'MC', 'MR', 'BL', 'BC', 'BR']),
      character: '▟',
      description: 'All but top-left region'
    },
    
    // ========================================
    // ALMOST FULL (8 regions - missing one corner)
    // ========================================
    {
      regions: new Set(['TL', 'TC', 'ML', 'MC', 'MR', 'BL', 'BC', 'BR']),
      character: '█',
      description: 'All but TR corner'
    },
    {
      regions: new Set(['TC', 'TR', 'ML', 'MC', 'MR', 'BL', 'BC', 'BR']),
      character: '█',
      description: 'All but TL corner'
    },
    {
      regions: new Set(['TL', 'TC', 'TR', 'ML', 'MC', 'MR', 'BC', 'BR']),
      character: '█',
      description: 'All but BL corner'
    },
    {
      regions: new Set(['TL', 'TC', 'TR', 'ML', 'MC', 'MR', 'BL', 'BC']),
      character: '█',
      description: 'All but BR corner'
    },
    
    // ========================================
    // SINGLE CORNER BLOCKS
    // ========================================
    {
      regions: new Set(['TL']),
      character: '▘',
      description: 'Top-left only'
    },
    {
      regions: new Set(['TR']),
      character: '▝',
      description: 'Top-right only'
    },
    {
      regions: new Set(['BL']),
      character: '▖',
      description: 'Bottom-left only'
    },
    {
      regions: new Set(['BR']),
      character: '▗',
      description: 'Bottom-right only'
    },
    {
      regions: new Set(['TC']),
      character: '▀',
      description: 'Top-center only'
    },
    {
      regions: new Set(['BC']),
      character: '▄',
      description: 'Bottom-center only'
    },
    {
      regions: new Set(['ML']),
      character: '▌',
      description: 'Middle-left only'
    },
    {
      regions: new Set(['MR']),
      character: '▐',
      description: 'Middle-right only'
    },
    {
      regions: new Set(['MC']),
      character: '·',
      description: 'Center only - middle dot'
    },
    
    // ========================================
    // 4-REGION L-SHAPES AND CORNERS
    // ========================================
    {
      regions: new Set(['TL', 'TC', 'ML', 'BL']),
      character: '▌',
      description: 'L-shape: left side with top'
    },
    {
      regions: new Set(['TC', 'TR', 'MR', 'BR']),
      character: '▐',
      description: 'L-shape: right side with top'
    },
    {
      regions: new Set(['TL', 'ML', 'BL', 'BC']),
      character: '▌',
      description: 'L-shape: left side with bottom'
    },
    {
      regions: new Set(['TR', 'MR', 'BC', 'BR']),
      character: '▐',
      description: 'L-shape: right side with bottom'
    },
    {
      regions: new Set(['TL', 'TC', 'TR', 'ML']),
      character: '▀',
      description: 'L-shape: top with left'
    },
    {
      regions: new Set(['TL', 'TC', 'TR', 'MR']),
      character: '▀',
      description: 'L-shape: top with right'
    },
    {
      regions: new Set(['ML', 'BL', 'BC', 'BR']),
      character: '▄',
      description: 'L-shape: bottom with left'
    },
    {
      regions: new Set(['MR', 'BL', 'BC', 'BR']),
      character: '▄',
      description: 'L-shape: bottom with right'
    },
    {
      regions: new Set(['TL', 'TC', 'MC', 'BC']),
      character: '▌',
      description: 'Vertical stripe with top-left'
    },
    {
      regions: new Set(['TC', 'TR', 'MC', 'BC']),
      character: '▐',
      description: 'Vertical stripe with top-right'
    },
    {
      regions: new Set(['TC', 'ML', 'MC', 'BL']),
      character: '▌',
      description: 'Vertical stripe with bottom-left'
    },
    {
      regions: new Set(['TC', 'MC', 'MR', 'BR']),
      character: '▐',
      description: 'Vertical stripe with bottom-right'
    },
    {
      regions: new Set(['TL', 'ML', 'MC', 'MR']),
      character: '▀',
      description: 'Horizontal stripe with top-left'
    },
    {
      regions: new Set(['TR', 'ML', 'MC', 'MR']),
      character: '▀',
      description: 'Horizontal stripe with top-right'
    },
    {
      regions: new Set(['ML', 'MC', 'MR', 'BL']),
      character: '▄',
      description: 'Horizontal stripe with bottom-left'
    },
    {
      regions: new Set(['ML', 'MC', 'MR', 'BR']),
      character: '▄',
      description: 'Horizontal stripe with bottom-right'
    },
    {
      regions: new Set(['TL', 'TC', 'ML', 'MC']),
      character: '▛',
      description: 'Top-left block with center'
    },
    {
      regions: new Set(['TC', 'TR', 'MC', 'MR']),
      character: '▜',
      description: 'Top-right block with center'
    },
    {
      regions: new Set(['ML', 'MC', 'BL', 'BC']),
      character: '▙',
      description: 'Bottom-left block with center'
    },
    {
      regions: new Set(['MC', 'MR', 'BC', 'BR']),
      character: '▟',
      description: 'Bottom-right block with center'
    },
    
    // ========================================
    // 4-REGION DIAGONAL PATTERNS
    // ========================================
    {
      regions: new Set(['TL', 'TC', 'MC', 'MR']),
      character: '▀',
      description: 'Top diagonal: TL-TC-MC-MR'
    },
    {
      regions: new Set(['TC', 'TR', 'ML', 'MC']),
      character: '▀',
      description: 'Top diagonal: TC-TR-ML-MC'
    },
    {
      regions: new Set(['ML', 'MC', 'BC', 'BR']),
      character: '▄',
      description: 'Bottom diagonal: ML-MC-BC-BR'
    },
    {
      regions: new Set(['MC', 'MR', 'BL', 'BC']),
      character: '▄',
      description: 'Bottom diagonal: MC-MR-BL-BC'
    },
    {
      regions: new Set(['TL', 'ML', 'MC', 'BC']),
      character: '▌',
      description: 'Left diagonal: TL-ML-MC-BC'
    },
    {
      regions: new Set(['TC', 'MC', 'BL', 'ML']),
      character: '▌',
      description: 'Left diagonal: TC-MC-BL-ML'
    },
    {
      regions: new Set(['TR', 'MC', 'MR', 'BC']),
      character: '▐',
      description: 'Right diagonal: TR-MC-MR-BC'
    },
    {
      regions: new Set(['TC', 'MR', 'MC', 'BR']),
      character: '▐',
      description: 'Right diagonal: TC-MR-MC-BR'
    },
    
    // ========================================
    // 6-REGION COMPLEX EDGES
    // ========================================
    {
      regions: new Set(['TL', 'TC', 'ML', 'MC', 'BL', 'BC']),
      character: '▌',
      description: 'Left side full with center'
    },
    {
      regions: new Set(['TC', 'TR', 'MC', 'MR', 'BC', 'BR']),
      character: '▐',
      description: 'Right side full with center'
    },
    {
      regions: new Set(['TL', 'TC', 'TR', 'ML', 'MC', 'MR']),
      character: '▀',
      description: 'Top side full with center'
    },
    {
      regions: new Set(['ML', 'MC', 'MR', 'BL', 'BC', 'BR']),
      character: '▄',
      description: 'Bottom side full with center'
    },
    {
      regions: new Set(['TL', 'TC', 'TR', 'ML', 'BL', 'BC']),
      character: '▛',
      description: 'Top and left edges, missing right'
    },
    {
      regions: new Set(['TL', 'TC', 'TR', 'MR', 'BC', 'BR']),
      character: '▜',
      description: 'Top and right edges, missing left'
    },
    {
      regions: new Set(['TL', 'ML', 'BL', 'BC', 'BR', 'MR']),
      character: '▙',
      description: 'Left and bottom edges, missing top'
    },
    {
      regions: new Set(['TR', 'MR', 'BL', 'BC', 'BR', 'ML']),
      character: '▟',
      description: 'Right and bottom edges, missing top'
    },
    {
      regions: new Set(['TL', 'TC', 'ML', 'MC', 'MR', 'BC']),
      character: '▀',
      description: 'Top-left heavy with bottom-center'
    },
    {
      regions: new Set(['TC', 'TR', 'ML', 'MC', 'MR', 'BC']),
      character: '▀',
      description: 'Top-right heavy with bottom-center'
    },
    {
      regions: new Set(['TC', 'ML', 'MC', 'MR', 'BL', 'BC']),
      character: '▄',
      description: 'Bottom-left heavy with top-center'
    },
    {
      regions: new Set(['TC', 'ML', 'MC', 'MR', 'BC', 'BR']),
      character: '▄',
      description: 'Bottom-right heavy with top-center'
    },
    
    // ========================================
    // 7-REGION PATTERNS (almost full sides)
    // ========================================
    {
      regions: new Set(['TL', 'TC', 'TR', 'ML', 'MC', 'MR', 'BL']),
      character: '█',
      description: '7 regions - missing BC and BR'
    },
    {
      regions: new Set(['TL', 'TC', 'TR', 'ML', 'MC', 'MR', 'BR']),
      character: '█',
      description: '7 regions - missing BL and BC'
    },
    {
      regions: new Set(['TL', 'TC', 'TR', 'ML', 'MC', 'BL', 'BC']),
      character: '█',
      description: '7 regions - missing MR and BR'
    },
    {
      regions: new Set(['TL', 'TC', 'TR', 'MC', 'MR', 'BC', 'BR']),
      character: '█',
      description: '7 regions - missing ML and BL'
    },
    {
      regions: new Set(['TL', 'TC', 'ML', 'MC', 'MR', 'BL', 'BC', 'BR']),
      character: '█',
      description: '7 regions - missing TR'
    },
    {
      regions: new Set(['TC', 'TR', 'ML', 'MC', 'MR', 'BL', 'BC', 'BR']),
      character: '█',
      description: '7 regions - missing TL'
    },
    {
      regions: new Set(['TL', 'TC', 'TR', 'ML', 'MC', 'MR', 'BC']),
      character: '█',
      description: '7 regions - missing BL and BR'
    },
    {
      regions: new Set(['TL', 'ML', 'MC', 'MR', 'BL', 'BC', 'BR']),
      character: '█',
      description: '7 regions - missing TC and TR'
    },
    {
      regions: new Set(['TC', 'TR', 'ML', 'MC', 'MR', 'BC', 'BR']),
      character: '█',
      description: '7 regions - missing TL and BL'
    },
    {
      regions: new Set(['TL', 'TC', 'TR', 'MC', 'MR', 'BL', 'BC']),
      character: '█',
      description: '7 regions - missing ML and BR'
    },
    
    // ========================================
    // 3-REGION DIAGONAL TRANSITIONS
    // ========================================
    {
      regions: new Set(['TL', 'TC', 'MC']),
      character: '▀',
      description: 'Top-left to center diagonal'
    },
    {
      regions: new Set(['TC', 'TR', 'MC']),
      character: '▀',
      description: 'Top-right to center diagonal'
    },
    {
      regions: new Set(['MC', 'BL', 'BC']),
      character: '▄',
      description: 'Center to bottom-left diagonal'
    },
    {
      regions: new Set(['MC', 'BC', 'BR']),
      character: '▄',
      description: 'Center to bottom-right diagonal'
    },
    {
      regions: new Set(['TL', 'ML', 'MC']),
      character: '▌',
      description: 'Top-left to center via left'
    },
    {
      regions: new Set(['ML', 'MC', 'BL']),
      character: '▌',
      description: 'Bottom-left to center via left'
    },
    {
      regions: new Set(['TR', 'MR', 'MC']),
      character: '▐',
      description: 'Top-right to center via right'
    },
    {
      regions: new Set(['MC', 'MR', 'BR']),
      character: '▐',
      description: 'Bottom-right to center via right'
    },
    {
      regions: new Set(['TL', 'TC', 'ML']),
      character: '▛',
      description: 'Top-left corner tight'
    },
    {
      regions: new Set(['TC', 'TR', 'MR']),
      character: '▜',
      description: 'Top-right corner tight'
    },
    {
      regions: new Set(['ML', 'BL', 'BC']),
      character: '▙',
      description: 'Bottom-left corner tight'
    },
    {
      regions: new Set(['MR', 'BC', 'BR']),
      character: '▟',
      description: 'Bottom-right corner tight'
    },
    {
      regions: new Set(['TL', 'ML', 'BL']),
      character: '▌',
      description: 'Left edge solid'
    },
    {
      regions: new Set(['TR', 'MR', 'BR']),
      character: '▐',
      description: 'Right edge solid'
    },
    {
      regions: new Set(['TL', 'TC', 'TR']),
      character: '▀',
      description: 'Top edge solid'
    },
    {
      regions: new Set(['BL', 'BC', 'BR']),
      character: '▄',
      description: 'Bottom edge solid'
    },
    
    // ========================================
    // CROSS AND T-SHAPES
    // ========================================
    {
      regions: new Set(['TC', 'ML', 'MC', 'MR', 'BC']),
      character: '┼',
      description: 'Cross pattern - 5 regions'
    },
    {
      regions: new Set(['TL', 'TC', 'TR', 'MC', 'BC']),
      character: '│',
      description: 'Vertical with wide top'
    },
    {
      regions: new Set(['TC', 'ML', 'MC', 'MR', 'BC', 'BL', 'BR']),
      character: '│',
      description: 'Vertical with wide bottom'
    },
    {
      regions: new Set(['TL', 'TC', 'TR', 'MC']),
      character: '▀',
      description: 'T-shape pointing down'
    },
    {
      regions: new Set(['MC', 'BL', 'BC', 'BR']),
      character: '▄',
      description: 'T-shape pointing up'
    },
    {
      regions: new Set(['TC', 'MC', 'BC', 'ML']),
      character: '▌',
      description: 'T-shape pointing right'
    },
    {
      regions: new Set(['TC', 'MC', 'BC', 'MR']),
      character: '▐',
      description: 'T-shape pointing left'
    },
    
    // ========================================
    // 5-REGION EDGE PATTERNS
    // ========================================
    {
      regions: new Set(['TL', 'TC', 'ML', 'MC', 'BL']),
      character: '▌',
      description: 'Left column with top'
    },
    {
      regions: new Set(['TR', 'TC', 'MR', 'MC', 'BR']),
      character: '▐',
      description: 'Right column with top'
    },
    {
      regions: new Set(['TL', 'TC', 'TR', 'ML', 'MC']),
      character: '▀',
      description: 'Top row with left'
    },
    {
      regions: new Set(['TC', 'TR', 'MR', 'MC', 'BL']),
      character: '█',
      description: 'Diagonal split top-right to bottom-left'
    },
    {
      regions: new Set(['TL', 'TC', 'ML', 'MC', 'BR']),
      character: '█',
      description: 'Diagonal split top-left to bottom-right'
    },
    {
      regions: new Set(['BL', 'BC', 'BR', 'ML', 'MC']),
      character: '▄',
      description: 'Bottom row with left'
    },
    {
      regions: new Set(['BL', 'BC', 'BR', 'MR', 'MC']),
      character: '▄',
      description: 'Bottom row with right'
    },
    {
      regions: new Set(['TL', 'ML', 'MC', 'BC', 'BR']),
      character: '█',
      description: 'Top-left to bottom-right diagonal wide'
    },
    {
      regions: new Set(['TR', 'MR', 'MC', 'BC', 'BL']),
      character: '█',
      description: 'Top-right to bottom-left diagonal wide'
    },
    {
      regions: new Set(['TL', 'TC', 'ML', 'MC', 'BC']),
      character: '█',
      description: 'L-shape top-left with bottom center'
    },
    {
      regions: new Set(['TC', 'TR', 'MR', 'MC', 'BC']),
      character: '█',
      description: 'L-shape top-right with bottom center'
    },
    {
      regions: new Set(['ML', 'MC', 'BL', 'BC', 'TR']),
      character: '█',
      description: 'L-shape bottom-left with top-right'
    },
    {
      regions: new Set(['MC', 'MR', 'BC', 'BR', 'TL']),
      character: '█',
      description: 'L-shape bottom-right with top-left'
    },
    
    // ========================================
    // 8-REGION PATTERNS (near-complete)
    // ========================================
    {
      regions: new Set(['TL', 'TC', 'TR', 'ML', 'MC', 'MR', 'BL', 'BC']),
      character: '█',
      description: 'All except bottom-right'
    },
    {
      regions: new Set(['TL', 'TC', 'TR', 'ML', 'MC', 'MR', 'BC', 'BR']),
      character: '█',
      description: 'All except bottom-left'
    },
    {
      regions: new Set(['TL', 'TC', 'TR', 'ML', 'MC', 'BC', 'BL', 'BR']),
      character: '█',
      description: 'All except middle-right'
    },
    {
      regions: new Set(['TL', 'TC', 'TR', 'MC', 'MR', 'BC', 'BL', 'BR']),
      character: '█',
      description: 'All except middle-left'
    },
    {
      regions: new Set(['TL', 'TC', 'ML', 'MC', 'MR', 'BC', 'BL', 'BR']),
      character: '█',
      description: 'All except top-right'
    },
    {
      regions: new Set(['TC', 'TR', 'ML', 'MC', 'MR', 'BC', 'BL', 'BR']),
      character: '█',
      description: 'All except top-left'
    },
    {
      regions: new Set(['TL', 'ML', 'MC', 'MR', 'BC', 'BL', 'BR', 'TR']),
      character: '█',
      description: 'All except top-center'
    },
    {
      regions: new Set(['TL', 'TC', 'TR', 'ML', 'MC', 'MR', 'BL', 'BR']),
      character: '█',
      description: 'All except bottom-center'
    },
    
    // ========================================
    // 2-REGION SPECIFIC DIAGONALS
    // ========================================
    {
      regions: new Set(['TL', 'BR']),
      character: '\\',
      description: 'Diagonal top-left to bottom-right corners only'
    },
    {
      regions: new Set(['TR', 'BL']),
      character: '/',
      description: 'Diagonal top-right to bottom-left corners only'
    },
    {
      regions: new Set(['TL', 'MR']),
      character: '▘',
      description: 'Top-left and middle-right'
    },
    {
      regions: new Set(['TR', 'ML']),
      character: '▝',
      description: 'Top-right and middle-left'
    },
    {
      regions: new Set(['BL', 'MR']),
      character: '▖',
      description: 'Bottom-left and middle-right'
    },
    {
      regions: new Set(['BR', 'ML']),
      character: '▗',
      description: 'Bottom-right and middle-left'
    },
    {
      regions: new Set(['TL', 'BC']),
      character: '▘',
      description: 'Top-left corner with bottom-center'
    },
    {
      regions: new Set(['TR', 'BC']),
      character: '▝',
      description: 'Top-right corner with bottom-center'
    },
    {
      regions: new Set(['BL', 'TC']),
      character: '▖',
      description: 'Bottom-left corner with top-center'
    },
    {
      regions: new Set(['BR', 'TC']),
      character: '▗',
      description: 'Bottom-right corner with top-center'
    },
    
    // ========================================
    // FALLBACK (no coverage)
    // ========================================
    {
      regions: new Set([]),
      character: ' ',
      description: 'Empty - no coverage'
    }
  ]
};
