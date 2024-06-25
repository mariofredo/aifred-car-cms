export const formatDate = (date: Date) => {
  const newDate = new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return newDate;
};
