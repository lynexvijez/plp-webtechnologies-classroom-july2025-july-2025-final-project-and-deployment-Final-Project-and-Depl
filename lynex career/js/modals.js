// Modal functionality

// Show application modal
function showApplicationModal(jobId) {
  const job = jobs.find((j) => j.id == jobId);
  if (!job) return;

  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h2>Apply for ${job.title}</h2>
                <p>at ${job.company}</p>
                <button class="modal-close">&times;</button>
            </div>
            
            <form id="application-form" class="modal-form">
                <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" required>
                </div>
                
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" required>
                </div>
                
                <div class="form-group">
                    <label>Phone Number</label>
                    <input type="tel" required>
                </div>
                
                <div class="form-group">
                    <label>Resume</label>
                    <input type="file" accept=".pdf,.doc,.docx" required>
                    <small>Accepted formats: PDF, DOC, DOCX (Max 5MB)</small>
                </div>
                
                <div class="form-group">
                    <label>Cover Letter (Optional)</label>
                    <textarea rows="4" placeholder="Why are you interested in this position?"></textarea>
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">Submit Application</button>
                    <button type="button" class="btn btn-outline modal-cancel">Cancel</button>
                </div>
            </form>
        </div>
    `;

  document.body.appendChild(modal);

  // Add modal styles if not already added
  addModalStyles();

  // Form submission
  modal
    .querySelector("#application-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Submitting...';
      submitBtn.disabled = true;

      // Simulate API call
      setTimeout(() => {
        alert("Application submitted successfully!");
        document.body.removeChild(modal);

        // If user is logged in, show dashboard
        if (document.getElementById("dashboard-btn").style.display !== "none") {
          window.location.href = "pages/dashboard.html";
        }
      }, 1500);
    });

  // Close modal events
  modal.querySelector(".modal-close").addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  modal.querySelector(".modal-cancel").addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  // Close modal when clicking outside
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", function closeOnEscape(e) {
    if (e.key === "Escape") {
      document.body.removeChild(modal);
      document.removeEventListener("keydown", closeOnEscape);
    }
  });
}

// Show career path analysis modal
function showPathAnalysisModal() {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h2>AI Career Path Analysis</h2>
                <p>Let our AI analyze your skills and goals to create a personalized career path.</p>
                <button class="modal-close">&times;</button>
            </div>
            
            <div class="modal-content">
                <div class="path-options">
                    <div class="option-group">
                        <label class="option-card">
                            <input type="radio" name="user-type" value="employee" checked>
                            <div class="option-content">
                                <i class="fas fa-user-tie"></i>
                                <h4>Current Employee</h4>
                                <p>I'm a current Lynex employee looking for growth opportunities</p>
                            </div>
                        </label>
                        
                        <label class="option-card">
                            <input type="radio" name="user-type" value="candidate">
                            <div class="option-content">
                                <i class="fas fa-search"></i>
                                <h4>Prospective Candidate</h4>
                                <p>I'm considering opportunities at Lynex</p>
                            </div>
                        </label>
                    </div>
                </div>
                
                <div class="modal-actions">
                    <button class="btn btn-primary" id="start-analysis">Start Analysis</button>
                    <button class="btn btn-outline modal-cancel">Cancel</button>
                </div>
            </div>
        </div>
    `;

  document.body.appendChild(modal);
  addModalStyles();

  // Start analysis button
  modal.querySelector("#start-analysis").addEventListener("click", function () {
    const userType = modal.querySelector(
      'input[name="user-type"]:checked'
    ).value;
    alert(
      `Career path analysis started for ${
        userType === "employee" ? "current employee" : "prospective candidate"
      }!`
    );
    document.body.removeChild(modal);

    // Redirect to career path page with parameters
    window.location.href = "pages/career-path.html?analysis=started";
  });

  setupModalCloseEvents(modal);
}

// Show AI match modal
function showAIMatchModal() {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h2>AI Job Matching</h2>
                <p>Get personalized job recommendations based on your profile</p>
                <button class="modal-close">&times;</button>
            </div>
            
            <div class="modal-content">
                <div class="match-info">
                    <div class="match-percentage-large">87%</div>
                    <p>Current match score based on your profile</p>
                </div>
                
                <div class="improvement-tips">
                    <h4>To improve your matches:</h4>
                    <ul>
                        <li><i class="fas fa-check-circle"></i> Complete your profile information</li>
                        <li><i class="fas fa-check-circle"></i> Upload your resume</li>
                        <li><i class="fas fa-check-circle"></i> Take skills assessment tests</li>
                        <li><i class="fas fa-check-circle"></i> Specify your salary expectations</li>
                    </ul>
                </div>
                
                <div class="modal-actions">
                    <button class="btn btn-primary" id="go-to-profile">Complete My Profile</button>
                    <button class="btn btn-outline modal-cancel">Later</button>
                </div>
            </div>
        </div>
    `;

  document.body.appendChild(modal);
  addModalStyles();

  // Go to profile button
  modal.querySelector("#go-to-profile").addEventListener("click", function () {
    alert("Redirecting to profile completion...");
    document.body.removeChild(modal);
    window.location.href = "pages/dashboard.html?tab=profile";
  });

  setupModalCloseEvents(modal);
}

// Setup modal close events
function setupModalCloseEvents(modal) {
  modal.querySelector(".modal-close").addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  modal.querySelector(".modal-cancel").addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });

  document.addEventListener("keydown", function closeOnEscape(e) {
    if (e.key === "Escape") {
      document.body.removeChild(modal);
      document.removeEventListener("keydown", closeOnEscape);
    }
  });
}

// Add modal styles to the page
function addModalStyles() {
  if (document.getElementById("modal-styles")) return;

  const styles = document.createElement("style");
  styles.id = "modal-styles";
  styles.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            padding: 20px;
        }
        
        .modal {
            background: white;
            border-radius: var(--radius);
            max-width: 500px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: var(--shadow-lg);
        }
        
        .modal-header {
            padding: 25px 25px 15px;
            border-bottom: 1px solid var(--gray-light);
            position: relative;
        }
        
        .modal-header h2 {
            margin-bottom: 5px;
            color: var(--dark);
        }
        
        .modal-header p {
            color: var(--gray);
            margin-bottom: 0;
        }
        
        .modal-close {
            position: absolute;
            top: 15px;
            right: 15px;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--gray);
        }
        
        .modal-close:hover {
            color: var(--dark);
        }
        
        .modal-form {
            padding: 25px;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 500;
            color: var(--dark);
        }
        
        .form-group input,
        .form-group textarea,
        .form-group select {
            width: 100%;
            padding: 10px;
            border: 1px solid var(--gray-light);
            border-radius: var(--radius);
            font-family: inherit;
        }
        
        .form-group small {
            display: block;
            margin-top: 5px;
            color: var(--gray);
            font-size: 0.8rem;
        }
        
        .form-actions {
            display: flex;
            gap: 10px;
            margin-top: 25px;
        }
        
        .modal-content {
            padding: 25px;
        }
        
        .path-options {
            margin-bottom: 25px;
        }
        
        .option-group {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .option-card {
            display: flex;
            align-items: center;
            padding: 20px;
            border: 2px solid var(--gray-light);
            border-radius: var(--radius);
            cursor: pointer;
            transition: var(--transition);
        }
        
        .option-card:hover {
            border-color: var(--primary);
        }
        
        .option-card input[type="radio"] {
            margin-right: 15px;
        }
        
        .option-content {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .option-content i {
            font-size: 1.5rem;
            color: var(--primary);
        }
        
        .option-content h4 {
            margin-bottom: 5px;
        }
        
        .option-content p {
            margin-bottom: 0;
            color: var(--gray);
        }
        
        .match-info {
            text-align: center;
            margin-bottom: 25px;
        }
        
        .match-percentage-large {
            font-size: 3rem;
            font-weight: 700;
            color: var(--accent);
            margin-bottom: 10px;
        }
        
        .improvement-tips ul {
            list-style: none;
            margin: 0;
            padding: 0;
        }
        
        .improvement-tips li {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 10px;
        }
        
        .improvement-tips i {
            color: var(--success);
        }
        
        .modal-actions {
            display: flex;
            gap: 10px;
            margin-top: 25px;
        }
        
        @media (max-width: 576px) {
            .modal-overlay {
                padding: 10px;
            }
            
            .form-actions,
            .modal-actions {
                flex-direction: column;
            }
            
            .option-content {
                flex-direction: column;
                text-align: center;
            }
        }
    `;

  document.head.appendChild(styles);
}

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    showApplicationModal,
    showPathAnalysisModal,
    showAIMatchModal,
  };
}
