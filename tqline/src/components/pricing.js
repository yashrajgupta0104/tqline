/* Pricing component - outlines Phase 1 Active Beta and Phase 2 Premium plans */

export default {
  render(state) {
    return `
      <div class="pricing-wrapper">
        <div class="pricing-intro">
          <p class="section-subtitle">Membership Plans</p>
          <h2 style="font-size: 2.25rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--text-primary);">
            Choose your research path.
          </h2>
          <p style="color: var(--text-secondary); font-size: 0.95rem;">
            T&QLine is currently in active development. As a Lancaster University student, you get full access to the community workspace completely free.
          </p>
        </div>

        <!-- Premium Alert Beta Banner -->
        <div class="premium-alert-banner">
          <i data-lucide="sparkles" style="width: 24px; height: 24px;"></i>
          <div>
            <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary);">Active Community Phase (100% Free)</h4>
            <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4; margin-top: 0.1rem;">
              We want to support our Lancaster classmates! All premium matching, resources, and discussion boards are fully unlocked during our launch beta. No credit cards or fees required.
            </p>
          </div>
        </div>

        <div class="pricing-grid">
          <!-- Lancs Basic Tier Card -->
          <div class="glass-card pricing-card free-tier">
            <div>
              <span class="tier-name">Lancs Basic</span>
              <div class="tier-price">£0<span>/ month</span></div>
              <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
                Fully featured community access designed for Lancaster University students and researchers.
              </p>
              
              <ul class="tier-features">
                <li><i data-lucide="check-circle" class="check"></i> Post thoughts & proposal concepts</li>
                <li><i data-lucide="check-circle" class="check"></i> Ask unlimited dissertation questions</li>
                <li><i data-lucide="check-circle" class="check"></i> Filter boards by LUMS, FST, FASS, FHM</li>
                <li><i data-lucide="check-circle" class="check"></i> Access the citation formatter tool</li>
                <li><i data-lucide="check-circle" class="check"></i> Book free consultation peer-matches</li>
              </ul>
            </div>

            <button class="btn btn-primary btn-glow" id="btn-claim-free" style="width: 100%; justify-content: center; margin-top: auto;">
              Enter Community Hub
            </button>
          </div>

          <!-- T&Q Pro Premium Card -->
          <div class="glass-card pricing-card premium-tier">
            <div>
              <span class="tier-name" style="color: var(--primary-red);">T&Q Pro</span>
              <div class="tier-price" style="color: var(--text-primary);">
                £14.99<span>/ month</span>
              </div>
              <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
                Phase 2 guidance tier. Connects you to advanced academic peer-coaches and doctoral feedback advisors, in strict compliance with university academic integrity rules.
              </p>
              
              <ul class="tier-features">
                <li><i data-lucide="check-circle" class="check"></i> All basic student hub features</li>
                <li><i data-lucide="lock" class="lock"></i> Academic coaching & feedback reviews</li>
                <li><i data-lucide="lock" class="lock"></i> Priority advisor Q&A answering (under 4 hours)</li>
                <li><i data-lucide="lock" class="lock"></i> LUMS-compliant LaTeX styling guides</li>
                <li><i data-lucide="lock" class="lock"></i> Dedicated PhD one-on-one reviews (2 hours/mo)</li>
              </ul>
            </div>

            <button class="btn btn-secondary" style="width: 100%; justify-content: center; margin-top: auto; opacity: 0.6; cursor: not-allowed;" disabled>
              Coming in Phase 2
            </button>
          </div>
        </div>
      </div>
    `;
  },

  init(state, actions) {
    lucide.createIcons();

    // Claim free button
    const claimBtn = document.getElementById('btn-claim-free');
    if (claimBtn) {
      claimBtn.addEventListener('click', () => {
        window.showToast('Welcome! Your Free Beta Membership is fully activated.');
        actions.changeView('dashboard');
      });
    }
  }
};
