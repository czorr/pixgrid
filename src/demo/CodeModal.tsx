import { useEffect } from 'react';
import { PixelGrid, type PixelGridProps } from '../lib/index.js';

/**
 * Render a `<PixelGrid>` prop bag as readable JSX source.
 */
export function formatJsx(props: Partial<PixelGridProps>): string {
	const entries = Object.entries(props).filter(([, v]) => v !== undefined && v !== false);
	if (entries.length === 0) return '<PixelGrid />';

	const lines: string[] = ['<PixelGrid'];
	for (const [key, value] of entries) {
		if (typeof value === 'string') {
			lines.push(`  ${key}="${value}"`);
		} else if (typeof value === 'number') {
			lines.push(`  ${key}={${value}}`);
		} else if (value === true) {
			lines.push(`  ${key}`);
		} else if (typeof value === 'function') {
			lines.push(`  ${key}={${value.toString()}}`);
		} else {
			lines.push(`  ${key}={${JSON.stringify(value)}}`);
		}
	}
	lines.push('/>');
	return lines.join('\n');
}

export function CodeModal({
	open,
	onClose,
	label,
	props,
	onCopy
}: {
	open: boolean;
	onClose: () => void;
	label: string;
	props: Partial<PixelGridProps>;
	onCopy: (msg: string) => void;
}) {
	useEffect(() => {
		if (!open) return;
		const handler = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		window.addEventListener('keydown', handler);
		const prev = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			window.removeEventListener('keydown', handler);
			document.body.style.overflow = prev;
		};
	}, [open, onClose]);

	if (!open) return null;

	const snippet = formatJsx(props);
	const copy = () => {
		void navigator.clipboard?.writeText(snippet).then(() => onCopy('snippet copied'));
	};

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div
				className="modal"
				role="dialog"
				aria-modal="true"
				aria-label={`${label} example`}
				onClick={(e) => e.stopPropagation()}
			>
				<header className="modal-header">
					<span className="modal-label">{label}</span>
					<button
						className="modal-close"
						onClick={onClose}
						aria-label="Close"
						type="button"
					>
						×
					</button>
				</header>

				<div className="modal-preview">
					<PixelGrid
						{...props}
						cellSize={32}
						gap={4}
						radius={props.radius ?? 2}
					/>
				</div>

				<div className="modal-snippet">
					<header>
						<h4>jsx</h4>
						<button className="btn" onClick={copy} type="button">
							copy
						</button>
					</header>
					<pre>
						<code>{snippet}</code>
					</pre>
				</div>
			</div>
		</div>
	);
}
