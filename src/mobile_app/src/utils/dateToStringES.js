const formatTwoDigitNum = num => {
  return num < 10 ? '0' + num.toString() : num;
};

const formatHours = hours => {
  if (hours === 0) {
    return 12;
  }
  hours = hours++;
  return hours > 12 ? hours - 12 : hours;
};

const dayToStringES = weekday => {
  switch (weekday) {
    case 0:
      return 'Dom';
    case 1:
      return 'Lun';
    case 2:
      return 'Mar';
    case 3:
      return 'Mie';
    case 4:
      return 'Jue';
    case 5:
      return 'Vie';
    case 6:
      return 'Sab';
  }
};

export const dateToStringES = dateObject => {
  // Format date object to spanish string.
  // Polyfill due to React Native's lack of toLocaleString support
  const {year, month, day, weekday, hours, min, period} = {
    year: dateObject.getFullYear().toString(),
    month: (() => {
      const dateMonth = dateObject.getMonth();
      return formatTwoDigitNum(dateMonth + 1);
    })(),
    day: (() => {
      const dateDate = dateObject.getDate();
      return formatTwoDigitNum(dateDate);
    })(),
    weekday: dayToStringES(dateObject.getDay()),
    hours: (() => {
      const dateHours = dateObject.getHours();
      return formatTwoDigitNum(formatHours(dateHours));
    })(),
    min: (() => {
      const dateMins = dateObject.getMinutes();
      return formatTwoDigitNum(dateMins);
    })(),
    period: (() => {
      return dateObject.getHours() > 11 ? 'PM' : 'AM';
    })(),
  };

  return `${weekday} ${hours}:${min} ${period} ${day}/${month}/${year}`;
};
