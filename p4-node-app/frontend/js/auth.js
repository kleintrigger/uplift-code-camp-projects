import { apiRequest } from "./api.js";

// ===== LOGIN =====
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      return alert("Email and password are required");
    }

    try {
      // POST to backend login
      const data = await apiRequest("/auth/login", "POST", { email, password });

      // Save token in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      // Redirect to dashboard
      window.location.href = "/dashboard.html";
    } catch (err) {
      alert(err.message);
    }
  });
}

// ===== REGISTER =====
const registerForm = document.getElementById("register-form");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!name || !email || !password) {
      return alert("All fields are required");
    }

    try {
      // POST to backend register
      await apiRequest("/auth/register", "POST", { name, email, password });

      alert("Registration successful! Please login.");
      window.location.href = "/login.html";
    } catch (err) {
      alert(err.message);
    }
  });
}
