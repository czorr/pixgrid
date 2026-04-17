import { useState } from 'react';

export interface CodeTab {
	label: string;
	code: string;
}

export interface CodeBlockProps {
	code?: string;
	label?: string;
	tabs?: CodeTab[];
	onCopy?: (msg: string) => void;
}

/**
 * A framed code block: outer lighter frame, inner darker `<pre>`, tabs with
 * underline indicator for the active variant, icon-only copy button in the
 * header. Pass either `code` (single) or `tabs` (multi-variant).
 */
export function CodeBlock({ code, label, tabs, onCopy }: CodeBlockProps) {
	const [active, setActive] = useState(0);
	const activeCode = tabs ? tabs[active]?.code ?? '' : code ?? '';

	const copy = () => {
		void navigator.clipboard?.writeText(activeCode).then(() => onCopy?.('copied'));
	};

	return (
		<div className="code-block">
			<div className="code-block-header">
				<div className="code-block-tabs">
					{tabs
						? tabs.map((t, i) => (
								<button
									key={t.label}
									type="button"
									className={`code-block-tab${i === active ? ' is-active' : ''}`}
									onClick={() => setActive(i)}
								>
									{t.label}
								</button>
						  ))
						: label && <span className="code-block-tab is-active">{label}</span>}
				</div>
				<button
					type="button"
					className="code-block-copy"
					onClick={copy}
					aria-label="copy code"
				>
					<CopyIcon />
				</button>
			</div>
			<pre className="code-block-content">
				<code>{activeCode}</code>
			</pre>
		</div>
	);
}

function CopyIcon() {
	return (
		<svg width="14" height="14" viewBox="0 0 15 15" fill="none" aria-hidden="true">
			<rect
				x="4.25"
				y="4.25"
				width="8.5"
				height="8.5"
				rx="1.5"
				stroke="currentColor"
				strokeWidth="1.2"
			/>
			<path
				d="M2.25 10.25V3.5A1.5 1.5 0 0 1 3.75 2h6.75"
				stroke="currentColor"
				strokeWidth="1.2"
			/>
		</svg>
	);
}
