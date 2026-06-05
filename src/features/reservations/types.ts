export interface GetMyReservationsParams {
  cursorId?: number;
  size?: number;
  status?: string;
}

export interface EditMyReservationsParams {
  schduledId: number;
  headCount: number;
}

export interface SubmitReviewParams {
  rating: number;
  content: string;
}
