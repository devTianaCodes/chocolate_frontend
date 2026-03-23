import { getVisiblePageNumbers } from '../utils/pagination.js';

function getButtonClass(isCurrent) {
  return isCurrent
    ? 'button-primary min-w-[44px] px-4 py-2'
    : 'button-ghost min-w-[44px] px-4 py-2';
}

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = getVisiblePageNumbers(currentPage, totalPages);

  return (
    <nav aria-label="Pagination" className="mt-10 flex flex-wrap items-center justify-center gap-3">
      <button
        type="button"
        className="button-ghost px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          aria-current={page === currentPage ? 'page' : undefined}
          className={getButtonClass(page === currentPage)}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        className="button-ghost px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </nav>
  );
}
