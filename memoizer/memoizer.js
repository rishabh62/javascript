//this can only memoize functions that accept primitive arguments excluding Symbols
const memoizer = (fn) =>
  (
    (cache) =>
    (...args) =>
      args.toString() in cache
        ? cache[args.toString()]
        : (cache[args.toString()] = fn(...args))
  )({});

module.exports = { memoizer };
