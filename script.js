const course = {
    title: "VR Film Making",
    duration: "3 months",
    fee: 20000
};

console.log(course.title);

const data = {
    tool: "VR",
    level: "Beginner"
};

const jsonData = JSON.stringify(data);

let amounts = [10, 20, 30];
let doubled = amounts.map(n => n * 2);

console.log(doubled);


let scores = [40, 80, 20, 90];
let big = scores.filter(n => n >= 50);

console.log(big);


let bills = [100, 200, 50];
let total = bills.reduce((a, b) => a + b);

console.log(total);
