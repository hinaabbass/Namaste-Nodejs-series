const fs = require("fs");
const https = require("https");

var a = 10;
var b = 10;

https.get("https://api.fbi.com", (res) => {
  console.log(res?.secret);
});

setTimeout(() => {
  console.log("setTimeout");
}, 5000);

fs.readFile("./data.txt", "utf-8", (err, data) => {
  if (err) {
    console.error("Failed to read file:", err);
    return;
  }
  console.log("File Data:", data);
});

function multiplyfn(a, b) {
  const result = a * b;
  return result;
}

var c = multiplyfn(a, b);
console.log(c);
