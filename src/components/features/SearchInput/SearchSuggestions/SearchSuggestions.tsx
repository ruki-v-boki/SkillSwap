import { useSelector } from '@/services/store';
import { selectSearchHistory } from '@/services/slices/search/searchSlice';
import styles from './SearchSuggestions.module.css';

export function SearchSuggestions({ query }: { query: string }) {
  const history = useSelector(selectSearchHistory);

  const filteredHistory = history.filter(item => 
    item.toLowerCase().includes(query.toLowerCase())
  );

  if (filteredHistory.length === 0) return null;

  return (
    <div className={styles.suggestions}>
      <div className={styles.title}>Недавние запросы:</div>
      {filteredHistory.map((item, i) => (
        <button key={i} className={styles.suggestionItem}>
          🔍 {item}
        </button>
      ))}
    </div>
  );
}