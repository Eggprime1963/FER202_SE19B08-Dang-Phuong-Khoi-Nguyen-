
const integerArray = [45, 12, 78, 23, 67, 34, 89, 15, 56, 91];


const sum = integerArray.reduce((total, num) => total + num, 0);


const sortedIntArray = [...integerArray].sort((a, b) => a - b);

console.log("Integer Array:", integerArray);
console.log("Sum of integers:", sum);
console.log("Sorted integer array:", sortedIntArray);


export const integerResults = {
  originalArray: integerArray,
  sum: sum,
  sortedArray: sortedIntArray
};
