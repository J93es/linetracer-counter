export const timeToString = (time: number | undefined) => {
  if (!time) {
    return "--";
  }
  const min = Math.floor(time / 60000);
  const sec = String(Math.floor((time % 60000) / 1000)).padStart(2, "0");
  const msec = String(Math.floor(time % 1000)).padStart(3, "0");

  return `${min}:${sec}.${msec}`;
};
