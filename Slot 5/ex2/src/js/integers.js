// Integer array operations
const integerArray = [45, 12, 78, 23, 67, 34, 89, 15, 56, 91];

// Calculate sum of integers
const sum = integerArray.reduce((total, num) => total + num, 0);

// Sort the integer array (ascending)
const sortedIntArray = [...integerArray].sort((a, b) => a - b);

console.log("Integer Array:", integerArray);
console.log("Sum of integers:", sum);
console.log("Sorted integer array:", sortedIntArray);

// Export for React components
export const integerResults = {
  originalArray: integerArray,
  sum: sum,
  sortedArray: sortedIntArray
};
