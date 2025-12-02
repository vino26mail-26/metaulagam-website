// ============================
// API CONFIG
// ============================
const API_BASE = "https://metaulagam-backend.onrender.com";

// Live backend endpoints
const COURSES_API = `${API_BASE}/api/db/courses`;
const ENQUIRY_API = `${API_BASE}/api/enquiry`; // adjust if your route name is different

// ============================
// BOOTSTRAP
// ============================
document.addEventListener("DOMContentLoaded", () => {
  initGreeting();
  initFormToggle();
  loadCourses();
  initEnquiryForm();
});

// ============================
// LIVE GREETING FEATURE
// ============================
function initGreeting() {
  const nameInput = document.getElementById("nameInput");
  const greetBtn = document.getElementById("greetBtn");
  const greetMsg = document.getElementById("greetMsg");

  if (!nameInput || !greetBtn || !greetMsg) return; // safety

  greetBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();

    if (name === "") {
      greetMsg.innerText = "Please enter your name.";
    } else {
      greetMsg.innerText = `Hello ${name}, welcome to MetaUlagam!`;
    }
  });
}

// ============================
// SHOW / HIDE ENQUIRY FORM
// ============================
function initFormToggle() {
  const toggleBtn = document.getElementById("toggleForm");
  const form = document.querySelector("form");

  if (!toggleBtn || !form) return;

  toggleBtn.addEventListener("click", () => {
    const isHidden = form.style.display === "none";
    form.style.display = isHidden ? "block" : "none";
    toggleBtn.innerText = isHidden ? "Hide Form" : "Show Form";
  });

  // start with form visible
  form.style.display = "block";
}

// ============================
// LOAD COURSES FROM BACKEND
// ============================
async function loadCourses() {
  const tbody = document.getElementById("courseTableBody");
  const courseSelect = document.getElementById("course");

  if (!tbody && !courseSelect) return; // nothing to do

  // Optional: show loading row
  if (tbody) {
    tbody.innerHTML = `
      <tr>
        <td colspan="3">Loading courses...</td>
      </tr>
    `;
  }

  try {
    const res = await fetch(COURSES_API);
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const courses = await res.json();

    // Render table + dropdown
    if (tbody) renderCourseTable(tbody, courses);
    if (courseSelect) populateCourseDropdown(courseSelect, courses);
  } catch (err) {
    console.error("Failed to load courses:", err);

    if (tbody) {
      tbody.innerHTML = `
        <tr>
          <td colspan="3">Unable to load courses. Please try again later.</td>
        </tr>
      `;
    }
  }
}

// ============================
// RENDER TABLE
// ============================
function renderCourseTable(tbody, courses) {
  if (!Array.isArray(courses) || courses.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="3">No courses available yet.</td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = ""; // clear

  courses.forEach((course) => {
    const tr = document.createElement("tr");

    const titleTd = document.createElement("td");
    titleTd.innerText = course.title || "-";

    const durationTd = document.createElement("td");
    durationTd.innerText = course.duration || "-";

    const feeTd = document.createElement("td");
    feeTd.innerText = course.fee != null ? `₹${course.fee}` : "-";

    tr.appendChild(titleTd);
    tr.appendChild(durationTd);
    tr.appendChild(feeTd);

    tbody.appendChild(tr);
  });
}

// ============================
// POPULATE DROPDOWN
// ============================
function populateCourseDropdown(select, courses) {
  // Clear existing options
  select.innerHTML = "";

  // Default option
  const defaultOpt = document.createElement("option");
  defaultOpt.value = "";
  defaultOpt.innerText = "Select a course";
  select.appendChild(defaultOpt);

  if (!Array.isArray(courses) || courses.length === 0) return;

  courses.forEach((course) => {
    const opt = document.createElement("option");
    opt.value = course._id || course.title; // if you need ID later, keep _id
    opt.innerText = course.title || "Untitled course";
    select.appendChild(opt);
  });
}

// ============================
// ENQUIRY FORM → BACKEND POST
// ============================
function initEnquiryForm() {
  const form = document.querySelector("form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const courseSelect = document.getElementById("course");
  const messageInput = document.getElementById("message");

  if (!form || !nameInput || !emailInput || !courseSelect || !messageInput) {
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      course: courseSelect.value,
      message: messageInput.value.trim(),
    };

    if (!payload.name || !payload.email || !payload.course) {
      alert("Please fill name, email and course.");
      return;
    }

    try {
      const res = await fetch(ENQUIRY_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Enquiry failed: ${res.status}`);
      }

      // If backend returns JSON (e.g., {message:"ok"})
      // const data = await res.json();

      alert("Enquiry submitted successfully! We will contact you soon.");

      // Reset form
      form.reset();
    } catch (err) {
      console.error("Enquiry error:", err);
      alert("Failed to send enquiry. Please try again later.");
    }
  });
}
