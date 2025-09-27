// Utility functions

// Sample job data
const jobs = [
  {
    id: 1,
    title: "Senior AI Engineer",
    company: "Lynex Softwares and AI",
    type: "Full-time",
    location: "Remote / San Francisco",
    posted: "2 days ago",
    salary: "$140,000 - $180,000",
    skills: ["Machine Learning", "Python", "TensorFlow", "NLP"],
    featured: true,
    department: "Engineering",
    experience: "Senior Level",
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "Lynex Softwares and AI",
    type: "Full-time",
    location: "New York, NY",
    posted: "5 days ago",
    salary: "$110,000 - $140,000",
    skills: ["React", "JavaScript", "TypeScript", "UI/UX"],
    featured: false,
    department: "Engineering",
    experience: "Mid Level",
  },
  {
    id: 3,
    title: "Product Manager",
    company: "Lynex Softwares and AI",
    type: "Full-time",
    location: "Remote",
    posted: "1 week ago",
    salary: "$130,000 - $160,000",
    skills: ["Product Strategy", "Agile", "User Research", "Roadmapping"],
    featured: false,
    department: "Product",
    experience: "Senior Level",
  },
  {
    id: 4,
    title: "UX Designer",
    company: "Lynex Softwares and AI",
    type: "Full-time",
    location: "San Francisco",
    posted: "3 days ago",
    salary: "$100,000 - $130,000",
    skills: ["Figma", "User Research", "Prototyping", "UI Design"],
    featured: true,
    department: "Design",
    experience: "Mid Level",
  },
  {
    id: 5,
    title: "Data Scientist",
    company: "Lynex Softwares and AI",
    type: "Full-time",
    location: "Remote",
    posted: "1 day ago",
    salary: "$120,000 - $150,000",
    skills: ["Python", "SQL", "Statistics", "Machine Learning"],
    featured: false,
    department: "Engineering",
    experience: "Mid Level",
  },
  {
    id: 6,
    title: "DevOps Engineer",
    company: "Lynex Softwares and AI",
    type: "Full-time",
    location: "London",
    posted: "1 week ago",
    salary: "$100,000 - $130,000",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    featured: false,
    department: "Engineering",
    experience: "Mid Level",
  },
];

// Animate value counter
function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.textContent = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Animate statistics counters
function animateStats() {
  const statNumbers = document.querySelectorAll(".stat-number");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const finalValue = parseInt(target.textContent);
          animateValue(target, 0, finalValue, 2000);
          observer.unobserve(target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((stat) => {
    observer.observe(stat);
  });
}

// Format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
}

// Format date
function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Debounce function for search
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    jobs,
    animateValue,
    animateStats,
    formatCurrency,
    formatDate,
    debounce,
  };
}
