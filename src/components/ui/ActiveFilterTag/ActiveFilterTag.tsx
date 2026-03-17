import styles from './ActiveFilterTag.module.css';
import closeIcon from '@/assets/icons/cross.svg';
import type { ActiveFilterTagUIProps } from './type';


export function ActiveFilterTagUI({
  label,
  categoryId,
  onRemove,
  className = ''
}: ActiveFilterTagUIProps) {

  const chipClass = categoryId
    ? `${styles.tag} ${styles[categoryId]} ${className}`.trim()
    : `${styles.tag} ${styles.default} ${className}`.trim();

// ---------------------------------------------------------------

  return (
    <button
      onClick={onRemove}
      className={`${chipClass} tag`}
    >
      <span className={`h-body`}>{label}</span>
      <img src={closeIcon} alt="" aria-hidden="true" />
    </button>
  );
}