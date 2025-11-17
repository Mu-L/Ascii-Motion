/**
 * Bezier Stroke Utilities
 * 
 * Generates tapered stroke shapes along bezier paths for open shapes.
 * Creates a polygon representing the stroke area which can then be filled
 * using the same autofill/palette fill logic as closed shapes.
 */

import type { BezierAnchorPoint } from '../stores/bezierStore';

/**
 * Point in 2D space
 */
interface Point {
  x: number;
  y: number;
}

/**
 * Calculate a point along a cubic bezier curve
 * @param t - Parameter from 0 to 1
 * @param p0 - Start point
 * @param cp1 - First control point
 * @param cp2 - Second control point
 * @param p1 - End point
 * @returns Point on the curve
 */
function cubicBezierPoint(
  t: number,
  p0: Point,
  cp1: Point,
  cp2: Point,
  p1: Point
): Point {
  const oneMinusT = 1 - t;
  const oneMinusT2 = oneMinusT * oneMinusT;
  const oneMinusT3 = oneMinusT2 * oneMinusT;
  const t2 = t * t;
  const t3 = t2 * t;

  return {
    x: oneMinusT3 * p0.x + 3 * oneMinusT2 * t * cp1.x + 3 * oneMinusT * t2 * cp2.x + t3 * p1.x,
    y: oneMinusT3 * p0.y + 3 * oneMinusT2 * t * cp1.y + 3 * oneMinusT * t2 * cp2.y + t3 * p1.y,
  };
}

/**
 * Calculate tangent (derivative) at point t on cubic bezier curve
 * @param t - Parameter from 0 to 1
 * @param p0 - Start point
 * @param cp1 - First control point
 * @param cp2 - Second control point
 * @param p1 - End point
 * @returns Tangent vector (not normalized)
 */
function cubicBezierTangent(
  t: number,
  p0: Point,
  cp1: Point,
  cp2: Point,
  p1: Point
): Point {
  const oneMinusT = 1 - t;
  const oneMinusT2 = oneMinusT * oneMinusT;
  const t2 = t * t;

  return {
    x: 3 * oneMinusT2 * (cp1.x - p0.x) + 6 * oneMinusT * t * (cp2.x - cp1.x) + 3 * t2 * (p1.x - cp2.x),
    y: 3 * oneMinusT2 * (cp1.y - p0.y) + 6 * oneMinusT * t * (cp2.y - cp1.y) + 3 * t2 * (p1.y - cp2.y),
  };
}

/**
 * Normalize a vector
 */
function normalize(v: Point): Point {
  const len = Math.sqrt(v.x * v.x + v.y * v.y);
  if (len === 0) return { x: 0, y: 1 }; // Default to up if zero length
  return { x: v.x / len, y: v.y / len };
}

/**
 * Get perpendicular vector (rotated 90 degrees counter-clockwise)
 */
function perpendicular(v: Point): Point {
  return { x: -v.y, y: v.x };
}

/**
 * Calculate width at a given position along the stroke
 * @param t - Position from 0 to 1 along the path
 * @param baseWidth - Base stroke width
 * @param taperStart - Taper amount at start (0 to 1)
 * @param taperEnd - Taper amount at end (0 to 1)
 * @returns Width at position t
 */
function calculateTaperedWidth(
  t: number,
  baseWidth: number,
  taperStart: number,
  taperEnd: number
): number {
  let width = baseWidth;
  
  // Apply start taper
  if (taperStart > 0 && t < taperStart) {
    // Linear taper from 0 to full width
    width *= (t / taperStart);
  }
  
  // Apply end taper
  if (taperEnd > 0 && t > (1 - taperEnd)) {
    // Linear taper from full width to 0
    const endT = (1 - t) / taperEnd;
    width *= endT;
  }
  
  return width;
}

/**
 * Generate stroke geometry for a bezier segment
 * @param p0 - Start point
 * @param cp1 - First control point
 * @param cp2 - Second control point
 * @param p1 - End point
 * @param baseWidth - Base stroke width
 * @param taperStart - Taper at start (0-1)
 * @param taperEnd - Taper at end (0-1)
 * @param segments - Number of segments to divide the curve into
 * @param tStart - Start t value (for path position calculation)
 * @param tEnd - End t value (for path position calculation)
 * @returns Left and right edge points
 */
function generateSegmentStroke(
  p0: Point,
  cp1: Point,
  cp2: Point,
  p1: Point,
  baseWidth: number,
  taperStart: number,
  taperEnd: number,
  segments: number,
  tStart: number,
  tEnd: number
): { left: Point[]; right: Point[] } {
  const leftPoints: Point[] = [];
  const rightPoints: Point[] = [];

  for (let i = 0; i <= segments; i++) {
    const tLocal = i / segments; // Local t along this segment
    const tGlobal = tStart + (tEnd - tStart) * tLocal; // Global t along entire path
    
    // Get point and tangent on curve
    const point = cubicBezierPoint(tLocal, p0, cp1, cp2, p1);
    const tangent = cubicBezierTangent(tLocal, p0, cp1, cp2, p1);
    
    // Get normal (perpendicular to tangent)
    const normal = perpendicular(normalize(tangent));
    
    // Calculate width at this position
    const width = calculateTaperedWidth(tGlobal, baseWidth, taperStart, taperEnd);
    const halfWidth = width / 2;
    
    // Calculate offset points on both sides
    leftPoints.push({
      x: point.x + normal.x * halfWidth,
      y: point.y + normal.y * halfWidth,
    });
    
    rightPoints.push({
      x: point.x - normal.x * halfWidth,
      y: point.y - normal.y * halfWidth,
    });
  }

  return { left: leftPoints, right: rightPoints };
}

/**
 * Generate stroke outline points for an entire bezier path
 * Creates a closed polygon representing the stroke area
 * 
 * @param anchorPoints - Bezier anchor points
 * @param strokeWidth - Base width of the stroke in grid units
 * @param taperStart - Taper amount at start (0 = no taper, 1 = full taper)
 * @param taperEnd - Taper amount at end (0 = no taper, 1 = full taper)
 * @param segmentsPerCurve - Number of segments to divide each curve into
 * @returns Array of points forming the stroke outline polygon
 */
export function generateStrokeOutline(
  anchorPoints: BezierAnchorPoint[],
  strokeWidth: number,
  taperStart: number,
  taperEnd: number,
  segmentsPerCurve: number = 20
): Point[] {
  if (anchorPoints.length < 2) {
    return [];
  }

  const allLeftPoints: Point[] = [];
  const allRightPoints: Point[] = [];
  
  // Calculate total number of segments for global t calculation
  const totalSegments = anchorPoints.length - 1;

  // Generate stroke for each segment
  for (let i = 0; i < anchorPoints.length - 1; i++) {
    const p0 = anchorPoints[i];
    const p1 = anchorPoints[i + 1];
    
    // Calculate global t range for this segment
    const tStart = i / totalSegments;
    const tEnd = (i + 1) / totalSegments;
    
    // Determine control points
    let cp1: Point, cp2: Point;
    
    if (p0.hasHandles && p0.handleOut) {
      // Use outgoing handle from p0
      cp1 = {
        x: p0.position.x + p0.handleOut.x,
        y: p0.position.y + p0.handleOut.y,
      };
    } else {
      // No handle, use point position (creates straight line)
      cp1 = { x: p0.position.x, y: p0.position.y };
    }
    
    if (p1.hasHandles && p1.handleIn) {
      // Use incoming handle to p1
      cp2 = {
        x: p1.position.x + p1.handleIn.x,
        y: p1.position.y + p1.handleIn.y,
      };
    } else {
      // No handle, use point position
      cp2 = { x: p1.position.x, y: p1.position.y };
    }
    
    // Generate stroke for this segment
    const { left, right } = generateSegmentStroke(
      { x: p0.position.x, y: p0.position.y },
      cp1,
      cp2,
      { x: p1.position.x, y: p1.position.y },
      strokeWidth,
      taperStart,
      taperEnd,
      segmentsPerCurve,
      tStart,
      tEnd
    );
    
    // For first segment, include all points
    // For subsequent segments, skip first point to avoid duplicates
    if (i === 0) {
      allLeftPoints.push(...left);
      allRightPoints.push(...right);
    } else {
      allLeftPoints.push(...left.slice(1));
      allRightPoints.push(...right.slice(1));
    }
  }

  // Create closed polygon: left side forward, right side backward
  return [...allLeftPoints, ...allRightPoints.reverse()];
}

/**
 * Create a Path2D object from stroke outline points
 * @param outlinePoints - Polygon points defining the stroke
 * @param cellWidth - Width of a cell in pixels
 * @param cellHeight - Height of a cell in pixels
 * @param zoom - Current zoom level
 * @param panOffset - Pan offset in pixels
 * @returns Path2D object
 */
export function createStrokePath(
  outlinePoints: Point[],
  cellWidth: number,
  cellHeight: number,
  zoom: number,
  panOffset: { x: number; y: number }
): Path2D {
  const path = new Path2D();
  
  if (outlinePoints.length === 0) {
    return path;
  }

  const effectiveCellWidth = cellWidth * zoom;
  const effectiveCellHeight = cellHeight * zoom;

  // Move to first point
  const firstPoint = outlinePoints[0];
  path.moveTo(
    firstPoint.x * effectiveCellWidth + panOffset.x,
    firstPoint.y * effectiveCellHeight + panOffset.y
  );

  // Draw lines to all other points
  for (let i = 1; i < outlinePoints.length; i++) {
    const point = outlinePoints[i];
    path.lineTo(
      point.x * effectiveCellWidth + panOffset.x,
      point.y * effectiveCellHeight + panOffset.y
    );
  }

  // Close the path
  path.closePath();

  return path;
}

/**
 * Get bounding box for stroke outline
 * @param outlinePoints - Polygon points
 * @param canvasWidth - Canvas width in cells
 * @param canvasHeight - Canvas height in cells
 * @returns Bounds clamped to canvas
 */
export function getStrokeBounds(
  outlinePoints: Point[],
  canvasWidth: number,
  canvasHeight: number
): { minX: number; maxX: number; minY: number; maxY: number } {
  if (outlinePoints.length === 0) {
    return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
  }

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (const point of outlinePoints) {
    minX = Math.min(minX, point.x);
    maxX = Math.max(maxX, point.x);
    minY = Math.min(minY, point.y);
    maxY = Math.max(maxY, point.y);
  }

  return {
    minX: Math.max(0, Math.floor(minX)),
    maxX: Math.min(canvasWidth - 1, Math.ceil(maxX)),
    minY: Math.max(0, Math.floor(minY)),
    maxY: Math.min(canvasHeight - 1, Math.ceil(maxY)),
  };
}
