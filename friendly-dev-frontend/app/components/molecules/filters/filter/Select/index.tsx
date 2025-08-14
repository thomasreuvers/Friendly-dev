import type { FilterConfig } from '~/hooks/useFilters';

const SelectFilter = <TItem, TValue extends string | number>({
  id,
  label,
  getValue,
  includeAll = true,
  allLabel = 'All',
}: {
  id: keyof TItem;
  label?: string;
  getValue: (item: TItem) => TValue | null | undefined;
  includeAll?: boolean;
  allLabel?: string;
}): FilterConfig<TItem, TValue | 'ALL'> => ({
  id,
  label,
  initialState: 'ALL' as const,
  render: (state, setState, allItems) => {
    const values = Array.from(
      new Set(
        allItems
          .map(getValue)
          .filter((v): v is TValue => v !== null && v !== undefined)
      )
    );
    return (
      <select
        className="rounded-md bg-neutral-800 px-2 py-1 text-sm"
        value={String(state)}
        onChange={(e) =>
          setState(
            (includeAll && e.target.value === 'ALL'
              ? 'ALL'
              : (e.target.value as any)) as TValue | 'ALL'
          )
        }
      >
        {includeAll && <option value="ALL">{allLabel}</option>}
        {values.map((v) => (
          <option key={String(v)} value={String(v)}>
            {String(v)}
          </option>
        ))}
      </select>
    );
  },
  predicate: (item, state) =>
    state === 'ALL' || getValue(item) === (state as TValue),
});

export default SelectFilter;