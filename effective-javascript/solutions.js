const identity = (x) => x;

const add = (x, y) => x + y;
const sub = (x, y) => x - y;
const mul = (x, y) => x * y;

const identityf = (x) => () => x;

const addf = (x) => (y) => x + y;

// const curry = (fn, x) => fn.bind(null, x);
//alternate implementation without using bind
const curry =
  (fn, ...x) =>
  (...args) =>
    fn(...x, ...args);

const curryr =
  (fn, ...args) =>
  (...moreArgs) =>
    fn(...moreArgs, ...args);

const liftf = (fn) => (x) => (y) => fn(x, y);

const inc = (x) => x + 1;

const twice = (fn) => (x) => fn(x, x);

const reverse =
  (fn) =>
  (...args) =>
    fn(...args.reverse());

module.exports = {
  identity,
  add,
  sub,
  mul,
  identityf,
  addf,
  curry,
  curryr,
  liftf,
  inc,
  twice,
  reverse,
};
