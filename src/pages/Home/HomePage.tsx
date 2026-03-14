import styles from './HomePage.module.css'
import { MOCK_USERS } from '@/mock/users';
import { CatalogSectionUI } from '@/components/ui/CatalogSection';


export function HomePage() {

  return (
    <div className={styles.pageContainer}>

      <aside className={styles.aside}>
        <h2>Aside</h2>
      </aside>


      <main className={styles.catalogContainer}>
        <CatalogSectionUI
          users={MOCK_USERS}
          title='Популярное'
          visibleCardsValue={3}
        />
        <CatalogSectionUI
          users={MOCK_USERS}
          title='Новое'
          visibleCardsValue={3}
        />
        <CatalogSectionUI
          users={MOCK_USERS}
          title='Рекомендуемое'
        />
      </main>


    </div>
  );
}