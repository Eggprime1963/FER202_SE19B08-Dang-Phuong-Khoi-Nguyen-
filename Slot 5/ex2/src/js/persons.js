
const personArray = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 17 },
  { id: 3, name: "Charlie", age: 13 },
  { id: 4, name: "Diana", age: 19 },
  { id: 5, name: "Eve", age: 12 },
  { id: 6, name: "Frank", age: 20 },
  { id: 7, name: "Grace", age: 15 },
  { id: 8, name: "Henry", age: 18 },
  { id: 9, name: "Ivy", age: 21 },
  { id: 10, name: "Jack", age: 14 },
  { id: 11, name: "Kate", age: 16 },
  { id: 12, name: "Liam", age: 22 }
];


const teenagers = personArray.filter(person => person.age >= 13 && person.age <= 19);


const teenagerCount = teenagers.length;


const teenagerAgeSum = teenagers.reduce((total, person) => total + person.age, 0);

console.log("All people:", personArray);
console.log("Teenagers (13-19):", teenagers);
console.log("Number of teenagers:", teenagerCount);
console.log("Sum of teenager ages:", teenagerAgeSum);


export const personResults = {
  originalArray: personArray,
  teenagers: teenagers,
  teenagerCount: teenagerCount,
  teenagerAgeSum: teenagerAgeSum
};
