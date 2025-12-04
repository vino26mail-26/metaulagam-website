// admin.js

// When admin.html is served by the same Express server,
// we can use a relative URL (no need for full domain).
const BACKEND_URL = ""; // same origin

const tbody = document.getElementById("enquiryTableBody");
const statusMsg = document.getElementById("statusMsg");
const refreshBtn = document.getElementById("refreshBtn");

// Optional: show admin name in header if stored
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

// Format a date nicely (if timestamps exist)
function formatDate(isoString) {
    if (!isoString) return "-";
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return "-";
    return d.toLocaleString(); // local date + time
}

async function loadEnquiries() {
    const token = localStorage.getItem("metaulagam_token");

    // 🔐 If no token → force login
    if (!token) {
        window.location.href = "login.html";
        return;
    }

    statusMsg.textContent = "Loading enquiries...";
    statusMsg.className = "status";

    try {
        const res = await fetch(`/api/admin/enquiries`, {
            headers: {
                Authorization: `Bearer ${token}`, // 👈 send JWT
            },
        });

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
            console.error("Backend error status:", res.status);
            statusMsg.textContent = "Failed to load enquiries.";
            statusMsg.className = "status error";
            return;
        }

        const data = await res.json();

        // Clear old rows
        tbody.innerHTML = "";

        if (!Array.isArray(data) || data.length === 0) {
            statusMsg.textContent = "No enquiries found yet.";
            statusMsg.className = "status";
            return;
        }

        // Build rows
        data.forEach((enq) => {
            const tr = document.createElement("tr");

            const tdDate = document.createElement("td");
            tdDate.textContent = formatDate(enq.createdAt);

            const tdName = document.createElement("td");
            tdName.textContent = enq.name;

            const tdEmail = document.createElement("td");
            tdEmail.textContent = enq.email;

            const tdCourse = document.createElement("td");
            tdCourse.textContent = enq.course;

            const tdMessage = document.createElement("td");
            tdMessage.textContent = enq.message;

            tr.appendChild(tdDate);
            tr.appendChild(tdName);
            tr.appendChild(tdEmail);
            tr.appendChild(tdCourse);
            tr.appendChild(tdMessage);

            tbody.appendChild(tr);
        });

        statusMsg.textContent = `Loaded ${data.length} enquiries.`;
        statusMsg.className = "status success";
    } catch (err) {
        console.error("Error loading enquiries:", err);
        statusMsg.textContent = "Failed to load enquiries.";
        statusMsg.className = "status error";
    }
}

// Initial load
document.addEventListener("DOMContentLoaded", () => {
    loadEnquiries();

    // Refresh button
    refreshBtn.addEventListener("click", () => {
        loadEnquiries();
    });
});

// 👇 Optional: Logout function if you add a button in HTML
window.logout = function () {
    localStorage.removeItem("metaulagam_token");
    localStorage.removeItem("metaulagam_user");
    window.location.href = "login.html";
};
