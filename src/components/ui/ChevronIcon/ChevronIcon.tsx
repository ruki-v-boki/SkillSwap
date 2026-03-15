import styles from './ChevronIcon.module.css';
import chevronIcon from '@/assets/icons/chevronIcon.svg'
import type { ChevronIconProps } from './type';


export function ChevronIcon({ open, rotate = 0 }: ChevronIconProps): React.ReactElement {
  const rotation = open ? rotate + 180 : rotate;

  return (
    <img
      src={chevronIcon}
      alt=""
      aria-hidden="true"
      className={[styles.chevron, open ? styles.chevronOpen : ''].filter(Boolean).join(' ')}
      style={{ transform: `rotate(${rotation}deg)` }}
    />
  );
}