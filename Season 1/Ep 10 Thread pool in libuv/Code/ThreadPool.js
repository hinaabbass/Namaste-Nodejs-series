const fs = require("fs");
const crypto = require("crypto")

process.env.UV_THREADPOOL_SIZE = 5;

// fs.readFile("./file.txt", "utf-8", (err, data) => {
//     console.log(data);
// })
//The 4 keys will generate first and after that remaining one will be generated after some time because nodejs has only 4 threads at a time 
crypto.pbkdf2("Akshad", "salt", 500000, 10, "sha512", (err, key) => {
    console.log("1st key generated below:")
    console.log(key);
})
crypto.pbkdf2("Akshad", "salt", 500000, 10, "sha512", (err, key) => {
    console.log("2 nd key generated below:")
    console.log(key);
})
crypto.pbkdf2("Akshad", "salt", 500000, 10, "sha512", (err, key) => {
    console.log("3 nd key generated below:")
    console.log(key);
})
crypto.pbkdf2("Akshad", "salt", 500000, 10, "sha512", (err, key) => {
    console.log("4 nd key generated below:")
    console.log(key);
})
crypto.pbkdf2("Akshad", "salt", 500000, 10, "sha512", (err, key) => {
    console.log("5 nd key generated below:")
    console.log(key);
})