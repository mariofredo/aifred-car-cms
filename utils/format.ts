export const formatDateUI = (
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

export const formatDate = (date: Date | undefined) => {
  if (!date) return '-';
  // Extract components from the date object
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
  const day = String(date.getDate()).padStart(2, '0');
  // const hours = String(date.getHours()).padStart(2, '0');
  // const minutes = String(date.getMinutes()).padStart(2, '0');
  // const seconds = String(date.getSeconds()).padStart(2, '0');

  // Construct the formatted date string
  // return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return `${year}-${month}-${day}`;
};

export const formatCompleteDate = (timestamp: string): string => {
  const date = new Date(timestamp);

  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-GB', {month: 'long'});
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  const timeZoneOffset = -date.getTimezoneOffset();
  const offsetHours = Math.floor(Math.abs(timeZoneOffset) / 60)
    .toString()
    .padStart(2, '0');
  const offsetMinutes = (Math.abs(timeZoneOffset) % 60)
    .toString()
    .padStart(2, '0');
  const offsetSign = timeZoneOffset >= 0 ? '+' : '-';
  const formattedOffset = `GMT${offsetSign}${offsetHours}:${offsetMinutes}`;

  return `${day} ${month} ${year}, ${hours}:${minutes}:${seconds} (${formattedOffset})`;
};
