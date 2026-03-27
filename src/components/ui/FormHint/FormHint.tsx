import type { FormHintUIProps } from './type';
import styles from './FormHint.module.css';

// ---------------------------------------------------------------

export function FormHintUI ({
  image,
  title,
  text
}: FormHintUIProps) {

  return (
    <div className={styles.hint}>
      <div>
        <img
          src={image}
          alt={title}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <h2 className={`h-2`}>{title}</h2>
        <p className={`${styles.text} h-body`}>{text}</p>
      </div>
    </div>
  )
}