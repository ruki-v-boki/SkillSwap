import { NavLink } from 'react-router-dom'
import { LogoUI } from '../Logo'
import styles from './Footer.module.css'


export function FooterUI() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.header}>
        <LogoUI to='/home' />
      </div>

      <div className={styles.main}>
        <div className={styles.navContent}>

          <div className={`${styles.column} ${styles.columnStart}`}>
            <ul className={styles.list}>
              <li>
                <NavLink
                  to={'/about'}
                  className={`${styles.listLink} h-body`}
                >
                  О проекте
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/skills'}
                  className={`${styles.listLink} h-body`}
                >
                  Все навыки
                </NavLink>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <ul className={styles.list}>
              <li>
                <NavLink
                  to={'/contacts'}
                  className={`${styles.listLink} h-body`}
                >
                  Контакты
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/blog'}
                  className={`${styles.listLink} h-body`}
                >
                  Блог
                </NavLink>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <ul className={styles.list}>
              <li>
                <NavLink
                  to={'/policy'}
                  className={`${styles.listLink} h-body`}
                >
                  Политика конфиденциальности
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/terms'}
                  className={`${styles.listLink} h-body`}
                >
                  Пользовательское соглашение
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <span className={`${styles.copyright} h-caption`}
        >
          ⓒ SkillSwap — 2026
        </span>
      </div>
    </footer>
  )
}