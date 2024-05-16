import type {
  ReactionType,
  ReviewDataType,
  ReviewStateType,
} from '@/types/review/review';

export interface ResetAPI {
  mutate: () => void;
}

export interface ReviewRegisterProps extends ResetAPI {
  gym_name?: string;
}

export interface OpenPosition {
  openPosition: 'center' | 'right';
}

export interface ReviewProps extends OpenPosition {}

export interface FirstReviewModalProps {
  title: string;
  isFirst: boolean;
}

export interface RadioGroupRatingProps {
  isOpen: boolean;
  handlePoint: (type: 'wantToGo' | 'helped' | 'great' | 'funny') => void;
}

export interface ReviewListProps extends ResetAPI {
  list: ReviewDataType[];
}

export interface OneReviewProps extends ResetAPI {
  list: ReviewDataType;
}

export interface IconChipListProps {
  item: ReactionType[];
  myReaction: 'wantToGo' | 'helped' | 'great' | 'funny'| null;
}

export interface ReviewStoreProps {
  isOpen: boolean;
  state: 'review' | 'create' | 'fix' | 'mypage' | null;
  reviewId: number | null;
  reviewState: ReviewStateType;
  onReview: (reviewId: number) => void;
  onMyPage: () => void;
  setFixMode: (reviewState: ReviewStateType) => void;
  setCreateMode: () => void;
  closeMode: () => void;
  reset: () => void;
}

export interface ReviewRegisterModalProps {
  isOpen: boolean;
}

export interface ReviewModalContainerProps extends OpenPosition {
  isMyPage: boolean;
  isWrite?: boolean; // 글쓰기관련 boolean
}
