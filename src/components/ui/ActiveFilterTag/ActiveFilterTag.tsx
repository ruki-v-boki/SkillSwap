import styles from './ActiveFilterTag.module.css';
import closeIcon from '@/assets/icons/cross.svg';
import type { ActiveFilterTagUIProps } from './type';
import { getCategoryConfig } from '@/utils/helpers';


export function ActiveFilterTagUI({
  label,
  categoryId,
  onRemove,
}: ActiveFilterTagUIProps) {

  const config = getCategoryConfig(categoryId || '');

  return (
    <button
      onClick={onRemove}
      className={`${config.colorClass} ${styles.tag}`}
    >
      <span className="h-body">{label}</span>
      <img src={closeIcon} alt="" aria-hidden="true" />
    </button>
  );
}