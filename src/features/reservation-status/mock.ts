import {
  ReservationCardItem,
  ReservationDashboardItem,
  ReservationStatus,
  ReservedScheduleItem,
} from "@/features/reservation-status/type";

export const mockActivities = [
  { id: 1, title: "함께 배우면 즐거운 스트릿 댄스" },
  { id: 2, title: "서울 야경 투어" },
  { id: 3, title: "도자기 원데이 클래스" },
];

export const mockReservationDashboardByActivityId: Record<
  number,
  ReservationDashboardItem[]
> = {
  1: [
    {
      date: "2026-05-09",
      reservations: { completed: 1, confirmed: 0, pending: 1 },
    },
    {
      date: "2026-05-10",
      reservations: { completed: 0, confirmed: 0, pending: 2 },
    },
    {
      date: "2026-05-11",
      reservations: { completed: 0, confirmed: 1, pending: 2 },
    },
    {
      date: "2026-05-12",
      reservations: { completed: 10, confirmed: 0, pending: 0 },
    },
  ],

  2: [
    {
      date: "2026-05-15",
      reservations: { completed: 0, confirmed: 3, pending: 1 },
    },
    {
      date: "2026-05-20",
      reservations: { completed: 2, confirmed: 0, pending: 4 },
    },
  ],

  3: [],
};

export const mockReservedScheduleByDate: Record<
  string,
  ReservedScheduleItem[]
> = {
  "2026-05-09": [
    {
      scheduleId: 1,
      startTime: "14:00",
      endTime: "15:00",
      count: {
        pending: 1,
        confirmed: 0,
        declined: 1,
      },
    },
  ],

  "2026-05-10": [
    {
      scheduleId: 2,
      startTime: "14:00",
      endTime: "15:00",
      count: {
        pending: 2,
        confirmed: 0,
        declined: 0,
      },
    },
  ],

  "2026-05-11": [
    {
      scheduleId: 3,
      startTime: "13:00",
      endTime: "14:00",
      count: {
        pending: 2,
        confirmed: 1,
        declined: 0,
      },
    },
  ],

  "2026-05-12": [
    {
      scheduleId: 4,
      startTime: "16:00",
      endTime: "17:00",
      count: {
        pending: 0,
        confirmed: 0,
        declined: 10,
      },
    },
  ],
};

export const mockReservationByScheduleId: Record<
  number,
  Record<ReservationStatus, ReservationCardItem[]>
> = {
  1: {
    pending: [
      { id: 1, nickname: "김땡땡", headCount: 10 },
      { id: 2, nickname: "박땡땡", headCount: 12 },
      { id: 3, nickname: "주땡땡", headCount: 4 },
      { id: 4, nickname: "이땡땡", headCount: 2 },
      { id: 5, nickname: "최땡땡", headCount: 6 },
    ],
    confirmed: [],
    declined: [{ id: 2, nickname: "김철수", headCount: 4 }],
  },

  2: {
    pending: [
      { id: 3, nickname: "김땡땡", headCount: 10 },
      { id: 4, nickname: "김땡땡", headCount: 12 },
    ],
    confirmed: [],
    declined: [],
  },

  3: {
    pending: [
      { id: 5, nickname: "박땡땡", headCount: 3 },
      { id: 6, nickname: "홍땡땡", headCount: 8 },
    ],
    confirmed: [{ id: 7, nickname: "조땡땡", headCount: 2 }],
    declined: [],
  },

  4: {
    pending: [],
    confirmed: [],
    declined: [
      { id: 8, nickname: "노땡땡", headCount: 5 },
      { id: 9, nickname: "유땡땡", headCount: 5 },
    ],
  },
};
