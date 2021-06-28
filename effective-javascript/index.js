const identity = x => x;

const add = (x, y) => x + y;
const sub = (x, y) => x - y;
const mul = (x, y) => x * y;

const identityf = x => () => x;

const curry = (f, ...args) =>
  args.length >= f.length
    ? f(...args)
    : (...moreArgs) => curry(f, ...args, ...moreArgs);

const addf = curry(add);

const curryr = (f, ...xs) => (...ys) => f(...ys, ...xs);

const liftf = curry;

const inc = curry(add, 1);

const twice = f => x => f(x, x);

const reverse = f => (...xs) => f(...xs.reverse());

const composeu = (...fs) => x => fs.reduce((result, f) => f(result), x);

const composeb = (...fs) => (...args) =>
  fs.reduce((result, f, i) => f(result, args[i + 1]), args[0]);

const limit = (f, callsLeft) => (...args) => {
  if (callsLeft > 0) {
    callsLeft -= 1;
    return f(...args);
  }
};

const from = x => () => {
  x += 1;
  return x - 1;
};

const to = (index, end) => () => {
  const value = index();
  if (value < end) {
    return value;
  }
};

const fromTo = (start, end) => to(from(start), end);

const element = (xs, gen = from(0)) => () => {
  const index = gen();
  if (index !== undefined) {
    return xs[index];
  }
};

const collect = (gen, xs) => () => {
  const x = gen();
  if (x !== undefined) {
    xs.push(x);
  }
  return x;
};

const filter = (gen, test) =>
  function iterate() {
    const value = gen();
    if (value === undefined || test(value)) {
      return value;
    }
    return iterate();
  };

const concat = (...gens) => () => {
  for (let i = 0; i < gens.length; i++) {
    const value = gens[i]();
    if (value !== undefined) {
      return value;
    }
  }
};

// Douglas Crockford's solution
// const concat = (...gens) => {
//   const next = element(gens);
//   let gen = next();
//   return function iterate() {
//     const value = gen();
//     if (value !== undefined) {
//       return value;
//     }
//     gen = next();
//     if (gen !== undefined) {
//       return iterate();
//     }
//   };
// };

// Corrected solution
// const concat = (...gens) => {
//   const next = element(gens);
//   let gen = next();
//   return function iterate() {
//     if (gen === undefined) {
//       return undefined
//     }
//     const value = gen();
//     if (value !== undefined) {
//       return value;
//     }
//     gen = next();
//     return iterate();
//   };
// };

const gensymff = (factory, seed) => prefix => {
  const gen = factory(seed);
  return () => prefix + gen();
};

const gensymf = gensymff(from, 1);

const fibonaccif = (first, second) => () => {
  const oldFirst = first;
  [first, second] = [second, first + second];
  return oldFirst;
};

const counter = value => ({
  up: () => {
    value += 1;
    return value;
  },
  down: () => {
    value -= 1;
    return value;
  }
});

const revocable = f => {
  let isActive = true;
  return {
    invoke: (...args) => {
      if (isActive) {
        return f(...args);
      }
    },
    revoke: () => {
      isActive = false;
    }
  };
};

const liftg = f => {
  const lifted = x => {
    if (x === undefined) {
      return undefined;
    }
    return y => {
      if (y === undefined) {
        return x;
      }
      return lifted(f(x, y));
    };
  };
  return lifted;
};

const addg = liftg(add);

const objectify = (...keys) => (...vals) =>
  keys.reduce((object, key, i) => {
    object[key] = vals[i];
    return object;
  }, {});

const join = (f, ...gens) => () => f(...gens.map(gen => gen()));

const continuize = f => (cb, ...args) => cb(f(...args));

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
  composeu,
  composeb,
  limit,
  from,
  to,
  fromTo,
  element,
  collect,
  filter,
  concat,
  gensymf,
  fibonaccif,
  counter,
  revocable,
  addg,
  liftg,
  objectify,
  join,
  continuize
};
