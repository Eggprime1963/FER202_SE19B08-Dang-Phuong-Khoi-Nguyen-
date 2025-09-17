console.log("=== Exercise 8: Advanced Reduce - Age Statistics ===\n");

const ages = [15, 22, 18, 35, 16, 28, 13, 19, 25, 17, 30, 14, 21, 33, 18, 26, 15, 20];

const stats = ages.reduce((acc, age) => {
    return {
        total: acc.total + age,
        min: Math.min(acc.min, age),
        max: Math.max(acc.max, age)
    };
}, {
    total: 0,
    min: Infinity,
    max: -Infinity
});

const buckets = ages.reduce((acc, age) => {
    if (age >= 13 && age <= 19) {
        acc.teen += 1;
    } else if (age >= 20) {
        acc.adult += 1;
    }
    return acc;
}, { teen: 0, adult: 0 });

console.log("Required Results:");
console.log(`Total: ${stats.total}, Min: ${stats.min}, Max: ${stats.max}`);
console.log("Buckets:", buckets);

console.log("\n" + "=".repeat(50));
console.log("ADVANCED APPROACHES & EXPLANATIONS:\n");

console.log("1. Original Ages Array:");
console.log(`Ages: [${ages.join(', ')}]`);
console.log(`Total count: ${ages.length}`);

console.log("\n2. Advanced Statistics using Reduce:");

const statsAdv = ages.reduce((acc, age) => {
    return {
        total: acc.total + age,
        min: Math.min(acc.min, age),
        max: Math.max(acc.max, age),
        count: acc.count + 1
    };
}, {
    total: 0,
    min: Infinity,
    max: -Infinity,
    count: 0
});

console.log(`Total: ${statsAdv.total}, Min: ${statsAdv.min}, Max: ${statsAdv.max}`);
console.log(`Count: ${statsAdv.count}, Average: ${(statsAdv.total / statsAdv.count).toFixed(2)}`);


console.log("\n3. Age Group Buckets:");

const bucketsAdv = ages.reduce((acc, age) => {
    if (age >= 13 && age <= 19) {
        acc.teen += 1;
    } else if (age >= 20) {
        acc.adult += 1;
    } else {
        acc.child += 1; 
    }
    return acc;
}, { teen: 0, adult: 0, child: 0 });

console.log("Buckets:", bucketsAdv);
console.log(`Teen count (13-19): ${bucketsAdv.teen}`);
console.log(`Adult count (>=20): ${bucketsAdv.adult}`);
console.log(`Child count (<13): ${bucketsAdv.child}`);

console.log("\n4. Alternative Approaches:");

const total = ages.reduce((sum, age) => sum + age, 0);
const min = ages.reduce((minimum, age) => Math.min(minimum, age), Infinity);
const max = ages.reduce((maximum, age) => Math.max(maximum, age), -Infinity);

console.log("Separate reduces:");
console.log(`Total: ${total}, Min: ${min}, Max: ${max}`);

console.log("\nUsing built-in methods:");
console.log(`Total: ${ages.reduce((a, b) => a + b, 0)}`);
console.log(`Min: ${Math.min(...ages)}`);
console.log(`Max: ${Math.max(...ages)}`);
console.log(`Average: ${(ages.reduce((a, b) => a + b, 0) / ages.length).toFixed(2)}`);

console.log("\n5. Custom Reduce Implementation:");

function customReduce(array, callback, initialValue) {
    let accumulator = initialValue;
    for (let i = 0; i < array.length; i++) {
        accumulator = callback(accumulator, array[i], i, array);
    }
    return accumulator;
}

const customStats = customReduce(ages, (acc, age) => ({
    total: acc.total + age,
    min: Math.min(acc.min, age),
    max: Math.max(acc.max, age),
    count: acc.count + 1
}), { total: 0, min: Infinity, max: -Infinity, count: 0 });

console.log("Custom reduce result:");
console.log(`Total: ${customStats.total}, Min: ${customStats.min}, Max: ${customStats.max}`);

console.log("\n" + "=".repeat(50));
