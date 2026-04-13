import { apiRequest } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.name) {
    document.getElementById("welcomeText").innerText =
      `Welcome, ${user.name} 👋`;
  }
});

function getToken() {
  const token = localStorage.getItem("token");
  if (!token) window.location.href = "/login.html";
  return token;
}

async function loadApplications(status = "") {
  const token = getToken();
  if (!token) return;
  const query = status ? `?status=${status}` : "";
  try {
    const apps = await apiRequest(`/applications${query}`, "GET", null, token);
    renderApplications(apps);
  } catch (err) {
    alert(err.message);
  }
}

function renderApplications(apps) {
  const list = document.getElementById("applications");
  list.innerHTML = "";

  apps.forEach((app) => {
    const li = document.createElement("li");
    li.className = "app-item";

    li.innerHTML = `
      <span>${app.company}</span>
      <span>${app.position}</span>
      <span id="status-${app._id}">${app.status}</span>
      <span id="notes-display-${app._id}">${app.notes || ""}</span>
      <div class="notes-actions">
        <input type="text" id="notes-input-${app._id}" placeholder="Edit notes">
        <button class="save-notes-btn">Save Notes</button>
        <button class="delete-btn">Delete</button>
        <button class="status-btn">Change Status</button>
      </div>
    `;

    li.querySelector(".save-notes-btn").addEventListener("click", async () => {
      const notesInput = document.getElementById(`notes-input-${app._id}`);
      const newNotes = notesInput.value.trim();
      if (!newNotes) return alert("Notes cannot be empty");
      try {
        await apiRequest(
          `/applications/${app._id}`,
          "PUT",
          { notes: newNotes, status: app.status },
          getToken(),
        );
        document.getElementById(`notes-display-${app._id}`).textContent =
          newNotes;
        notesInput.value = "";
        alert("Notes saved!");
      } catch (err) {
        alert(err.message);
      }
    });

    li.querySelector(".delete-btn").addEventListener("click", async () => {
      const token = getToken();
      if (!confirm("Delete this application?")) return;
      try {
        await apiRequest(`/applications/${app._id}`, "DELETE", null, token);
        loadApplications();
      } catch (err) {
        alert(err.message);
      }
    });

    li.querySelector(".status-btn").addEventListener("click", async () => {
      const token = getToken();
      const newStatus = prompt(
        "Enter new status (Applied, Interview, Rejected):",
        app.status,
      );
      if (
        !newStatus ||
        !["Applied", "Interview", "Rejected"].includes(newStatus)
      )
        return alert("Invalid status");
      try {
        await apiRequest(
          `/applications/${app._id}`,
          "PUT",
          { status: newStatus, notes: app.notes || "" },
          token,
        );
        document.getElementById(`status-${app._id}`).textContent = newStatus;
      } catch (err) {
        alert(err.message);
      }
    });

    list.appendChild(li);
  });
}

// Add application
async function createApplication(e) {
  e.preventDefault();
  const token = getToken();
  const company = document.getElementById("company").value.trim();
  const position = document.getElementById("position").value.trim();
  const status = document.getElementById("status").value;
  const notes = document.getElementById("notes").value.trim();
  if (!company || !position) return alert("Company and Position required");
  try {
    await apiRequest(
      "/applications",
      "POST",
      { company, position, status, notes },
      token,
    );
    document.getElementById("application-form").reset();
    loadApplications();
  } catch (err) {
    alert(err.message);
  }
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "/login.html";
}

document.addEventListener("DOMContentLoaded", () => {
  loadApplications();
  document.getElementById("logout-btn").addEventListener("click", logout);
  document
    .getElementById("application-form")
    .addEventListener("submit", createApplication);
  document
    .getElementById("status-filter")
    .addEventListener("change", (e) => loadApplications(e.target.value));
});
