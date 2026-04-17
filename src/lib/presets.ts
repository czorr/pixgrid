import type { Pattern, PresetName, Theme, ThemeName } from './types.js';

export const presets: Record<PresetName, Pattern> = {
	'wave-lr': { delays: [0, 120, 240, 0, 120, 240, 0, 120, 240], duration: 200 },
	'wave-rl': { delays: [240, 120, 0, 240, 120, 0, 240, 120, 0], duration: 200 },
	'wave-tb': { delays: [0, 0, 0, 120, 120, 120, 240, 240, 240], duration: 200 },
	'wave-bt': { delays: [240, 240, 240, 120, 120, 120, 0, 0, 0], duration: 200 },
	'diagonal-tl': { delays: [0, 100, 200, 100, 200, 300, 200, 300, 400], duration: 180 },
	'diagonal-br': { delays: [400, 300, 200, 300, 200, 100, 200, 100, 0], duration: 180 },
	'spiral-cw': { delays: [0, 80, 160, 560, 640, 240, 480, 400, 320], duration: 180 },
	'spiral-ccw': { delays: [640, 560, 480, 0, 400, 320, 80, 160, 240], duration: 180 },
	'center-out': { delays: [240, 120, 240, 120, 0, 120, 240, 120, 240], duration: 200 },
	converge: { delays: [0, 160, 80, 240, 320, 240, 80, 160, 0], duration: 260 },
	'corners-first': { delays: [0, 200, 0, 200, 400, 200, 0, 200, 0], duration: 200 },
	cross: { delays: [300, 0, 300, 0, 0, 0, 300, 0, 300], duration: 250 },
	checkerboard: { delays: [0, 250, 0, 250, 0, 250, 0, 250, 0], duration: 220 },
	rain: { delays: [0, 180, 60, 120, 300, 240, 360, 80, 420], duration: 170 },
	pinwheel: { delays: [0, 160, 480, 320, 640, 160, 480, 320, 0], duration: 150 },
	orbit: { delays: [0, 80, 160, 480, 640, 240, 400, 320, 560], duration: 120 },
	snake: { delays: [0, 80, 160, 400, 320, 240, 480, 560, 640], duration: 160 },
	zigzag: { delays: [0, 160, 320, 400, 240, 80, 480, 560, 640], duration: 140 },
	heartbeat: { delays: [0, 0, 0, 0, 0, 0, 0, 0, 0], duration: 140 },
	ripple: { delays: [120, 60, 120, 60, 0, 60, 120, 60, 120], duration: 260 },
	// Outer ring sweeps clockwise from the top-left, center lights up last.
	ring: { delays: [0, 60, 120, 420, 480, 180, 360, 300, 240], duration: 160 },
	// Strict sequential: 0 → 8, one after another.
	dominoes: { delays: [0, 60, 120, 180, 240, 300, 360, 420, 480], duration: 140 },
	// All 8 outer cells together, center lights last.
	'edges-first': { delays: [0, 0, 0, 0, 300, 0, 0, 0, 0], duration: 220 },
	// Tight diagonal cascade, shorter than diagonal-tl.
	cascade: { delays: [0, 40, 80, 80, 120, 160, 160, 200, 240], duration: 120 },
	// Opposite of edges-first: center first, then outer ring at once.
	burst: { delays: [200, 200, 200, 200, 0, 200, 200, 200, 200], duration: 180 },
	// Scattered artistic timing, feels like starlight.
	twinkle: { delays: [0, 300, 60, 240, 120, 360, 180, 420, 90], duration: 180 },
	// Non-obvious ordering, evokes a shuffle.
	scatter: { delays: [80, 320, 0, 200, 440, 160, 360, 40, 280], duration: 140 },
	// Sweep mode: beam rotates CW from 12 o'clock; center (-1) stays permanently lit.
	// delays by cell index: TL=420, TM=0, TR=60, ML=360, C=-1, MR=120, BL=300, BM=240, BR=180
	radar: { delays: [420, 0, 60, 360, -1, 120, 300, 240, 180], duration: 80, mode: 'sweep' },
	// 4 corners rotate CW in tight bursts, then edges + center fill in.
	'corners-spin': { delays: [0, 450, 100, 450, 450, 450, 300, 450, 200], duration: 180 },
	// Column-wise boustrophedon: col 0 top→bottom, col 1 bottom→top, col 2 top→bottom.
	'snake-v': { delays: [0, 400, 480, 80, 320, 560, 160, 240, 640], duration: 160 }
};

export const presetNames = Object.keys(presets) as PresetName[];

// ---------------------------------------------------------------------------
// Themes — every field accepts a ColorValue, so we can mix single colors with
// per-cell palettes and functions.

const rainbowPalette = [
	'oklch(85% 0.22 30)',
	'oklch(88% 0.2 85)',
	'oklch(90% 0.2 145)',
	'oklch(88% 0.2 195)',
	'oklch(85% 0.22 250)',
	'oklch(85% 0.22 310)',
	'oklch(88% 0.2 350)',
	'oklch(90% 0.2 60)',
	'oklch(88% 0.2 120)'
] as const;

const firePalette = [
	'oklch(95% 0.2 85)',
	'oklch(90% 0.22 65)',
	'oklch(85% 0.24 45)',
	'oklch(80% 0.25 30)',
	'oklch(75% 0.25 20)',
	'oklch(80% 0.25 30)',
	'oklch(85% 0.24 45)',
	'oklch(90% 0.22 65)',
	'oklch(95% 0.2 85)'
] as const;

const oceanPalette = [
	'oklch(92% 0.14 220)',
	'oklch(88% 0.17 215)',
	'oklch(85% 0.2 210)',
	'oklch(82% 0.2 205)',
	'oklch(80% 0.2 200)',
	'oklch(82% 0.2 195)',
	'oklch(85% 0.2 190)',
	'oklch(88% 0.17 185)',
	'oklch(92% 0.14 180)'
] as const;

const pastelPalette = [
	'oklch(92% 0.1 20)',
	'oklch(92% 0.1 80)',
	'oklch(92% 0.1 140)',
	'oklch(92% 0.1 200)',
	'oklch(92% 0.1 260)',
	'oklch(92% 0.1 320)',
	'oklch(92% 0.1 50)',
	'oklch(92% 0.1 110)',
	'oklch(92% 0.1 170)'
] as const;

const prismPalette = [
	'oklch(88% 0.22 15)',
	'oklch(88% 0.2 60)',
	'oklch(88% 0.2 130)',
	'oklch(88% 0.2 180)',
	'oklch(88% 0.22 240)',
	'oklch(88% 0.22 300)',
	'oklch(88% 0.22 15)',
	'oklch(88% 0.2 60)',
	'oklch(88% 0.2 130)'
] as const;

const auroraPalette = [
	'oklch(90% 0.18 150)',
	'oklch(88% 0.2 170)',
	'oklch(85% 0.22 195)',
	'oklch(85% 0.22 220)',
	'oklch(82% 0.22 250)',
	'oklch(85% 0.22 285)',
	'oklch(88% 0.2 310)',
	'oklch(88% 0.2 170)',
	'oklch(90% 0.18 150)'
] as const;

const sunsetPalette = [
	'oklch(92% 0.18 85)',
	'oklch(88% 0.2 65)',
	'oklch(85% 0.22 45)',
	'oklch(82% 0.24 30)',
	'oklch(78% 0.24 15)',
	'oklch(80% 0.22 355)',
	'oklch(82% 0.2 340)',
	'oklch(85% 0.18 325)',
	'oklch(88% 0.16 310)'
] as const;

const neonPalette = [
	'oklch(92% 0.32 130)',
	'oklch(92% 0.3 195)',
	'oklch(92% 0.32 300)',
	'oklch(92% 0.3 25)',
	'oklch(95% 0.34 100)',
	'oklch(92% 0.3 260)',
	'oklch(92% 0.32 350)',
	'oklch(92% 0.3 60)',
	'oklch(92% 0.32 160)'
] as const;

const sakuraPalette = [
	'oklch(96% 0.08 350)',
	'oklch(92% 0.12 345)',
	'oklch(88% 0.14 340)',
	'oklch(94% 0.1 355)',
	'oklch(86% 0.16 335)',
	'oklch(90% 0.12 350)',
	'oklch(88% 0.14 340)',
	'oklch(94% 0.1 355)',
	'oklch(96% 0.08 350)'
] as const;

const forestPalette = [
	'oklch(88% 0.14 140)',
	'oklch(82% 0.18 145)',
	'oklch(76% 0.2 150)',
	'oklch(84% 0.16 135)',
	'oklch(72% 0.22 155)',
	'oklch(80% 0.18 140)',
	'oklch(78% 0.2 150)',
	'oklch(84% 0.16 135)',
	'oklch(88% 0.14 140)'
] as const;

const midnightPalette = [
	'oklch(72% 0.2 260)',
	'oklch(68% 0.22 270)',
	'oklch(64% 0.24 280)',
	'oklch(68% 0.22 250)',
	'oklch(60% 0.26 290)',
	'oklch(66% 0.22 270)',
	'oklch(64% 0.24 280)',
	'oklch(68% 0.22 260)',
	'oklch(72% 0.2 250)'
] as const;

const candyPalette = [
	'oklch(88% 0.18 340)',
	'oklch(85% 0.2 320)',
	'oklch(88% 0.18 300)',
	'oklch(90% 0.16 350)',
	'oklch(82% 0.22 310)',
	'oklch(90% 0.16 330)',
	'oklch(88% 0.18 300)',
	'oklch(85% 0.2 320)',
	'oklch(88% 0.18 340)'
] as const;

/**
 * Derive a translucent "glow" palette from a base color palette by
 * appending an alpha channel in the oklch/hsl form. We rely on the
 * browser's CSS color parser instead of trying to reparse here.
 */
function withAlpha(colors: readonly string[], alpha: number): string[] {
	return colors.map((c) => deriveAlpha(c, alpha));
}

function dimPalette(colors: readonly string[], alpha = 0.22): string[] {
	return withAlpha(colors, alpha);
}

/**
 * Given any CSS color string, return the same color with the given alpha.
 * Prefers the native `oklch(… / α)` form when possible, otherwise falls
 * back to `color-mix(in oklch, … α%, transparent)` which every modern
 * browser supports.
 */
export function deriveAlpha(color: string, alpha: number): string {
	const pct = Math.round(alpha * 100);
	if (color.startsWith('oklch(') && !color.includes('/')) {
		return color.replace(/\)$/, ` / ${alpha})`);
	}
	return `color-mix(in oklch, ${color} ${pct}%, transparent)`;
}

/**
 * Auto-derive a "glow" color from a base `color`. Used by `PixelGrid` when
 * the user supplies `color` without supplying `glow`.
 */
export function deriveGlow(color: string): string {
	return deriveAlpha(color, 0.75);
}

/**
 * Auto-derive an "off" color from a base `color`. Used by `PixelGrid` when
 * the user supplies `color` without supplying `off`.
 */
export function deriveOff(color: string): string {
	return deriveAlpha(color, 0.14);
}

export const themes: Record<ThemeName, Theme> = {
	white: {
		color: '#ffffff',
		glow: 'rgba(255,255,255,0.55)',
		off: 'rgba(255,255,255,0.12)'
	},
	cyan: {
		color: 'oklch(90% 0.2 195)',
		glow: 'oklch(80% 0.25 195 / 0.9)',
		off: 'oklch(40% 0.08 195 / 0.4)'
	},
	ember: {
		color: 'oklch(85% 0.22 30)',
		glow: 'oklch(70% 0.25 30 / 0.9)',
		off: 'oklch(35% 0.08 30 / 0.4)'
	},
	matrix: {
		color: 'oklch(88% 0.2 145)',
		glow: 'oklch(75% 0.25 145 / 0.9)',
		off: 'oklch(35% 0.08 145 / 0.4)'
	},
	violet: {
		color: 'oklch(85% 0.22 310)',
		glow: 'oklch(70% 0.28 310 / 0.9)',
		off: 'oklch(35% 0.08 310 / 0.4)'
	},
	amber: {
		color: 'oklch(90% 0.18 85)',
		glow: 'oklch(75% 0.22 85 / 0.9)',
		off: 'oklch(35% 0.08 85 / 0.4)'
	},
	aurora: {
		color: [...auroraPalette],
		glow: withAlpha(auroraPalette, 0.75),
		off: dimPalette(auroraPalette)
	},
	prism: {
		color: [...prismPalette],
		glow: withAlpha(prismPalette, 0.8),
		off: dimPalette(prismPalette)
	},
	rainbow: {
		color: [...rainbowPalette],
		glow: withAlpha(rainbowPalette, 0.8),
		off: dimPalette(rainbowPalette)
	},
	fire: {
		color: [...firePalette],
		glow: withAlpha(firePalette, 0.85),
		off: dimPalette(firePalette)
	},
	ocean: {
		color: [...oceanPalette],
		glow: withAlpha(oceanPalette, 0.75),
		off: dimPalette(oceanPalette)
	},
	pastel: {
		color: [...pastelPalette],
		glow: withAlpha(pastelPalette, 0.7),
		off: dimPalette(pastelPalette)
	},
	sunset: {
		color: [...sunsetPalette],
		glow: withAlpha(sunsetPalette, 0.8),
		off: dimPalette(sunsetPalette, 0.2)
	},
	neon: {
		color: [...neonPalette],
		glow: withAlpha(neonPalette, 0.9),
		off: dimPalette(neonPalette, 0.18)
	},
	sakura: {
		color: [...sakuraPalette],
		glow: withAlpha(sakuraPalette, 0.7),
		off: dimPalette(sakuraPalette, 0.2)
	},
	forest: {
		color: [...forestPalette],
		glow: withAlpha(forestPalette, 0.75),
		off: dimPalette(forestPalette, 0.2)
	},
	midnight: {
		color: [...midnightPalette],
		glow: withAlpha(midnightPalette, 0.85),
		off: dimPalette(midnightPalette, 0.22)
	},
	candy: {
		color: [...candyPalette],
		glow: withAlpha(candyPalette, 0.8),
		off: dimPalette(candyPalette, 0.2)
	}
};

export const themeNames = Object.keys(themes) as ThemeName[];
