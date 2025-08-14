import { useMemo, useState } from 'react';

export type Dir = 'asc' | 'desc';

export const byNumber =
    <TItem,>(get: (x: TItem) => number | null | undefined, dir: Dir = 'asc') =>
        (a: TItem, b: TItem) => {
            const av = get(a);
            const bv = get(b);
            const an = av ?? Number.NEGATIVE_INFINITY;
            const bn = bv ?? Number.NEGATIVE_INFINITY;
            return dir === 'asc' ? an - bn : bn - an;
        };

export const byString =
    <TItem,>(get: (x: TItem) => string | null | undefined, dir: Dir = 'asc') =>
        (a: TItem, b: TItem) => {
            const av = (get(a) ?? '').toString().toLowerCase();
            const bv = (get(b) ?? '').toString().toLowerCase();
            if (av < bv) return dir === 'asc' ? -1 : 1;
            if (av > bv) return dir === 'asc' ? 1 : -1;
            return 0;
        };

export interface SortConfig<TItem, TState = unknown> {
    id: keyof TItem | string;
    label?: string;
    /** Initial UI state for this sort (e.g., option key, asc/desc, etc.) */
    initial: TState;
    /** Render a control that updates state */
    render: (
        state: TState,
        setState: (next: TState) => void,
        allItems: TItem[]
    ) => React.ReactNode;
    /** Return standard Array.sort comparator using current state */
    comparator: (a: TItem, b: TItem, state: TState) => number;
}

export const useSorters = <TItem>(sorters: Array<SortConfig<TItem, any>>, items: TItem[]) => {
    const initial = useMemo(() => {
        const m = new Map<string, unknown>();
        for (const s of sorters) m.set(s.id.toString(), s.initial);
        return m;
    }, [sorters]);

    const [states, setStates] = useState(initial);
    const setState = (id: string) => (next: unknown) =>
        setStates((prev) => {
            const m = new Map(prev);
            m.set(id, next);
            return m;
        });

    const sorted = useMemo(() => {
        if (!sorters.length) return items;
        const decorated = items.map((item, idx) => ({ item, idx }));
        decorated.sort((a, b) => {
            for (const s of sorters) {
                const cmp = s.comparator(a.item, b.item, states.get(s.id.toString()));
                if (cmp !== 0) return cmp;
            }
            return a.idx - b.idx;
        });
        return decorated.map((d) => d.item);
    }, [items, sorters, states]);

    return { sortedItems: sorted, sorterStates: states, setSorterState: setState };
}