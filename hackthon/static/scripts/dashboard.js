// // Sample data for jobs and notifications
// const jobs = [
//     { id: 1, title: "Software Engineer", company: "xAI", location: "Remote", matchPercentage: 92 },
//     { id: 2, title: "Data Scientist", company: "Tech Corp", location: "New York", matchPercentage: 88 },
//   ];
  
//   const notifications = [
//     { id: 1, message: "New job match: Software Engineer at xAI - 92% match" },
//     { id: 2, message: "Application deadline in 24 hours for Data Scientist at Tech Corp" },
//   ];
  
//   // Dynamically add job cards
//   const jobCardsContainer = document.querySelector(".job-cards");
//   jobs.forEach((job) => {
//     const jobCard = document.createElement("div");
//     jobCard.classList.add("job-card");
//     jobCard.innerHTML = `
//       <h3>${job.title}</h3>
//       <p>${job.company} - ${job.location}</p>
//       <p>${job.matchPercentage}% match</p>
//     `;
//     jobCardsContainer.appendChild(jobCard);
//   });
  
//   // Add notifications
//   const notificationCount = document.getElementById("notification-count");
//   notificationCount.textContent = notifications.length;
  
//   const notificationsDropdown = document.querySelector(".notifications-dropdown");
//   notificationsDropdown.innerHTML = notifications.map((notification) => `
//     <div class="notification-item">${notification.message}</div>
//   `).join("");
// Handle Edit Profile Button
document.getElementById("edit-profile-btn").addEventListener("click", () => {
    const newName = prompt("Enter your new name:");
    const newJobTitle = prompt("Enter your new job title:");
  
    if (newName) {
      document.getElementById("user-name").textContent = newName;
    }
    if (newJobTitle) {
      document.getElementById("user-job-title").textContent = newJobTitle;
    }
  });