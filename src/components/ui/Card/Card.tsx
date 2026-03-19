import { getAgeWord, getCategoryById, getSubcategoryById } from '@/utils/helpers';
import styles from './Card.module.css'
import type { CardUIProps } from './type'
import { Button } from '../Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { LikeButtonUI } from '../LikeButtonUI';
import { useState } from 'react';
import { SkillsListUI } from './SkillsList';


export function CardUI({
  user,
  styleType
}: CardUIProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isExpandedView = styleType === 'profile' || styleType === 'modal';
  const isInteractive = styleType === 'catalog' || styleType === 'modal';
  const isCatalog = styleType === 'catalog';

  // ----------------- TO DO 1 --------------
  const [isLiked, setIsLiked] = useState(false); // ВРЕМЕННОЕ Состояние для лайка
  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    console.log('лайк кликнут', !isLiked);
    // Здесь потом будет API вызов
  };
  // ----------------- TO DO 1 --------------


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

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (styleType === 'modal') {
      return;
    }

    navigate(`/modal/${user.id}`, {
      state: {
        background: location.pathname
      }
    });
};

// ---------------------------------------------------------------

  return (
    <div
      className={
        isExpandedView
          ? `${styles.card} ${styles.cardProfile}`
          : styles.card
      }
      onClick={handleCardClick}>
      <header className={styles.header}>
        <div className={styles.userBox}>
          <div className={styles.imageBox}>
            <img className={styles.avatar} src={user.avatar} alt={user.name} />
          </div>

          <div className={styles.userInfoBox}>
            <h4 className={styles.userName}>{user.name}</h4>
            <span className={`${styles.bio} h-caption`}>
              {user.location},
              {user.age}
              {getAgeWord(user.age)}
            </span>
          </div>
        </div>
{/* --------------------------------------------------------------- */}
        {isInteractive && (
          <div className={styles.likeButtonBox}>
            <LikeButtonUI isLiked={isLiked} onClick={handleLikeClick} />
            <span className="h-caption">{user.rating}</span>
          </div>
        )}
      </header>
{/* --------------------------------------------------------------- */}
      {isExpandedView && (
        <p className={`${styles.description} h-body`}>
          {user.about}
        </p>
      )}

      <div
        className={
          isExpandedView
            ? `${styles.skillsBox} ${styles.skillsBoxProfile}`
            : styles.skillsBox
        }
      >
        <SkillsListUI
          tags={teachTags}
          variant="teach"
          maxVisible={1}
          styleType={styleType}
        />
        <SkillsListUI
          tags={learnTags}
          variant="learn"
          maxVisible={isCatalog ? 2 : 999}
          styleType={styleType}
        />
      </div>
{/* --------------------------------------------------------------- */}
      {isInteractive && (
        <Button
          fullWidth
          type='button'
          variant='prime'
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/offer/${user.id}`);
          }}
        >
          Подробнее
        </Button>
      )}
    </div>
  );
}