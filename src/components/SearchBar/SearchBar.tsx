import { useState } from 'react';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  initialQuery = '',
}) => {
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className={styles.searchContainer}>
      <Input
        type="text"
        placeholder="Поиск статей..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={styles.searchInput}
      />
      <Button onClick={handleSearch} className={styles.searchButton}>
        Искать
      </Button>
    </div>
  );
};
