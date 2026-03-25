export type LikeButtonUIProps = {
  isLiked: boolean;
  onClick: (e: React.MouseEvent) => void;
  disabled?: boolean;
}