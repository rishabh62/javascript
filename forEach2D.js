//a composite function to loop over a 2D array

const arr = [
  ["A", "B", "C", "E"],
  ["S", "F", "C", "S"],
  ["A", "D", "E", "E"],
];

//data last alias for inbuilt forEach function
const forEach = (fn) => (arr) => arr.forEach((x) => fn(x)); //not point free because forEach will otherwise call console.log with 3 arguments

const forEach2D = (fn) => forEach(forEach(fn));

forEach2D(console.log)(arr);
