import styles from './Loader.module.css';

// ---------------------------------------------------------------

export function Loader () {

  return (
    <div className={styles.loaderBox}>
      <div className={styles.loaderCircle} />
    </div>
  )
}