import {
	PixelGrid,
	presetNames,
	themeNames,
	type PresetName,
	type RadiusValue,
	type ThemeName
} from '../lib/index.js';
import { ExampleCard } from './ExampleCard.js';
import { Playground } from './Playground.js';
import { useToast, Toast } from './Toast.js';

export function App() {
	const { toast, show } = useToast();

	return (
		<>
			<main>
				<Hero />
				<PresetGallery onCopy={show} />
				<ThemeGallery onCopy={show} />
				<RadiusShowcase onCopy={show} />
				<Playground onCopy={show} />
				<Usage />
				<footer>
					by <a href="https://czorr.com">czorr</a>.
					MIT.
				</footer>
			</main>
			<Toast toast={toast} />
		</>
	);
}

/* ─── Hero ─────────────────────────────────────────────── */

function Hero() {
	return (
		<section className="hero">
			<h1>
				pixgrid
				<PixelGrid theme="aurora" preset="spiral-cw" cellSize={4} gap={2} radius={1} />
			</h1>
			<p>
				A tiny animated 3×3 pixel grid indicator for React. Zero runtime dependencies,
				multi-color palettes, rounded cells, 30 preset patterns. ~1 KB gzipped.
			</p>
			<code className="install">npm install pixgrid</code>
		</section>
	);
}

/* ─── Preset gallery ───────────────────────────────────── */

function PresetGallery({ onCopy }: { onCopy: (msg: string) => void }) {
	return (
		<section>
			<header>
				<h2>presets</h2>
				<p className="section-hint">
					{presetNames.length} stagger patterns. Click any card to see and copy its JSX.
				</p>
			</header>
			<div className="cards">
				{presetNames.map((name) => (
					<ExampleCard
						key={name}
						label={name}
						props={{ preset: name }}
						onCopy={onCopy}
					/>
				))}
			</div>
		</section>
	);
}

/* ─── Theme gallery ────────────────────────────────────── */

function ThemeGallery({ onCopy }: { onCopy: (msg: string) => void }) {
	return (
		<section>
			<header>
				<h2>themes</h2>
				<p className="section-hint">
					Single-color and multi-color palettes. Supply <code>color</code>/<code>glow</code>/<code>off</code>
					{' '}as a string, array of 9, or function to override.
				</p>
			</header>
			<div className="cards">
				{themeNames.map((name) => (
					<ExampleCard
						key={name}
						label={name}
						props={{ theme: name, preset: 'diagonal-tl' }}
						onCopy={onCopy}
					/>
				))}
			</div>
		</section>
	);
}

/* ─── Radius showcase ──────────────────────────────────── */

function RadiusShowcase({ onCopy }: { onCopy: (msg: string) => void }) {
	const variants: { label: string; radius: RadiusValue; preset: PresetName; theme: ThemeName }[] = [
		{ label: 'square', radius: 0, preset: 'wave-lr', theme: 'cyan' },
		{ label: 'soft 2px', radius: 2, preset: 'pinwheel', theme: 'violet' },
		{ label: 'rounded 4px', radius: 4, preset: 'ripple', theme: 'ocean' },
		{ label: 'circle 50%', radius: '50%', preset: 'orbit', theme: 'prism' },
		{ label: 'pill 999px', radius: 999, preset: 'rain', theme: 'matrix' },
		{
			label: 'mixed',
			radius: [0, 4, 0, 4, '50%', 4, 0, 4, 0] as RadiusValue,
			preset: 'checkerboard',
			theme: 'ember'
		}
	];
	return (
		<section>
			<header>
				<h2>rounded cells</h2>
				<p className="section-hint">
					The <code>radius</code> prop takes a number (px), a CSS length, 9 values, or a function.
				</p>
			</header>
			<div className="cards">
				{variants.map((v) => (
					<ExampleCard
						key={v.label}
						label={v.label}
						props={{ preset: v.preset, theme: v.theme, radius: v.radius }}
						displayCellSize={18}
						displayGap={3}
						onCopy={onCopy}
					/>
				))}
			</div>
		</section>
	);
}

/* ─── Usage docs ───────────────────────────────────────── */

function Usage() {
	const install = `npm install pixgrid`;
	const quick = `import { PixelGrid } from 'pixgrid';

export default function Loading() {
  return <PixelGrid preset="spiral-cw" theme="aurora" radius={2} />;
}`;
	const custom = `// delays: 9 numbers in ms, row-major (top-left → bottom-right)
// color/glow/off: string | string[9] | (ctx) => string
<PixelGrid
  delays={[0, 100, 200, 100, 200, 300, 200, 300, 400]}
  duration={180}
  cellSize={16}
  gap={2}
  radius="50%"
  color={({ index }) => \`oklch(88% 0.2 \${index * 40})\`}
  glow="rgba(255,255,255,0.6)"
  off="rgba(255,255,255,0.08)"
/>`;
	return (
		<section>
			<header>
				<h2>usage</h2>
			</header>

			<h3 style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-faint)', margin: '1.5rem 0 0.5rem' }}>
				install
			</h3>
			<pre><code>{install}</code></pre>

			<h3 style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-faint)', margin: '1.5rem 0 0.5rem' }}>
				quick start
			</h3>
			<pre><code>{quick}</code></pre>

			<h3 style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-faint)', margin: '1.5rem 0 0.5rem' }}>
				full customization
			</h3>
			<pre><code>{custom}</code></pre>

			<h3 style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-faint)', margin: '1.5rem 0 0.5rem' }}>
				props
			</h3>
			<PropsTable />
		</section>
	);
}

function PropsTable() {
	const rows: { prop: string; type: string; default: string; desc: string }[] = [
		{ prop: 'preset', type: 'PresetName', default: '—', desc: 'Named stagger pattern' },
		{ prop: 'delays', type: 'number[9]', default: 'wave-lr', desc: 'Per-cell delay in ms, row-major' },
		{ prop: 'duration', type: 'number', default: '200', desc: 'Hold time after all cells are on' },
		{ prop: 'cellSize', type: 'number', default: '14', desc: 'Cell side length (px)' },
		{ prop: 'gap', type: 'number', default: '1', desc: 'Gap between cells (px)' },
		{ prop: 'radius', type: 'number | string | array | fn', default: '0', desc: 'Per-cell border-radius' },
		{ prop: 'theme', type: 'ThemeName', default: 'white', desc: 'Named color palette' },
		{ prop: 'color', type: 'ColorValue', default: 'theme.color', desc: 'On color (string | 9 | fn)' },
		{ prop: 'glow', type: 'ColorValue', default: 'theme.glow', desc: 'Glow color' },
		{ prop: 'off', type: 'ColorValue', default: 'theme.off', desc: 'Dim color' },
		{ prop: 'paused', type: 'boolean', default: 'false', desc: 'Freeze the animation loop' },
		{ prop: 'startOn', type: 'boolean', default: 'false', desc: 'Start with cells lit' }
	];
	return (
		<div style={{ overflowX: 'auto' }}>
			<table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--mono)', fontSize: '0.85rem' }}>
				<thead>
					<tr style={{ color: 'var(--text-faint)', textAlign: 'left' }}>
						<th style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border)' }}>prop</th>
						<th style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border)' }}>type</th>
						<th style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border)' }}>default</th>
						<th style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border)' }}>description</th>
					</tr>
				</thead>
				<tbody>
					{rows.map((r) => (
						<tr key={r.prop}>
							<td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border)', color: 'var(--accent)' }}>
								{r.prop}
							</td>
							<td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border)', color: 'var(--text-dim)' }}>
								{r.type}
							</td>
							<td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border)', color: 'var(--text-dim)' }}>
								{r.default}
							</td>
							<td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'inherit' }}>
								{r.desc}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

