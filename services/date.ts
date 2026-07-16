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

export const formatDateWithYearAndTime = (dateValue: number | string) => {
  const date = new Date(dateValue);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export const getHours = (data: string) => {
  const date = new Date(data);
  const horas = date.getHours().toString().padStart(2, "0");
  const minutos = date.getMinutes().toString().padStart(2, "0");
  return `/ horario : ${horas}:${minutos}`;
};

export const estaVencido = (dataDoEvento: string) => {
  const hoje = Date.now();
  const evento = new Date(dataDoEvento).getTime();

  return evento < hoje;
};
