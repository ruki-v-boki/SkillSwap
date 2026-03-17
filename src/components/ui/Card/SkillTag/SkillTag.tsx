import type { TSkillTagUIProps } from './type';
import styles from './SkillTag.module.css';
import { getCategoryConfig } from '@/utils/helpers';

export function SkillTagUI({ name, category, count }: Readonly<TSkillTagUIProps>) {
  const config = getCategoryConfig(category.id);

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