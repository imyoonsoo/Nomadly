import type {
  EditMyReservationsParams,
  GetMyReservationsParams,
  GetMyReservationsResponse,
  SubmitReviewParams,
} from "./types";
import axios from "axios";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/my-reservations`;

export async function getMyReservations(
  params?: GetMyReservationsParams,
): Promise<GetMyReservationsResponse> {
  const response = await axios.get(BASE_URL, {
    params,
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzUwOSwidGVhbUlkIjoiMjMtMSIsImlhdCI6MTc4MDg5NTE4NywiZXhwIjoxNzgwODk2OTg3LCJpc3MiOiJzcC1nbG9iYWxub21hZCJ9.8leOBgl3Msngd9kBDWu38m1ShQHYY-H9Ua6kN7BPzxc`,
    },
  });
  return response.data;
}

export async function deleteMyReservations(reservationId: number) {
  const response = await axios.patch(`${BASE_URL}/${reservationId}`, {
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
