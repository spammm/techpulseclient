import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPages = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const totalPageNumbers = 5;

    if (totalPages <= totalPageNumbers) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const leftBound = Math.max(1, currentPage - 2);
      const rightBound = Math.min(totalPages, currentPage + 2);

      if (leftBound > 1) {
        pages.push(1, '...');
      }

      for (let i = leftBound; i <= rightBound; i++) {
        pages.push(i);
      }

      if (rightBound < totalPages) {
        pages.push('...', totalPages);
      }
    }

    return pages;
  };

  return (
    <nav className={styles.pagination} aria-label="Пагинация">
      <button
        aria-label="Предыдущая страница"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={styles.pageButton}
      >
        Предыдущая
      </button>
      {getPages().map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={index}
            className={styles.pageButton}
            onClick={() => onPageChange(page)}
            disabled={page === currentPage}
            aria-current={page === currentPage ? 'page' : undefined}
            aria-label={`Перейти на страницу ${page}`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className={styles.ellipsis} aria-hidden="true">
            {page}
          </span>
        )
      )}
      <button
        aria-label="Следующая страница"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={styles.pageButton}
      >
        Следующая
      </button>
    </nav>
  );
};
