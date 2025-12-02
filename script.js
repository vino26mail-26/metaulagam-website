// script.js

document.addEventListener("DOMContentLoaded", () => {
  const API_BASE = "http://localhost:3000";

  // ====== DOM elements ======
  const courseTableBody = document.getElementById("courseTableBody");
  const courseSelect = document.getElementById("course");

  const enquiryForm = document.getElementById("enquiryForm");
  const enquiryStatus = document.getElementById("enquiryStatus");

  const toggleFormBtn = document.getElementById("toggleForm");

  const greetBtn = document.getElementById("greetBtn");
  const nameInputLive = document.getElementById("nameInput");
  const greetMsg = document.getElementById("greetMsg");

  const courseCards = document.querySelectorAll(".course-card");

  // ==========================
  // 1) Load courses from API
  // ==========================
  async function loadCoursesFromAPI() {
    try {
      const res = await fetch(`${API_BASE}/api/db/courses`);
      const courses = await res.json();

      // --- Fill table ---
      courseTableBody.innerHTML = "";

      courses.forEach((c) => {
        const tr = document.createElement("tr");

        const tdTitle = document.createElement("td");
        tdTitle.textContent = c.title;

        const tdDuration = document.createElement("td");
        tdDuration.textContent = c.duration;

        const tdFee = document.createElement("td");
        tdFee.textContent = `₹${c.fee}`;

        tr.appendChild(tdTitle);
        tr.appendChild(tdDuration);
        tr.appendChild(tdFee);

        courseTableBody.appendChild(tr);
      });

      // --- Fill dropdown (Select Course) ---
      courseSelect.innerHTML = `<option value="">-- Select a course --</option>`;

      courses.forEach((c) => {
        const opt = document.createElement("option");
        opt.value = c.title;        // or c._id if you prefer
        opt.textContent = c.title;
        courseSelect.appendChild(opt);
      });
    } catch (err) {
      console.error("Error loading courses from API:", err);
      // Optional: show something in the UI
      courseTableBody.innerHTML =
        "<tr><td colspan='3'>Failed to load courses</td></tr>";
    }
  }

  // ==================================
  // 2) Enquiry form -> POST /enquiries
  // ==================================
  if (enquiryForm) {
    enquiryForm.addEventListener("submit", async (e) => {
      e.preventDefault(); // stop page reload

      enquiryStatus.textContent = "";

      const nameField = document.getElementById("name");
      const emailField = document.getElementById("email");
      const courseField = document.getElementById("course");
      const messageField = document.getElementById("message");

      const payload = {
        name: nameField.value.trim(),
        email: emailField.value.trim(),
        course: courseField.value,
        message: messageField.value.trim(),
      };

      // Simple front-end validation
      if (!payload.name || !payload.email || !payload.course) {
        enquiryStatus.textContent =
          "Please fill Name, Email and Course before submitting.";
        enquiryStatus.style.color = "red";
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/api/enquiries`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          throw new Error("Server returned " + res.status);
        }

        const saved = await res.json();
        console.log("Enquiry saved:", saved);

        enquiryStatus.textContent =
          "✅ Thank you! Your enquiry has been submitted.";
        enquiryStatus.style.color = "green";

        enquiryForm.reset();
      } catch (err) {
        console.error("Error posting enquiry:", err);
        enquiryStatus.textContent =
          "❌ Something went wrong. Please try again.";
        enquiryStatus.style.color = "red";
      }
    });
  }

  // ==========================
  // 3) Toggle Show/Hide form
  // ==========================
  if (toggleFormBtn && enquiryForm) {
    toggleFormBtn.addEventListener("click", () => {
      if (enquiryForm.style.display === "none") {
        enquiryForm.style.display = "flex";
        toggleFormBtn.textContent = "Hide Form";
      } else {
        enquiryForm.style.display = "none";
        toggleFormBtn.textContent = "Show Form";
      }
    });
  }

  // ==========================
  // 4) Live Greeting feature
  // ==========================
  if (greetBtn && nameInputLive && greetMsg) {
    greetBtn.addEventListener("click", () => {
      const name = nameInputLive.value.trim();

      if (!name) {
        greetMsg.textContent = "Please enter your name.";
      } else {
        greetMsg.textContent = `Hello ${name}, welcome to MetaUlagam!`;
      }
    });
  }

  // ==========================
  // 5) Course card click alert
  // ==========================
  courseCards.forEach((card) => {
    card.addEventListener("click", () => {
      const selectedCourse = card.textContent.trim();
      alert(`You clicked on: ${selectedCourse}`);
    });
  });

  // Initial load
  loadCoursesFromAPI();
});
