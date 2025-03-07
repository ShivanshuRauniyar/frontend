document.addEventListener("DOMContentLoaded", function () {
    // Fetch stored resume from localStorage
    const resumeText = localStorage.getItem("uploadedResume");

    if (resumeText) {
        analyzeResume(resumeText.toLowerCase());
    } else {
        document.getElementById("recommended-jobs").innerHTML = "<p>No resume found. Please upload your resume in the profile page.</p>";
    }
});

function analyzeResume(text) {
    const skills = ["python", "machine learning", "deep learning", "javascript", "react", "node.js", "java", "sql", "nosql"];
    const matchedSkills = skills.filter(skill => text.includes(skill));

    const jobs = [
        { title: "Machine Learning Engineer", company: "Amazon", location: "Bengaluru", skills: ["machine learning", "deep learning", "python"] },
        { title: "Backend Developer", company: "Flipkart", location: "Mumbai", skills: ["node.js", "javascript", "sql"] },
        { title: "Frontend Developer", company: "Google", location: "Hyderabad", skills: ["react", "javascript"] },
        { title: "Data Scientist", company: "Microsoft", location: "Pune", skills: ["python", "machine learning", "sql"] }
    ];

    const recommendedJobs = jobs.filter(job => job.skills.some(skill => matchedSkills.includes(skill)));
    displayRecommendedJobs(recommendedJobs);
}

function displayRecommendedJobs(jobs) {
    const jobsContainer = document.getElementById("recommended-jobs");
    jobsContainer.innerHTML = "";

    if (jobs.length === 0) {
        jobsContainer.innerHTML = "<p>No matching jobs found. Try updating your resume.</p>";
        return;
    }

    jobs.forEach(job => {
        const jobCard = document.createElement("div");
        jobCard.classList.add("job-card");
        jobCard.innerHTML = `
            <h3>${job.title}</h3>
            <p>${job.company} - ${job.location}</p>
            <button>Apply Now</button>
        `;
        jobsContainer.appendChild(jobCard);
    });
}