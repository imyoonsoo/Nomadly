export const getCalendarDates = (year: number, month: number) => {
  const firstDate = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0);

  const startDay = firstDate.getDay();
  const lastDay = lastDate.getDate();
  const prevLastDay = new Date(year, month, 0).getDate();

  const dates = [];

  for (let i = startDay - 1; i >= 0; i--) {
    dates.push(new Date(year, month - 1, prevLastDay - i));
  }

  for (let day = 1; day <= lastDay; day++) {
    dates.push(new Date(year, month, day));
  }

  while (dates.length < 42) {
    dates.push(
      new Date(year, month + 1, dates.length - startDay - lastDay + 1),
    );
  }

  return dates;
};

export const formatDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const formatKoreanDate = (dateString: string) => {
  const date = new Date(dateString);

  const year = String(date.getFullYear()).slice(2);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
};
