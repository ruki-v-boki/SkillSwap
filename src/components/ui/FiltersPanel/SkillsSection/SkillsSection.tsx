import { useState, useCallback, useEffect } from 'react';
import styles from './SkillsSection.module.css';
import type { SkillsSectionUIProps } from './type';
import { ChevronIcon } from '../../ChevronIcon';
import { Button } from '../../Button';


export function SkillsSectionUI({
  categories,
  subcategories,
  onChange,
  dataTestId,
  selectedCategories: propSelectedCategories,
  selectedSkills: propSelectedSkills,
}: SkillsSectionUIProps) {

  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(propSelectedCategories || []);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(propSelectedSkills || []);
  
  const allCategoryIds = categories.map(cat => cat.id);
  const allCategoriesExpanded = allCategoryIds.length > 0 && 
    allCategoryIds.every(id => expandedCategories.includes(id));

// ---------------------------------------------------------------

  useEffect(() => {
    if (propSelectedCategories) {
      setSelectedCategories(propSelectedCategories);
    }
    if (propSelectedSkills) {
      setSelectedSkills(propSelectedSkills);
    }
  }, [propSelectedCategories, propSelectedSkills]);

// ---------------------------------------------------------------

  const handleCategoryClick = useCallback((categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  }, []);

// ---------------------------------------------------------------

  const handleCategoryCheck = useCallback((categoryId: string, checked: boolean) => {
    const categorySubcategories = subcategories
      .filter(sub => sub.categoryId === categoryId)
      .map(sub => sub.id);

    let newCategories: string[];
    let newSkills: string[];

    if (checked) {
      newCategories = [...selectedCategories, categoryId];
      newSkills = selectedSkills;
    } else {
      newCategories = selectedCategories.filter(id => id !== categoryId);
      newSkills = selectedSkills.filter(id => !categorySubcategories.includes(id));
    }

    setSelectedCategories(newCategories);
    setSelectedSkills(newSkills);
    onChange?.(newCategories, newSkills);
  }, [selectedCategories, selectedSkills, subcategories, onChange]);

// ---------------------------------------------------------------

  const handleSubcategoryCheck = useCallback((subcategoryId: string, checked: boolean) => {
    const parentCategory = subcategories.find(sub => sub.id === subcategoryId)?.categoryId;

    let newCategories = [...selectedCategories];
    let newSkills: string[];

    if (checked) {
      newSkills = [...selectedSkills, subcategoryId];

      if (parentCategory && !selectedCategories.includes(parentCategory)) {
        newCategories = [...selectedCategories, parentCategory];
      }
    } else {
      newSkills = selectedSkills.filter(id => id !== subcategoryId);
    }

    setSelectedCategories(newCategories);
    setSelectedSkills(newSkills);
    onChange?.(newCategories, newSkills);
  }, [selectedCategories, selectedSkills, subcategories, onChange]);

// ---------------------------------------------------------------

  const isCategorySelected = (categoryId: string) => {
    return selectedCategories.includes(categoryId);
  };

// ---------------------------------------------------------------

  const isSubcategorySelected = (subcategoryId: string) => {
    return selectedSkills.includes(subcategoryId);
  };

// ---------------------------------------------------------------

  const isCategoryPartiallySelected = (categoryId: string) => {
    const categorySubs = subcategories
      .filter(sub => sub.categoryId === categoryId)
      .map(sub => sub.id);

    const selectedInCategory = selectedSkills.filter(skill =>
      categorySubs.includes(skill)
    );

    return selectedInCategory.length > 0 && selectedInCategory.length < categorySubs.length;
  };

// ---------------------------------------------------------------

  const handleCategoryLabelClick = useCallback((e: React.MouseEvent, categoryId: string) => {
    e.preventDefault();
    handleCategoryClick(categoryId);
  }, [handleCategoryClick]);

// ---------------------------------------------------------------

  const toggleShowAll = useCallback(() => {
    if (allCategoriesExpanded) {
      setExpandedCategories([]);
    } else {
      setExpandedCategories(allCategoryIds);
    }

  }, [allCategoriesExpanded, allCategoryIds]);

// ---------------------------------------------------------------

  return (
    <section className={styles.section} data-testid={dataTestId}>
      <div className={styles.categoriesList}>
        {categories.map(category => {
          const categorySubcategories = subcategories.filter(
            sub => sub.categoryId === category.id
          );
          const isExpanded = expandedCategories.includes(category.id);
          const isPartiallySelected = isCategoryPartiallySelected(category.id);

          return (
            <div key={category.id} className={styles.skillsContainer}>
              <div className={styles.categoryBox}>
                <input
                  type="checkbox"
                  id={`cat-${category.id}`}
                  checked={isCategorySelected(category.id)}
                  onChange={(e) => handleCategoryCheck(category.id, e.target.checked)}
                  className={`checkbox`}
                  ref={input => {
                    if (input) {
                      input.indeterminate = isPartiallySelected;
                    }
                  }}
                />
                <label
                  htmlFor={`cat-${category.id}`}
                  className={`${styles.categoryLabel} h-body`}
                  onClick={(e) => handleCategoryLabelClick(e, category.id)}
                >
                  {category.name}
                </label>

                {categorySubcategories.length > 0 && (
                  <button
                    type="button"
                    className={styles.expandButton}
                    onClick={() => handleCategoryClick(category.id)}
                    aria-label={isExpanded ? 'Свернуть' : 'Развернуть'}
                  >
                    <ChevronIcon open={isExpanded} />
                  </button>
                )}
              </div>

              {isExpanded && categorySubcategories.length > 0 && (
                <div className={styles.subcategoriesList}>
                  {categorySubcategories.map(sub => (
                    <div key={sub.id} className={styles.subcategoryBox}>
                      <input
                        type="checkbox"
                        id={`sub-${sub.id}`}
                        checked={isSubcategorySelected(sub.id)}
                        onChange={(e) => handleSubcategoryCheck(sub.id, e.target.checked)}
                        className={`checkbox`}
                      />
                      <label
                        htmlFor={`sub-${sub.id}`}
                        className={`${styles.subcategoryLabel} h-body`}
                      >
                        {sub.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <Button
        type='button'
        variant='link'
        onClick={toggleShowAll}
        className={styles.showAllButton}
      >
        {allCategoriesExpanded ? 'Скрыть' : 'Все категории'}
        <ChevronIcon open={allCategoriesExpanded}/>
      </Button>
    </section>
  );
}