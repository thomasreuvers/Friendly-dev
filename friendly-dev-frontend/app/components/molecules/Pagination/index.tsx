export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    if (totalPages <= 1) return null;

    const activePage = (page: number) => currentPage === page;
    return (
        <div className="flex justify-center gap-2 mt-8">
            {Array.from({
                length: totalPages
            }, (_, idx) => (
                <button 
                    className={`px-3 py-1 cursor-pointer rounded ${
                        activePage(idx + 1) ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'
                    }`}
                    key={idx+1}
                    onClick={() => onPageChange(idx + 1)}
                >
                    {idx + 1}
                </button>
            ))}
        </div>
    )
};

export default Pagination;
