export const formatDate = (inputDate: string) => {
  const date = new Date(inputDate);

  const day = JSON.stringify(date.getDate()).padStart(2, "0");
  const month = JSON.stringify(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

export const timeAgo = (inputDate: string) => {
  const currentDate = new Date();
  const date = new Date(inputDate);

  const timeBetween = currentDate.getTime() - date.getTime();

  const daysAgo = Math.floor(timeBetween / 1000 / 60 / 60 / 24);

  const hoursAgo = Math.floor(timeBetween / 1000 / 60 / 60);

  const minutesAgo =
    Math.floor(timeBetween / 1000 / 60) < 1
      ? 1
      : Math.floor(timeBetween / 1000 / 60);

  if (daysAgo < 1) {
    if (hoursAgo < 1) {
      return `${minutesAgo}m ago`;
    }
    return `${hoursAgo}h ago`;
  }
  return `${daysAgo}d ago`;
};
