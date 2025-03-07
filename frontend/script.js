// Logout Function
function logout() {
    alert("You have been logged out!");
    window.location.href = "login.html"; // Redirect to login page
}

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
    alert("Application submitted for " + jobTitle + "!");
}

// Filter/Search Jobs
function filterJobs() {
    let searchInput = document.getElementById("search-job").value.toLowerCase();
    let jobs = document.getElementsByClassName("job-card");

    for (let i = 0; i < jobs.length; i++) {
        let jobTitle = jobs[i].getElementsByTagName("h3")[0].innerText.toLowerCase();
        if (jobTitle.includes(searchInput)) {
            jobs[i].style.display = "block";
        } else {
            jobs[i].style.display = "none";
        }
    }
}

// Save Profile Changes
function saveProfile() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let skills = document.getElementById("skills").value;
    let experience = document.getElementById("experience").value;

    let profileData = { name, email, skills, experience };
    localStorage.setItem("profileData", JSON.stringify(profileData));

    alert("Profile updated successfully!");
}

// Load Profile Data (if exists)
window.onload = function () {
    let savedProfile = JSON.parse(localStorage.getItem("profileData"));
    if (savedProfile) {
        document.getElementById("name").value = savedProfile.name;
        document.getElementById("email").value = savedProfile.email;
        document.getElementById("skills").value = savedProfile.skills;
        document.getElementById("experience").value = savedProfile.experience;
    }
};

const API_URL = "https://api.geoapify.com/v1/geocode/autocomplete?text=";
const API_KEY = "your api key"; // Replace with your actual API key

document.getElementById("preferred-locations").addEventListener("input", fetchLocations);

async function fetchLocations() {
    const input = document.getElementById("preferred-locations").value.trim();
    const suggestionsBox = document.getElementById("location-suggestions");

    // Clear previous suggestions
    suggestionsBox.innerHTML = "";

    if (input.length < 2) return; // Start searching after 2 characters

    try {
        const response = await fetch(`${API_URL}${input}&apiKey=${API_KEY}`);
        const data = await response.json();

        if (data && data.features) {
            data.features.forEach(location => {
                const placeName = location.properties.formatted; // Extracting place name
                const li = document.createElement("li");
                li.textContent = placeName;
                li.onclick = function () {
                    document.getElementById("preferred-locations").value = placeName;
                    suggestionsBox.innerHTML = ""; // Clear suggestions
                };
                suggestionsBox.appendChild(li);
            });
        }
    } catch (error) {
        console.error("Error fetching locations:", error);
    }
}

function logout() {
    alert("Logging out...");
    window.location.href = "login.html";
}

document.getElementById("resume-upload").addEventListener("change", function (event) {
    const file = event.target.files[0];
    const allowedExtensions = ["pdf", "docx","csv"];

    if (file) {
        const fileExtension = file.name.split(".").pop().toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
            alert("Invalid file type! Please upload a PDF or DOCX file.");
            event.target.value = ""; // Clear the file input
            return;
        }

        // Show uploaded file name
        document.getElementById("resume-file-name").innerText = `Uploaded: ${file.name}`;

        // Send file to backend for ML processing
        uploadResume(file);
    }
});

async function uploadResume(file) {
    const formData = new FormData();
    formData.append("resume", file);

    try {
        const response = await fetch("/upload-resume", {
            method: "POST",
            body: formData
        });

        const result = await response.json();
        if (result.success) {
            alert("Resume analyzed successfully!");
            console.log("Extracted Data:", result.data);
        } else {
            alert("Failed to analyze resume. Please try again.");
        }
    } catch (error) {
        console.error("Error uploading resume:", error);
        alert("Error uploading resume.");
    }
}

// Redirect to dashboard after clicking "Save Changes"
document.getElementById("save-btn").addEventListener("click", function () {
    alert("Profile updated successfully!");
    window.location.href = "dashboard.html";
});