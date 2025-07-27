import React from 'react';

interface IPaginationBlockProps {
  changePage: (page: number) => void;
  currentPage: number;
  totalPageCount: number;
}

const PaginationBlock: React.FC<IPaginationBlockProps> = ({
  changePage,
  currentPage,
  totalPageCount,
}) => {
  const goToPage = (page: number) => {
    changePage(page);
  };

  return (
    <div>
      <div className="pagination mt-4 flex justify-center gap-2">
        <button
          className="cursor-pointer w-full rounded-md bg-blue-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-500 focus:shadow-none active:bg-blue-300 hover:bg-blue-400 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          Prev
        </button>

        <div className="flex items-center align-baseline pl-5 pr-5 w-full">
          {`${currentPage} / ${totalPageCount}`}
        </div>

        <button
          className="cursor-pointer w-full rounded-md bg-blue-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-500 focus:shadow-none active:bg-blue-300 hover:bg-blue-400 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          disabled={currentPage === totalPageCount}
          onClick={() => goToPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationBlock;
