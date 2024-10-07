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
    if (totalPages <= 1) return pages;

    if (currentPage > 3) {
      pages.push(1, 2, 3, '...');
    }

    if (currentPage > 1 && currentPage <= totalPages) {
      if (currentPage > 3) pages.push(currentPage - 1);
      pages.push(currentPage);
      if (currentPage < totalPages - 2) pages.push(currentPage + 1);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...', totalPages - 2, totalPages - 1, totalPages);
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
