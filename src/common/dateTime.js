import moment from 'moment';

const getCurrentDate = () => {
  return moment().format('DD.MM.YYYY').toString();
};

const getCurrentTime = () => {
  return moment().format('hh:mm a').toString();
};

const getDayOfWeek = () => {
  return moment().format('dddd'); // Full name of the day (e.g., Monday)
};

const getGreeting = () => {
  const currentHour = parseInt(moment().format('H')); // Get hour in 24-hour format

  if (currentHour >= 5 && currentHour < 12) {
    return 'Good Morning,';
  } else if (currentHour >= 12 && currentHour < 17) {
    return 'Good Afternoon,';
  } else {
    return 'Good Evening,';
  }
};

export {
  getCurrentDate,
  getCurrentTime,
  getDayOfWeek,
  getGreeting,
};
