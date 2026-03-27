import defaultIcon from '@/assets/icons/user-circle.svg';
import { getCategoryConfig } from '@/utils/helpers';
import type { SkillsMenuUIProps } from './type';
import styles from './SkillsMenu.module.css';

// ---------------------------------------------------------------

export function SkillsMenuUI({
  category,
  subcategories
}: SkillsMenuUIProps) {

  const config = getCategoryConfig(category.id);
  const categorySubcategories = subcategories.filter(
    sub => sub.categoryId === category.id
  );

// ---------------------------------------------------------------

  return (
    <div className={styles.catalogItem}>
      <div className={`${styles.iconBox} ${config.colorClass}`}>
        {config.icon ? (
          <img src={config.icon} alt={category.name} className={styles.icon} />
        ) : (
          <img src={defaultIcon} alt="изображение не найдено" />
        )}
      </div>

      <div className={styles.content}>
        <h2 className="h-2">
          {category.name}
        </h2>
        {categorySubcategories.length > 0 && (
          <ul className={styles.subcategoriesList}>
            {categorySubcategories.map(subcategory => (
              <li key={subcategory.id} className="h-body">
                {subcategory.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}