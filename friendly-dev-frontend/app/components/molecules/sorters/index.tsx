import type { SortConfig } from '~/hooks/useSorters';

interface SortersProps<TItem> {
  sorters: SortConfig<TItem, any>[];
  sorterStates: Map<string, any>;
  setSorterState: (id: string) => (next: any) => void;
  items: TItem[];
}

const Sorters = <TItem,>({
  sorters,
  sorterStates,
  setSorterState,
  items,
}: SortersProps<TItem>) => {
    return (
        <div className={'mb-4 flex flex-wrap gap-3'}>
          {sorters.map((s) => (
            <div key={s.id.toString()} className="flex items-center gap-2">
              {s.label && <label className="text-sm text-gray-300">{s.label}: </label>}
              {s.render(sorterStates.get(s.id.toString()), setSorterState(s.id.toString()), items)}
            </div>
          ))}
        </div>
    );
}
 
export default Sorters;