console.log("=== Exercise 1: Basic Arrow Functions ===\n");

const double = n => n * 2;
const isEven = n => n % 2 === 0;

console.log("Required Results:");
console.log(`double(7) = ${double(7)}`);
console.log(`isEven(10) = ${isEven(10)}`);
console.log(`isEven(7) = ${isEven(7)}`);

console.log("\n" + "=".repeat(50));
console.log("ADVANCED APPROACHES & EXPLANATIONS:\n");


const doubleExplicit = (n) => {
    return n * 2;
};

const isEvenExplicit = (n) => {
    return n % 2 === 0;
};

console.log("\n2. Arrow Functions with Explicit Return:");
console.log(`doubleExplicit(7) = ${doubleExplicit(7)}`);
console.log(`isEvenExplicit(10) = ${isEvenExplicit(10)}`);
console.log(`isEvenExplicit(7) = ${isEvenExplicit(7)}`);


const isEvenBitwise = n => (n & 1) === 0;

console.log("\n3. Alternative Implementation (Bitwise):");
console.log(`isEvenBitwise(10) = ${isEvenBitwise(10)}`);
console.log(`isEvenBitwise(7) = ${isEvenBitwise(7)}`);


function doubleTraditional(n) {
    return n * 2;
}

function isEvenTraditional(n) {
    return n % 2 === 0;
}

console.log("\n4. Comparison with Traditional Functions:");
console.log(`doubleTraditional(7) = ${doubleTraditional(7)}`);
console.log(`isEvenTraditional(10) = ${isEvenTraditional(10)}`);