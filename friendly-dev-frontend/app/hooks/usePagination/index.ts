import { useState, useMemo, useEffect } from 'react';

export const usePagination = <TItem>(items: TItem[], itemsPerPage: number) => {
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const currentItems = useMemo(() => {
        const last = page * itemsPerPage;
        const first = last - itemsPerPage;
        return items.slice(first, last);
    }, [items, page, itemsPerPage]);

    useEffect(() => {
        // reset if items change
        setPage(1);
    }, [items, itemsPerPage]);

    return { currentPage: page, totalPages, setCurrentPage: setPage, currentItems };
}