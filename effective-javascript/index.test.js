const {
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
  continuize,
} = require("./solutions.js");

describe("identity", () => {
  test("returns the same thing that was passed in", () => {
    expect(identity(1)).toEqual(1);
  });
});

describe("arithmetic operations", () => {
  test("add", () => {
    expect(add(1, 2)).toEqual(3);
    expect(add(2, 2)).toEqual(4);
    expect(add(1, -2)).toEqual(-1);
    expect(add(1, 0)).toEqual(1);
    expect(add(66, 6)).toEqual(72);
    expect(add(66, -90)).toEqual(-24);
  });

  test("sub", () => {
    expect(sub(1, 2)).toEqual(-1);
    expect(sub(2, 2)).toEqual(0);
    expect(sub(1, -2)).toEqual(3);
    expect(sub(1, 0)).toEqual(1);
    expect(sub(0, 1)).toEqual(-1);
  });

  test("mul", () => {
    expect(mul(1, 2)).toEqual(2);
    expect(mul(2, 2)).toEqual(4);
    expect(mul(1, -2)).toEqual(-2);
    expect(mul(-4, -2)).toEqual(8);
    expect(mul(4, 0)).toEqual(0);
    expect(mul(-4, 0)).toEqual(-0);
  });
});

describe("identityf", () => {
  test("returns function that returns the value passed in", () => {
    expect(identityf(1)()).toEqual(1);
    expect(identityf(111)()).toEqual(111);
  });
});

describe("addf", () => {
  test("takes in a value and returns a function that takes a second value and returns the sum", () => {
    expect(addf(3)(4)).toEqual(7);
    expect(addf(1)(1)).toEqual(2);
    expect(addf(111)(3)).toEqual(114);
  });
});

describe("curry", () => {
  test("takes in a function and an argument and returns a function that takes the remaining argument", () => {
    expect(curry(add, 3)(4)).toEqual(7);
    expect(curry(mul, 5)(6)).toEqual(30);
  });
});

describe("curryr", () => {
  test("takes in a function and an argument and returns a function that takes the remaining argument and applies those values in flipped order", () => {
    expect(curryr(add, 3)(4)).toEqual(7);
    expect(curryr(mul, 5)(6)).toEqual(30);
    expect(curryr(sub, 3)(4)).toEqual(1);
    expect(curryr(sub, 4)(3)).toEqual(-1);
  });
});

describe("liftf", () => {
  test("takes in a function returns a function that takes the first argument and returns a function that takes the second argument and applies those values to the function passed in", () => {
    expect(liftf(add)(3)(4)).toEqual(7);
    expect(liftf(mul)(5)(6)).toEqual(30);
    expect(liftf(sub)(3)(4)).toEqual(-1);
    expect(liftf(sub)(4)(3)).toEqual(1);
  });
});

describe("inc", () => {
  test("takes a number an returns that number plus one", () => {
    expect(inc(-2)).toEqual(-1);
    expect(inc(-1)).toEqual(0);
    expect(inc(0)).toEqual(1);
    expect(inc(1)).toEqual(2);
    expect(inc(2)).toEqual(3);
  });
});

describe("twice", () => {
  test("takes a binary function and returns a unary function that applies one argument to the binary function twice", () => {
    expect(twice(add)(11)).toEqual(22);
    expect(twice(mul)(11)).toEqual(121);
  });
});

describe("reverse", () => {
  test("takes in a binary function and returns a function that takes the arguments in reverse order", () => {
    expect(reverse(sub)(3, 2)).toEqual(-1);
  });
});

describe("composeu", () => {
  test("takes two unary functions and returns a unary function that calls them both", () => {
    expect(
      composeu(
        (x) => x * 2,
        (x) => x * x
      )(5)
    ).toEqual(100);
  });
});

describe("composeb", () => {
  test("takes two binary functions and returns a trinary function that calls them both", () => {
    expect(composeb(add, mul)(2, 3, 7)).toEqual(35);
  });
});

describe("limit", () => {
  test("takes a function and only allows that function to be called n number of times", () => {
    const addLimited = limit(add, 1);
    expect(addLimited(3, 4)).toEqual(7);
    expect(addLimited(3, 4)).toEqual(undefined);
  });

  test("takes a function and only allows that function to be called n number of times 2", () => {
    const addLimited = limit(add, 2);
    expect(addLimited(3, 4)).toEqual(7);
    expect(addLimited(3, 4)).toEqual(7);
    expect(addLimited(3, 4)).toEqual(undefined);
  });

  test("takes a function and only allows that function to be called n number of times 3", () => {
    const addLimited = limit(add, 3);
    expect(addLimited(3, 4)).toEqual(7);
    expect(addLimited(3, 4)).toEqual(7);
    expect(addLimited(3, 4)).toEqual(7);
    expect(addLimited(3, 4)).toEqual(undefined);
  });

  test("takes a function and only allows that function to be called n number of times 0", () => {
    const addLimited = limit(add, 0);
    expect(addLimited(3, 4)).toEqual(undefined);
  });
});

describe("from", () => {
  test("takes in a number and returns a generator and each subsequent call returns an incremented number", () => {
    const index = from(0);
    expect(index()).toEqual(0);
    expect(index()).toEqual(1);
    expect(index()).toEqual(2);
    expect(index()).toEqual(3);
  });
});

describe("to", () => {
  test("takes in a generator and end value and returns a generator calls the from generator until it gets up to that end value", () => {
    const index = to(from(2), 4);
    expect(index()).toEqual(2);
    expect(index()).toEqual(3);
    expect(index()).toEqual(undefined);
  });

  test("takes in a generator and end value and returns a generator that will produce numbers up to that number", () => {
    const index = to(from(0), 5);
    expect(index()).toEqual(0);
    expect(index()).toEqual(1);
    expect(index()).toEqual(2);
    expect(index()).toEqual(3);
    expect(index()).toEqual(4);
    expect(index()).toEqual(undefined);
  });
});

describe("fromTo", () => {
  test("returns a generator that produces values in a range", () => {
    const index = fromTo(0, 3);
    expect(index()).toEqual(0);
    expect(index()).toEqual(1);
    expect(index()).toEqual(2);
    expect(index()).toEqual(undefined);
  });
});

describe("element", () => {
  test("takes an array and a generator and returns a generator that will produce elements from the array", () => {
    const ele = element(["a", "b", "c", "d"], fromTo(1, 3));
    expect(ele()).toEqual("b");
    expect(ele()).toEqual("c");
    expect(ele()).toEqual(undefined);
  });

  test("if you do not pass in a generator, it will go through the entire array", () => {
    const ele = element(["a", "b", "c", "d"]);
    expect(ele()).toEqual("a");
    expect(ele()).toEqual("b");
    expect(ele()).toEqual("c");
    expect(ele()).toEqual("d");
    expect(ele()).toEqual(undefined);
  });
});

describe("collect", () => {
  test("takes a generator and an array and collects all values produced in the array", () => {
    const array = [];
    const col = collect(fromTo(0, 2), array);
    expect(col()).toEqual(0);
    expect(col()).toEqual(1);
    expect(col()).toEqual(undefined);
    expect(array).toEqual([0, 1]);
  });
});

describe("filter", () => {
  test("takes a generator and a test function and returns a generator that only produces values that are approved by the test function", () => {
    const fil = filter(fromTo(0, 5), (x) => x % 3 === 0);
    expect(fil()).toEqual(0);
    expect(fil()).toEqual(3);
    expect(fil()).toEqual(undefined);
  });
});

describe("concat", () => {
  test("takes 2 generators and concatenates them", () => {
    const con = concat(fromTo(0, 3), fromTo(0, 2));
    expect(con()).toEqual(0);
    expect(con()).toEqual(1);
    expect(con()).toEqual(2);
    expect(con()).toEqual(0);
    expect(con()).toEqual(1);
    expect(con()).toEqual(undefined);
    expect(con()).toEqual(undefined);
  });
});

describe("gensymf", () => {
  test("makes a unique symbol generator", () => {
    const geng = gensymf("G");
    const genh = gensymf("H");
    expect(geng()).toEqual("G1");
    expect(genh()).toEqual("H1");
    expect(geng()).toEqual("G2");
    expect(genh()).toEqual("H2");
  });
});

describe("fibonaccif", () => {
  test("makes a generator for a fibonacci sequence", () => {
    const fib = fibonaccif(0, 1);
    expect(fib()).toEqual(0);
    expect(fib()).toEqual(1);
    expect(fib()).toEqual(1);
    expect(fib()).toEqual(2);
    expect(fib()).toEqual(3);
    expect(fib()).toEqual(5);
    expect(fib()).toEqual(8);
    expect(fib()).toEqual(13);
  });
});

describe("counter", () => {
  test("makes an up and down generator that increments and decrements the value", () => {
    const { up, down } = counter(10);
    expect(up()).toEqual(11);
    expect(down()).toEqual(10);
    expect(down()).toEqual(9);
    expect(up()).toEqual(10);
  });
});

describe("revocable", () => {
  test("allows you to invoke and revoke a function", () => {
    const rev = revocable(add);
    const addRev = rev.invoke;
    expect(addRev(3, 4)).toEqual(7);
    expect(addRev(5, 7)).toEqual(12);
    expect(addRev(5, 7)).toEqual(12);
    expect(addRev(3, 4)).toEqual(7);
    rev.revoke();
    expect(addRev(5, 7)).toEqual(undefined);
    expect(addRev(3, 4)).toEqual(undefined);
  });
});

describe("addg", () => {
  test("adds from many invocations until it sees an empty invocation", () => {
    expect(addg()).toEqual(undefined);
    expect(addg(2)()).toEqual(2);
    expect(addg(2)(7)()).toEqual(9);
    expect(addg(3)(0)(4)()).toEqual(7);
    expect(addg(1)(2)(4)(8)()).toEqual(15);
  });
});

describe("liftg", () => {
  test("takes a binary function and makes it so you can keep applying a function until there are no inputs", () => {
    expect(liftg(mul)()).toEqual(undefined);
    expect(liftg(mul)(3)()).toEqual(3);
    expect(liftg(mul)(3)(0)(4)()).toEqual(0);
    expect(liftg(mul)(1)(2)(4)(8)()).toEqual(64);
  });

  test("it works with sub", () => {
    expect(liftg(sub)()).toEqual(undefined);
    expect(liftg(sub)(3)()).toEqual(3);
    expect(liftg(sub)(3)(0)(4)()).toEqual(-1);
    expect(liftg(sub)(1)(2)(4)(8)()).toEqual(-13);
  });
});

describe("objectify", () => {
  test("takes an array of property names and returns a constructor that takes values and returns an object", () => {
    const make = objectify("date", "marry", "kill");
    expect(make("butterfly", "unicorn", "monster")).toEqual({
      date: "butterfly",
      marry: "unicorn",
      kill: "monster",
    });
  });

  test("more vals than keys should not use extra vals", () => {
    const make = objectify("date", "marry", "kill");
    expect(
      make("butterfly", "unicorn", "monster", "this val is not used")
    ).toEqual({
      date: "butterfly",
      marry: "unicorn",
      kill: "monster",
    });
  });

  test("more keys than vals should set keys at the end to undefined", () => {
    const make = objectify(
      "date",
      "marry",
      "kill",
      "extra key",
      "another extra key"
    );
    expect(make("butterfly", "unicorn", "monster")).toEqual({
      date: "butterfly",
      marry: "unicorn",
      kill: "monster",
    });
  });
});

describe("join", () => {
  test("takes a function and generator, making a new generator that passes the results of the generator to the function", () => {
    const fo = join(
      objectify("number", "fibonacci"),
      from(0),
      fibonaccif(4, 5)
    );
    expect(fo()).toEqual({ number: 0, fibonacci: 4 });
    expect(fo()).toEqual({ number: 1, fibonacci: 5 });
    expect(fo()).toEqual({ number: 2, fibonacci: 9 });
  });
});

describe("continuize", () => {
  test("takes a function and returns a function that takes a callback and an argument", () => {
    const sqrtc = continuize(Math.sqrt);
    expect(sqrtc((x) => x, 81)).toEqual(9);
    expect(sqrtc((x) => x * 2, 81)).toEqual(18);
  });
});
