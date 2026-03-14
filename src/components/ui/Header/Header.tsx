import { SearchInput } from '@/components/features/SearchInput';
import { LogoUI } from '../Logo'
import { NavMenu } from '../NavMenu/NavMenu';
import styles from './Header.module.css'
import { ProfileSection } from '@/components/ProfileSection/ProfileSection';


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