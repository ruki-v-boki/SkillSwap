import { getAgeWord, getCategoryById, getSubcategoryById, getUserRating } from '@/utils/helpers';
import { useDispatch, useSelector } from '@/services/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectUserId } from '@/services/slices/authSlice';
import { toggleLike } from '@/services/slices/userSlice';
import { LikeButtonUI } from '../LikeButtonUI';
import { SkillsListUI } from './SkillsList';
import type { CardUIProps } from './type';
import styles from './Card.module.css';
import { Button } from '../Button';
import { useState } from 'react';

// ---------------------------------------------------------------

export function CardUI({
  user,
  styleType,
  onCardClick
}: CardUIProps) {

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const currentUserId = useSelector(selectUserId);
  const isExpandedView = styleType === 'profile' || styleType === 'modal';
  const isInteractive = styleType === 'catalog' || styleType === 'modal';
  const isCatalog = styleType === 'catalog';
  const isLiked = currentUserId ? user.likedBy?.includes(currentUserId) || false : false;
  const rating = getUserRating(user);
  const [isPending, setIsPending] = useState(false);

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

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!currentUserId) {
      setIsPending(false);
      navigate('/login', {
        state: { from: location.pathname }
      });
      return;
    }

    if (isPending) return;

    setIsPending(true);
    try {
      await dispatch(toggleLike({
        currentUserId,
        targetUserId: user.id
      })).unwrap();
    } catch (error) {
      console.error('Не удалось переключиь лайк:', error);
    } finally {
      setIsPending(false);
    }
  };

// ---------------------------------------------------------------

  return (
    <div
      className={
        isExpandedView
          ? `${styles.card} ${styles.cardProfile}`
          : styles.card
      }
      onClick={onCardClick ? onCardClick : handleCardClick}
    >
      <header className={styles.header}>
        <div className={styles.userBox}>
          <div className={styles.imageBox}>
            <img
              className={styles.avatar}
              src={user.avatar}
              alt={user.name}
            />
          </div>

          <div className={styles.userInfoBox}>
            <h4 className={styles.userName}>{user.name}</h4>
            <span className={`${styles.bio} h-caption`}>
              {user.location}, {user.age}
              {getAgeWord(user.age)}
            </span>
          </div>
        </div>

        {/* Лайки */}
        {isInteractive && (
          <div className={styles.likeButtonBox}>
            <LikeButtonUI
              isLiked={isLiked}
              onClick={handleLikeClick}
              disabled={isPending}
            />

            {rating > 0 && (
              <span className="h-caption">
                {rating}
              </span>
            )}

          </div>
        )}
      </header>

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