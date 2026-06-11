export type ReservationStatus =
  | "pending"
  | "confirmed"
  | "declined"
  | "canceled"
  | "completed";

export interface StateBadgeProps {
  status: ReservationStatus;
}
