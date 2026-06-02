import ReservedCard, { ReservedCardProps } from "./ReservedCard";

const ReservedCardList = () => {
  const mockReservations: ReservedCardProps[] = [
    {
      date: "2023.02.14",
      title: "함께 배우면 즐거운 스트릿 댄스",
      status: "confirmed",
      startTime: "11:00",
      endTime: "12:30",
      totalPrice: 10000,
      headCount: 10,
    },
    {
      date: "2023.02.11",
      title: "내 강아지 인생 사진 찍어주기",
      status: "canceled",
      startTime: "13:00",
      endTime: "14:0",
      totalPrice: 35000,
      headCount: 10,
    },
    {
      date: "2023.01.31",
      title: "이색 앵무새와 친구 되기",
      status: "declined",
      startTime: "10:00",
      endTime: "12:00",
      totalPrice: 60000,
      headCount: 3,
    },
    {
      date: "2023.01.14",
      title: "발리 코끼리 목욕 체험",
      status: "completed",
      startTime: "16:00",
      endTime: "17:30",
      totalPrice: 40000,
      headCount: 2,
    },
    {
      date: "2023.01.10",
      title: "열기구 페스티벌",
      status: "pending",
      startTime: "10:00",
      endTime: "12:30",
      totalPrice: 70000,
      headCount: 2,
    },
  ];
  return (
    <div className="flex flex-col gap-[30px]">
      {mockReservations.map((reservation, index) => (
        <ReservedCard key={index} {...reservation} />
      ))}
    </div>
  );
};

export default ReservedCardList;
