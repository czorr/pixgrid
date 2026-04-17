import { useEffect, useMemo, useRef, type CSSProperties } from 'react';
import { deriveGlow, deriveOff, presets, themes } from './presets.js';
import type {
	CellContext,
	ColorValue,
	PixelGridProps,
	RadiusValue
} from './types.js';

const DEFAULT_DELAYS = presets['wave-lr'].delays;
const DEFAULT_DURATION = presets['wave-lr'].duration;
const DEFAULT_THEME = themes.white;

const INDICES = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const;

function resolveColor(value: ColorValue, ctx: CellContext): string {
	if (typeof value === 'string') return value;
	if (typeof value === 'function') return value(ctx);
	return value[ctx.index] ?? value[value.length - 1] ?? '';
}

function resolveRadius(value: RadiusValue | undefined, ctx: CellContext): string {
	if (value == null) return '0';
	if (typeof value === 'number') return `${value}px`;
	if (typeof value === 'string') return value;
	if (typeof value === 'function') {
		const r = value(ctx);
		return typeof r === 'number' ? `${r}px` : r;
	}
	const r = value[ctx.index];
	if (r == null) return '0';
	return typeof r === 'number' ? `${r}px` : r;
}

/**
 * Detect `prefers-reduced-motion` without triggering a re-render storm.
 * Read via ref in the effect instead of a state hook — cheaper when many
 * grids mount simultaneously.
 */
function prefersReducedMotion(): boolean {
	if (typeof window === 'undefined' || !window.matchMedia) return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function PixelGrid({
	preset,
	delays: delaysProp,
	duration: durationProp,
	cellSize = 14,
	gap = 1,
	radius,
	theme,
	color: colorProp,
	glow: glowProp,
	off: offProp,
	paused = false,
	startOn = false,
	className,
	style
}: PixelGridProps) {
	// ---- Resolve pattern --------------------------------------------------
	const { delays, duration } = useMemo(() => {
		const base = preset
			? presets[preset]
			: { delays: DEFAULT_DELAYS, duration: DEFAULT_DURATION };
		return {
			delays: delaysProp ?? base.delays,
			duration: durationProp ?? base.duration
		};
	}, [preset, delaysProp, durationProp]);

	// ---- Resolve per-cell colors + radius --------------------------------
	//
	// Resolution priority (both glow and off follow the same rules):
	//   1. Explicit `glow` / `off` prop wins.
	//   2. If the user supplied `color` explicitly, auto-derive from the
	//      resolved on-color via `color-mix`. That way
	//      `<PixelGrid color="#7df9ff" />` just works.
	//   3. Otherwise fall back to the theme's glow/off (or the default).
	const resolved = useMemo(() => {
		const base = theme ? themes[theme] : DEFAULT_THEME;
		const colorValue: ColorValue = colorProp ?? base.color;
		const colorWasOverridden = colorProp != null;

		return INDICES.map((i) => {
			const ctx: CellContext = {
				index: i,
				col: i % 3,
				row: Math.floor(i / 3),
				delay: delays[i] ?? 0
			};
			const onColor = resolveColor(colorValue, ctx);

			const glowColor =
				glowProp != null
					? resolveColor(glowProp, ctx)
					: colorWasOverridden
					? deriveGlow(onColor)
					: resolveColor(base.glow, ctx);

			const offColor =
				offProp != null
					? resolveColor(offProp, ctx)
					: colorWasOverridden
					? deriveOff(onColor)
					: resolveColor(base.off, ctx);

			return {
				on: onColor,
				glow: glowColor,
				off: offColor,
				radius: resolveRadius(radius, ctx)
			};
		});
	}, [theme, colorProp, glowProp, offProp, radius, delays]);

	// ---- Imperative animation loop ---------------------------------------
	// We mutate the DOM directly through refs instead of calling setState on
	// every phase toggle. Only one React render happens per mount; the
	// compositor handles every visual frame because only `opacity` changes.
	const onLayerRefs = useRef<(HTMLDivElement | null)[]>(
		Array(9).fill(null) as (HTMLDivElement | null)[]
	);

	useEffect(() => {
		if (paused) return;

		const reduceMotion = prefersReducedMotion();
		const timeouts = new Set<ReturnType<typeof setTimeout>>();
		let cancelled = false;

		// If motion is reduced, use a near-instant transition so cells still
		// toggle visibly — just without the 300ms fade.
		const transition = reduceMotion
			? 'opacity 1ms linear'
			: 'opacity 280ms cubic-bezier(0.4, 0, 0.6, 1)';

		for (const el of onLayerRefs.current) {
			if (el) el.style.transition = transition;
		}

		const phase = (on: boolean) => {
			if (cancelled) return;
			let maxDelay = 0;
			for (let i = 0; i < 9; i++) {
				const d = delays[i] ?? 0;
				if (d > maxDelay) maxDelay = d;
				const t = setTimeout(() => {
					const el = onLayerRefs.current[i];
					if (el) el.style.opacity = on ? '1' : '0';
				}, d);
				timeouts.add(t);
			}
			const next = setTimeout(() => phase(!on), maxDelay + duration);
			timeouts.add(next);
		};

		phase(true);

		return () => {
			cancelled = true;
			for (const t of timeouts) clearTimeout(t);
			timeouts.clear();
		};
	}, [delays, duration, paused]);

	// ---- Render (once) ----------------------------------------------------
	const containerStyle: CSSProperties = {
		display: 'inline-grid',
		gridTemplateColumns: `repeat(3, ${cellSize}px)`,
		gridTemplateRows: `repeat(3, ${cellSize}px)`,
		gap: `${gap}px`,
		lineHeight: 0,
		verticalAlign: 'middle',
		...style
	};

	const glowSize = cellSize * 1.25;

	return (
		<div
			className={className}
			style={containerStyle}
			aria-hidden="true"
			role="presentation"
		>
			{INDICES.map((i) => {
				const r = resolved[i]!;
				const cellStyle: CSSProperties = {
					position: 'relative',
					width: cellSize,
					height: cellSize,
					borderRadius: r.radius,
					backgroundColor: r.off
				};
				const onStyle: CSSProperties = {
					position: 'absolute',
					inset: 0,
					borderRadius: 'inherit',
					backgroundColor: r.on,
					boxShadow: `0 0 ${glowSize}px 0 ${r.glow}`,
					opacity: startOn ? 1 : 0,
					// `transition` is set by the effect so we can honor reduced-motion
					// without a second render.
					willChange: 'opacity',
					pointerEvents: 'none'
				};
				return (
					<div key={i} style={cellStyle}>
						<div
							ref={(el) => {
								onLayerRefs.current[i] = el;
							}}
							style={onStyle}
						/>
					</div>
				);
			})}
		</div>
	);
}

export default PixelGrid;
