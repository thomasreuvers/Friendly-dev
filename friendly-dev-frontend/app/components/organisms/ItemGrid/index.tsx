import React, {  } from 'react';
import Pagination from '~/components/molecules/Pagination';
import { AnimatePresence, motion } from 'framer-motion';
import Sorters from '~/components/molecules/sorters';
import { useFilters, type FilterConfig } from '~/hooks/useFilters';
import { useSorters, type SortConfig } from '~/hooks/useSorters';
import { usePagination } from '~/hooks/usePagination';
import Filters from '~/components/molecules/filters';

interface ItemGridProps<TItem> {
    items: TItem[];
    renderItem: (item: TItem, index: number) => React.ReactNode;
    getKey?: (item: TItem, index: number) => React.Key;
    itemsPerPage?: number;
    className?: string;
    filters?: Array<FilterConfig<TItem, any>>;
    sorters?: Array<SortConfig<TItem, any>>;
}

const ItemGrid = <TItem,>({
    renderItem,
    items,
    getKey,
    itemsPerPage = 2,
    className,
    filters = [],
    sorters = [],
}: ItemGridProps<TItem>) => {
    const { filteredItems, filterStates, setFilterState } = useFilters(filters, items);
    const { sortedItems, sorterStates, setSorterState } = useSorters(sorters, filteredItems);
    const { currentPage, totalPages, setCurrentPage, currentItems } = usePagination(sortedItems, itemsPerPage);

    return (
        <>
            {!!filters.length && (
                <Filters
                    filters={filters}
                    filterStates={filterStates}
                    setFilterState={setFilterState}
                    items={items}
                />
            )}

            {!!sorters.length && (
                <Sorters
                    sorters={sorters}
                    sorterStates={sorterStates}
                    setSorterState={setSorterState}
                    items={items}
                />
            )}

            <AnimatePresence mode='wait'>
                <motion.div layout className={`grid gap-6 sm:grid-cols-2 ${className ?? ''}`}>
                    {currentItems.map((item, i) => (
                        <motion.div key={getKey ? getKey(item, i) : i} layout>
                            {renderItem(item, i)}
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </>
    );
}
 
export default ItemGrid;