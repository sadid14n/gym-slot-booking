let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// export const getFullDay = (timestamp) => {
//   let date = new Date(timestamp);

//   return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
// };

export const getFullDay = (timestamp) => {
  let date = new Date(timestamp);
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");

  return `${date.getDate()} ${
    months[date.getMonth()]
  }, ${date.getFullYear()} ${hours}:${minutes}`;
};

export const getDay = (timestamp) => {
  let date = new Date(timestamp);

  return `${date.getDate()} ${months[date.getMonth()]}`;
};
