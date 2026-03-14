import { useDispatch, useSelector } from '@/services/store';
import { NavLink } from 'react-router-dom';

import styles from './NavMenu.module.css';
import { Button } from '../Button';
import { ChevronIcon } from '../ChevronIcon';
import { selectIsNavOpen, toggleNav } from '@/services/slices/ui/uiSlice';


export function NavMenu () {
  const dispatch = useDispatch();
  const isNavOpen = useSelector(selectIsNavOpen);

  return (
    <nav className={styles.nav}>
      <NavLink
        className={`${styles.navLink} h-body`}
        // style={{ lineHeight: 'var(--line-height-xs)' }}
        to="/about"
      >
        О проекте
      </NavLink>

      <Button
        className={`'var(--line-height-xs)' ${styles.navButton} h-body`}
        type="button"
        variant='link'
        onClick={() => dispatch(toggleNav())}
        aria-expanded={isNavOpen}
        // style={{ lineHeight: 'var(--line-height-xs)' }}
      >
        Все навыки
        <ChevronIcon open={isNavOpen} />
      </Button>

      {/* выпадающее меню */}
      {/* {isNavOpen && (
        <div className={styles.dropdown}>
            тут будет компонент баннера всех навыков
        </div>
      )} */}
    </nav>
  );
}