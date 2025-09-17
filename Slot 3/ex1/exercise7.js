console.log("=== Exercise 7: Spread vs Rest Operators ===\n");

const companies = [
    { name: "TechCorp", category: "Technology", start: 2010, end: 2020 },
    { name: "RetailMax", category: "Retail", start: 2005, end: 2018 },
    { name: "FinanceFirst", category: "Finance", start: 2008, end: 2022 }
];

const company0New = { ...companies[0], start: companies[0].start + 1 };


function concatAll(...arrays) {
    return arrays.reduce((result, currentArray) => [...result, ...currentArray], []);
}

console.log("Required Results:");
console.log("companies[0]:", JSON.stringify(companies[0]));
console.log("company0New:", JSON.stringify(company0New));
console.log("concatAll([1,2],[3],[4,5]):", concatAll([1, 2], [3], [4, 5]));

console.log("\n" + "=".repeat(50));
console.log("ADVANCED APPROACHES & EXPLANATIONS:\n");

console.log("1. Original Companies Array:");
companies.forEach((company, index) => {
    console.log(`${index}. ${JSON.stringify(company)}`);
});

console.log("\n2. Spread Operator - Advanced Copy:");

const company0NewAdv = { ...companies[0], start: companies[0].start + 1 };

console.log("Original companies[0]:", JSON.stringify(companies[0]));
console.log("Modified company0NewAdv:", JSON.stringify(company0NewAdv));
console.log("Original unchanged:", companies[0].start === 2010);
console.log("New object created:", companies[0] !== company0NewAdv);


console.log("\n3. Rest Parameter - Function Definition:");


function concatAll(...arrays) {
    console.log(`Received ${arrays.length} arrays as arguments`);
    arrays.forEach((arr, index) => {
        console.log(`Array ${index + 1}: [${arr.join(', ')}]`);
    });    
    return arrays.reduce((result, currentArray) => [...result, ...currentArray], []);
}

const concatAllFlat = (...arrays) => arrays.flat();

const concatAllConcat = (...arrays) => [].concat(...arrays);

console.log("Testing concatAll([1,2],[3],[4,5]):");
const result1 = concatAll([1, 2], [3], [4, 5]);
console.log("Result:", result1);

console.log("\nAlternative implementations:");
const result2 = concatAllFlat([1, 2], [3], [4, 5]);
const result3 = concatAllConcat([1, 2], [3], [4, 5]);
console.log("Using flat():", result2);
console.log("Using concat():", result3);
console.log("All methods produce same result:", 
    JSON.stringify(result1) === JSON.stringify(result2) && 
    JSON.stringify(result2) === JSON.stringify(result3));


console.log("\n4. Complex Object Copying:");


const originalCompany = {
    name: "DeepCorp",
    details: {
        employees: 100,
        locations: ["NYC", "LA"]
    }
};


const shallowCopy = { ...originalCompany };
const deeperCopy = { 
    ...originalCompany, 
    details: { 
        ...originalCompany.details,
        locations: [...originalCompany.details.locations]
    }
};

console.log("Original:", JSON.stringify(originalCompany));
console.log("Shallow copy:", JSON.stringify(shallowCopy));
console.log("Deeper copy:", JSON.stringify(deeperCopy));


shallowCopy.details.employees = 200;
deeperCopy.details.locations.push("Chicago");

console.log("\nAfter modifications:");
console.log("Original after shallow copy modification:", JSON.stringify(originalCompany));
console.log("Shallow copy:", JSON.stringify(shallowCopy));
console.log("Deeper copy:", JSON.stringify(deeperCopy));


console.log("\n5. Array Merging Patterns:");

const arr1 = [1, 2, 3];
const arr2 = [4, 5];
const arr3 = [6, 7, 8];


const merged1 = [...arr1, ...arr2, ...arr3];
const merged2 = [].concat(arr1, arr2, arr3);
const merged3 = concatAll(arr1, arr2, arr3);

console.log("Original arrays:");
console.log(`arr1: [${arr1.join(', ')}]`);
console.log(`arr2: [${arr2.join(', ')}]`);
console.log(`arr3: [${arr3.join(', ')}]`);

console.log("\nMerged results:");
console.log("Spread:", merged1);
console.log("Concat:", merged2);
console.log("concatAll:", merged3);


console.log("\n6. Practical Examples:");


const originalNumbers = [1, 2, 3];
const withNewStart = [0, ...originalNumbers];
const withNewEnd = [...originalNumbers, 4];
const withNewMiddle = [...originalNumbers.slice(0, 2), 2.5, ...originalNumbers.slice(2)];

console.log("Original:", originalNumbers);
console.log("With new start:", withNewStart);
console.log("With new end:", withNewEnd);
console.log("With new middle:", withNewMiddle);


const mergeObjects = (...objects) => {
    console.log(`Merging ${objects.length} objects`);
    return objects.reduce((result, obj) => ({ ...result, ...obj }), {});
};

const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const obj3 = { e: 5, a: 10 }; 

console.log("\nObject merging:");
console.log("obj1:", obj1);
console.log("obj2:", obj2);
console.log("obj3:", obj3);
console.log("Merged:", mergeObjects(obj1, obj2, obj3));

console.log("\n" + "=".repeat(50));

