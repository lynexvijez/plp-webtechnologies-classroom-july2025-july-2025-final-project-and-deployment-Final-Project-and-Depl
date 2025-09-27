// Jobs functionality

// Render jobs to the specified container
function renderJobs(jobsArray, container) {
  if (!container) return;

  container.innerHTML = "";

  jobsArray.forEach((job) => {
    const jobCard = document.createElement("div");
    jobCard.className = `job-card ${job.featured ? "featured" : ""}`;
    jobCard.innerHTML = `
            ${job.featured ? '<div class="featured-badge">Featured</div>' : ""}
            <div class="job-header">
                <div>
                    <div class="job-title">${job.title}</div>
                    <div class="job-company">${job.company}</div>
                    <span class="job-type">${job.type}</span>
                </div>
            </div>
            
            <div class="job-details">
                <div class="job-detail">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${job.location}</span>
                </div>
                <div class="job-detail">
                    <i class="fas fa-clock"></i>
                    <span>${job.posted}</span>
                </div>
            </div>
            
            <div class="job-skills">
                ${job.skills
                  .map((skill) => `<span class="skill-tag">${skill}</span>`)
                  .join("")}
            </div>
            
            <div class="job-footer">
                <div class="job-salary">${job.salary}</div>
                <a href="#" class="btn btn-primary apply-btn" data-job-id="${
                  job.id
                }">Apply Now</a>
            </div>
        `;

    container.appendChild(jobCard);
  });

  // Add event listeners to apply buttons
  document.querySelectorAll(".apply-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const jobId = this.getAttribute("data-job-id");
      showApplicationModal(jobId);
    });
  });
}

// Filter jobs based on search term and filters
function filterJobs(searchTerm, container, jobsArray, filters = {}) {
  const filteredJobs = jobsArray.filter((job) => {
    const searchText = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      job.title.toLowerCase().includes(searchText) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchText)) ||
      job.location.toLowerCase().includes(searchText);

    const matchesDepartment =
      !filters.department ||
      filters.department === "All Departments" ||
      job.department === filters.department;

    const matchesLocation =
      !filters.location ||
      filters.location === "All Locations" ||
      job.location.includes(filters.location);

    const matchesType =
      !filters.type ||
      filters.type === "All Job Types" ||
      job.type === filters.type;

    const matchesExperience =
      !filters.experience ||
      filters.experience === "All Experience Levels" ||
      job.experience === filters.experience;

    return (
      matchesSearch &&
      matchesDepartment &&
      matchesLocation &&
      matchesType &&
      matchesExperience
    );
  });

  renderJobs(filteredJobs, container);
}

// Initialize job search functionality
function initJobSearch() {
  const jobSearch = document.getElementById("job-search");
  const jobsPageSearch = document.getElementById("jobs-page-search");

  if (jobSearch) {
    jobSearch.addEventListener(
      "input",
      debounce(function () {
        filterJobs(
          this.value,
          document.getElementById("jobs-container"),
          jobs.filter((job) => job.featured)
        );
      }, 300)
    );
  }

  if (jobsPageSearch) {
    jobsPageSearch.addEventListener(
      "input",
      debounce(function () {
        const filters = getCurrentFilters();
        filterJobs(
          this.value,
          document.getElementById("all-jobs-container"),
          jobs,
          filters
        );
      }, 300)
    );
  }

  // Initialize filter change listeners
  initFilterListeners();
}

// Get current filter values
function getCurrentFilters() {
  return {
    department:
      document.getElementById("department-filter")?.value || "All Departments",
    location:
      document.getElementById("location-filter")?.value || "All Locations",
    type: document.getElementById("type-filter")?.value || "All Job Types",
    experience:
      document.getElementById("experience-filter")?.value ||
      "All Experience Levels",
  };
}

// Initialize filter listeners
function initFilterListeners() {
  const filterSelects = document.querySelectorAll(".filter-select");

  filterSelects.forEach((select) => {
    select.addEventListener("change", function () {
      const searchTerm =
        document.getElementById("jobs-page-search")?.value || "";
      const filters = getCurrentFilters();
      filterJobs(
        searchTerm,
        document.getElementById("all-jobs-container"),
        jobs,
        filters
      );
    });
  });
}

// Initialize jobs on page load
document.addEventListener("DOMContentLoaded", function () {
  // Render featured jobs on home page
  const jobsContainer = document.getElementById("jobs-container");
  if (jobsContainer) {
    renderJobs(
      jobs.filter((job) => job.featured),
      jobsContainer
    );
  }

  // Render all jobs on jobs page
  const allJobsContainer = document.getElementById("all-jobs-container");
  if (allJobsContainer) {
    renderJobs(jobs, allJobsContainer);
  }

  // Initialize search functionality
  initJobSearch();

  // Load more jobs button
  const loadMoreBtn = document.getElementById("load-more-jobs");
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", function (e) {
      e.preventDefault();
      // In a real app, this would load more jobs from an API
      alert("Loading more jobs...");
    });
  }
});

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = { renderJobs, filterJobs, initJobSearch };
}
