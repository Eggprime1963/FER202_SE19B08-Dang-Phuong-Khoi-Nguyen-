console.log("=== Exercise 2: Rest Parameters ===\n");

const sum = (...nums) => {
    return nums
        .filter(n => typeof n === 'number' && !isNaN(n))
        .reduce((total, num) => total + num, 0);
};

const avg = (...nums) => {
    const validNums = nums.filter(n => typeof n === 'number' && !isNaN(n));
    if (validNums.length === 0) return 0;
    return parseFloat((validNums.reduce((total, num) => total + num, 0) / validNums.length).toFixed(2));
};

console.log("Required Results:");
console.log(`sum(1, 2, 3) = ${sum(1, 2, 3)}`);
console.log(`sum(1, 'x', 4) = ${sum(1, 'x', 4)}`);
console.log(`avg(1, 2, 3, 4) = ${avg(1, 2, 3, 4)}`);
console.log(`avg() = ${avg()}`);

console.log("\n" + "=".repeat(50));

