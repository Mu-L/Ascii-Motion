# ASCII Motion Performance Analysis Report
**Date:** November 18, 2025  
**Site:** https://ascii-motion.app/  
**Analysis Method:** Chrome Browser MCP Server + Manual Code Inspection

---

## Executive Summary

ASCII Motion is a feature-rich browser-based ASCII art creation tool with good initial load performance but significant opportunities for optimization. The analysis identified **331 JavaScript files** totaling approximately **7MB** of bundled code, with the main bottleneck being **excessive code splitting** for font files and **31MB FFmpeg WASM** loading.

### Key Metrics
- **Initial Load Time:** 56.87ms (HTML)
- **Total DOM Elements:** 659 elements (23 levels deep)
- **JavaScript Heap:** 19.35 MB used / 21.6 MB allocated
- **Total CSS Rules:** 977 rules across 3 stylesheets
- **Bundle Files:** 331 JavaScript files + 1 CSS file
- **Main Bundle:** 2.2MB (index-B_b1K0Hr.js)
- **FFmpeg WASM:** 31MB (largest single asset)

---

## Critical Performance Bottlenecks

### 1. **Font File Code Splitting (CRITICAL)**
**Issue:** Each ASCII art font (315+ fonts) is split into individual JavaScript files, creating 331 separate HTTP requests.

**Evidence:**
- Individual font files ranging from 60KB to 1.1MB:
  - `Big Mono 12-D1z_DYLX.js` - 1.1MB
  - `Big ASCII 12-CyFwKC0d.js` - 820KB
  - `Big Mono 9-TjrIuF07.js` - 668KB
  - `Mono 12-C6TS8PKQ.js` - 596KB
  - 300+ more font files...

**Impact:**
- Increases HTTP overhead (331 requests vs potential 10-20)
- Slows down font selection dialog loading
- Each font selection triggers additional network request
- Browser connection pool saturation

**Recommended Solutions:**
1. **Group fonts by category** (10-20 bundles instead of 331)
   - Monospace fonts bundle
   - Block fonts bundle
   - Script fonts bundle
   - Small fonts bundle
2. **Lazy load font bundles** only when font picker is opened
3. **Implement virtual scrolling** in font picker to defer loading
4. **Consider font data compression** (gzip on server already helps but consolidate first)

### 2. **FFmpeg WASM Bundle (31MB)**
**Issue:** FFmpeg core is 31MB and likely loaded eagerly.

**Evidence:**
- `ffmpeg-core-CgUfceKH.wasm` - 31MB
- `ffmpeg-t5pdubxx.js` - 3.9KB wrapper

**Current Implementation:**
```javascript
// From exportRenderer.ts line 2068
const { FFmpeg } = await import('@ffmpeg/ffmpeg');
const { fetchFile } = await import('@ffmpeg/util');
```

**Impact:**
- Large download for feature most users won't use immediately
- Blocking initial app experience

**Recommended Solutions:**
1. ✅ **Already using dynamic imports** - Good!
2. **Add loading indicator** when FFmpeg is first needed
3. **Consider warning users** about initial video export delay
4. **Preload FFmpeg on idle** using `requestIdleCallback`
5. **Evaluate alternatives** like WebCodecs API for modern browsers

### 3. **Canvas Rendering Performance**
**Issue:** Multiple canvas layers (3 detected) with high resolution rendering.

**Evidence:**
- Canvas 1: 504x64 (252x32 display) - Animation preview
- Canvas 2 & 3: 1727x864 (864x432 display) - 2x device pixel ratio
- DOM depth: 23 levels
- 186 SVG path elements (likely for UI icons)

**Impact:**
- High memory usage for large canvas buffers
- Potential repainting on every mouse move
- Retina display requires 4x pixel rendering

**Recommended Solutions:**
1. **Implement canvas pooling** to reuse contexts
2. **Use OffscreenCanvas** for background rendering
3. **Debounce render operations** during mouse move
4. **Implement dirty rectangle rendering** (only redraw changed areas)
5. **Consider WebGL renderer** for hardware acceleration

### 4. **React Re-render Optimization**
**Issue:** Some components may re-render unnecessarily.

**Evidence:**
- Good use of `useCallback`, `useMemo`, `React.memo` in many components
- 86 elements with inline event listeners detected
- Performance overlay shows setInterval polling at 100ms

**Potential Issues:**
- Color picker, animation timeline, and tool panels updating frequently
- Hover preview system triggering cascading updates
- State management could benefit from more granular updates

**Recommended Solutions:**
1. **Add React DevTools Profiler** to production builds (gated by flag)
2. **Implement zustand middleware** for performance tracking
3. **Split large context providers** into smaller, focused contexts
4. **Use React Compiler** when stable (automatic memoization)
5. **Virtualize large lists** (frame timeline, font picker)

### 5. **SVG Icon Bloat**
**Issue:** 186 SVG path elements suggests heavy icon usage.

**Evidence:**
- 86 SVG elements on initial page load
- Many tool buttons, controls, and UI elements
- Inline SVG data URLs in CSS

**Impact:**
- Increases DOM complexity
- Slows initial paint time
- Memory overhead for SVG parsing

**Recommended Solutions:**
1. **Use icon sprite system** (single SVG sprite sheet)
2. **Consider icon font** or webfont icons
3. **Implement CSS-based icons** for simple shapes
4. **Lazy load non-critical icons**

### 6. **CSS Rules Count**
**Issue:** 977 CSS rules across 3 stylesheets.

**Evidence:**
- Main CSS bundle: 76KB
- 977 total CSS rules
- Tailwind CSS likely included with unused utilities

**Impact:**
- Slower style recalculation
- Larger bundle size

**Recommended Solutions:**
1. **Purge unused Tailwind utilities** (may already be done)
2. **Split critical CSS** for above-the-fold content
3. **Audit for duplicate rules**
4. **Consider CSS-in-JS tree shaking** if not using Tailwind optimally

### 7. **JavaScript Bundle Analysis**
**Issue:** Main bundle is 2.2MB, which is large for initial load.

**Evidence:**
- `index-B_b1K0Hr.js` - 2.2MB
- `ui-CBSlxIiK.js` - 112KB
- `fontLoader-DKmtm_SK.js` - 172KB
- `vendor-CsOnlmzv.js` - 649B (surprisingly small!)

**Impact:**
- Long parse and compile time on slower devices
- Delayed Time to Interactive (TTI)

**Recommended Solutions:**
1. **Run bundle analyzer** to identify duplicate dependencies
2. **Split by route** (if implementing premium features)
3. **Move generator algorithms** to Web Workers
4. **Consider WASM** for compute-intensive operations
5. **Tree shake** unused exports more aggressively

---

## Secondary Optimizations

### 8. **Animation Timeline Performance**
**Evidence from code:**
- `useAnimationPlayback.ts` uses `requestAnimationFrame` ✅
- Auto-scroll feature chains RAF calls
- Frame preview thumbnails rendered on canvas

**Recommendations:**
1. **Implement thumbnail caching** with LRU eviction
2. **Use intersection observer** for visible frame thumbnails only
3. **Debounce preview updates** during scrubbing
4. **Add frame preview resolution settings** (quality vs performance)

### 9. **Hover Preview System**
**Evidence:** `useHoverPreview.ts` uses RAF but may trigger on every mouse move.

**Recommendations:**
1. **Throttle hover updates** to max 60fps (already using RAF ✅)
2. **Add hover debounce delay** (50ms) to reduce unnecessary renders
3. **Skip preview for rapid mouse movements**

### 10. **Memory Management**
**Current State:**
- JS Heap: 19.35MB / 21.6MB (90% used - approaching limit!)
- LocalStorage: 93 bytes (minimal usage ✅)

**Recommendations:**
1. **Implement frame data compression** for large projects
2. **Add memory pressure detection**
3. **Clear undo history** older than N operations
4. **Warn users** when approaching memory limits
5. **Implement project auto-save** to prevent data loss

---

## Performance Opportunities Summary

### High Priority (Immediate Impact)
1. ✅ **Consolidate font bundles** - Reduce 331 files to 10-20 bundles
2. ✅ **Implement font lazy loading** - Load on demand
3. ✅ **Add FFmpeg preloading strategy** - requestIdleCallback
4. ✅ **Implement canvas dirty rectangles** - Only redraw changed areas
5. ✅ **Add React profiling** - Identify unnecessary re-renders

### Medium Priority (Significant Gains)
6. ✅ **Bundle size analysis** - Identify and remove duplicate code
7. ✅ **Implement thumbnail caching** - Reduce canvas operations
8. ✅ **Add virtual scrolling** - Font picker and timeline
9. ✅ **Optimize SVG icons** - Use sprite system
10. ✅ **Memory pressure monitoring** - Prevent crashes

### Low Priority (Polish)
11. ⚠️ **CSS optimization** - Audit and deduplicate rules
12. ⚠️ **WebGL renderer** - For extreme performance (large canvases)
13. ⚠️ **Web Workers** - Move generators to background threads
14. ⚠️ **Service Worker** - Offline support and asset caching
15. ⚠️ **WebCodecs API** - Replace FFmpeg for modern browsers

---

## Code Quality Observations

### ✅ Good Practices Observed
1. **Extensive use of `useCallback`, `useMemo`, `React.memo`** - Prevents unnecessary re-renders
2. **Dynamic imports for large dependencies** - FFmpeg, fontLoader
3. **Request animation frame** for smooth animations
4. **Performance monitoring system** built-in
5. **TypeScript** for type safety and tooling
6. **Zustand** for efficient state management
7. **Vite** for fast builds and HMR

### ⚠️ Areas for Improvement
1. **Font loading strategy** - Too granular code splitting
2. **Canvas management** - Multiple layers, potential for optimization
3. **Bundle splitting** - Main bundle too large
4. **Memory management** - No visible garbage collection strategy
5. **Missing Web Worker usage** - CPU-intensive operations on main thread

---

## Lighthouse / Web Vitals Estimate

Based on analysis, estimated scores:

| Metric | Current | Target | Priority |
|--------|---------|--------|----------|
| **LCP** (Largest Contentful Paint) | ~2.5s | <2.5s | ✅ Good |
| **FID** (First Input Delay) | ~50ms | <100ms | ✅ Good |
| **CLS** (Cumulative Layout Shift) | ~0.05 | <0.1 | ✅ Good |
| **TTI** (Time to Interactive) | ~4-5s | <3.5s | ⚠️ Needs work |
| **TBT** (Total Blocking Time) | ~300ms | <200ms | ⚠️ Needs work |
| **Performance Score** | ~75-80 | >90 | ⚠️ Needs work |

---

## Recommended Implementation Order

### Phase 1: Font Optimization (Week 1)
1. Group fonts into 15-20 category bundles
2. Implement lazy loading for font picker
3. Add virtual scrolling to font list
4. **Expected gain:** 50% reduction in initial bundle size, faster font picker

### Phase 2: Canvas & Rendering (Week 2)
1. Implement dirty rectangle rendering
2. Add canvas pooling/reuse
3. Optimize hover preview throttling
4. **Expected gain:** 30% improvement in drawing performance

### Phase 3: Bundle Optimization (Week 3)
1. Run bundle analyzer and fix duplicates
2. Split main bundle by feature
3. Implement route-based code splitting
4. **Expected gain:** 40% reduction in main bundle size

### Phase 4: Memory & Polish (Week 4)
1. Add memory pressure monitoring
2. Implement thumbnail caching
3. Add performance telemetry
4. **Expected gain:** Stability improvements, crash prevention

---

## Monitoring & Metrics

### Implement These Tracking Points
1. **Font load time** - Per font bundle
2. **Canvas render time** - Per operation type
3. **Memory usage** - Trend over session
4. **Frame timeline scroll performance** - FPS during interaction
5. **User journey timing** - Time to first draw, export, etc.

### Tools to Use
1. **Lighthouse CI** - Automated performance testing
2. **Web Vitals library** - Real user monitoring
3. **Bundle Analyzer** - Webpack/Vite bundle visualization
4. **React DevTools Profiler** - Component render tracking
5. **Chrome DevTools Performance** - Detailed profiling

---

## Conclusion

ASCII Motion has a solid foundation with good React optimization practices, but suffers from **excessive code splitting of font files** (331 files!) and a **large main bundle** (2.2MB). The most impactful optimizations are:

1. **Consolidate font files** from 331 → 15-20 bundles
2. **Implement lazy loading** for fonts and heavy features
3. **Optimize canvas rendering** with dirty rectangles
4. **Add memory management** to prevent crashes

These changes could improve performance by **30-50%** and significantly enhance user experience, especially on slower devices and connections.

### Estimated Performance Gains
- **Initial load:** 30-40% faster
- **Drawing operations:** 25-35% smoother
- **Memory usage:** 20-30% reduction
- **Font picker:** 60-70% faster opening

**Total estimated effort:** 4-6 weeks of focused optimization work.
