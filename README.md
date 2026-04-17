# pixgrid

A tiny animated 3×3 pixel grid indicator for React. Zero runtime dependencies, ~1 KB gzipped, multi-color palettes and rounded cells out of the box.

Inspired by [MetaHeavies/3-pixel-grid](https://github.com/MetaHeavies/3-pixel-grid).

![demo placeholder](./demo.gif)

## Install

```bash
npm install pixgrid
# or
pnpm add pixgrid
```

Requires React 18+.

## Quick start

```tsx
import { PixelGrid } from 'pixgrid';

export function Loading() {
  return <PixelGrid preset="spiral-cw" theme="aurora" radius={2} />;
}
```

## Props

| Prop        | Type                                  | Default    | Description                                               |
| ----------- | ------------------------------------- | ---------- | --------------------------------------------------------- |
| `preset`    | `PresetName`                          | —          | Named stagger pattern                                     |
| `delays`    | `number[9]`                           | `wave-lr`  | Per-cell delay in ms (row-major)                          |
| `duration`  | `number`                              | `200`      | Hold time after all cells are on                          |
| `cellSize`  | `number`                              | `14`       | Cell side length in px                                    |
| `gap`       | `number`                              | `1`        | Gap between cells in px                                   |
| `radius`    | `number \| string \| array \| fn`     | `0`        | Per-cell `border-radius` (e.g. `4`, `'50%'`, 9 values)    |
| `theme`     | `ThemeName`                           | `'white'`  | Named color palette                                       |
| `color`     | `ColorValue`                          | theme      | On color — string, 9-array, or function                   |
| `glow`      | `ColorValue`                          | theme      | Glow color                                                |
| `off`       | `ColorValue`                          | theme      | Dim color                                                 |
| `paused`    | `boolean`                             | `false`    | Freeze the animation loop                                 |
| `startOn`   | `boolean`                             | `false`    | Start with cells lit                                      |
| `className` | `string`                              | —          | Extra class on the container                              |
| `style`     | `CSSProperties`                       | —          | Extra inline styles on the container                      |

`ColorValue` is:

```ts
type ColorValue =
  | string                                   // same color for all cells
  | string[]                                 // 9 colors, row-major
  | ((ctx: CellContext) => string);          // compute per cell

interface CellContext { index: number; row: number; col: number; delay: number; }
```

## Presets

```ts
import { presetNames } from 'pixgrid';
// Motion patterns:
//   wave-lr, wave-rl, wave-tb, wave-bt,
//   diagonal-tl, diagonal-br,
//   spiral-cw, spiral-ccw,
//   center-out, converge, corners-first, cross,
//   checkerboard, rain, pinwheel, orbit,
//   snake, zigzag,
//   heartbeat, ripple,
//   ring, dominoes, edges-first, cascade, burst,
//   twinkle, scatter
```

Every preset is just a `delays` array and `duration`. Use the `preset` prop to apply one, or import the raw values:

```tsx
import { PixelGrid, presets } from 'pixgrid';

<PixelGrid {...presets['spiral-cw']} />
```

## Themes

Single- and multi-color palettes:

- Single: `white`, `cyan`, `ember`, `matrix`, `violet`, `amber`
- Multi: `aurora`, `prism`, `rainbow`, `fire`, `ocean`, `pastel`, `sunset`, `neon`, `sakura`, `forest`, `midnight`, `candy`

```tsx
<PixelGrid theme="aurora" preset="spiral-cw" radius={3} />
```

Themes are just defaults for `color`/`glow`/`off`. Override any of them with a string, an array of 9, or a function.

## Custom colors — zero-config

Pass `color` and pixgrid auto-derives `glow` and `off` for you:

```tsx
<PixelGrid color="#7df9ff" />     // glow = 75% alpha, off = 14% alpha
<PixelGrid color="oklch(85% 0.22 30)" />
```

You can still override individually:

```tsx
<PixelGrid color="#7df9ff" glow="white" />
// off is still auto-derived from color
```

Need the helpers in your own code?

```ts
import { deriveGlow, deriveOff, deriveAlpha } from 'pixgrid';

deriveGlow('#7df9ff');          // 'color-mix(in oklch, #7df9ff 75%, transparent)'
deriveOff('#7df9ff');           // 'color-mix(in oklch, #7df9ff 14%, transparent)'
deriveAlpha('#7df9ff', 0.5);    // 'color-mix(in oklch, #7df9ff 50%, transparent)'
```

## Multi-color examples

```tsx
// One color per cell (row-major)
<PixelGrid
  color={['#f00', '#f80', '#ff0', '#8f0', '#0f0', '#0f8', '#0ff', '#08f', '#00f']}
/>

// Computed per cell
<PixelGrid
  color={({ index }) => `oklch(88% 0.2 ${index * 40})`}
  glow={({ index }) => `oklch(88% 0.2 ${index * 40} / 0.8)`}
/>

// Mix — single glow, per-cell color
<PixelGrid color={['#f00', '#ff0', '#0f0', /* … */]} glow="rgba(255,255,255,0.4)" />
```

## Rounded cells

```tsx
<PixelGrid radius={0} />                  // square (default)
<PixelGrid radius={4} />                  // 4px soft corners
<PixelGrid radius="50%" />                // circles
<PixelGrid radius={[0, 4, 0, 4, '50%', 4, 0, 4, 0]} />  // per-cell mix
<PixelGrid radius={({ row, col }) => (row + col) % 2 === 0 ? '50%' : 0} />
```

## Accessibility

The grid is marked `aria-hidden="true"` — it's decorative. Pair it with a visible label if it encodes state:

```tsx
<span role="status">
  <PixelGrid preset="wave-lr" />
  <span className="sr-only">Loading…</span>
</span>
```

Honors `prefers-reduced-motion: reduce` by disabling the CSS transition.

## How it works

Nine `<div>` cells. Each one flips a boolean on a timer staggered by `delays`. A 300 ms CSS transition on `background-color` and `box-shadow` smooths the flip. No keyframes, no `requestAnimationFrame`, no SVG filters — the compositor handles every frame.

## License

MIT
