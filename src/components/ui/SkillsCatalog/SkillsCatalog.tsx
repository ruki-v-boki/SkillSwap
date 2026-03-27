import { APP_CATEGORIES, APP_SUBCATEGORIES } from "@/constants/skills";
import styles from './SkillsCatalog.module.css';
import { SkillsMenuUI } from "../SkillsMenu";

// ---------------------------------------------------------------

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