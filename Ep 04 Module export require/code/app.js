// const { calculateMultiply } = require("./calulate/multiply");
// const { x, calculateSum } = require("./calulate/sum");

const { calculateMultiply, calculateSum } = require("./calculate");
const data = require("./data.json");

// ES6 module import syntax
// import { calculateSum } from "./sum.js"

var a = 10;
var b = 20;

calculateSum(a, b);
calculateMultiply(a, b);

console.log(data.name);
console.log(data.city);
