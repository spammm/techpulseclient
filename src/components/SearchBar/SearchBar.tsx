import { useEffect, useState } from 'react';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import routes from '@/config/routes';
import styles from './SearchBar.module.scss';

const NEXT_PUBLIC_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  initialQuery = '',
}) => {
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);

  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <form
      className={styles.searchContainer}
      onSubmit={(e) => e.preventDefault()}
      itemScope
      role="search"
    >
      <span itemProp="target" style={{ display: 'none' }}>
        {`${NEXT_PUBLIC_SITE_URL}${routes.search}?q={search_term_string}`}
      </span>
      <meta itemProp="query-input" content="required name=search_term_string" />
      <Input
        type="text"
        name="search_term_string"
        itemProp="query-input"
        required
        placeholder="Поиск статей..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className={styles.searchInput}
      />
      <Button
        onClick={handleSearch}
        className={styles.searchButton}
        aria-label="Запустить поиск"
        variant="white"
      >
        Искать
      </Button>
    </form>
  );
};
