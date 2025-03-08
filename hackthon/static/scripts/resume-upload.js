// Handle file upload
document.getElementById("upload-btn").addEventListener("click", () => {
    const fileInput = document.getElementById("resume-upload");
    if (fileInput.files.length > 0) {
      alert("Resume uploaded successfully!");
      const skills = ["JavaScript", "Python", "Machine Learning", "NLP"];
      const skillsList = document.getElementById("skills-list");
      skillsList.innerHTML = skills.map((skill) => `<li>${skill}</li>`).join("");
    } else {
      alert("Please select a file to upload.");
    }
  });
  
  // Handle form submission
  document.getElementById("resume-form").addEventListener("submit", (e) => {
    e.preventDefault();
  
    // Collect form data
    const formData = {
      fullName: document.getElementById("full-name").value,
      gender: document.getElementById("gender").value,
      dob: document.getElementById("dob").value,
      currentCity: document.getElementById("current-city").value,
      hometown: document.getElementById("hometown").value,
      mobileNumber: document.getElementById("mobile-number").value,
      lookingFor: document.getElementById("looking-for").value,
      preferredLocation: document.getElementById("preferred-location").value,
      resume: document.getElementById("resume-upload").files[0]?.name || "No file uploaded",
    };
  
    // Log form data (for demonstration)
    console.log("Form Data:", formData);
  
    // Simulate form submission
    alert("Form submitted successfully!");
    window.location.href = "job-details.html"; // Redirect to dashboard
  });