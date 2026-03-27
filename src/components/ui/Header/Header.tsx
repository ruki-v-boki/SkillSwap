import { ProfileSection } from '@/components/features/ProfileSection/ProfileSection';
import { SearchInput } from '@/components/features/SearchInput';
import { NavMenu } from '../NavMenu/NavMenu';
import styles from './Header.module.css';
import { LogoUI } from '../Logo';

// ---------------------------------------------------------------

export function HeaderUI () {
  return (
    <header className={styles.header}>
      <LogoUI />
      <NavMenu />
      <SearchInput />
      <ProfileSection />
    </header>
  );
}