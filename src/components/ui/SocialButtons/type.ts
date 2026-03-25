export type SocialButtonsUIProps = {
  className?: string;
  isLiked: boolean;
  onFavoriteClick: (e: React.MouseEvent) => void;
  onShareClick: () => void;
  onMoreClick: () => void;
}