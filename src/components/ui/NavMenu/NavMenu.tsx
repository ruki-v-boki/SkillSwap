import { useDispatch, useSelector } from '@/services/store';
import { NavLink } from 'react-router-dom';
import styles from './NavMenu.module.css';
import { Button } from '../Button';
import { ChevronIcon } from '../ChevronIcon';
import { selectIsNavOpen, toggleNav } from '@/services/slices/ui/uiSlice';
import { useRef } from 'react';
import { BannerUI } from '../Banner';
import { SkillsCatalogUI } from '../SkillsCatalog';


export function NavMenu () {
  const dispatch = useDispatch();
  const isNavOpen = useSelector(selectIsNavOpen);
  const navButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <nav className={styles.nav}>
      <NavLink
        className={`${styles.navLink} h-body`}
        to="/about"
      >
        О проекте
      </NavLink>

      <Button
        ref={navButtonRef}
        className={`${styles.navButton} h-body`}
        type="button"
        variant='link'
        onClick={() => dispatch(toggleNav())}
        aria-expanded={isNavOpen}
      >
        Все навыки
        <ChevronIcon open={isNavOpen} />
      </Button>

      <BannerUI
        isOpen={isNavOpen}
        onClose={() => dispatch(toggleNav())}
        triggerRef={navButtonRef}
        className={styles.skillsBanner}
        data-testid="skills-banner"
      >
        <SkillsCatalogUI />
      </BannerUI>
    </nav>
  );
}