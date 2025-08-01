import React from 'react';
import { useNavigate } from 'react-router-dom';
import BaseButton from '../BaseButton/BaseButton.tsx';

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
        <BaseButton disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)}>
          Prev
        </BaseButton>

        <div className="flex items-center align-baseline pl-5 pr-5 w-full">
          {`${currentPage} / ${totalPageCount}`}
        </div>

        <BaseButton
          disabled={currentPage === totalPageCount}
          onClick={() => goToPage(currentPage + 1)}
        >
          Next
        </BaseButton>
      </div>
    </>
  );
};

export default PaginationBlock;
