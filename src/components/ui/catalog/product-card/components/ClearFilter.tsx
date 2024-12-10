


const ClearFilter = ({ handleResetFilters, totalFilters }: { handleResetFilters: () => void, totalFilters: number }) => {
    return (
        <div className="flex items-center justify-between">
            {totalFilters > 0 && (
                <button
                    onClick={handleResetFilters}
                    className="border bg-white border-[#1E1E1E] text-[14px] text-[#1E1E1E] h-[32px] px-4 rounded hover:bg-white hover:text-[#7C788A] hover:border-[#7C788A] transition"
                >
                    Delete All ({totalFilters})
                </button>
            )}
        </div>
    );
};

export default ClearFilter;
