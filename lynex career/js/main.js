// Main application initialization

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all components
  initApplication();
});

// Main initialization function
function initApplication() {
  // Initialize navigation
  if (typeof initNavigation === "function") {
    initNavigation();
  }

  // Initialize jobs functionality
  if (typeof initJobSearch === "function") {
    initJobSearch();
  }

  // Initialize modal functionality
  initModalHandlers();

  // Animate statistics
  if (typeof animateStats === "function") {
    animateStats();
  }

  // Initialize page-specific functionality
  initPageSpecificFeatures();

  // Add any global event listeners
  addGlobalEventListeners();

  console.log("Lynex Careers application initialized successfully");
}

// Initialize modal handlers
function initModalHandlers() {
  // Career path analysis button
  const startPathBtn = document.getElementById("start-path-btn");
  if (startPathBtn) {
    startPathBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (typeof showPathAnalysisModal === "function") {
        showPathAnalysisModal();
      }
    });
  }

  // AI match button
  const aiMatchBtn = document.getElementById("ai-match-btn");
  if (aiMatchBtn) {
    aiMatchBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (typeof showAIMatchModal === "function") {
        showAIMatchModal();
      }
    });
  }
}

// Initialize page-specific features
function initPageSpecificFeatures() {
  const currentPage = getCurrentPage();

  switch (currentPage) {
    case "dashboard":
      initDashboard();
      break;
    case "career-path":
      initCareerPath();
      break;
    case "resources":
      initResources();
      break;
    case "companies":
      initCompanies();
      break;
    case "jobs":
      initJobsPage();
      break;
  }
}

// Dashboard page initialization
function initDashboard() {
  // Initialize dashboard charts or other components
  console.log("Initializing dashboard...");

  // Example: Initialize application status updates
  const applicationItems = document.querySelectorAll(".application-item");
  applicationItems.forEach((item) => {
    item.addEventListener("click", function () {
      const jobTitle = this.querySelector(".job-title").textContent;
      alert(`Viewing details for: ${jobTitle}`);
    });
  });
}

// Career path page initialization
function initCareerPath() {
  console.log("Initializing career path page...");

  // Initialize career path visualization if exists
  const pathVisual = document.querySelector(".path-visual");
  if (pathVisual) {
    // Add interactive elements to career path visualization
    pathVisual.addEventListener("click", function () {
      if (typeof showPathAnalysisModal === "function") {
        showPathAnalysisModal();
      }
    });
  }
}

// Resources page initialization
function initResources() {
  console.log("Initializing resources page...");

  // Make resource cards clickable
  const resourceCards = document.querySelectorAll(".resource-card");
  resourceCards.forEach((card) => {
    card.addEventListener("click", function () {
      const title = this.querySelector("h3").textContent;
      alert(`Opening resource: ${title}`);
    });
  });
}

// Companies page initialization
function initCompanies() {
  console.log("Initializing companies page...");

  // Initialize virtual tour functionality
  const tourButton = document.querySelector('.btn[href*="tour"]');
  if (tourButton) {
    tourButton.addEventListener("click", function (e) {
      e.preventDefault();
      alert("Starting virtual office tour...");
      // In a real app, this would launch the virtual tour
    });
  }
}

// Jobs page specific initialization
function initJobsPage() {
  console.log("Initializing jobs page...");

  // Additional jobs page functionality can be added here
}

// Add global event listeners
function addGlobalEventListeners() {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add loading state to all buttons with async actions
  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", function (e) {
      const submitBtn = this.querySelector('button[type="submit"]');
      if (submitBtn && !submitBtn.disabled) {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;

        // Revert after form processing (handled in individual form handlers)
      }
    });
  });
}

// Get current page name (helper function)
function getCurrentPage() {
  const path = window.location.pathname;
  const page = path.split("/").pop().replace(".html", "");
  return page === "" ? "index" : page;
}

// Error handling
window.addEventListener("error", function (e) {
  console.error("Application error:", e.error);

  // Show user-friendly error message
  if (typeof showNotification === "function") {
    showNotification("Something went wrong. Please try again.", "error");
  }
});

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = { initApplication, getCurrentPage };
}
