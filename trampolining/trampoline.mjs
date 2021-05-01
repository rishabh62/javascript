export default function trampoline(fn) {
  return function trampolined(...args) {
    let result = fn.bind(null, ...args);
    while (result && typeof result === "function") {
      result = result();
    }
    return result;
  };
}
