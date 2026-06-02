/* Hero landing component */

export default {
  render(state) {
    const hotTopics = [
      "Ethics committee reviews in the Lancaster University Management School (LUMS). Check the resources hub for the latest templates.",
      "SPSS regression data cleaning for postgraduate researchers. Peer mentors are available in the matches grid.",
      "Structuring a high-scoring Literature Review in FASS. Consult our updated dissertation skeleton.",
      "Managing OneDrive backup syncs for long qualitative interview transcripts. See Michael Chang's CSS guides.",
      "Navigating ethics reviews for online interview studies in FHM. Grab the student ethics checklist.",
      "Structuring tables and graphs in LUMS quantitative research reports. APA citation guides are in the vault."
    ];
    const currentDay = new Date().getDay();
    const activeHotTopic = hotTopics[currentDay % hotTopics.length];

    return `
      <div class="hero-wrapper">
        <!-- Prototype mode banner -->
        <div style="background: rgba(253, 144, 41, 0.08); border: 1px solid rgba(253, 144, 41, 0.2); border-radius: 12px; padding: 1rem 1.25rem; display: flex; gap: 0.75rem; align-items: flex-start; margin-bottom: 2rem;">
          <i data-lucide="info" style="color: var(--accent-orange); flex-shrink: 0; width: 20px; height: 20px; margin-top: 0.1rem;"></i>
          <div>
            <h4 style="font-size: 0.9rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.25rem;">
              T&QLine Early Beta Prototype
            </h4>
            <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4; margin: 0;">
              Welcome to our early interactive design concept! Posts, upvotes, and bookings in this version are saved in your local browser sandbox. A persistent cloud database and official Lancaster student login verification are actively in planning. Feel free to explore and test the interface workflow!
            </p>
          </div>
        </div>

        <!-- Hero Header section -->
        <div class="hero-main">
          <div class="hero-left">
            <h1 class="hero-title">
              Let's talk about your <span>dissertation ideas.</span>
            </h1>
            <p class="hero-tagline">
              T&QLine (Thoughts & Questions Line) is a collaborative community designed for <strong>Lancaster University students</strong>. Whether you are brainstorming, drafting a proposal, struggling with methodology, or navigating ethics reviews, we connect you with peers who understand.
            </p>
            
            <div class="hero-ctas">
              <button class="btn btn-primary btn-glow" id="hero-explore-cta">
                <i data-lucide="compass"></i> Explore Idea Hub
              </button>
              <button class="btn btn-secondary" id="hero-pitch-cta">
                <i data-lucide="sparkles"></i> Pitch Your Concept
              </button>
            </div>
          </div>
          
          <div class="hero-right">
            <div class="glass-card" style="position: relative; overflow: hidden;">
              <div style="position: absolute; top: -50px; right: -50px; width: 150px; height: 150px; background: rgba(181, 18, 27, 0.1); border-radius: 50%; filter: blur(40px);"></div>
              
              <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
                <i data-lucide="activity" style="color: var(--primary-red); width: 20px; height: 20px;"></i> Community Activity
              </h3>
              
              <div class="hero-stats">
                <div class="stat-card">
                  <div class="stat-number red" id="hero-stat-ideas">${state.ideas ? state.ideas.length + 12 : 24}</div>
                  <div class="stat-label">Active Ideas</div>
                </div>
                <div class="stat-card">
                  <div class="stat-number" id="hero-stat-questions">${state.questions ? state.questions.length + 18 : 34}</div>
                  <div class="stat-label">Resolved Q&A</div>
                </div>
                <div class="stat-card">
                  <div class="stat-number" style="color: var(--accent-orange);">${state.mentors ? state.mentors.length : 6}</div>
                  <div class="stat-label">Advisers</div>
                </div>
              </div>
              
              <div style="margin-top: 1.5rem; padding-top: 1.25rem; border-top: 1px solid var(--dark-border); font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
                <p><strong>Hot Topic this week:</strong> ${activeHotTopic}</p>
              </div>
            </div>
            
            ${state.bookedSessions && state.bookedSessions.length > 0 ? `
              <div class="glass-card" style="margin-top: 1.5rem; position: relative; overflow: hidden;">
                <div style="position: absolute; top: -50px; right: -50px; width: 150px; height: 150px; background: rgba(59, 130, 246, 0.08); border-radius: 50%; filter: blur(40px);"></div>
                
                <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; color: var(--text-primary);">
                  <i data-lucide="calendar" style="color: var(--accent-blue); width: 18px; height: 18px;"></i> Booked Consultations
                </h3>
                
                <div class="hero-bookings-list" style="display: flex; flex-direction: column; gap: 0.75rem;">
                  ${state.bookedSessions.map((session, index) => `
                    <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--dark-border); border-radius: 10px; padding: 0.75rem; display: flex; flex-direction: column; gap: 0.25rem; position: relative;">
                      <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem;">
                        <span style="font-size: 0.85rem; font-weight: 700; color: var(--text-primary);">${session.mentorName}</span>
                        <button class="btn-cancel-hero-booking" data-index="${index}" style="background: none; border: none; padding: 0; color: var(--text-muted); cursor: pointer; transition: color 0.2s;" title="Cancel session">
                          <i data-lucide="x-circle" style="width: 14px; height: 14px;"></i>
                        </button>
                      </div>
                      <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; color: var(--text-secondary);">
                        <i data-lucide="clock" style="width: 12px; height: 12px;"></i>
                        <span>${session.day} at ${session.time}</span>
                      </div>
                      ${session.notes ? `<p style="font-size: 0.7rem; color: var(--text-muted); margin-top: 0.25rem; border-left: 2px solid rgba(59, 130, 246, 0.3); padding-left: 0.5rem; line-height: 1.3;">${session.notes}</p>` : ''}
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </div>
        </div>
        
        <!-- Features Section -->
        <div class="hero-features-section">
          <div style="text-align: center; margin-bottom: 3rem;">
            <p class="section-subtitle">How it works</p>
            <h2 class="section-title">Designed for Academic Excellence</h2>
          </div>
          
          <div class="grid-4">
            <div class="glass-card feature-card">
              <div class="feature-icon-wrapper">
                <i data-lucide="lightbulb" style="width: 22px; height: 22px;"></i>
              </div>
              <h3>1. Post Thoughts</h3>
              <p>Pitch your raw research proposal concept. Gather constructive peer feedback before presenting it to your supervisors.</p>
            </div>
            
            <div class="glass-card feature-card">
              <div class="feature-icon-wrapper" style="background: rgba(253, 144, 41, 0.1); border-color: rgba(253, 144, 41, 0.2); color: var(--accent-orange);">
                <i data-lucide="help-circle" style="width: 22px; height: 22px;"></i>
              </div>
              <h3>2. Ask Questions</h3>
              <p>Stuck on data analysis, sample sizes, or library citations? Get specific answers from seniors who've been there.</p>
            </div>
            
            <div class="glass-card feature-card">
              <div class="feature-icon-wrapper" style="background: rgba(32, 84, 121, 0.1); border-color: rgba(32, 84, 121, 0.2); color: #3b82f6;">
                <i data-lucide="users" style="width: 22px; height: 22px;"></i>
              </div>
              <h3>3. Match Mentors</h3>
              <p>Connect with high-achieving Lancaster postgraduates and PhD mentors who specialise in your academic domain.</p>
            </div>
            
            <div class="glass-card feature-card">
              <div class="feature-icon-wrapper" style="background: rgba(56, 97, 74, 0.1); border-color: rgba(56, 97, 74, 0.2); color: #34d399;">
                <i data-lucide="file-text" style="width: 22px; height: 22px;"></i>
              </div>
              <h3>4. Academic Vault</h3>
              <p>Access school-specific template cards, referencing blueprints, and writing checklists calibrated for Lancaster criteria.</p>
            </div>
          </div>
        </div>

        <!-- About Initiative & Non-affiliation Section -->
        <div class="glass-card" style="margin-top: 4rem; padding: 2.5rem; position: relative; overflow: hidden; background: linear-gradient(135deg, rgba(20, 20, 23, 0.95), rgba(181, 18, 27, 0.03)); border-color: var(--dark-border);">
          <div style="position: absolute; top: -50px; left: -50px; width: 180px; height: 180px; background: rgba(181, 18, 27, 0.05); border-radius: 50%; filter: blur(50px);"></div>
          <div style="display: flex; gap: 2rem; align-items: center; flex-wrap: wrap;">
            <div style="flex: 2; min-width: 300px;">
              <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--text-primary); display: flex; align-items: center; gap: 0.5rem;">
                <i data-lucide="shield" style="color: var(--primary-red); width: 22px; height: 22px;"></i> About T&QLine
              </h3>
              <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1rem;">
                T&QLine was founded solely by <strong>Yashraj Gupta</strong> to bridge the isolation gap in independent dissertation research. The mission is to facilitate peer feedback, methodology coordination, and community support.
              </p>
              <div style="background: rgba(181, 18, 27, 0.05); border-left: 3px solid var(--primary-red); padding: 0.75rem 1rem; border-radius: 4px; font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
                <strong>Notice of Non-Affiliation:</strong> T&QLine is an independent, student-led resource. We are <strong>not officially affiliated with, endorsed by, or representing Lancaster University</strong> or its academic departments. All guides, templates, and advisories are compiled for peer support and general reference only.
              </div>
            </div>
            <div style="flex: 1; min-width: 240px; display: flex; flex-direction: column; gap: 1rem; background: rgba(0, 0, 0, 0.15); border: 1px solid var(--dark-border); border-radius: 12px; padding: 1.25rem;">
              <h4 style="font-size: 0.9rem; font-weight: 700; color: var(--text-primary);">Contact Support</h4>
              <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4; margin: 0;">
                Have questions, suggestions, or want to join as a peer advisor? Drop us a line!
              </p>
              <a href="mailto:support@tqline.com" class="btn btn-secondary" style="font-size: 0.8rem; padding: 0.5rem; justify-content: center; width: 100%; text-decoration: none;">
                <i data-lucide="mail" style="width: 14px; height: 14px;"></i> Email Support
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  init(state, actions) {
    lucide.createIcons();
    
    // Bind CTAs
    const exploreCta = document.getElementById('hero-explore-cta');
    const pitchCta = document.getElementById('hero-pitch-cta');
    
    if (exploreCta) {
      exploreCta.addEventListener('click', () => {
        actions.changeView('dashboard');
      });
    }
    
    if (pitchCta) {
      pitchCta.addEventListener('click', () => {
        actions.openPitcher();
      });
    }

    // Bind cancellation buttons
    const cancelBtns = document.querySelectorAll('.btn-cancel-hero-booking');
    cancelBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-index'));
        actions.cancelBooking(index);
      });
    });
  }
};
