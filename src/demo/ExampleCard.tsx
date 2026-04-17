import { useState } from 'react';
import { PixelGrid, type PixelGridProps } from '../lib/index.js';
import { CodeModal } from './CodeModal.js';

/**
 * Gallery card that shows a miniature `PixelGrid` and opens a modal with
 * the full JSX snippet on click. `props` is the "essence" of the example —
 * exactly what should land in the copyable snippet. Display-only overrides
 * (`displayCellSize`, `displayGap`, `displayRadius`) don't appear in the
 * snippet.
 */
export function ExampleCard({
	label,
	props,
	displayCellSize = 14,
	displayGap = 2,
	displayRadius,
	onCopy
}: {
	label: string;
	props: Partial<PixelGridProps>;
	displayCellSize?: number;
	displayGap?: number;
	displayRadius?: PixelGridProps['radius'];
	onCopy: (msg: string) => void;
}) {
	const [open, setOpen] = useState(false);

	const openModal = () => setOpen(true);
	const onKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			openModal();
		}
	};

	return (
		<>
			<div
				className="card card-clickable"
				onClick={openModal}
				onKeyDown={onKeyDown}
				role="button"
				tabIndex={0}
				aria-label={`Open ${label} example`}
			>
				<PixelGrid
					{...props}
					cellSize={displayCellSize}
					gap={displayGap}
					radius={displayRadius ?? props.radius ?? 1}
				/>
				<span className="label">{label}</span>
			</div>
			<CodeModal
				open={open}
				onClose={() => setOpen(false)}
				label={label}
				props={props}
				onCopy={onCopy}
			/>
		</>
	);
}
