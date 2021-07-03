const { memoizer } = require("./memoizer");

//returns nth fibonacci number
const fib = memoizer((n) => (n === 0 || n === 1 ? n : fib(n - 1) + fib(n - 2)));

const printFib = (n) => console.log(fib(n));

//runs fast even when calculating 1000th fibonacci number because results are memoized
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100, 1000].forEach(printFib);
