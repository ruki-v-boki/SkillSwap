import { ActiveFilters } from "@/components/features/ActiveFilters/ActiveFilters";
import { Catalog } from '@/components/features/Catalog';
import { Filter } from '@/components/features/Filter';
import styles from './HomePage.module.css';

// ---------------------------------------------------------------

export function HomePage() {
  return (
    <div className={styles.homePageContainer}>
      <aside className={styles.aside}>
        <Filter />
      </aside>

      <main className={styles.homePageCatalog}>
        <ActiveFilters />
        <Catalog />
      </main>
    </div>
  );
}