// Efficient integer array operations
// Creating the most efficient integer array using typed arrays for better memory usage

// Create an efficient integer array using Int32Array (most efficient for integers)
const intArray = new Int32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);

console.log("Original integer array:");
console.log(intArray);

// Print array elements as doubles
console.log("\nArray elements printed as doubles:");
for (let i = 0; i < intArray.length; i++) {
    // Convert to double by adding .0 or using parseFloat
    console.log(`Index ${i}: ${intArray[i].toFixed(1)}`);
}

// Alternative method to print as doubles using map
console.log("\nArray as doubles (using map):");
const doublesArray = Array.from(intArray).map(num => parseFloat(num.toFixed(1)));
console.log(doublesArray);

// Filter even numbers efficiently
console.log("\nFiltering even numbers:");
const evenNumbers = Array.from(intArray).filter(num => num % 2 === 0);
console.log("Even numbers:", evenNumbers);

// More efficient filtering using a for loop (better performance for large arrays)
console.log("\nEven numbers (efficient method):");
const efficientEvenNumbers = [];
for (let i = 0; i < intArray.length; i++) {
    if (intArray[i] % 2 === 0) {
        efficientEvenNumbers.push(intArray[i]);
    }
}
console.log(efficientEvenNumbers);

// Display results summary
console.log("\n=== Summary ===");
console.log(`Original array length: ${intArray.length}`);
console.log(`Even numbers count: ${evenNumbers.length}`);
console.log(`Array type: ${intArray.constructor.name}`);
console.log(`Memory efficient: ${intArray.BYTES_PER_ELEMENT} bytes per element`);
