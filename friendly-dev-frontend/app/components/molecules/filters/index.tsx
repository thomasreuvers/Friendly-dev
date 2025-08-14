import type { FilterConfig } from '~/hooks/useFilters';

export interface FiltersProps<TItem> {
    filters: Array<FilterConfig<TItem, any>>;
    filterStates: Map<string, any>;
    setFilterState: (id: string) => (next: any) => void;
    items: TItem[];
}

const Filters = <TItem,>({ filters, filterStates, setFilterState, items }: FiltersProps<TItem>) => {
    return ( 
        <div className={'mb-4 flex flex-wrap gap-3'}>
            {filters.map((f) => (
                <div key={f.id.toString()} className="flex items-center gap-2">
                {f.label && <label className="text-sm text-gray-300">{f.label}:</label>}
                {f.render(
                    filterStates.get(f.id.toString()),
                    setFilterState(f.id.toString()),
                    items
                )}
                </div>
            ))}
        </div>
     );
}
 
export default Filters;