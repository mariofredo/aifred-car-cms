export const formatDate = (
  date: Date | undefined,
  option: any = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }
) => {
  if (!date) return '-';
  const newDate = new Date(date).toLocaleDateString('id-ID', option);

  return newDate;
};
