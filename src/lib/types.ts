import type { CSSProperties } from 'react';

/**
 * A color value for any cell slot (on-color, glow, off-color). Accepts:
 *
 * - A CSS color string — applied to every cell.
 * - A tuple/array of 9 CSS color strings — one per cell, row-major.
 * - A function that receives cell info and returns a CSS color.
 */
export type ColorValue =
	| string
	| readonly [string, string, string, string, string, string, string, string, string]
	| string[]
	| ((ctx: CellContext) => string);

export interface CellContext {
	/** Cell index 0..8, row-major (top-left → bottom-right). */
	index: number;
	/** Column 0..2. */
	col: number;
	/** Row 0..2. */
	row: number;
	/** Delay in ms for this cell. */
	delay: number;
}

/**
 * Radius per cell. Accepts a number (px), a CSS length string (`'50%'`,
 * `'4px'`), 9 values (per-cell), or a function.
 */
export type RadiusValue =
	| number
	| string
	| readonly [
			number | string,
			number | string,
			number | string,
			number | string,
			number | string,
			number | string,
			number | string,
			number | string,
			number | string
	  ]
	| ((ctx: CellContext) => number | string);

export interface Pattern {
	/** 9 delays in ms, row-major (top-left → bottom-right). */
	delays: readonly number[];
	/** Hold time (ms) after all cells are on before toggling off. */
	duration: number;
}

export interface Theme {
	/** Cell color when lit. */
	color: ColorValue;
	/** Box-shadow glow color. */
	glow: ColorValue;
	/** Cell color when dim. */
	off: ColorValue;
	/** Optional background for the grid container. */
	background?: string;
}

export interface PixelGridProps {
	/**
	 * Named preset — a `delays`/`duration` shortcut. Individual `delays`
	 * or `duration` props override the preset.
	 */
	preset?: PresetName;

	/** 9 delays in ms, row-major. Defaults to the `wave-lr` pattern. */
	delays?: readonly number[];
	/** Hold time (ms) after all cells are on. */
	duration?: number;

	/** Cell side length in px. */
	cellSize?: number;
	/** Gap between cells in px. */
	gap?: number;

	/**
	 * Corner radius for every cell. Pass a number (px), a CSS length string,
	 * 9 values, or a function. Examples: `2`, `'50%'` (circles), `'4px'`.
	 */
	radius?: RadiusValue;

	/** Named color theme. Individual `color`/`glow`/`off` props override it. */
	theme?: ThemeName;

	/** Cell color(s) when lit. */
	color?: ColorValue;
	/** Box-shadow glow color(s). */
	glow?: ColorValue;
	/** Cell color(s) when dim. */
	off?: ColorValue;

	/** Pause the animation loop. All cells stay in their last rendered state. */
	paused?: boolean;

	/** Start with all cells already on (no intro stagger). */
	startOn?: boolean;

	/** Additional class name. */
	className?: string;
	/** Extra inline styles for the grid container. */
	style?: CSSProperties;
}

// Forward-declare preset / theme name unions — they are concrete in
// `presets.ts` but typing them here avoids a cycle.
export type PresetName =
	| 'wave-lr'
	| 'wave-rl'
	| 'wave-tb'
	| 'wave-bt'
	| 'diagonal-tl'
	| 'diagonal-br'
	| 'spiral-cw'
	| 'spiral-ccw'
	| 'center-out'
	| 'converge'
	| 'corners-first'
	| 'cross'
	| 'checkerboard'
	| 'rain'
	| 'pinwheel'
	| 'orbit'
	| 'snake'
	| 'zigzag'
	| 'heartbeat'
	| 'ripple'
	| 'ring'
	| 'dominoes'
	| 'edges-first'
	| 'cascade'
	| 'burst'
	| 'twinkle'
	| 'scatter';

export type ThemeName =
	| 'white'
	| 'cyan'
	| 'ember'
	| 'matrix'
	| 'violet'
	| 'amber'
	| 'aurora'
	| 'prism'
	| 'rainbow'
	| 'fire'
	| 'ocean'
	| 'pastel'
	| 'sunset'
	| 'neon'
	| 'sakura'
	| 'forest'
	| 'midnight'
	| 'candy';
