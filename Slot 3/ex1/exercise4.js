// Sample data
const ages = [33, 12, 20, 16];

// Additional test arrays for different scenarios
const shortAges = [25, 30];
const singleAge = [40];
const emptyAges = [];

console.log("=== ARRAY DESTRUCTURING WITH SKIP, DEFAULT, AND REST ===\n");

const [first, , third = 0, ...restAges] = ages;

console.log("Required Results:");
console.log(`Original array: [${ages.join(', ')}]`);
console.log(`First: ${first}`);
console.log(`Third (skipped second): ${third}`);
console.log(`Rest ages: [${restAges.join(', ')}]`);

console.log("\n" + "=".repeat(50));
console.log("ADVANCED APPROACHES & EXPLANATIONS:\n");



const [first2, , third2 = 0, ...restAges2] = shortAges;
console.log(`Array: [${shortAges.join(', ')}]`);
console.log(`First: ${first2}, Third: ${third2}, Rest: [${restAges2.join(', ')}]`);

const [first3, , third3 = 0, ...restAges3] = singleAge;
console.log(`Array: [${singleAge.join(', ')}]`);
console.log(`First: ${first3}, Third: ${third3}, Rest: [${restAges3.join(', ')}]`);

const [first4, , third4 = 0, ...restAges4] = emptyAges;
console.log(`Array: [${emptyAges.join(', ')}]`);
console.log(`First: ${first4}, Third: ${third4}, Rest: [${restAges4.join(', ')}]`);


function analyzeAges(ageArray) {
    const [first, , third = 0, ...restAges] = ageArray;
    
    return {
        original: ageArray,
        first: first,
        third: third,
        rest: restAges,
        summary: `First: ${first}, Third: ${third}, Rest count: ${restAges.length}`
    };
}

console.log("\n3. Function-based Analysis:");
console.log("Ages array:", analyzeAges(ages));
console.log("Short ages:", analyzeAges(shortAges));
console.log("Single age:", analyzeAges(singleAge));
console.log("Empty array:", analyzeAges(emptyAges));


console.log("\n4. Different Skip Patterns:");

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


const [, second, , fourth, ...others] = numbers;
console.log(`Numbers: [${numbers.slice(0, 5).join(', ')}...]`);
console.log(`Second: ${second}, Fourth: ${fourth}, Others count: ${others.length}`);


const [firstNum, , , fourthNum, ...remaining] = numbers;
console.log(`First: ${firstNum}, Fourth: ${fourthNum}, Remaining count: ${remaining.length}`);


console.log("\n5. Destructuring with Calculations:");

const scores = [85, 92, 78, 95, 88];
const [highest, , lowest = 0, ...middleScores] = scores.sort((a, b) => b - a);
console.log(`Sorted scores: [${scores.join(', ')}]`);
console.log(`Highest: ${highest}`);
console.log(`Third highest: ${lowest}`);
console.log(`Middle scores: [${middleScores.join(', ')}]`);
console.log(`Average of middle scores: ${middleScores.length ? (middleScores.reduce((a, b) => a + b, 0) / middleScores.length).toFixed(2) : 'N/A'}`);


console.log("\n6. Nested Array Destructuring:");

const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
const [firstRow, , thirdRow = []] = matrix;
const [, , thirdElement = 0] = firstRow;
const [firstOfThird = 0, , thirdOfThird = 0] = thirdRow;

console.log(`Matrix: ${JSON.stringify(matrix)}`);
console.log(`First row: [${firstRow.join(', ')}]`);
console.log(`Third element of first row: ${thirdElement}`);
console.log(`Third row: [${thirdRow.join(', ')}]`);
console.log(`First and third elements of third row: ${firstOfThird}, ${thirdOfThird}`);

