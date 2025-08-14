import { byNumber, byString, type Dir, type SortConfig } from '~/hooks/useSorters';

export const sortToggle = <TItem,>({
  id,
  label,
  dirLabels = { asc: 'Asc', desc: 'Desc' },
  getString,
  getNumber,
  initialDir = 'asc' as Dir,
}: {
  id: keyof TItem;
  label: string;
  initialDir?: Dir;
  dirLabels?: { asc: string; desc: string };
  getString?: (x: TItem) => string | null | undefined;
  getNumber?: (x: TItem) => number | null | undefined;
}): SortConfig<TItem, Dir> => {
  const baseCompare =
    getNumber
      ? byNumber(getNumber)
      : getString
      ? byString(getString)
      : (() => 0);

  return {
    id,
    label,
    initial: initialDir,
    render: (dir, setDir) => (
      <div className="flex items-center gap-2">
        <button
          type="button"
          className={`rounded-md px-2 py-1 text-sm ${
            dir === 'asc' ? 'bg-neutral-700' : 'bg-neutral-800'
          }`}
          onClick={() => setDir('asc')}
        >
          {dirLabels.asc}
        </button>
        <button
          type="button"
          className={`rounded-md px-2 py-1 text-sm ${
            dir === 'desc' ? 'bg-neutral-700' : 'bg-neutral-800'
          }`}
          onClick={() => setDir('desc')}
        >
          {dirLabels.desc}
        </button>
      </div>
    ),
    comparator: (a, b, dir) =>
      dir === 'asc' ? baseCompare(a, b) : baseCompare(b, a),
  };
};