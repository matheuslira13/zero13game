export const formatDate = (dateValue: number | string) => {
  const date = new Date(dateValue);

  const day = date.getDate().toString().padStart(2, "0");

  const months = [
    "JAN",
    "FEV",
    "MAR",
    "ABR",
    "MAI",
    "JUN",
    "JUL",
    "AGO",
    "SET",
    "OUT",
    "NOV",
    "DEZ",
  ];

  const month = months[date.getMonth()];

  return `${day} - ${month}`;
};
