
const nameArray = ["Alice", "Alan", "Boston", "David", "Chris", "Frank", "Grace", "Henry", "Ivy", "Jack"];


const sortedNames = [...nameArray].sort((a, b) => {
  
  const firstLetterCompare = a[0].localeCompare(b[0]);
  if (firstLetterCompare !== 0) {
    return firstLetterCompare;
  }
  
  return a.length - b.length;
});

console.log("Original names:", nameArray);
console.log("Sorted names (by first letter, then length):", sortedNames);


export const nameResults = {
  originalArray: nameArray,
  sortedArray: sortedNames
};
