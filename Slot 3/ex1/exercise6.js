
console.log("=== Exercise 6: Sort + Slice - Companies by End Year ===\n");

const companies = [
    { name: "TechCorp", category: "Technology", start: 2010, end: 2020 },
    { name: "RetailMax", category: "Retail", start: 2005, end: 2018 },
    { name: "FinanceFirst", category: "Finance", start: 2008, end: 2022 },
    { name: "HealthPlus", category: "Healthcare", start: 2012, end: 2019 },
    { name: "EduLearn", category: "Education", start: 2015, end: 2021 },
    { name: "FoodDelight", category: "Food", start: 2007, end: 2017 },
    { name: "AutoDrive", category: "Automotive", start: 2009, end: 2023 },
    { name: "MediaStream", category: "Media", start: 2011, end: 2020 }
];


const sortedCompanies = [...companies].sort((a, b) => a.end - b.end);
const first3Companies = sortedCompanies.slice(0, 3);

console.log("Required Results - First 3 companies by end year:");
first3Companies.forEach((company, index) => {
    console.log(`${index + 1}. ${company.name} - ${company.end}`);
});

console.log("\n" + "=".repeat(50));
console.log("ADVANCED APPROACHES & EXPLANATIONS:\n");

console.log("1. Original Companies Array:");
companies.forEach((company, index) => {
    console.log(`${index + 1}. ${company.name} - ${company.category} (${company.start}-${company.end})`);
});


console.log("\n2. Companies Sorted by End Year (Advanced):");


const sortedCompaniesAdv = [...companies].sort((a, b) => a.end - b.end);
const first3CompaniesAdv = sortedCompaniesAdv.slice(0, 3);

first3CompaniesAdv.forEach((company, index) => {
    console.log(`${index + 1}. ${company.name} - ${company.end}`);
});


console.log("\n3. Verification - Original Array Unchanged:");
console.log("Original first company:", companies[0].name);
console.log("Sorted first company:", sortedCompaniesAdv[0].name);
console.log("Arrays are different objects:", companies !== sortedCompaniesAdv);


console.log("\n4. Functional Approach (Method Chaining):");

const topEarliestEnding = companies
    .slice() 
    .sort((a, b) => a.end - b.end)
    .slice(0, 3)
    .map(company => `${company.name} - ${company.end}`);

topEarliestEnding.forEach((company, index) => {
    console.log(`${index + 1}. ${company}`);
});


console.log("\n5. Different Sorting Options:");


const latestEnding = [...companies]
    .sort((a, b) => b.end - a.end)
    .slice(0, 3)
    .map(company => `${company.name} - ${company.end}`);

console.log("Latest ending companies:");
latestEnding.forEach((company, index) => {
    console.log(`${index + 1}. ${company}`);
});


const longestRunning = [...companies]
    .sort((a, b) => (b.end - b.start) - (a.end - a.start))
    .slice(0, 3)
    .map(company => `${company.name} - ${company.end - company.start} years`);

console.log("\nLongest running companies:");
longestRunning.forEach((company, index) => {
    console.log(`${index + 1}. ${company}`);
});


console.log("\n6. Multi-criteria Sorting:");

const sortedByEndThenStart = [...companies]
    .sort((a, b) => {
        
        if (a.end !== b.end) {
            return a.end - b.end;
        }
        
        return a.start - b.start;
    })
    .slice(0, 3);

console.log("Sorted by end year, then start year:");
sortedByEndThenStart.forEach((company, index) => {
    console.log(`${index + 1}. ${company.name} - Start: ${company.start}, End: ${company.end}`);
});


console.log("\n7. Different Slice Ranges:");

const allSorted = [...companies].sort((a, b) => a.end - b.end);

console.log("First 2 companies:");
allSorted.slice(0, 2).forEach((company, index) => {
    console.log(`${index + 1}. ${company.name} - ${company.end}`);
});

console.log("\nMiddle 3 companies (positions 3-5):");
allSorted.slice(2, 5).forEach((company, index) => {
    console.log(`${index + 3}. ${company.name} - ${company.end}`);
});

console.log("\nLast 2 companies:");
allSorted.slice(-2).forEach((company, index) => {
    console.log(`${index + allSorted.length - 1}. ${company.name} - ${company.end}`);
});


console.log("\n8. Performance Comparison:");


console.time("Spread operator");
const result1 = [...companies].sort((a, b) => a.end - b.end).slice(0, 3);
console.timeEnd("Spread operator");


console.time("Array.from");
const result2 = Array.from(companies).sort((a, b) => a.end - b.end).slice(0, 3);
console.timeEnd("Array.from");


console.time("slice() method");
const result3 = companies.slice().sort((a, b) => a.end - b.end).slice(0, 3);
console.timeEnd("slice() method");

console.log("All methods produce same result:", 
    JSON.stringify(result1) === JSON.stringify(result2) && 
    JSON.stringify(result2) === JSON.stringify(result3));
