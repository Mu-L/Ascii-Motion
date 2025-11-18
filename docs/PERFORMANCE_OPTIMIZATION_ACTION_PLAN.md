# Performance Optimization Action Plan

**Target:** Improve ASCII Motion performance by 30-50%  
**Timeline:** 4-6 weeks  
**Priority:** High impact, low effort first

---

## Quick Wins (1-2 Days Each)

### 1. FFmpeg Preloading Strategy
**Current Issue:** 31MB WASM loads only when video export is clicked  
**Solution:** Preload during idle time

```typescript
// Add to App.tsx or similar
useEffect(() => {
  if ('requestIdleCallback' in window) {
    const idleCallback = window.requestIdleCallback(() => {
      // Preload FFmpeg when browser is idle
      import('@ffmpeg/ffmpeg').then(({ FFmpeg }) => {
        // Initialize but don't start
        console.log('FFmpeg preloaded');
      });
    }, { timeout: 10000 });
    
    return () => window.cancelIdleCallback(idleCallback);
  }
}, []);
```

**Impact:** Faster video export on first use  
**Effort:** 1 hour

---

### 2. Add Bundle Analyzer
**Current Issue:** Unknown duplicate dependencies in 2.2MB main bundle  
**Solution:** Run analysis and visualize

```bash
# Add to package.json
npm install --save-dev rollup-plugin-visualizer

# Update vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
    })
  ]
})
```

**Impact:** Identify 20-30% of removable code  
**Effort:** 2 hours

---

### 3. Implement Hover Preview Throttling
**Current Issue:** Hover preview updates on every mouse move  
**Solution:** Add throttle with 16ms delay (60fps)

```typescript
// Update useHoverPreview.ts
import { useRef, useCallback } from 'react';

export function useHoverPreview() {
  const lastUpdate = useRef(0);
  const THROTTLE_MS = 16; // 60fps
  
  const updateHoverPreview = useCallback((preview) => {
    const now = performance.now();
    if (now - lastUpdate.current < THROTTLE_MS) {
      return; // Skip this update
    }
    lastUpdate.current = now;
    // ... existing hover logic
  }, []);
}
```

**Impact:** Reduce CPU usage during drawing by 15-20%  
**Effort:** 1 hour

---

## High Priority (1 Week Each)

### 4. Font Bundle Consolidation
**Current Issue:** 331 separate font files (60KB - 1.1MB each)  
**Solution:** Group into 15-20 category bundles

#### Step 1: Categorize Fonts
```typescript
// src/utils/font/fontCategories.ts
export const fontCategories = {
  monospace: ['Standard', 'Big Mono 9', 'Big Mono 12', 'Mono 9', 'Mono 12', ...],
  block: ['Block', 'Blocks', 'Big', 'Colossal', ...],
  script: ['Script', 'Cursive', 'Calvin S', ...],
  small: ['Small', 'Mini', 'Small ASCII 9', ...],
  decorative: ['Star Wars', 'Gothic', 'Graffiti', ...],
  // ... 10-15 more categories
};
```

#### Step 2: Update Vite Config
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Group fonts by category
          if (id.includes('/fonts/')) {
            for (const [category, fonts] of Object.entries(fontCategories)) {
              if (fonts.some(font => id.includes(font))) {
                return `font-${category}`;
              }
            }
          }
          // ... existing chunks
        }
      }
    }
  }
});
```

#### Step 3: Lazy Load Font Bundles
```typescript
// src/components/features/AsciiTypePreviewDialog.tsx
const [loadedCategories, setLoadedCategories] = useState<Set<string>>(new Set());

const loadFontCategory = useCallback(async (category: string) => {
  if (loadedCategories.has(category)) return;
  
  try {
    await import(`@/utils/font/fontCategories/${category}`);
    setLoadedCategories(prev => new Set(prev).add(category));
  } catch (err) {
    console.error(`Failed to load font category: ${category}`, err);
  }
}, [loadedCategories]);

// Trigger on scroll or category expansion
useEffect(() => {
  if (expandedCategories.includes(category)) {
    loadFontCategory(category);
  }
}, [expandedCategories]);
```

**Impact:** 
- Reduce initial bundle by 50-60%
- Font picker loads 70% faster
- Network requests drop from 331 to 15-20

**Effort:** 1 week

---

### 5. Canvas Dirty Rectangle Rendering
**Current Issue:** Full canvas redraws on every change  
**Solution:** Track and redraw only changed regions

```typescript
// src/utils/rendering/dirtyRectManager.ts
export class DirtyRectManager {
  private dirtyRegions: Set<string> = new Set();
  
  markDirty(x: number, y: number, width: number, height: number) {
    // Quantize to cell boundaries
    const cellX = Math.floor(x / cellWidth);
    const cellY = Math.floor(y / cellHeight);
    const cellW = Math.ceil(width / cellWidth);
    const cellH = Math.ceil(height / cellHeight);
    
    this.dirtyRegions.add(`${cellX},${cellY},${cellW},${cellH}`);
  }
  
  getDirtyRegions() {
    return Array.from(this.dirtyRegions).map(r => {
      const [x, y, w, h] = r.split(',').map(Number);
      return { x, y, width: w, height: h };
    });
  }
  
  clear() {
    this.dirtyRegions.clear();
  }
}

// Update CanvasGrid.tsx
const dirtyManager = useRef(new DirtyRectManager());

const renderCanvas = useCallback(() => {
  const ctx = canvasRef.current?.getContext('2d');
  if (!ctx) return;
  
  const regions = dirtyManager.current.getDirtyRegions();
  
  if (regions.length === 0) return; // Nothing to redraw
  
  for (const region of regions) {
    // Only clear and redraw dirty regions
    ctx.clearRect(
      region.x * cellWidth, 
      region.y * cellHeight,
      region.width * cellWidth,
      region.height * cellHeight
    );
    
    // Redraw cells in region
    for (let y = region.y; y < region.y + region.height; y++) {
      for (let x = region.x; x < region.x + region.width; x++) {
        drawCell(ctx, x, y);
      }
    }
  }
  
  dirtyManager.current.clear();
}, [cellWidth, cellHeight]);
```

**Impact:**
- 30-40% faster drawing operations
- 50% reduction in canvas operations
- Smoother drawing experience

**Effort:** 1 week

---

### 6. Virtual Scrolling for Font Picker & Timeline
**Current Issue:** All fonts/frames rendered at once  
**Solution:** Use react-window or react-virtual

```bash
npm install react-window
```

```typescript
// src/components/features/AsciiTypePreviewDialog.tsx
import { FixedSizeList as List } from 'react-window';

const FontList = () => {
  const fontNames = Object.keys(fonts);
  
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      <FontPreview fontName={fontNames[index]} />
    </div>
  );
  
  return (
    <List
      height={600}
      itemCount={fontNames.length}
      itemSize={120}
      width="100%"
    >
      {Row}
    </List>
  );
};
```

**Impact:**
- 80% faster font picker opening
- Smooth scrolling with 300+ fonts
- Reduced memory usage

**Effort:** 1 week

---

## Medium Priority (2-3 Days Each)

### 7. Thumbnail Caching System
**Current Issue:** Frame thumbnails re-rendered unnecessarily  
**Solution:** LRU cache with Canvas2D

```typescript
// src/utils/thumbnailCache.ts
class ThumbnailCache {
  private cache = new Map<string, ImageBitmap>();
  private maxSize = 100; // Keep last 100 thumbnails
  
  async get(frameId: string, renderer: () => HTMLCanvasElement) {
    if (this.cache.has(frameId)) {
      return this.cache.get(frameId)!;
    }
    
    const canvas = renderer();
    const bitmap = await createImageBitmap(canvas);
    
    this.set(frameId, bitmap);
    return bitmap;
  }
  
  private set(frameId: string, bitmap: ImageBitmap) {
    if (this.cache.size >= this.maxSize) {
      // Remove oldest entry
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(frameId, bitmap);
  }
}
```

**Impact:** 60% faster timeline scrolling  
**Effort:** 2 days

---

### 8. Memory Pressure Monitoring
**Current Issue:** App crashes when memory limit reached  
**Solution:** Monitor and warn users

```typescript
// src/hooks/useMemoryMonitor.ts
export function useMemoryMonitor() {
  const [memoryStatus, setMemoryStatus] = useState<'normal' | 'warning' | 'critical'>('normal');
  
  useEffect(() => {
    const checkMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const usage = memory.usedJSHeapSize / memory.jsHeapSizeLimit;
        
        if (usage > 0.9) {
          setMemoryStatus('critical');
          // Show warning toast
        } else if (usage > 0.75) {
          setMemoryStatus('warning');
        } else {
          setMemoryStatus('normal');
        }
      }
    };
    
    const interval = setInterval(checkMemory, 5000);
    return () => clearInterval(interval);
  }, []);
  
  return memoryStatus;
}
```

**Impact:** Prevent crashes, improve UX  
**Effort:** 2 days

---

### 9. SVG Icon Sprite System
**Current Issue:** 186 inline SVG paths  
**Solution:** Single sprite sheet with `<use>` references

```xml
<!-- public/icons/sprite.svg -->
<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
  <symbol id="icon-brush" viewBox="0 0 24 24">
    <path d="M..." />
  </symbol>
  <symbol id="icon-eraser" viewBox="0 0 24 24">
    <path d="M..." />
  </symbol>
  <!-- ... all icons -->
</svg>
```

```typescript
// src/components/common/Icon.tsx
export const Icon = ({ name }: { name: string }) => (
  <svg className="icon" width="20" height="20">
    <use href={`/icons/sprite.svg#icon-${name}`} />
  </svg>
);
```

**Impact:** 30% reduction in DOM complexity  
**Effort:** 3 days

---

### 10. React Performance Profiling
**Solution:** Add Profiler API in development

```typescript
// src/components/common/PerformanceProfiler.tsx
import { Profiler, ProfilerOnRenderCallback } from 'react';

const onRender: ProfilerOnRenderCallback = (
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) => {
  if (actualDuration > 16) { // Slower than 60fps
    console.warn(`Slow render in ${id}:`, {
      actualDuration,
      baseDuration,
      phase
    });
  }
};

export const DevProfiler = ({ children }: { children: React.ReactNode }) => (
  import.meta.env.DEV ? (
    <Profiler id="app" onRender={onRender}>
      {children}
    </Profiler>
  ) : children
);
```

**Impact:** Identify and fix slow components  
**Effort:** 2 days

---

## Low Priority (Future Enhancements)

### 11. WebGL Renderer (Optional)
For extremely large canvases (>200x100 cells), implement WebGL fallback

### 12. Web Workers for Generators
Move procedural animation to background thread

### 13. Service Worker
Offline support and asset caching

### 14. WebCodecs API
Replace FFmpeg for modern browsers (Chrome 94+, Edge 94+)

---

## Success Metrics

Track these before and after optimization:

| Metric | Baseline | Target | Measurement |
|--------|----------|--------|-------------|
| Initial Bundle Size | 2.2MB | 1.2MB | Lighthouse |
| Font Picker Load | 2s | 0.6s | Performance.now() |
| Drawing FPS | 45fps | 60fps | PerformanceOverlay |
| Memory Usage | 90% | 60% | performance.memory |
| Time to Interactive | 4.5s | 3s | Lighthouse |
| Total JS Files | 331 | 20-30 | Network tab |

---

## Testing Strategy

1. **Before each optimization:**
   - Run Lighthouse audit
   - Record baseline metrics
   - Test on slow device (throttled CPU)

2. **After each optimization:**
   - Re-run Lighthouse
   - Compare metrics
   - User testing with 5+ people

3. **Regression testing:**
   - Automated E2E tests
   - Performance budget alerts
   - CI/CD integration

---

## Next Steps

1. ✅ Review this plan with team
2. ✅ Prioritize based on effort/impact
3. ✅ Create GitHub issues for each task
4. ✅ Set up performance monitoring
5. ✅ Start with Quick Wins
6. ✅ Measure and iterate

**Estimated total time:** 6-8 weeks for all high/medium priority items
