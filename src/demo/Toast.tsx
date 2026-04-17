import { useCallback, useEffect, useState } from 'react';

export interface ToastState {
	message: string;
	id: number;
}

export function useToast() {
	const [toast, setToast] = useState<ToastState | null>(null);
	const show = useCallback((message: string) => {
		setToast({ message, id: Date.now() });
	}, []);
	useEffect(() => {
		if (!toast) return;
		const t = setTimeout(() => setToast(null), 1600);
		return () => clearTimeout(t);
	}, [toast]);
	return { toast, show };
}

export function Toast({ toast }: { toast: ToastState | null }) {
	return (
		<div className={`toast${toast ? ' visible' : ''}`}>{toast?.message ?? ''}</div>
	);
}
