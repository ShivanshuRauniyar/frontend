// Sample user data stored in localStorage
let users = JSON.parse(localStorage.getItem("users")) || [];

// Handle Signup
document.getElementById("signup").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("signup-username").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  // Check if email already exists
  const userExists = users.some((user) => user.email === email);
  if (userExists) {
    alert("Email already exists. Please login.");
    return;
  }

  // Save user data
  const newUser = { username, email, password };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  // Show success message
  alert("Signup successful! Please login.");

  // Reset and hide the Signup form
  document.getElementById("signup").reset(); // Clear form fields
  document.getElementById("signup-form").style.display = "none"; // Hide Signup form
  document.getElementById("login-form").style.display = "block"; // Show Login form
});

// Handle Login
document.getElementById("login").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  // Find user by email
  const user = users.find((user) => user.email === email);

  if (!user || user.password !== password) {
    alert("Invalid email or password.");
    return;
  }

  // Simulate sending a notification to the user's email
  console.log(`Notification sent to ${email}: Welcome back, ${user.username}!`);

  // Hide forms
  document.getElementById("login-signup").style.display = "none";

  // Redirect to Upload Resume Page
  window.location.href = "/templates/resume-upload.html";
});

// Toggle between Login and Signup forms
document.getElementById("show-signup").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("login-form").style.display = "none";
  document.getElementById("signup-form").style.display = "block";
});

document.getElementById("show-login").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("signup-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
});