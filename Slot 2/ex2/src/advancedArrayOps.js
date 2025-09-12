// Advanced efficient integer array operations
// Demonstrating multiple approaches for maximum efficiency

console.log("=== EFFICIENT INTEGER ARRAY OPERATIONS ===\n");

// Method 1: Most efficient - Int32Array (typed array)
console.log("1. Creating efficient integer array using Int32Array:");
const efficientIntArray = new Int32Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20]);
console.log("Array:", efficientIntArray);
console.log(`Memory usage: ${efficientIntArray.BYTES_PER_ELEMENT} bytes per element`);
console.log(`Total memory: ${efficientIntArray.length * efficientIntArray.BYTES_PER_ELEMENT} bytes\n`);

// Method 2: Print as doubles - Multiple approaches
console.log("2. Printing as doubles:");

// Approach A: Using toFixed()
console.log("Approach A - Using toFixed():");
for (let i = 0; i < Math.min(5, efficientIntArray.length); i++) {
    console.log(`  ${efficientIntArray[i]} -> ${efficientIntArray[i].toFixed(1)}`);
}

// Approach B: Using map and Number constructor
console.log("\nApproach B - Complete array as doubles:");
const asDoubles = Array.from(efficientIntArray, x => Number(x.toFixed(1)));
console.log("Doubles array:", asDoubles);

// Approach C: Most efficient for large arrays - Generator function
function* printAsDoubles(intArray) {
    for (let i = 0; i < intArray.length; i++) {
        yield parseFloat(intArray[i]);
    }
}

console.log("\nApproach C - Using generator (memory efficient):");
const doubleGenerator = printAsDoubles(efficientIntArray);
console.log("First 5 doubles:", Array.from({ length: 5 }, () => doubleGenerator.next().value));

console.log("\n" + "=".repeat(50));

// Method 3: Filter even numbers - Multiple efficient approaches
console.log("3. Filtering even numbers:\n");

// Approach A: Standard filter (functional)
console.time("Filter method");
const evenWithFilter = Array.from(efficientIntArray).filter(n => n % 2 === 0);
console.timeEnd("Filter method");
console.log("Even numbers (filter):", evenWithFilter);

// Approach B: For loop (most efficient for performance)
console.time("For loop method");
const evenWithLoop = [];
for (let i = 0; i < efficientIntArray.length; i++) {
    if ((efficientIntArray[i] & 1) === 0) { // Bitwise AND - most efficient even check
        evenWithLoop.push(efficientIntArray[i]);
    }
}
console.timeEnd("For loop method");
console.log("Even numbers (for loop):", evenWithLoop);

// Approach C: Reduce method (functional programming)
console.time("Reduce method");
const evenWithReduce = Array.from(efficientIntArray).reduce((acc, num) => {
    if (num % 2 === 0) acc.push(num);
    return acc;
}, []);
console.timeEnd("Reduce method");
console.log("Even numbers (reduce):", evenWithReduce);

// Approach D: Most memory efficient - using typed array for result
console.time("Typed array result");
const evenCount = efficientIntArray.reduce((count, n) => count + (n % 2 === 0 ? 1 : 0), 0);
const evenTypedArray = new Int32Array(evenCount);
let index = 0;
for (let i = 0; i < efficientIntArray.length; i++) {
    if (efficientIntArray[i] % 2 === 0) {
        evenTypedArray[index++] = efficientIntArray[i];
    }
}
console.timeEnd("Typed array result");
console.log("Even numbers (typed array):", evenTypedArray);

console.log("\n" + "=".repeat(50));
console.log("4. Performance Summary:");
console.log(`Original array size: ${efficientIntArray.length} elements`);
console.log(`Even numbers found: ${evenWithFilter.length}`);
console.log(`Most efficient storage: Int32Array (${efficientIntArray.BYTES_PER_ELEMENT} bytes/element)`);
console.log("Most efficient even check: Bitwise AND operation (n & 1) === 0");
console.log("Most memory efficient filtering: Pre-allocated typed array");
