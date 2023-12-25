const { NotImplementedError } = require("../extensions/index.js");

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }
  const resultArray = [];
  const deletedItemIndexes = new Set();
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] === "--discard-next") {
      i += 1;
      deletedItemIndexes.add(i);
      continue;
    }
    if (arr[i] === "--discard-prev") {
      if (!deletedItemIndexes.has(i - 1)) {
        resultArray.pop();
      }
      continue;
    }
    if (arr[i] === "--double-next") {
      if (arr[i + 1] !== undefined) {
        resultArray.push(arr[i + 1]);
      }
      continue;
    }
    if (arr[i] === "--double-prev") {
      if (arr[i - 1] !== undefined && !deletedItemIndexes.has(i - 1)) {
        resultArray.push(arr[i - 1]);
      }
      continue;
    }
    resultArray.push(arr[i]);
  }
  return resultArray;
}

module.exports = {
  transform,
};
