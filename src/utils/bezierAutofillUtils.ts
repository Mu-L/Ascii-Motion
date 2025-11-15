/**
 * Bezier Autofill Utilities
 * 
 * Canvas-based 9-region detection system for intelligent character selection
 * in bezier shape fills. Uses shared canvas for performance optimization.
 */

import type { RegionName } from '../constants/bezierAutofill';

/**
 * Shared canvas for all point-in-path tests
 * This avoids creating/destroying canvas contexts (GC thrashing)
 */
let sharedCanvas: HTMLCanvasElement | null = null;
let sharedCtx: CanvasRenderingContext2D | null = null;

/**
 * Get or create the shared canvas and context
 * Resizes if needed to accommodate the current test size
 * 
 * @param width - Required canvas width
 * @param height - Required canvas height
 * @returns Object with canvas and 2D rendering context
 */
export function getSharedCanvas(
  width: number,
  height: number
): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
  if (!sharedCanvas) {
    sharedCanvas = document.createElement('canvas');
    sharedCtx = sharedCanvas.getContext('2d', { willReadFrequently: true });
    
    if (!sharedCtx) {
      throw new Error('[bezierAutofill] Failed to create 2D rendering context');
    }
  }
  
  // Resize if needed
  if (sharedCanvas.width < width || sharedCanvas.height < height) {
    sharedCanvas.width = Math.max(width, sharedCanvas.width);
    sharedCanvas.height = Math.max(height, sharedCanvas.height);
  }
  
  // Clear for fresh test
  sharedCtx!.clearRect(0, 0, width, height);
  
  return { canvas: sharedCanvas, ctx: sharedCtx! };
}

/**
 * Detect which of the 9 regions in a cell are covered by a bezier path
 * 
 * Cell Division (3x3 grid):
 * ```
 * ┌─────┬─────┬─────┐
 * │ TL  │ TC  │ TR  │
 * ├─────┼─────┼─────┤
 * │ ML  │ MC  │ MR  │
 * ├─────┼─────┼─────┤
 * │ BL  │ BC  │ BR  │
 * └─────┴─────┴─────┘
 * ```
 * 
 * Each region is sampled at its center point to determine coverage.
 * 
 * @param cellX - Cell X coordinate (integer)
 * @param cellY - Cell Y coordinate (integer)
 * @param path - Path2D object to test against
 * @param ctx - Canvas rendering context
 * @param cellWidth - Width of a single cell in pixels (unzoomed)
 * @param cellHeight - Height of a single cell in pixels (unzoomed)
 * @param zoom - Current zoom level (1.0 = 100%)
 * @param panOffset - Pan offset in pixels
 * @returns Set of region names that are covered by the path
 */
export function detectCellRegions(
  cellX: number,
  cellY: number,
  path: Path2D,
  ctx: CanvasRenderingContext2D,
  cellWidth: number,
  cellHeight: number,
  zoom: number,
  panOffset: { x: number; y: number }
): Set<RegionName> {
  const filledRegions = new Set<RegionName>();
  
  // Calculate cell boundaries in grid coordinates
  const cellLeft = cellX;
  const cellTop = cellY;
  
  // Define 9 region centers (in grid coordinates)
  // Each region is 1/3 of the cell width/height
  const regions: Array<{ name: RegionName; x: number; y: number }> = [
    { name: 'TL', x: cellLeft + 1/6, y: cellTop + 1/6 },      // Top-left
    { name: 'TC', x: cellLeft + 3/6, y: cellTop + 1/6 },      // Top-center
    { name: 'TR', x: cellLeft + 5/6, y: cellTop + 1/6 },      // Top-right
    { name: 'ML', x: cellLeft + 1/6, y: cellTop + 3/6 },      // Middle-left
    { name: 'MC', x: cellLeft + 3/6, y: cellTop + 3/6 },      // Middle-center
    { name: 'MR', x: cellLeft + 5/6, y: cellTop + 3/6 },      // Middle-right
    { name: 'BL', x: cellLeft + 1/6, y: cellTop + 5/6 },      // Bottom-left
    { name: 'BC', x: cellLeft + 3/6, y: cellTop + 5/6 },      // Bottom-center
    { name: 'BR', x: cellLeft + 5/6, y: cellTop + 5/6 },      // Bottom-right
  ];
  
  // Test each region center
  for (const region of regions) {
    if (isPointInPath(region.x, region.y, path, ctx, cellWidth, cellHeight, zoom, panOffset)) {
      filledRegions.add(region.name);
    }
  }
  
  return filledRegions;
}

/**
 * Test if a point (in grid coordinates) is inside a path
 * 
 * @param x - X coordinate in grid space
 * @param y - Y coordinate in grid space
 * @param path - Path2D object to test against
 * @param ctx - Canvas rendering context
 * @param cellWidth - Width of a single cell in pixels (unzoomed)
 * @param cellHeight - Height of a single cell in pixels (unzoomed)
 * @param zoom - Current zoom level (1.0 = 100%)
 * @param panOffset - Pan offset in pixels
 * @returns True if the point is inside the path
 */
export function isPointInPath(
  x: number,
  y: number,
  path: Path2D,
  ctx: CanvasRenderingContext2D,
  cellWidth: number,
  cellHeight: number,
  zoom: number,
  panOffset: { x: number; y: number }
): boolean {
  // Convert grid coordinates to pixel coordinates
  const pixelX = x * cellWidth * zoom + panOffset.x + (cellWidth * zoom) / 2;
  const pixelY = y * cellHeight * zoom + panOffset.y + (cellHeight * zoom) / 2;
  
  return ctx.isPointInPath(path, pixelX, pixelY);
}

/**
 * Calculate overlap percentage for a cell (used in palette fill mode)
 * 
 * Subsamples the cell into a 5x5 grid (25 sample points) and counts
 * how many points are inside the bezier path.
 * 
 * @param cellX - Cell X coordinate (integer)
 * @param cellY - Cell Y coordinate (integer)
 * @param path - Path2D object to test against
 * @param ctx - Canvas rendering context
 * @param cellWidth - Width of a single cell in pixels (unzoomed)
 * @param cellHeight - Height of a single cell in pixels (unzoomed)
 * @param zoom - Current zoom level (1.0 = 100%)
 * @param panOffset - Pan offset in pixels
 * @returns Overlap percentage (0-100)
 */
export function calculateCellOverlap(
  cellX: number,
  cellY: number,
  path: Path2D,
  ctx: CanvasRenderingContext2D,
  cellWidth: number,
  cellHeight: number,
  zoom: number,
  panOffset: { x: number; y: number }
): number {
  const SUBSAMPLE_SIZE = 5;
  let overlapCount = 0;
  
  for (let sy = 0; sy < SUBSAMPLE_SIZE; sy++) {
    for (let sx = 0; sx < SUBSAMPLE_SIZE; sx++) {
      // Sample at regular intervals across the cell
      const sampleX = cellX + (sx + 0.5) / SUBSAMPLE_SIZE;
      const sampleY = cellY + (sy + 0.5) / SUBSAMPLE_SIZE;
      
      if (isPointInPath(sampleX, sampleY, path, ctx, cellWidth, cellHeight, zoom, panOffset)) {
        overlapCount++;
      }
    }
  }
  
  const totalSamples = SUBSAMPLE_SIZE * SUBSAMPLE_SIZE;
  return (overlapCount / totalSamples) * 100;
}

/**
 * Simple point-in-polygon test (used for constant fill mode)
 * 
 * Tests the center of the cell to determine if it's inside the bezier path.
 * This is the fastest method and appropriate for simple fills.
 * 
 * @param cellX - Cell X coordinate (integer)
 * @param cellY - Cell Y coordinate (integer)
 * @param path - Path2D object to test against
 * @param ctx - Canvas rendering context
 * @param cellWidth - Width of a single cell in pixels (unzoomed)
 * @param cellHeight - Height of a single cell in pixels (unzoomed)
 * @param zoom - Current zoom level (1.0 = 100%)
 * @param panOffset - Pan offset in pixels
 * @returns True if the cell center is inside the path
 */
export function isCellInside(
  cellX: number,
  cellY: number,
  path: Path2D,
  ctx: CanvasRenderingContext2D,
  cellWidth: number,
  cellHeight: number,
  zoom: number,
  panOffset: { x: number; y: number }
): boolean {
  // Test center of cell
  const centerX = cellX + 0.5;
  const centerY = cellY + 0.5;
  
  return isPointInPath(centerX, centerY, path, ctx, cellWidth, cellHeight, zoom, panOffset);
}

/**
 * Cleanup function to release shared canvas resources
 * Should be called when the bezier tool is fully deactivated
 */
export function cleanupSharedCanvas(): void {
  sharedCanvas = null;
  sharedCtx = null;
}
