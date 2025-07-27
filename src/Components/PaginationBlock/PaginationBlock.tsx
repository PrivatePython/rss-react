import React from 'react';
import { useNavigate } from 'react-router-dom';

interface IPaginationBlockProps {
  currentPage: number;
  totalPageCount: number;
}

const PaginationBlock: React.FC<IPaginationBlockProps> = ({ currentPage, totalPageCount }) => {
  const navigate = useNavigate();
  const goToPage = (page: number) => {
    const path = '/' + page;
    navigate(path);
  };

  return (
    <>
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
    </>
  );
};

export default PaginationBlock;
