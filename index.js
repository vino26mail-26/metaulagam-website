const fs = require("fs");

// 1) Create or replace the file
fs.writeFileSync("note.txt", "Welcome to MetaUlagam Node.js backend!");

// 2) Read the file
const content = fs.readFileSync("note.txt", "utf-8");
console.log("File says:", content);

// 3) Append data to the file
fs.appendFileSync("note.txt", "\nThis is your backend journey!");

console.log("Updated file:");
console.log(fs.readFileSync("note.txt", "utf-8"));
