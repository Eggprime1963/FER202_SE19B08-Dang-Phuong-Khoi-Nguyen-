console.log("=== Exercise 5: Map + Filter - Teen List ===\n");

const people = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 17 },
    { name: "Charlie", age: 13 },
    { name: "Diana", age: 19 },
    { name: "Eve", age: 12 },
    { name: "Frank", age: 20 },
    { name: "Grace", age: 15 },
    { name: "Henry", age: 18 },
    { name: "Ivy", age: 21 },
    { name: "Jack", age: 14 },
    { name: "Kate", age: 16 }
];


const teens = people
    .filter(person => person.age >= 13 && person.age <= 19)
    .map(person => `${person.name} (${person.age})`);

console.log("Required Results - Teenagers (13-19):");
teens.forEach(teen => console.log(teen));

console.log("\n" + "=".repeat(50));
console.log("ADVANCED APPROACHES & EXPLANATIONS:\n");

console.log("1. Original People Array:");
people.forEach((person, index) => {
    console.log(`${index + 1}. ${person.name} (${person.age})`);
});


console.log("\n2. Teenagers (13-19) - Advanced Approach:");
const teensAdvanced = people
    .filter(person => person.age >= 13 && person.age <= 19)
    .map(person => `${person.name} (${person.age})`);

teensAdvanced.forEach(teen => console.log(teen));

console.log("\n3. One-liner Approach:");
const teensOneLiner = people.filter(p => p.age >= 13 && p.age <= 19).map(p => `${p.name} (${p.age})`);
console.log("Teens (one-liner):");
teensOneLiner.forEach(teen => console.log(teen));


console.log("\n4. Different Age Groups:");

const kids = people.filter(p => p.age < 13).map(p => `${p.name} (${p.age})`);
const teenagers = people.filter(p => p.age >= 13 && p.age <= 19).map(p => `${p.name} (${p.age})`);
const adults = people.filter(p => p.age >= 20).map(p => `${p.name} (${p.age})`);

console.log("Kids (under 13):");
kids.forEach(kid => console.log(`  ${kid}`));

console.log("Teenagers (13-19):");
teenagers.forEach(teen => console.log(`  ${teen}`));

console.log("Adults (20+):");
adults.forEach(adult => console.log(`  ${adult}`));


console.log("\n5. Advanced Teen Analysis:");

const teenAnalysis = people
    .filter(person => person.age >= 13 && person.age <= 19)
    .map(person => {
        const ageGroup = person.age <= 15 ? 'Early Teen' : 'Late Teen';
        return {
            original: person,
            formatted: `${person.name} (${person.age})`,
            ageGroup: ageGroup,
            yearsUntilAdult: 20 - person.age
        };
    });

console.log("Detailed teen analysis:");
teenAnalysis.forEach(analysis => {
    console.log(`  ${analysis.formatted} - ${analysis.ageGroup}, ${analysis.yearsUntilAdult} years until adult`);
});

console.log("\n6. Functional Composition:");

const isTeenager = person => person.age >= 13 && person.age <= 19;
const formatPerson = person => `${person.name} (${person.age})`;
const getTeenList = peopleArray => peopleArray.filter(isTeenager).map(formatPerson);

const teenList = getTeenList(people);
console.log("Composed function result:");
teenList.forEach(teen => console.log(`  ${teen}`));


console.log("\n" + "=".repeat(50));
console.log("Statistics:");
console.log(`Total people: ${people.length}`);
console.log(`Teenagers (13-19): ${teenagers.length}`);
console.log(`Kids (under 13): ${kids.length}`);
console.log(`Adults (20+): ${adults.length}`);
console.log(`Percentage of teenagers: ${((teenagers.length / people.length) * 100).toFixed(1)}%`);