import { getAgeWord, getCategoryById, getSubcategoryById } from '@/utils/helpers';
import styles from './Card.module.css'
import type { CardUIProps } from './type'
import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';
import { LikeButtonUI } from '../LikeButtonUI';
import { useState } from 'react';
import { SkillsListUI } from './SkillsList';


export function CardUI({
  user,
  type='catalog'
}: CardUIProps) {
  const navigate = useNavigate()


  // ----------------- TO DO 1 --------------
  const [isLiked, setIsLiked] = useState(false); // ВРЕМЕННОЕ Состояние для лайка
  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Предотвращаем всплытие события
    setIsLiked(!isLiked); // Переключаем состояние
    console.log('лайк кликнут', !isLiked);
    // Здесь потом будет API вызов
  };
  // ----------------- TO DO 1 --------------

// ---------------------------------------------------------------

  const teachTags = [{
    id: user.canTeach.id,
    name: user.canTeach.customName,
    category: getCategoryById(user.canTeach.categoryId) || {
      id: user.canTeach.categoryId,
      name: user.canTeach.categoryId
    }
  }];

// ---------------------------------------------------------------

  const learnTags = user.wantToLearn.map(skill => {
    const subcategory = getSubcategoryById(skill.subcategoryId);
    const category = getCategoryById(skill.categoryId);

    return {
      id: skill.id,
      name: subcategory?.name || skill.subcategoryId,
      category: category || {
        id: skill.categoryId,
        name: skill.categoryId
      }
    };
  });
  // ----------------- TO DO 2 --------------   унести логику? 
// ---------------------------------------------------------------

  return (
    <div className={styles.container}>
      <header className={styles.header}>

        <div className={styles.userBox}>
          <div className={styles.imageBox}>
            <img className={styles.avatar} src={user.avatar} alt={user.name} />
          </div>

          <div className={styles.userInfoBox}>
            <h4 className={styles.userName}>{user.name}</h4>
            <span className={`${styles.bio} h-caption`}>
              {user.location}, {user.age} {getAgeWord(user.age)}
            </span>
          </div>

        </div>
        {/* ------- для каталога ------- */}
        {type === 'catalog' &&
          <div className={styles.likeButtonBox}>
            <LikeButtonUI
              isLiked={isLiked} // !!!!!!! <--------------- TO-DO 1
              onClick={handleLikeClick} // !!!!!!! <--------------- TO-DO 1
            />
          </div>
        }
      </header>
      {/* ------- для профиля ------- */}
      {/* {type === 'profileCard' && <p className={styles.description}>{user.about}</p>} */}
      {/* ------- НАВЫКИ ------- */}
      <div className={styles.skillsBox}>
        <SkillsListUI tags={teachTags} variant="teach" maxVisible={1} /> 
        <SkillsListUI tags={learnTags} variant="learn" maxVisible={2} />
      </div>
      {/* ------- для каталога ------- */}
      {type === 'catalog' && (
        <Button
          fullWidth
          type='button'
          variant='prime'
          onClick={() => navigate(`/offer/${user.id}`)}
          >
          Подробнее
        </Button>
      )}
    </div>
  );
}