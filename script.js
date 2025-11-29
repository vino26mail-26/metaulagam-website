// ===============================
// 1. LIVE GREETING FEATURE
// ===============================

const nameInput = document.getElementById("nameInput");
const greetBtn = document.getElementById("greetBtn");
const greetMsg = document.getElementById("greetMsg");

if (nameInput && greetBtn && greetMsg) {
    greetBtn.addEventListener("click", function () {
        const name = nameInput.value.trim();

        if (name === "") {
            greetMsg.innerText = "Please enter your name.";
        } else {
            greetMsg.innerText = `Hello ${name}, welcome to MetaUlagam!`;
        }
    });
}

// ===============================
// 2. COURSE CARD CLICK + HIGHLIGHT
// ===============================

const cards = document.querySelectorAll(".course-card");

if (cards.length > 0) {
    cards.forEach(function (card) {
        card.addEventListener("click", function () {
            // Toggle active class (highlight)
            this.classList.toggle("active");

            // Show which card was clicked
            alert("You clicked: " + this.innerText);
        });
    });
}

// ===============================
// 3. SHOW / HIDE ENQUIRY FORM (OPTIONAL)
// ===============================
// Make sure you have a button with id="toggleForm" in your HTML if you want this feature.

const form = document.querySelector("form");
const toggleBtn = document.getElementById("toggleForm");

if (form && toggleBtn) {
    toggleBtn.addEventListener("click", function () {
        if (form.style.display === "none") {
            form.style.display = "block";
            toggleBtn.innerText = "Hide Enquiry Form";
        } else {
            form.style.display = "none";
            toggleBtn.innerText = "Show Enquiry Form";
        }
    });
}

// ===============================
// 4. JAVASCRIPT / ES6 PRACTICE CODE
//    (These just print to console – for learning)
// ===============================

// Objects
const course = {
    title: "VR Film Making",
    duration: "3 months",
    fee: 20000
};

console.log("Course title:", course.title);

// JSON
const data = {
    tool: "VR",
    level: "Beginner"
};

const jsonData = JSON.stringify(data);
console.log("JSON data:", jsonData);

// map()
let amounts = [10, 20, 30];
let doubled = amounts.map(n => n * 2);
console.log("Doubled amounts:", doubled);

// filter()
let scores = [40, 80, 20, 90];
let big = scores.filter(n => n >= 50);
console.log("Scores >= 50:", big);

// reduce()
let bills = [100, 200, 50];
let total = bills.reduce((a, b) => a + b);
console.log("Total bills:", total);
