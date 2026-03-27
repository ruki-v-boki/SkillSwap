import { SkillTagUI } from '../SkillTag/SkillTag';
import type { TSkillsListUIProps } from './type';
import styles from './SkillsList.module.css';

// ---------------------------------------------------------------

export function SkillsListUI({
  tags,
  variant,
  maxVisible = 2,
  styleType
}: TSkillsListUIProps) {

  const visibleTags = tags.slice(0, maxVisible);
  const remainingCount = tags.length - maxVisible;
  const PLUS_CATEGORY = { id: 'plus', name: 'Плюс' };
  const isCatalog = styleType === 'catalog';

  const containerClass = isCatalog
    ? styles.container
    : `${styles.container} ${styles.containerProfile}`;

// ---------------------------------------------------------------

  return (
    <div className={containerClass}>
      <span className={`${styles.skillCategoryTitle} h-4`}>
        {variant === 'teach' ? 'Может научить:' : 'Хочет научиться:'}
      </span>
      <div className={styles.skillsList}>
        {visibleTags.map((tag) => (
          <SkillTagUI
            key={tag.id}
            name={tag.name}
            category={tag.category}
          />
        ))}
        {remainingCount > 0 && (
          <SkillTagUI
            name={`+${remainingCount}`}
            category={PLUS_CATEGORY}
            count={remainingCount}
          />
        )}
      </div>
    </div>
  );
}