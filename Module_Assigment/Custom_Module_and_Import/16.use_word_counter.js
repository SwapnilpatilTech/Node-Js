// word_counter.js
const countWords = (text) => {
  if (!text) {
    return 0;
  }

  const words = text.trim().split(/\s+/);
  return words.length;
};

module.exports = countWords;