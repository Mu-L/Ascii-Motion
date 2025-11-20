'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FRAMES } from './WelcomeAsciiAnimationData';

/**
 * ASCII Motion welcome animation component
 * Displays an animated ASCII art title for the welcome screen
 * Uses canvas rendering with high-DPI support for crisp display
 */
export const WelcomeAsciiAnimation: React.FC = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, fontSize: 10 });

  // Calculate responsive dimensions based on container width
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const frame = FRAMES[0]; // Use first frame to calculate dimensions
        const maxX = Math.max(...frame.cells.map(cell => cell.x)) + 1;
        const maxY = Math.max(...frame.cells.map(cell => cell.y)) + 1;
        const minY = Math.min(...frame.cells.map(cell => cell.y));
        const gridHeight = maxY - minY;
        
        // Calculate font size to fit the width (with some padding)
        // Using 0.6 as the approximate width/height ratio for monospace characters
        const calculatedSize = (containerWidth - 16) / (maxX * 0.6);
        const fontSize = Math.max(6, Math.min(calculatedSize, 14)); // Clamp between 6-14px
        
        // Calculate canvas dimensions
        const cellWidth = fontSize * 0.6;
        const cellHeight = fontSize;
        const width = maxX * cellWidth;
        const height = gridHeight * cellHeight;
        
        setDimensions({ width, height, fontSize });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Draw current frame on canvas
  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const frame = FRAMES[currentFrame];
    const minY = Math.min(...FRAMES[0].cells.map(cell => cell.y));
    const cellWidth = dimensions.fontSize * 0.6;
    const cellHeight = dimensions.fontSize;

    // Clear canvas
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);

    // Set up rendering context with proper font stack
    // Safari Canvas bug: adding 'monospace' fallback causes SF Mono to be ignored
    ctx.font = `${dimensions.fontSize}px 'SF Mono', 'Cascadia Code', Consolas, 'Courier New'`;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';

    // Draw cells
    frame.cells.forEach((cell) => {
      const x = cell.x * cellWidth;
      const y = (cell.y - minY) * cellHeight;

      // Draw background if specified
      if (cell.bgColor) {
        ctx.fillStyle = cell.bgColor;
        ctx.fillRect(x, y, cellWidth, cellHeight);
      }

      // Draw character
      ctx.fillStyle = cell.color;
      ctx.fillText(cell.char, x, y);
    });
  }, [currentFrame, dimensions]);

  // Setup high-DPI canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Setup high-DPI canvas for crisp rendering
    const devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * devicePixelRatio;
    canvas.height = dimensions.height * devicePixelRatio;
    
    // Set CSS size to maintain visual dimensions
    canvas.style.width = `${dimensions.width}px`;
    canvas.style.height = `${dimensions.height}px`;
    
    // Scale context to account for device pixel ratio
    ctx.scale(devicePixelRatio, devicePixelRatio);

    drawFrame();
  }, [dimensions, drawFrame]);

  // Redraw when frame changes
  useEffect(() => {
    drawFrame();
  }, [currentFrame, drawFrame]);

  // Animation loop
  useEffect(() => {
    const frame = FRAMES[currentFrame];
    const timer = setTimeout(() => {
      setCurrentFrame((prev) => (prev + 1) % FRAMES.length);
    }, frame.duration);

    return () => clearTimeout(timer);
  }, [currentFrame]);

  return (
    <div ref={containerRef} className="w-full bg-black rounded-md border border-border/50 p-2">
      <div className="w-full overflow-hidden flex items-center justify-center">
        <canvas
          ref={canvasRef}
          aria-label="ASCII Motion animated welcome logo"
          style={{
            imageRendering: 'auto',
            display: 'block',
          }}
        />
      </div>
    </div>
  );
};
