/**
 * Bezier Path Utilities
 * 
 * Functions for creating Path2D objects from bezier anchor points,
 * calculating bounding boxes, and converting between grid and pixel coordinates.
 */

import type { BezierAnchorPoint } from '../stores/bezierStore';

/**
 * Convert grid coordinates to pixel coordinates
 * 
 * @param gridPos - Position in grid coordinates
 * @param cellWidth - Width of a single cell in pixels (unzoomed)
 * @param cellHeight - Height of a single cell in pixels (unzoomed)
 * @param zoom - Current zoom level (1.0 = 100%)
 * @param panOffset - Pan offset in pixels
 * @returns Position in pixel coordinates
 */
export function pointToPixel(
  gridPos: { x: number; y: number },
  cellWidth: number,
  cellHeight: number,
  zoom: number,
  panOffset: { x: number; y: number }
): { x: number; y: number } {
  return {
    x: gridPos.x * cellWidth * zoom + panOffset.x + (cellWidth * zoom) / 2,
    y: gridPos.y * cellHeight * zoom + panOffset.y + (cellHeight * zoom) / 2,
  };
}

/**
 * Convert pixel coordinates to grid coordinates
 * 
 * @param pixelPos - Position in pixel coordinates
 * @param cellWidth - Width of a single cell in pixels (unzoomed)
 * @param cellHeight - Height of a single cell in pixels (unzoomed)
 * @param zoom - Current zoom level (1.0 = 100%)
 * @param panOffset - Pan offset in pixels
 * @returns Position in grid coordinates
 */
export function pixelToPoint(
  pixelPos: { x: number; y: number },
  cellWidth: number,
  cellHeight: number,
  zoom: number,
  panOffset: { x: number; y: number }
): { x: number; y: number } {
  return {
    x: (pixelPos.x - panOffset.x - (cellWidth * zoom) / 2) / (cellWidth * zoom),
    y: (pixelPos.y - panOffset.y - (cellHeight * zoom) / 2) / (cellHeight * zoom),
  };
}

/**
 * Create a Path2D object from bezier anchor points
 * 
 * This path can be used for:
 * - Rendering the bezier shape on canvas
 * - Hit testing with ctx.isPointInPath()
 * - Fill operations
 * 
 * @param anchorPoints - Array of bezier anchor points
 * @param isClosed - Whether the path should be closed
 * @param cellWidth - Width of a single cell in pixels (unzoomed)
 * @param cellHeight - Height of a single cell in pixels (unzoomed)
 * @param zoom - Current zoom level (1.0 = 100%)
 * @param panOffset - Pan offset in pixels
 * @returns Path2D object representing the bezier curve
 */
export function createBezierPath(
  anchorPoints: BezierAnchorPoint[],
  isClosed: boolean,
  cellWidth: number,
  cellHeight: number,
  zoom: number,
  panOffset: { x: number; y: number }
): Path2D {
  const path = new Path2D();
  
  if (anchorPoints.length === 0) {
    return path;
  }
  
  // Convert first point to pixel coordinates and move to it
  const firstPoint = anchorPoints[0];
  const firstPixel = pointToPixel(firstPoint.position, cellWidth, cellHeight, zoom, panOffset);
  path.moveTo(firstPixel.x, firstPixel.y);
  
  // Draw bezier curves between consecutive points
  for (let i = 1; i < anchorPoints.length; i++) {
    const prevPoint = anchorPoints[i - 1];
    const currPoint = anchorPoints[i];
    
    const prevPixel = pointToPixel(prevPoint.position, cellWidth, cellHeight, zoom, panOffset);
    const currPixel = pointToPixel(currPoint.position, cellWidth, cellHeight, zoom, panOffset);
    
    // Check if both points have handles for a smooth curve
    if (
      prevPoint.hasHandles &&
      prevPoint.handleOut &&
      currPoint.hasHandles &&
      currPoint.handleIn
    ) {
      // Bezier curve with control points
      const cp1 = {
        x: prevPixel.x + prevPoint.handleOut.x * cellWidth * zoom,
        y: prevPixel.y + prevPoint.handleOut.y * cellHeight * zoom,
      };
      const cp2 = {
        x: currPixel.x + currPoint.handleIn.x * cellWidth * zoom,
        y: currPixel.y + currPoint.handleIn.y * cellHeight * zoom,
      };
      
      path.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, currPixel.x, currPixel.y);
    } else {
      // Straight line
      path.lineTo(currPixel.x, currPixel.y);
    }
  }
  
  // Close the path if needed
  if (isClosed && anchorPoints.length > 2) {
    const lastPoint = anchorPoints[anchorPoints.length - 1];
    const firstPoint = anchorPoints[0];
    
    // Check if we need a bezier curve to close the path
    if (
      lastPoint.hasHandles &&
      lastPoint.handleOut &&
      firstPoint.hasHandles &&
      firstPoint.handleIn
    ) {
      const lastPixel = pointToPixel(lastPoint.position, cellWidth, cellHeight, zoom, panOffset);
      const firstPixel = pointToPixel(firstPoint.position, cellWidth, cellHeight, zoom, panOffset);
      
      const cp1 = {
        x: lastPixel.x + lastPoint.handleOut.x * cellWidth * zoom,
        y: lastPixel.y + lastPoint.handleOut.y * cellHeight * zoom,
      };
      const cp2 = {
        x: firstPixel.x + firstPoint.handleIn.x * cellWidth * zoom,
        y: firstPixel.y + firstPoint.handleIn.y * cellHeight * zoom,
      };
      
      path.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, firstPixel.x, firstPixel.y);
    }
    
    path.closePath();
  }
  
  return path;
}

/**
 * Calculate the bounding box of a bezier shape
 * 
 * Note: This is a simplified version that only considers anchor points.
 * A more accurate version would also consider the bezier control points
 * to find the true curve bounds. For most ASCII art use cases, this
 * approximation is sufficient.
 * 
 * @param anchorPoints - Array of bezier anchor points
 * @returns Bounding box { minX, minY, maxX, maxY } in grid coordinates
 */
export function getBezierBounds(anchorPoints: BezierAnchorPoint[]): {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
} {
  if (anchorPoints.length === 0) {
    return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
  }
  
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  
  for (const point of anchorPoints) {
    const { x, y } = point.position;
    
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
    
    // Also consider handle positions for a better approximation
    if (point.hasHandles) {
      if (point.handleIn) {
        const inX = x + point.handleIn.x;
        const inY = y + point.handleIn.y;
        if (inX < minX) minX = inX;
        if (inX > maxX) maxX = inX;
        if (inY < minY) minY = inY;
        if (inY > maxY) maxY = inY;
      }
      
      if (point.handleOut) {
        const outX = x + point.handleOut.x;
        const outY = y + point.handleOut.y;
        if (outX < minX) minX = outX;
        if (outX > maxX) maxX = outX;
        if (outY < minY) minY = outY;
        if (outY > maxY) maxY = outY;
      }
    }
  }
  
  return { minX, minY, maxX, maxY };
}

/**
 * Calculate the integer bounding box for cell iteration
 * Expands the floating-point bounds to cover all potentially affected cells
 * 
 * @param anchorPoints - Array of bezier anchor points
 * @param canvasWidth - Width of the canvas in cells
 * @param canvasHeight - Height of the canvas in cells
 * @returns Integer bounds { minX, minY, maxX, maxY } clamped to canvas
 */
export function getIntegerBounds(
  anchorPoints: BezierAnchorPoint[],
  canvasWidth: number,
  canvasHeight: number
): { minX: number; minY: number; maxX: number; maxY: number } {
  const bounds = getBezierBounds(anchorPoints);
  
  return {
    minX: Math.max(0, Math.floor(bounds.minX)),
    minY: Math.max(0, Math.floor(bounds.minY)),
    maxX: Math.min(canvasWidth - 1, Math.ceil(bounds.maxX)),
    maxY: Math.min(canvasHeight - 1, Math.ceil(bounds.maxY)),
  };
}

/**
 * Test if a point (in grid coordinates) is inside a bezier path
 * 
 * @param x - X coordinate in grid space
 * @param y - Y coordinate in grid space
 * @param path - Path2D object to test against
 * @param ctx - Canvas rendering context (for isPointInPath)
 * @param cellWidth - Width of a single cell in pixels (unzoomed)
 * @param cellHeight - Height of a single cell in pixels (unzoomed)
 * @param zoom - Current zoom level (1.0 = 100%)
 * @param panOffset - Pan offset in pixels
 * @returns True if the point is inside the path
 */
export function isPointInBezierPath(
  x: number,
  y: number,
  path: Path2D,
  ctx: CanvasRenderingContext2D,
  cellWidth: number,
  cellHeight: number,
  zoom: number,
  panOffset: { x: number; y: number }
): boolean {
  const pixel = pointToPixel({ x, y }, cellWidth, cellHeight, zoom, panOffset);
  return ctx.isPointInPath(path, pixel.x, pixel.y);
}
