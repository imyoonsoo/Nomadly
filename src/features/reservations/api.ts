import type {
  CancelReservationResponse,
  EditMyReservationsParams,
  GetMyReservationsParams,
  GetMyReservationsResponse,
  SubmitReviewParams,
} from "./types";
import axios from "axios";
import clientFetch from "@/lib/http/clientFetch";

const BASE_URL = "/my-reservations";

export async function getMyReservations(
  params?: GetMyReservationsParams,
): Promise<GetMyReservationsResponse> {
  const response = await clientFetch.get("/my-reservations", { params });
  return response.data;
}

export async function cancelMyReservations(
  reservationId: number,
): Promise<CancelReservationResponse> {
  const response = await clientFetch.patch(`${BASE_URL}/${reservationId}`, {
    status: "canceled",
  });
  return response.data;
}

export async function editMyReservations(
  reservationId: number,
  body: EditMyReservationsParams,
) {
  const response = await axios.patch(
    `${BASE_URL}/${reservationId}/application`,
    body,
  );
  return response.data;
}

export async function submitReview(
  reservationId: number,
  body: SubmitReviewParams,
) {
  const response = await axios.post(
    `${BASE_URL}/${reservationId}/reviews`,
    body,
  );
  return response.data;
}
