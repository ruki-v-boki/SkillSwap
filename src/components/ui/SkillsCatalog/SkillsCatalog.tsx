import { APP_CATEGORIES, APP_SUBCATEGORIES } from "@/mock/skills";
import { SkillsMenuUI } from "../SkillsMenu";
import styles from './SkillsCatalog.module.css';


export function SkillsCatalogUI() {
  return (
    <div className={styles.skillsCatalogContainer}>
      {APP_CATEGORIES.map(category => (
        <SkillsMenuUI
          key={category.id}
          category={category}
          subcategories={APP_SUBCATEGORIES}
        />
      ))}
    </div>
  )
}