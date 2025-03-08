// Sample timeline data
const timeline = [
    { id: 1, status: "Submitted", date: "2023-10-01" },
    { id: 2, status: "Interview Scheduled", date: "2023-10-05" },
  ];
  
  // Display timeline items
  const timelineContainer = document.querySelector(".timeline");
  timelineContainer.innerHTML = timeline.map((item) => `
    <div class="timeline-item">
      <p><strong>${item.status}</strong> - ${item.date}</p>
    </div>
  `).join("");