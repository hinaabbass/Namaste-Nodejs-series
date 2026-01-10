const name = "Hina Abbas";
var a = 10;
var b = 20;
var c = a + b;

console.log(name);
console.log(c);

// console.log(global)

// console.log(globalThis);
console.log(globalThis === global); // true in nodejs
// console.log(globalThis === window); // false in nodejs, true in browser
// console.log(globalThis === self); // false in nodejs, true in browser and web worker
