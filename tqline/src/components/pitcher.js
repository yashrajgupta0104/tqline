/* Pitcher component - interactive wizard modal to post dissertation ideas */

export default {
  render(state) {
    if (!state.isPitcherOpen) return '';

    const step = state.pitcherStep || 1; // 1, 2, 3

    return `
      <div class="modal-overlay" id="pitcher-modal">
        <div class="modal-content">
          <button class="modal-close" id="close-pitcher-btn">
            <i data-lucide="x"></i>
          </button>
          
          <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem; background: linear-gradient(to right, #ffffff, var(--accent-grey)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
            <i data-lucide="sparkles" style="color: var(--primary-red); width: 22px; height: 22px;"></i> Pitch to T&QLine
          </h2>
          
          <!-- Wizard Steps Indicators -->
          <div class="pitcher-wizard-steps">
            <div class="step-indicator ${step === 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}">1</div>
            <div class="step-indicator ${step === 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}">2</div>
            <div class="step-indicator ${step === 3 ? 'active' : ''}">3</div>
          </div>
          
          <form id="pitcher-form" onsubmit="event.preventDefault();">
            
            <!-- STEP 1: Basic Type & Department -->
            ${step === 1 ? `
              <div class="form-group">
                <label class="form-label">What are you sharing? *</label>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 0.25rem;">
                  <label class="glass-card keyboard-focusable-card" tabindex="0" style="padding: 1.25rem; cursor: pointer; display: flex; flex-direction: column; gap: 0.5rem; border-color: ${state.tempPitch.type === 'idea' ? 'var(--primary-red)' : 'var(--dark-border)'};" id="type-option-idea" aria-label="Select proposal type: Idea">
                    <input type="radio" name="pitch-type" value="idea" ${state.tempPitch.type === 'idea' ? 'checked' : ''} style="display:none;">
                    <span style="font-weight: 700; font-size: 0.95rem; color: ${state.tempPitch.type === 'idea' ? 'var(--primary-red)' : 'var(--text-primary)'}; display:flex; align-items:center; gap:0.5rem;">
                      <i data-lucide="lightbulb" style="width:16px; height:16px;"></i> Proposal Idea
                    </span>
                    <span style="font-size: 0.8rem; color: var(--text-secondary);">Pitch an abstract, research topic, or structural skeleton.</span>
                  </label>
                  
                  <label class="glass-card keyboard-focusable-card" tabindex="0" style="padding: 1.25rem; cursor: pointer; display: flex; flex-direction: column; gap: 0.5rem; border-color: ${state.tempPitch.type === 'question' ? 'var(--primary-red)' : 'var(--dark-border)'};" id="type-option-question" aria-label="Select proposal type: Thought or Question">
                    <input type="radio" name="pitch-type" value="question" ${state.tempPitch.type === 'question' ? 'checked' : ''} style="display:none;">
                    <span style="font-weight: 700; font-size: 0.95rem; color: ${state.tempPitch.type === 'question' ? 'var(--primary-red)' : 'var(--text-primary)'}; display:flex; align-items:center; gap:0.5rem;">
                      <i data-lucide="help-circle" style="width:16px; height:16px;"></i> Thought / Question
                    </span>
                    <span style="font-size: 0.8rem; color: var(--text-secondary);">Ask a direct methodology question, sample design issue, or general inquiry.</span>
                  </label>
                </div>
              </div>
              
              <div class="form-group">
                <label class="form-label" for="pitch-faculty">Lancaster Faculty *</label>
                <select class="form-select" id="pitch-faculty" required>
                  <option value="" disabled ${!state.tempPitch.faculty ? 'selected' : ''}>Select your faculty</option>
                  <option value="LUMS" ${state.tempPitch.faculty === 'LUMS' ? 'selected' : ''}>LUMS (Lancaster University Management School)</option>
                  <option value="FST" ${state.tempPitch.faculty === 'FST' ? 'selected' : ''}>FST (Faculty of Science and Technology)</option>
                  <option value="FASS" ${state.tempPitch.faculty === 'FASS' ? 'selected' : ''}>FASS (Faculty of Arts and Social Sciences)</option>
                  <option value="FHM" ${state.tempPitch.faculty === 'FHM' ? 'selected' : ''}>FHM (Faculty of Health and Medicine)</option>
                </select>
              </div>
              
              <div class="form-group">
                <label class="form-label" for="pitch-author">Name / Identity</label>
                <input type="text" class="form-input" id="pitch-author" placeholder="E.g., Anonymous Lancs Student" value="${state.tempPitch.author || ''}">
              </div>
            ` : ''}

            <!-- STEP 2: Main Descriptions & Stages -->
            ${step === 2 ? `
              <div class="form-group">
                <label class="form-label" for="pitch-title">Title *</label>
                <input type="text" class="form-input" id="pitch-title" placeholder="Give your dissertation idea/question a clear title" value="${state.tempPitch.title || ''}" required>
              </div>
              
              <div class="form-group">
                <label class="form-label" for="pitch-content">
                  <span>${state.tempPitch.type === 'idea' ? 'Tell us about your Idea *' : 'Describe your dilemma *'}</span>
                  <span id="char-counter">0 / 800</span>
                </label>
                <textarea class="form-textarea" id="pitch-content" maxlength="800" placeholder="${state.tempPitch.type === 'idea' ? 'Describe the core background, the problem you want to address, or what you are trying to find out...' : 'Be descriptive! Explain your question, what you are trying to do, and where exactly you are feeling stuck...'}" required>${state.tempPitch.content || ''}</textarea>
              </div>
              
              <div class="form-group">
                <label class="form-label" for="pitch-stage">Current Research Stage *</label>
                <select class="form-select" id="pitch-stage" required>
                  <option value="thinking" ${state.tempPitch.stage === 'thinking' ? 'selected' : ''}>Just thinking / Brainstorming</option>
                  <option value="proposal" ${state.tempPitch.stage === 'proposal' ? 'selected' : ''}>Proposal Draft / Writing proposal</option>
                  <option value="writing" ${state.tempPitch.stage === 'writing' ? 'selected' : ''}>Writing / Methodology planning</option>
                  <option value="ethics" ${state.tempPitch.stage === 'ethics' ? 'selected' : ''}>Ethics Committee Review</option>
                </select>
              </div>
            ` : ''}

            <!-- STEP 3: Methodology and Core Thesis -->
            ${step === 3 ? `
              ${state.tempPitch.type === 'idea' ? `
                <div class="form-group">
                  <label class="form-label" for="pitch-thesis">
                    <span>Working Thesis / Core Research Question</span>
                    <span>Optional but highly recommended</span>
                  </label>
                  <input type="text" class="form-input" id="pitch-thesis" placeholder="E.g., To what extent does remote work affect employee cohesion in Lancaster SME sectors?" value="${state.tempPitch.thesis || ''}">
                </div>
                
                <div class="form-group">
                  <label class="form-label" for="pitch-methodology">Primary Methodology</label>
                  <select class="form-select" id="pitch-methodology">
                    <option value="Qualitative" ${state.tempPitch.methodology === 'Qualitative' ? 'selected' : ''}>Qualitative (Interviews, Focus groups, Case studies)</option>
                    <option value="Quantitative" ${state.tempPitch.methodology === 'Quantitative' ? 'selected' : ''}>Quantitative (Surveys, SPSS, regression, big data)</option>
                    <option value="Mixed Methods" ${state.tempPitch.methodology === 'Mixed Methods' ? 'selected' : ''}>Mixed Methods (Sequential, Concurrent)</option>
                    <option value="Literature Review" ${state.tempPitch.methodology === 'Literature Review' ? 'selected' : ''}>Secondary Data / Systematic Literature Review</option>
                  </select>
                </div>
              ` : ''}
              
              <div class="form-group">
                <label class="form-label" for="pitch-tags">Keywords / Tags (comma separated)</label>
                <input type="text" class="form-input" id="pitch-tags" placeholder="e.g., SPSS, ethics, marketing, LUMS" value="${state.tempPitch.tags ? state.tempPitch.tags.join(', ') : ''}">
              </div>
              
              <div style="background: rgba(181, 18, 27, 0.05); border: 1px solid rgba(181, 18, 27, 0.15); border-radius: 12px; padding: 1rem; margin-top: 1rem; display: flex; gap: 0.75rem; align-items: flex-start;">
                <i data-lucide="shield-check" style="color: var(--primary-red); flex-shrink: 0; width: 18px; height: 18px; margin-top: 0.1rem;"></i>
                <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4;">
                  <strong>Honour Code:</strong> By sharing your concepts on T&QLine, you maintain ultimate ownership. T&QLine is a discussion hub, designed for peer coordination and styling advice. Plagiarism is strictly prohibited.
                </p>
              </div>
            ` : ''}
            
            <!-- Navigation controls -->
            <div style="display: flex; justify-content: space-between; margin-top: 2rem; border-top: 1px solid var(--dark-border); padding-top: 1.5rem;">
              ${step > 1 ? `
                <button type="button" class="btn btn-secondary" id="wizard-prev-btn">
                  <i data-lucide="arrow-left"></i> Back
                </button>
              ` : `<div></div>`}
              
              ${step < 3 ? `
                <button type="button" class="btn btn-primary" id="wizard-next-btn">
                  Next <i data-lucide="arrow-right"></i>
                </button>
              ` : `
                <button type="button" class="btn btn-primary" id="wizard-submit-btn" style="background-color: var(--primary-red); border-color: var(--primary-red); color: white;">
                  <i data-lucide="check"></i> Post to Community
                </button>
              `}
            </div>

          </form>
        </div>
      </div>
    `;
  },

  init(state, actions) {
    if (!state.isPitcherOpen) return;
    lucide.createIcons();

    const modal = document.getElementById('pitcher-modal');
    const closeBtn = document.getElementById('close-pitcher-btn');
    const prevBtn = document.getElementById('wizard-prev-btn');
    const nextBtn = document.getElementById('wizard-next-btn');
    const submitBtn = document.getElementById('wizard-submit-btn');

    // Close on overlay click
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          actions.closePitcher();
        }
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        actions.closePitcher();
      });
    }

    // Handle Wizard Type selections (Step 1)
    const typeOptionIdea = document.getElementById('type-option-idea');
    const typeOptionQuestion = document.getElementById('type-option-question');

    if (typeOptionIdea) {
      typeOptionIdea.addEventListener('click', () => {
        actions.updateTempPitch({ type: 'idea' });
      });
      typeOptionIdea.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          actions.updateTempPitch({ type: 'idea' });
        }
      });
    }

    if (typeOptionQuestion) {
      typeOptionQuestion.addEventListener('click', () => {
        actions.updateTempPitch({ type: 'question' });
      });
      typeOptionQuestion.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          actions.updateTempPitch({ type: 'question' });
        }
      });
    }

    // Step navigation
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        // Collect current step form values
        const currentStep = state.pitcherStep;
        const updates = {};
        
        if (currentStep === 1) {
          const faculty = document.getElementById('pitch-faculty').value;
          const author = document.getElementById('pitch-author').value.trim() || 'Anonymous Lancs Student';
          
          if (!faculty) {
            window.showToast('Please select your Faculty to continue.', 'error');
            return;
          }
          
          updates.faculty = faculty;
          updates.author = author;
        } else if (currentStep === 2) {
          const title = document.getElementById('pitch-title').value.trim();
          const content = document.getElementById('pitch-content').value.trim();
          const stage = document.getElementById('pitch-stage').value;
          
          if (!title || !content) {
            window.showToast('Please fill in both the Title and the description contents.', 'error');
            return;
          }
          
          updates.title = title;
          updates.content = content;
          updates.stage = stage;
        }

        actions.updateTempPitch(updates);
        actions.setPitcherStep(currentStep + 1);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        // Capture inputs from active step before backing up
        const currentStep = state.pitcherStep;
        const updates = {};
        
        if (currentStep === 2) {
          updates.title = document.getElementById('pitch-title').value;
          updates.content = document.getElementById('pitch-content').value;
          updates.stage = document.getElementById('pitch-stage').value;
        } else if (currentStep === 3) {
          const thesisInput = document.getElementById('pitch-thesis');
          const methodologyInput = document.getElementById('pitch-methodology');
          const tagsInput = document.getElementById('pitch-tags');
          
          if (thesisInput) updates.thesis = thesisInput.value;
          if (methodologyInput) updates.methodology = methodologyInput.value;
          if (tagsInput) {
            updates.tags = tagsInput.value.split(',').map(t => t.trim()).filter(t => t.length > 0);
          }
        }
        
        actions.updateTempPitch(updates);
        actions.setPitcherStep(currentStep - 1);
      });
    }

    // Submit Action
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        const thesisInput = document.getElementById('pitch-thesis');
        const methodologyInput = document.getElementById('pitch-methodology');
        const tagsInput = document.getElementById('pitch-tags');
        
        const finalUpdates = {};
        if (thesisInput) finalUpdates.thesis = thesisInput.value.trim();
        if (methodologyInput) finalUpdates.methodology = methodologyInput.value;
        if (tagsInput) {
          finalUpdates.tags = tagsInput.value.split(',').map(t => t.trim()).filter(t => t.length > 0);
        }
        
        actions.updateTempPitch(finalUpdates);
        actions.submitPitch();
      });
    }

    // Counter updates
    const contentTextarea = document.getElementById('pitch-content');
    const counterSpan = document.getElementById('char-counter');
    if (contentTextarea && counterSpan) {
      contentTextarea.addEventListener('input', () => {
        counterSpan.textContent = `${contentTextarea.value.length} / 800`;
      });
      // Initial trigger
      counterSpan.textContent = `${contentTextarea.value.length} / 800`;
    }
  }
};
