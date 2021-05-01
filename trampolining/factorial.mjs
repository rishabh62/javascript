//Tail call optimized factorial function
export default function factorial(n, acc = 1) {
  if (n === 0 || n === 1) return acc;
  //To make this 'trampolinable' we return a function wrapping the actual recursive call
  return () => factorial(n - 1, n * acc);
}
