// random_generator.js
const getRandomNumber = (min, max) => {
  //  min and max are integers
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = getRandomNumber;