const formatDotDate = (dateString: string): string => {
  const [year, month, day] = dateString.slice(0, 10).split("-");

  return `${Number(year)}. ${Number(month)}. ${Number(day)}`;
};

export default formatDotDate;
