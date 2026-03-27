import { getCategoryConfig } from '@/utils/helpers';
import type { TSkillTagUIProps } from './type';
import styles from './SkillTag.module.css';

// ---------------------------------------------------------------

export function SkillTagUI({
  name,
  category,
  count
}: TSkillTagUIProps) {

  const config = getCategoryConfig(category.id);

// ---------------------------------------------------------------

  if (category.id === 'plus' && count !== undefined) {
    return (
      <div className={`${styles.tag} ${config.colorClass}`}>
        <span className={`${styles.text} h-caption`}>+{count}</span>
      </div>
    );
  }

// ---------------------------------------------------------------

  return (
    <div className={`${styles.tag} ${config.colorClass}`}>
      <span className={`${styles.text} h-caption`}>{name}</span>
    </div>
  );
}