console.log("=== Integer Array Operations ===\n");

const intArray = new Int32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);

console.log("1. Original Integer Array:");
console.log(intArray);
console.log(`Array length: ${intArray.length}`);

console.log("2. Array elements as doubles:");
const doublesArray = Array.from(intArray).map(num => parseFloat(num.toFixed(1)));
console.log(doublesArray);

console.log("\n3. Formatted as doubles:");
const formattedDoubles = Array.from(intArray).map(num => `${num}.0`);
console.log(formattedDoubles);


console.log("\n4. Filter even numbers:");
const evenNumbers = Array.from(intArray).filter(num => num % 2 === 0);
console.log("Even numbers:", evenNumbers);
console.log(`Found ${evenNumbers.length} even numbers\n`);


console.log("5. Even numbers as doubles:");
const evenAsDoubles = Array.from(intArray)
    .filter(num => num % 2 === 0)
    .map(num => parseFloat(num.toFixed(1)));
console.log(evenAsDoubles);


console.log("\n" + "=".repeat(50));
console.log("SUMMARY:");
console.log(`Original array: ${intArray.length} integers`);
console.log(`Even numbers: ${evenNumbers.length} elements`);
console.log(`Percentage of even numbers: ${(evenNumbers.length / intArray.length * 100).toFixed(1)}%`);