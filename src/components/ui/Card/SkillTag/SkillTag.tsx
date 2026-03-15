import type { TSkillTagUIProps } from './type';
import styles from './SkillTag.module.css';

export function SkillTagUI({ name, category, count }: Readonly<TSkillTagUIProps>) {
  const categoryClass = styles[category.id];

  if (category.id === 'plus' && count !== undefined) {
    return (
      <div className={`${styles.tag} ${styles.plus}`}>
        <span className={`${styles.text} h-caption`}>+{count}</span>
      </div>
    );
  }

// ---------------------------------------------------------------

  return (
    <div className={`${styles.tag} ${categoryClass}`}>
      <span className={`${styles.text} h-caption`}>{name}</span>
    </div>
  );
}