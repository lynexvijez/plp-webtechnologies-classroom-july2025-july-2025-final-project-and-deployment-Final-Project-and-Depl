// Navigation functionality

// Initialize navigation
function initNavigation() {
  // Set active nav link based on current page
  setActiveNavLink();

  // Mobile menu toggle
  initMobileMenu();

  // Auth state management
  initAuthState();

  // Footer navigation
  initFooterNavigation();
}

// Set active navigation link based on current page
function setActiveNavLink() {
  const currentPage = getCurrentPage();
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.classList.remove("active");
    const linkPage = link
      .getAttribute("href")
      .replace(".html", "")
      .replace("pages/", "");
    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });
}

// Get current page name
function getCurrentPage() {
  const path = window.location.pathname;
  const page = path.split("/").pop().replace(".html", "");
  return page === "" ? "index" : page;
}

// Initialize mobile menu functionality
function initMobileMenu() {
  const hamburger = document.querySelector(".hamburger");
  if (!hamburger) return;

  hamburger.addEventListener("click", function () {
    const navLinks = document.querySelector(".nav-links");
    const authButtons = document.querySelector(".auth-buttons");

    navLinks.classList.toggle("active");
    authButtons.classList.toggle("active");
    this.classList.toggle("active");

    // Animate hamburger to X
    const spans = this.querySelectorAll("span");
    if (this.classList.contains("active")) {
      spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
    } else {
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    }
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      const hamburger = document.querySelector(".hamburger");
      const navLinks = document.querySelector(".nav-links");
      const authButtons = document.querySelector(".auth-buttons");

      if (hamburger.classList.contains("active")) {
        hamburger.click(); // Trigger click to close menu
      }
    });
  });
}

// Initialize authentication state
function initAuthState() {
  const loginBtn = document.getElementById("login-btn");
  const dashboardBtn = document.getElementById("dashboard-btn");

  if (!loginBtn || !dashboardBtn) return;

  // Check if user is logged in (in a real app, this would check localStorage or cookies)
  const isLoggedIn = localStorage.getItem("lynex-user-loggedin") === "true";

  if (isLoggedIn) {
    loginBtn.style.display = "none";
    dashboardBtn.style.display = "inline-flex";
  }

  // Login button click
  loginBtn.addEventListener("click", function (e) {
    e.preventDefault();
    showLoginModal();
  });

  // Logout functionality
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      logoutUser();
    });
  }
}

// Show login modal
function showLoginModal() {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h2>Sign In to Lynex Careers</h2>
                <p>Access your personalized dashboard and job matches</p>
                <button class="modal-close">&times;</button>
            </div>
            
            <form id="login-form" class="modal-form">
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" required placeholder="your@email.com">
                </div>
                
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" required placeholder="Enter your password">
                </div>
                
                <div class="form-options">
                    <label class="checkbox">
                        <input type="checkbox" name="remember">
                        <span>Remember me</span>
                    </label>
                    <a href="#" class="forgot-password">Forgot password?</a>
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">Sign In</button>
                    <button type="button" class="btn btn-outline modal-cancel">Cancel</button>
                </div>
                
                <div class="form-divider">
                    <span>or continue with</span>
                </div>
                
                <div class="social-login">
                    <button type="button" class="btn btn-outline social-btn">
                        <i class="fab fa-google"></i> Google
                    </button>
                    <button type="button" class="btn btn-outline social-btn">
                        <i class="fab fa-linkedin"></i> LinkedIn
                    </button>
                </div>
                
                <div class="form-footer">
                    <p>Don't have an account? <a href="#" id="show-signup">Sign up</a></p>
                </div>
            </form>
        </div>
    `;

  document.body.appendChild(modal);

  // Add modal styles if not already added
  if (!document.getElementById("modal-styles")) {
    const modalStyles = document.createElement("link");
    modalStyles.rel = "stylesheet";
    modalStyles.href = "styles/modals.css"; // You might want to create this file
    document.head.appendChild(modalStyles);
  }

  // Form submission
  modal.querySelector("#login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Simulate login
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> Signing in...';
    submitBtn.disabled = true;

    setTimeout(() => {
      loginUser();
      document.body.removeChild(modal);
    }, 1500);
  });

  // Setup close events
  setupModalCloseEvents(modal);
}

// Login user function
function loginUser() {
  localStorage.setItem("lynex-user-loggedin", "true");

  const loginBtn = document.getElementById("login-btn");
  const dashboardBtn = document.getElementById("dashboard-btn");

  if (loginBtn && dashboardBtn) {
    loginBtn.style.display = "none";
    dashboardBtn.style.display = "inline-flex";
  }

  // Show success message
  showNotification("Successfully signed in!", "success");
}

// Logout user function
function logoutUser() {
  localStorage.setItem("lynex-user-loggedin", "false");

  const loginBtn = document.getElementById("login-btn");
  const dashboardBtn = document.getElementById("dashboard-btn");

  if (loginBtn && dashboardBtn) {
    loginBtn.style.display = "inline-flex";
    dashboardBtn.style.display = "none";
  }

  // Redirect to home page
  window.location.href = "../index.html";

  showNotification("Successfully signed out!", "success");
}

// Initialize footer navigation
function initFooterNavigation() {
  document.querySelectorAll(".footer-links a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.getAttribute("href");
      if (href) {
        window.location.href = href;
      }
    });
  });
}

// Show notification
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;

  // Add styles if not already added
  if (!document.getElementById("notification-styles")) {
    const styles = document.createElement("style");
    styles.id = "notification-styles";
    styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                padding: 15px 20px;
                border-radius: var(--radius);
                box-shadow: var(--shadow-lg);
                z-index: 3000;
                display: flex;
                align-items: center;
                gap: 15px;
                max-width: 400px;
                border-left: 4px solid var(--gray);
            }
            
            .notification-success {
                border-left-color: var(--success);
            }
            
            .notification-error {
                border-left-color: var(--danger);
            }
            
            .notification-warning {
                border-left-color: var(--warning);
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
                flex: 1;
            }
            
            .notification-close {
                background: none;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                color: var(--gray);
            }
            
            @media (max-width: 576px) {
                .notification {
                    left: 20px;
                    right: 20px;
                    max-width: none;
                }
            }
        `;
    document.head.appendChild(styles);
  }

  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 5000);

  // Close button
  notification
    .querySelector(".notification-close")
    .addEventListener("click", () => {
      notification.parentNode.removeChild(notification);
    });
}

// Get notification icon based on type
function getNotificationIcon(type) {
  const icons = {
    success: "check-circle",
    error: "exclamation-circle",
    warning: "exclamation-triangle",
    info: "info-circle",
  };
  return icons[type] || "info-circle";
}

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = { initNavigation, loginUser, logoutUser, showNotification };
}
