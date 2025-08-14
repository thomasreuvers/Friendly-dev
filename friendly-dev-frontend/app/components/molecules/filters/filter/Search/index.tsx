import type { FilterConfig } from '~/hooks/useFilters';

export const SearchFilter = <TItem,>({
  id,
  label,
  getText,
  placeholder = 'Search…',
}: {
  id: keyof TItem;
  label: string;
  getText: (item: TItem) => string;
  placeholder?: string;
}): FilterConfig<TItem, string> => ({
  id,
  label,
  initialState: '',
  render: (value, setValue) => (
    <input
      className="rounded-md bg-neutral-800 px-2 py-1 text-sm"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  ),
  predicate: (item, value) => {
    if (!value) return true;
    return getText(item).toLowerCase().includes(value.toLowerCase());
  },
});