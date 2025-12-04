// admin.js (Netlify / production)

const BACKEND_URL = "https://metaulagam-backend.onrender.com";

const tbody = document.getElementById("enquiryTableBody");
const statusMsg = document.getElementById("statusMsg");
const refreshBtn = document.getElementById("refreshBtn");

// Map of courseId -> courseName
const courseMap = {};

// Show admin name if stored
const storedUser = localStorage.getItem("metaulagam_user");
if (storedUser) {
  try {
    const user = JSON.parse(storedUser);
    const headerTitle = document.querySelector("header h1");
    if (user && user.name && headerTitle) {
      headerTitle.textContent = `MetaUlagam Admin – ${user.name}`;
    }
  } catch (e) {
    console.warn("Error parsing stored user:", e);
  }
}

function formatDate(isoString) {
  if (!isoString) return "-";
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return "-";
  return d.toLocaleString();
}

// Convert course field to a human-readable name
function getCourseDisplayName(courseField) {
  if (!courseField) return "";

  // If we have a map entry for this ID, use it
  if (courseMap[courseField]) {
    return courseMap[courseField];
  }

  // If it looks like a 24-char hex ObjectId but not in map,
  // still better to show something
  if (/^[0-9a-fA-F]{24}$/.test(courseField)) {
    return `(Course ID: ${courseField})`;
  }

  // Otherwise it's probably already a name like "VR Film Making"
  return courseField;
}

function renderEnquiries(enquiries) {
  tbody.innerHTML = "";

  if (!Array.isArray(enquiries) || enquiries.length === 0) {
    statusMsg.textContent = "No enquiries found yet.";
    statusMsg.className = "status";
    return;
  }

  enquiries.forEach((enq) => {
    const tr = document.createElement("tr");

    const tdDate = document.createElement("td");
    tdDate.textContent = formatDate(enq.createdAt);

    const tdName = document.createElement("td");
    tdName.textContent = enq.name;

    const tdEmail = document.createElement("td");
    tdEmail.textContent = enq.email;

    const tdCourse = document.createElement("td");
    tdCourse.textContent = getCourseDisplayName(enq.course);

    const tdMessage = document.createElement("td");
    tdMessage.textContent = enq.message;

    tr.appendChild(tdDate);
    tr.appendChild(tdName);
    tr.appendChild(tdEmail);
    tr.appendChild(tdCourse);
    tr.appendChild(tdMessage);

    tbody.appendChild(tr);
  });

  statusMsg.textContent = `Loaded ${enquiries.length} enquiries.`;
  statusMsg.className = "status success";
}

async function loadCourses() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/db/courses`);
    if (!res.ok) {
      console.warn("Failed to load courses for mapping");
      return;
    }
    const courses = await res.json();
    courses.forEach((course) => {
      // adjust property names based on your Course model
      const id = course._id;
      const name = course.title || course.name || course.courseName || "Untitled Course";
      courseMap[id] = name;
    });
    console.log("Course map built:", courseMap);
  } catch (err) {
    console.error("Error loading courses:", err);
  }
}

async function loadEnquiries() {
  const token = localStorage.getItem("metaulagam_token");

  if (!token) {
    window.location.href = "login.html";
    return;
  }

  statusMsg.textContent = "Loading enquiries...";
  statusMsg.className = "status";

  try {
    const res = await fetch(`${BACKEND_URL}/api/admin/enquiries`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("ADMIN RES STATUS:", res.status);

    if (res.status === 401 || res.status === 403) {
      statusMsg.textContent =
        "Session expired or unauthorized. Redirecting to login...";
      statusMsg.className = "status error";

      localStorage.removeItem("metaulagam_token");
      localStorage.removeItem("metaulagam_user");

      setTimeout(() => {
        window.location.href = "login.html";
      }, 1200);
      return;
    }

    if (!res.ok) {
      statusMsg.textContent = "Failed to load enquiries.";
      statusMsg.className = "status error";
      return;
    }

    const data = await res.json();
    renderEnquiries(data);
  } catch (err) {
    console.error("Error loading enquiries:", err);
    statusMsg.textContent = "Failed to load enquiries.";
    statusMsg.className = "status error";
  }
}

async function initAdmin() {
  await loadCourses();    // build ID -> name map first
  await loadEnquiries();  // then load and render enquiries
}

document.addEventListener("DOMContentLoaded", () => {
  initAdmin();
  refreshBtn.addEventListener("click", initAdmin);
});

window.logout = function () {
  localStorage.removeItem("metaulagam_token");
  localStorage.removeItem("metaulagam_user");
  window.location.href = "login.html";
};
