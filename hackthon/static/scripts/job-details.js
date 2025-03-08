// Save Job Function
function saveJob(jobTitle) {
    let savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    if (!savedJobs.includes(jobTitle)) {
        savedJobs.push(jobTitle);
        localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
        alert(jobTitle + " has been saved!");
    } else {
        alert("Job already saved!");
    }
}

// Apply for Job Function
function applyJob(jobTitle) {
    const user = JSON.parse(localStorage.getItem("user")); // Get logged-in user details
    if (!user || !user.email) {
        alert("Please log in to apply for jobs.");
        window.location.href = "login.html"; // Redirect to login page
        return;
    }

    const email = user.email; // Use the email from the logged-in user

    // Simulate sending data to the backend
    fetch("/apply-job", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobTitle, email }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert("Application submitted for " + jobTitle + "! You will receive a confirmation email shortly.");

                // Add visual feedback to the job card
                const jobCard = document.querySelector(`.job-card:has(h3:contains("${jobTitle}"))`);
                if (jobCard) {
                    jobCard.classList.add("applied"); // Add the "applied" class for animation
                    setTimeout(() => {
                        jobCard.classList.remove("applied"); // Remove the class after animation
                    }, 500); // Match the animation duration
                }
            } else {
                alert("Failed to submit application. Please try again.");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        });
}

// Logout Function
function logout() {
    localStorage.removeItem("user");
    window.location.href = "index.html";
}