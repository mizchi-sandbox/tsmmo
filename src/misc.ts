_.mixin({
  'cond': (tf, a, b) => {
    if(tf) return a;
    else  return b;
  }
});

interface underscore {
  cond(tf:bool, a:any, b:any);
}

interface Input {
  right: bool;
  left: bool;
  up: bool;
  down: bool;
  a: bool;
  b: bool;
}

interface Point {
  x: number;
  y: number;
}

