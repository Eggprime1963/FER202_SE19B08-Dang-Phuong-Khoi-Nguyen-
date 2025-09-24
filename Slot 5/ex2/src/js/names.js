// Name string array operations
const nameArray = ["Alice", "Alan", "Boston", "David", "Chris", "Frank", "Grace", "Henry", "Ivy", "Jack"];

// Sort names by first letter, then by length
const sortedNames = [...nameArray].sort((a, b) => {
  // First compare by first letter (alphabetically)
  const firstLetterCompare = a[0].localeCompare(b[0]);
  if (firstLetterCompare !== 0) {
    return firstLetterCompare;
  }
  // If first letters are the same, compare by length
  return a.length - b.length;
});

console.log("Original names:", nameArray);
console.log("Sorted names (by first letter, then length):", sortedNames);

// Export for React components
export const nameResults = {
  originalArray: nameArray,
  sortedArray: sortedNames
};
