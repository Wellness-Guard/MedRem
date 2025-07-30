export const convertToLocalTime = (date: Date | undefined | null): string => {
  return date?.toLocaleTimeString('en-US', {hour12: true}) || '';
};

export const convertToFormatedDate = (
  date: Date | undefined | null,
): string => {
  return date?.toISOString().slice(0, 10) || '';
};

export const getDaysString = () => {
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
};
