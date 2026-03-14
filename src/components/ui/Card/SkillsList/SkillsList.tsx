import { SkillTagUI } from '../SkillTag/SkillTag';
import styles from './SkillsList.module.css';
import type { TSkillsListUIProps } from './type';



export function SkillsListUI({ tags, variant, maxVisible = 2 }: TSkillsListUIProps) {
  const visibleTags = tags.slice(0, maxVisible);
  const remainingCount = tags.length - maxVisible;
  const plusCategory = { id: 'plus', name: 'Плюс' };

  return (
    <div className={styles.container}>
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
            category={plusCategory}
            count={remainingCount}
          />
        )}
      </div>
    </div>
  );
}