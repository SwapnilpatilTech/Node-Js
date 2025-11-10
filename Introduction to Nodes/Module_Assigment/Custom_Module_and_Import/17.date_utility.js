// date_utility.js
const getTodayDate = () => {
  const now = new Date();
  return now.toLocaleDateString(); // e.g., "11/9/2025"
};

const getCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString(); // e.g., "4:23:51 PM"
};

const getDateTime = () => {
  const now = new Date();
  return now.toLocaleString();
};

module.exports = {
  getTodayDate,
  getCurrentTime,
  getDateTime
};