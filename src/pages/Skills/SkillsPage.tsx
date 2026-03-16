import styles from './SkillsPage.module.css';
import { SkillsCatalogUI } from '@/components/ui/SkillsCatalog';


export function SkillsPage() {
  return (
    <div className={styles.container}>
      <h2 className={`h-1`}>Все навыки</h2>
      <SkillsCatalogUI />
    </div>
  )
}