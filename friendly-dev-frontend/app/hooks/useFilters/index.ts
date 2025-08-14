import { useMemo, useState } from 'react';

export interface FilterConfig<TItem, TState = unknown> {
    id: keyof TItem;
    label?: string;
    /** Initial UI state for this filter */
    initialState: TState;
    /** How to render the UI for this filter */
    render: (
        state: TState,
        setState: (state: TState) => void,
        allItems: TItem[],
    ) => React.ReactNode;
    /** Returns true if the item passes this filter */
    predicate: (item: TItem, state: TState) => boolean;
}

export const useFilters = <TItem>(filters: Array<FilterConfig<TItem, any>>, items: TItem[]) => {
    const initial = useMemo(() => {
        const m = new Map<string, unknown>();
        for (const f of filters) m.set(f.id.toString(), f.initialState);
        return m;
    }, [filters]);

    const [states, setStates] = useState(initial);
    const setState = (id: string) => (next: unknown) =>
        setStates((prev) => {
            const m = new Map(prev);
            m.set(id, next);
            return m;
        });

    const filtered = useMemo(() => {
        if (!filters.length) return items;
        return items.filter((item) =>
            filters.every((f) => f.predicate(item, states.get(f.id.toString())))
        );
    }, [items, filters, states]);

    return { filteredItems: filtered, filterStates: states, setFilterState: setState };
}