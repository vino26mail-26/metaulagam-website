// admin.js

// Use your deployed backend URL
const BACKEND_URL = "https://metaulagam-backend.onrender.com";

const tbody = document.getElementById("enquiryTableBody");
const statusMsg = document.getElementById("statusMsg");
const refreshBtn = document.getElementById("refreshBtn");

// Format a date nicely (if timestamps exist)
function formatDate(isoString) {
    if (!isoString) return "-";
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return "-";
    return d.toLocaleString(); // local date + time
}

async function loadEnquiries() {
    statusMsg.textContent = "Loading enquiries...";
    statusMsg.className = "status";

    try {
        const res = await fetch(`${BACKEND_URL}/api/enquiry`);

        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
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
