import { useMemo, useState } from 'react';
import {
	PixelGrid,
	presets,
	presetNames,
	themeNames,
	type PresetName,
	type ThemeName
} from '../lib/index.js';

export function Playground({ onCopy }: { onCopy: (msg: string) => void }) {
	const [presetName, setPresetName] = useState<PresetName>('spiral-cw');
	const [theme, setTheme] = useState<ThemeName>('aurora');
	const [duration, setDuration] = useState(presets['spiral-cw'].duration);
	const [cellSize, setCellSize] = useState(20);
	const [gap, setGap] = useState(3);
	const [radius, setRadius] = useState(3);
	const [paused, setPaused] = useState(false);
	const [delays, setDelays] = useState<number[]>(() => [...presets['spiral-cw'].delays]);
	const [useCustomColor, setUseCustomColor] = useState(false);
	const [customColor, setCustomColor] = useState('#7df9ff');

	const applyPreset = (name: PresetName) => {
		setPresetName(name);
		setDelays([...presets[name].delays]);
		setDuration(presets[name].duration);
	};

	const setDelay = (i: number, value: number) => {
		setDelays((d) => {
			const next = d.slice();
			next[i] = value;
			return next;
		});
	};

	const snippet = useMemo(() => {
		const colorLine = useCustomColor ? `\n  color="${customColor}"` : `\n  theme="${theme}"`;
		return `<PixelGrid
  delays={${JSON.stringify(delays)}}
  duration={${duration}}${colorLine}
  cellSize={${cellSize}}
  gap={${gap}}
  radius={${radius}}${paused ? '\n  paused' : ''}
/>`;
	}, [delays, duration, theme, cellSize, gap, radius, paused, useCustomColor, customColor]);

	const copySnippet = () => {
		void navigator.clipboard?.writeText(snippet).then(() => onCopy('snippet copied'));
	};

	return (
		<section>
			<header>
				<h2>playground</h2>
				<p className="section-hint">
					Tune every prop live. The snippet at the bottom updates as you go.
				</p>
			</header>

			<div className="playground">
				<div className="panel">
					<Field label="preset">
						<select value={presetName} onChange={(e) => applyPreset(e.target.value as PresetName)}>
							{presetNames.map((n) => (
								<option key={n} value={n}>
									{n}
								</option>
							))}
						</select>
					</Field>

					<Field label="theme">
						<select
							value={theme}
							onChange={(e) => setTheme(e.target.value as ThemeName)}
							disabled={useCustomColor}
							style={{ opacity: useCustomColor ? 0.5 : 1 }}
						>
							{themeNames.map((n) => (
								<option key={n} value={n}>
									{n}
								</option>
							))}
						</select>
					</Field>

					<Field label="custom color">
						<label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
							<input
								type="checkbox"
								checked={useCustomColor}
								onChange={(e) => setUseCustomColor(e.target.checked)}
							/>
							<span
								style={{
									color: 'var(--text-dim)',
									fontFamily: 'var(--mono)',
									fontSize: '0.8rem'
								}}
							>
								override theme · auto-derives glow & off
							</span>
						</label>
						{useCustomColor && (
							<div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', alignItems: 'center' }}>
								<input
									type="color"
									value={customColor}
									onChange={(e) => setCustomColor(e.target.value)}
									style={{
										width: 44,
										height: 32,
										padding: 0,
										border: '1px solid var(--border)',
										borderRadius: 6,
										background: 'transparent'
									}}
								/>
								<input
									type="text"
									value={customColor}
									onChange={(e) => setCustomColor(e.target.value)}
									style={{ flex: 1 }}
								/>
							</div>
						)}
					</Field>

					<Slider
						label="cellSize"
						value={cellSize}
						min={4}
						max={48}
						onChange={setCellSize}
						unit="px"
					/>
					<Slider label="gap" value={gap} min={0} max={12} onChange={setGap} unit="px" />
					<Slider
						label="radius"
						value={radius}
						min={0}
						max={Math.floor(cellSize / 2)}
						onChange={setRadius}
						unit="px"
					/>
					<Slider
						label="duration"
						value={duration}
						min={40}
						max={800}
						step={10}
						onChange={setDuration}
						unit="ms"
					/>

					<Field label="delays (ms, row-major)">
						<div className="delays-matrix">
							{delays.map((d, i) => (
								<input
									key={i}
									type="number"
									value={d}
									min={0}
									max={2000}
									step={20}
									onChange={(e) => setDelay(i, Number(e.target.value) || 0)}
								/>
							))}
						</div>
					</Field>

					<Field label="paused">
						<label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
							<input
								type="checkbox"
								checked={paused}
								onChange={(e) => setPaused(e.target.checked)}
							/>
							<span style={{ color: 'var(--text-dim)', fontFamily: 'var(--mono)', fontSize: '0.8rem' }}>
								freeze animation
							</span>
						</label>
					</Field>
				</div>

				<div>
					<div className="preview">
						<PixelGrid
							delays={delays}
							duration={duration}
							{...(useCustomColor ? { color: customColor } : { theme })}
							cellSize={cellSize}
							gap={gap}
							radius={radius}
							paused={paused}
						/>
					</div>

					<div className="snippet">
						<header>
							<h3>jsx</h3>
							<button className="btn" onClick={copySnippet}>
								copy
							</button>
						</header>
						<pre>
							<code>{snippet}</code>
						</pre>
					</div>
				</div>
			</div>
		</section>
	);
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
	return (
		<div className="field">
			<label>
				<span style={{ color: 'var(--text-dim)' }}>{label}</span>
			</label>
			{children}
		</div>
	);
}

function Slider({
	label,
	value,
	min,
	max,
	step,
	unit,
	onChange
}: {
	label: string;
	value: number;
	min: number;
	max: number;
	step?: number;
	unit?: string;
	onChange: (v: number) => void;
}) {
	return (
		<div className="field">
			<label>
				<span>{label}</span>
				<span>
					{value}
					{unit ?? ''}
				</span>
			</label>
			<input
				type="range"
				value={value}
				min={min}
				max={max}
				step={step ?? 1}
				onChange={(e) => onChange(Number(e.target.value))}
			/>
		</div>
	);
}
