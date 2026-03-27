import { SkillsCatalogUI } from '../SkillsCatalog';
import { ChevronIcon } from '../ChevronIcon';
import { NavLink } from 'react-router-dom';
import styles from './NavMenu.module.css';
import { useRef, useState } from 'react';
import { BannerUI } from '../Banner';
import { Button } from '../Button';

// ---------------------------------------------------------------

export function NavMenu () {

  const [isNavOpen, setIsNavOpen] = useState(false)
  const navButtonRef = useRef<HTMLButtonElement>(null);

// ---------------------------------------------------------------

  return (
    <nav className={styles.navContainer}>
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
        onClick={() => setIsNavOpen(!isNavOpen)}
        aria-expanded={isNavOpen}
      >
        Все навыки
        <ChevronIcon open={isNavOpen} />
      </Button>

      <BannerUI
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        triggerRef={navButtonRef}
        className={styles.skillsBanner}
        data-testid="skills-banner"
      >
        <SkillsCatalogUI />
      </BannerUI>
    </nav>
  );
}