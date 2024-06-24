import Image from 'next/image';
import {ChevronLeftBlack, ChevronRightBlack} from '@/public';
import '@/styles/tablePagination.scss';

export default function TablePaginationSupport({
  pagination,
  setPagination,
  limit,
}: {
  pagination: any;
  setPagination: any;
  limit: any;
}) {
  function getPaginationRange(currentPage: any, totalPages: any) {
    const delta = 2; // Number of pages to show around the current page
    const range = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      range.unshift('...');
    }
    if (currentPage + delta < totalPages - 1) {
      range.push('...');
    }

    range.unshift(1);
    if (totalPages > 1) range.push(totalPages);

    return range;
  }

  const paginationRange = getPaginationRange(
    pagination.currentPage,
    Math.ceil(pagination.totalCount / limit) // create the totalPages
  );

  const handlePageChange = (page: any) => {
    if (page === '...') return;
    // Update the URL with the new page
    setPagination((prev: any) => ({...prev, currentPage: page}));
  };

  return (
    <div className='table_pagination_container'>
      <button
        className='table_pagination_chevron_left'
        onClick={() => handlePageChange(pagination.currentPage - 1)}
        disabled={pagination.currentPage === 1}
      >
        <Image src={ChevronLeftBlack} alt='chevron left' />
      </button>
      {paginationRange.map((page, idx) => (
        <button
          key={page + idx}
          className={`table_pagination_content ${
            page === pagination.currentPage ? 'active' : ''
          }`}
          onClick={() => handlePageChange(page)}
        >
          <p
            className={`table_pagination_content_text ${
              page === pagination.currentPage ? 'active' : ''
            }`}
          >
            {page}
          </p>
        </button>
      ))}
      <button
        className='table_pagination_chevron_right'
        onClick={() => handlePageChange(pagination.currentPage + 1)}
        disabled={pagination.currentPage === pagination.totalCount % limit}
      >
        <Image src={ChevronRightBlack} alt='chevron right' />
      </button>
    </div>
  );
}
