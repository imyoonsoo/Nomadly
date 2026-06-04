export const getTimeAgo = (createdAt: string) => {
  const createdTime = new Date(createdAt).getTime();
  const now = Date.now();

  const diffInseconds = Math.floor((now - createdTime) / 1000);
  const diffInMinutes = Math.floor(diffInseconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInseconds < 60) {
    return "방금 전";
  }
  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  }
  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }
  return `${diffInDays}일 전`;
};

export const parseNotificationContent = (content: string) => {
  const status = content.includes("승인")
    ? "승인"
    : content.includes("거절")
      ? "거절"
      : "";

  const title = status ? `예약 ${status}` : "알림";

  const dateMatch = content.match(/\([^)]*\)/);
  const dateText = dateMatch?.[0] ?? "";

  const activityTitle = dateText
    ? content.split(dateText)[0]
    : content
        .replace("예약이 승인되었어요.", "")
        .replace("예약이 거절되었어요.", "")
        .trim();

  return {
    title,
    activityTitle: activityTitle.trim(),
    dateText,
    status,
  };
};
