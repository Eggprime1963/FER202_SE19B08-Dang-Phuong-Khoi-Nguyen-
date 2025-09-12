console.log("=== People Array - Average Age Calculator ===\n");


const people = [
    { name: "Alice", age: 25, city: "New York" },
    { name: "Bob", age: 30, city: "Los Angeles" },
    { name: "Charlie", age: 35, city: "Chicago" },
    { name: "Diana", age: 28, city: "Houston" },
    { name: "Eve", age: 22, city: "Phoenix" },
    { name: "Frank", age: 45, city: "Philadelphia" },
    { name: "Grace", age: 33, city: "San Antonio" },
    { name: "Henry", age: 29, city: "San Diego" },
    { name: "Ivy", age: 31, city: "Dallas" },
    { name: "Jack", age: 27, city: "San Jose" }
];

console.log("1. People Array:");
console.log(people);
console.log(`Total number of people: ${people.length}\n`);


console.log("2. People Details:");
people.forEach((person, index) => {
    console.log(`${index + 1}. ${person.name} - Age: ${person.age}, City: ${person.city}`);
});

console.log("\n3. One-liner calculation:");
const avgAge = people.reduce((sum, person) => sum + person.age, 0) / people.length;
console.log(`Average age (one-liner): ${avgAge.toFixed(2)}`);

console.log("\n" + "=".repeat(50));
console.log("SUMMARY:");
console.log(`Total people: ${people.length}`);
console.log(`Average age: ${avgAge.toFixed(2)} years`);
console.log(`Age range: ${youngest.age} - ${oldest.age} years`);
