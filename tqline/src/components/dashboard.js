/* Dashboard component - main community workspace */

export default {
  render(state) {
    const currentTab = state.dashboardTab || 'ideas'; // 'ideas' or 'questions'
    const searchQuery = (state.searchQuery || '').toLowerCase();
    const activeFaculty = state.activeFaculty || 'all'; // 'all', 'lums', 'fst', 'fass', 'fhm'
    const activeStage = state.activeStage || 'all'; // 'all', 'thinking', 'proposal', 'writing', 'ethics'
    
    // Helper to check if a post matches active filters
    const matchesFilters = (item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery) || 
                            item.content.toLowerCase().includes(searchQuery) ||
                            (item.thesis && item.thesis.toLowerCase().includes(searchQuery));
      const matchesFaculty = activeFaculty === 'all' || item.faculty.toLowerCase() === activeFaculty;
      const matchesStage = activeStage === 'all' || item.stage.toLowerCase() === activeStage;
      return matchesSearch && matchesFaculty && matchesStage;
    };

    // Filter items based on active tab and filters
    const filteredIdeas = state.ideas.filter(item => matchesFilters(item));
    const filteredQuestions = state.questions.filter(item => matchesFilters(item));

    // Faculty counts for filter lists
    const getCount = (faculty, type) => {
      const items = type === 'ideas' ? state.ideas : state.questions;
      return items.filter(item => 
        (faculty === 'all' || item.faculty.toLowerCase() === faculty)
      ).length;
    };

    // Stage counts
    const getStageCount = (stage, type) => {
      const items = type === 'ideas' ? state.ideas : state.questions;
      return items.filter(item => 
        (stage === 'all' || item.stage.toLowerCase() === stage)
      ).length;
    };

    return `
      <div class="dashboard-layout">
        <!-- Sidebar filters -->
        <div class="dashboard-sidebar">
          <div class="glass-card" style="padding: 1.25rem;">
            <div class="filter-group" style="margin-bottom: 1.5rem;">
              <span class="filter-label">Faculties</span>
              <div class="filter-options">
                <button class="filter-btn ${activeFaculty === 'all' ? 'active' : ''}" data-faculty="all">
                  <span>All Faculties</span>
                  <span class="filter-count">${getCount('all', currentTab)}</span>
                </button>
                <button class="filter-btn ${activeFaculty === 'lums' ? 'active' : ''}" data-faculty="lums">
                  <span>LUMS (Management)</span>
                  <span class="filter-count">${getCount('lums', currentTab)}</span>
                </button>
                <button class="filter-btn ${activeFaculty === 'fst' ? 'active' : ''}" data-faculty="fst">
                  <span>FST (Science & Tech)</span>
                  <span class="filter-count">${getCount('fst', currentTab)}</span>
                </button>
                <button class="filter-btn ${activeFaculty === 'fass' ? 'active' : ''}" data-faculty="fass">
                  <span>FASS (Arts & Social Sci)</span>
                  <span class="filter-count">${getCount('fass', currentTab)}</span>
                </button>
                <button class="filter-btn ${activeFaculty === 'fhm' ? 'active' : ''}" data-faculty="fhm">
                  <span>FHM (Health & Med)</span>
                  <span class="filter-count">${getCount('fhm', currentTab)}</span>
                </button>
              </div>
            </div>
            
            <div class="filter-group">
              <span class="filter-label">Research Stages</span>
              <div class="filter-options">
                <button class="filter-btn ${activeStage === 'all' ? 'active' : ''}" data-stage="all">
                  <span>All Stages</span>
                  <span class="filter-count">${getStageCount('all', currentTab)}</span>
                </button>
                <button class="filter-btn ${activeStage === 'thinking' ? 'active' : ''}" data-stage="thinking">
                  <span>Just Thinking</span>
                  <span class="filter-count">${getStageCount('thinking', currentTab)}</span>
                </button>
                <button class="filter-btn ${activeStage === 'proposal' ? 'active' : ''}" data-stage="proposal">
                  <span>Proposal Draft</span>
                  <span class="filter-count">${getStageCount('proposal', currentTab)}</span>
                </button>
                <button class="filter-btn ${activeStage === 'writing' ? 'active' : ''}" data-stage="writing">
                  <span>Writing/Methodology</span>
                  <span class="filter-count">${getStageCount('writing', currentTab)}</span>
                </button>
                <button class="filter-btn ${activeStage === 'ethics' ? 'active' : ''}" data-stage="ethics">
                  <span>Ethics Review</span>
                  <span class="filter-count">${getStageCount('ethics', currentTab)}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Feed area -->
        <div class="dashboard-feed-wrapper">
          <!-- Feed toolbar -->
          <div class="feed-header">
            <div class="search-bar" style="position: relative;">
              <i data-lucide="search"></i>
              <input type="text" class="search-input" id="dashboard-search" placeholder="Search proposals, questions, keywords..." value="${state.searchQuery || ''}" style="padding-right: 2.5rem;">
              ${state.searchQuery ? `
                <button id="btn-clear-dashboard-search" style="position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--text-muted); cursor: pointer; display: flex; align-items: center; padding: 0;" title="Clear search">
                  <i data-lucide="x" style="width: 16px; height: 16px;"></i>
                </button>
              ` : ''}
            </div>
            
            <div class="feed-tabs">
              <button class="tab-btn ${currentTab === 'ideas' ? 'active' : ''}" id="tab-ideas">
                <i data-lucide="lightbulb"></i> Dissertation Ideas
              </button>
              <button class="tab-btn ${currentTab === 'questions' ? 'active' : ''}" id="tab-questions">
                <i data-lucide="help-circle"></i> Thoughts & Questions
              </button>
            </div>
            
            <button class="btn btn-primary" id="dashboard-pitch-btn">
              <i data-lucide="plus"></i> Pitch ${currentTab === 'ideas' ? 'Idea' : 'Question'}
            </button>
          </div>

          <!-- Active filters badge bar -->
          ${state.searchQuery || activeFaculty !== 'all' || activeStage !== 'all' ? `
            <div class="active-filters-bar" style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1rem; background: rgba(255, 255, 255, 0.02); border: 1px solid var(--dark-border); border-radius: 10px; padding: 0.5rem 1rem;">
              <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; display: flex; align-items: center; gap: 0.25rem;">
                  <i data-lucide="filter" style="width: 12px; height: 12px;"></i> Active Filters:
                </span>
                ${state.searchQuery ? `
                  <span class="methodology-tag" style="margin: 0; font-size: 0.7rem;">
                    Search: "${state.searchQuery}"
                  </span>
                ` : ''}
                ${activeFaculty !== 'all' ? `
                  <span class="badge badge-${activeFaculty}" style="font-size: 0.7rem; padding: 0.15rem 0.5rem;">
                    ${activeFaculty.toUpperCase()} Faculty
                  </span>
                ` : ''}
                ${activeStage !== 'all' ? `
                  <span class="badge badge-${activeStage}" style="font-size: 0.7rem; padding: 0.15rem 0.5rem;">
                    Stage: ${activeStage.charAt(0).toUpperCase() + activeStage.slice(1)}
                  </span>
                ` : ''}
              </div>
              <button class="btn-reset-all-filters" style="background: none; border: none; color: var(--primary-red); font-size: 0.75rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 0.25rem; padding: 0; transition: opacity 0.2s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">
                <i data-lucide="rotate-ccw" style="width: 12px; height: 12px;"></i> Reset All
              </button>
            </div>
          ` : ''}

          <!-- Feed lists -->
          <div class="feed-list">
            ${currentTab === 'ideas' 
              ? this.renderIdeas(filteredIdeas, state) 
              : this.renderQuestions(filteredQuestions, state)
            }
          </div>
        </div>
      </div>
    `;
  },

  renderIdeas(ideas, state) {
    if (ideas.length === 0) {
      const hasActiveFilters = state.searchQuery || state.activeFaculty !== 'all' || state.activeStage !== 'all';
      return `
        <div class="glass-card" style="text-align: center; padding: 4rem 2rem; color: var(--text-secondary);">
          <i data-lucide="search-x" style="width: 48px; height: 48px; color: var(--text-muted); margin-bottom: 1rem;"></i>
          <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--text-primary);">No Dissertation Ideas Found</h3>
          <p style="margin-bottom: 1rem;">${hasActiveFilters ? 'Adjust your search terms or filters to explore other research proposals.' : 'Be the first to pitch your research idea to the Lancaster University community!'}</p>
          <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 1.5rem; flex-wrap: wrap;">
            ${hasActiveFilters ? `
              <button class="btn btn-secondary btn-reset-all-filters">
                <i data-lucide="rotate-ccw"></i> Reset Search & Filters
              </button>
            ` : ''}
            <button class="btn btn-primary" id="empty-pitch-btn">
              <i data-lucide="plus"></i> Pitch Your Concept Now
            </button>
          </div>
        </div>
      `;
    }

    return ideas.map(idea => {
      const facultyBadgeClass = `badge-${idea.faculty.toLowerCase()}`;
      const stageBadgeClass = `badge-${idea.stage.toLowerCase()}`;
      const isUpvoted = state.upvotedIdeas && state.upvotedIdeas.includes(idea.id);
      const isCommentsOpen = state.openComments === idea.id;

      return `
        <div class="glass-card idea-card" id="idea-card-${idea.id}">
          <div class="idea-card-header">
            <div class="idea-meta">
              <span class="badge ${facultyBadgeClass}">${idea.faculty.toUpperCase()}</span>
              <span class="badge ${stageBadgeClass}">${idea.stage.replace(/^\w/, c => c.toUpperCase())}</span>
              <span class="author-info">
                <span class="author-dot"></span>
                <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-secondary);">${idea.author}</span>
              </span>
              <span class="post-time">${idea.time}</span>
            </div>
            
            <button class="interact-btn ${isUpvoted ? 'upvoted' : ''} upvote-idea-btn" data-id="${idea.id}">
              <i data-lucide="arrow-big-up"></i>
              <span>${idea.upvotes}</span>
            </button>
          </div>

          <div>
            <h2 class="idea-title">${idea.title}</h2>
            <p class="idea-pitch" style="margin-top: 0.75rem;">${idea.content}</p>
            ${idea.thesis ? `<div class="thesis-statement">"${idea.thesis}"</div>` : ''}
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <div class="tag-container">
              ${idea.methodology ? `<span class="methodology-tag">${idea.methodology}</span>` : ''}
              ${idea.tags ? idea.tags.map(t => `<span class="methodology-tag">#${t}</span>`).join('') : ''}
            </div>
            
            <button class="btn btn-secondary btn-comment-toggle" style="padding: 0.4rem 0.85rem; font-size: 0.8rem;" data-id="${idea.id}">
              <i data-lucide="message-square"></i> ${isCommentsOpen ? 'Hide' : 'Show'} Comments (${idea.comments ? idea.comments.length : 0})
            </button>
          </div>

          <!-- Comments Panel -->
          ${isCommentsOpen ? this.renderCommentsPanel(idea) : ''}
        </div>
      `;
    }).join('');
  },

  renderQuestions(questions, state) {
    if (questions.length === 0) {
      const hasActiveFilters = state.searchQuery || state.activeFaculty !== 'all' || state.activeStage !== 'all';
      return `
        <div class="glass-card" style="text-align: center; padding: 4rem 2rem; color: var(--text-secondary);">
          <i data-lucide="search-x" style="width: 48px; height: 48px; color: var(--text-muted); margin-bottom: 1rem;"></i>
          <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--text-primary);">No Questions Found</h3>
          <p style="margin-bottom: 1rem;">${hasActiveFilters ? 'Adjust your search terms or filters to explore other student questions.' : 'Have an academic dilemma? Post it here to consult Lancaster classmates.'}</p>
          <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 1.5rem; flex-wrap: wrap;">
            ${hasActiveFilters ? `
              <button class="btn btn-secondary btn-reset-all-filters">
                <i data-lucide="rotate-ccw"></i> Reset Search & Filters
              </button>
            ` : ''}
            <button class="btn btn-primary" id="empty-question-pitch-btn">
              <i data-lucide="plus"></i> Ask a Question Now
            </button>
          </div>
        </div>
      `;
    }

    return questions.map(q => {
      const facultyBadgeClass = `badge-${q.faculty.toLowerCase()}`;
      const isUpvoted = state.upvotedQuestions && state.upvotedQuestions.includes(q.id);
      const isCommentsOpen = state.openComments === q.id;

      return `
        <div class="glass-card idea-card" id="question-card-${q.id}">
          <div class="idea-card-header">
            <div class="idea-meta">
              <span class="badge ${facultyBadgeClass}">${q.faculty.toUpperCase()}</span>
              <span class="author-info">
                <span class="author-dot"></span>
                <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-secondary);">${q.author}</span>
              </span>
              <span class="post-time">${q.time}</span>
            </div>
            
            <button class="interact-btn ${isUpvoted ? 'upvoted' : ''} upvote-question-btn" data-id="${q.id}">
              <i data-lucide="arrow-big-up"></i>
              <span>${q.upvotes}</span>
            </button>
          </div>

          <div>
            <h2 class="idea-title" style="display: flex; align-items: flex-start; gap: 0.5rem;">
              <span style="color: var(--accent-orange); font-family: var(--font-serif); font-style: italic;">Q:</span> ${q.title}
            </h2>
            <p class="idea-pitch" style="margin-top: 0.75rem; background: rgba(253, 144, 41, 0.02); border-left: 2px dashed rgba(253, 144, 41, 0.3); padding: 0.75rem 1rem; border-radius: 0 8px 8px 0;">${q.content}</p>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <div class="tag-container">
              ${q.tags ? q.tags.map(t => `<span class="methodology-tag">#${t}</span>`).join('') : ''}
            </div>
            
            <button class="btn btn-secondary btn-comment-toggle" style="padding: 0.4rem 0.85rem; font-size: 0.8rem;" data-id="${q.id}">
              <i data-lucide="message-square"></i> ${isCommentsOpen ? 'Hide Answers' : 'Show Answers'} (${q.comments ? q.comments.length : 0})
            </button>
          </div>

          <!-- Comments Panel -->
          ${isCommentsOpen ? this.renderCommentsPanel(q, true) : ''}
        </div>
      `;
    }).join('');
  },

  renderCommentsPanel(item, isQuestion = false) {
    const comments = item.comments || [];
    
    return `
      <div class="comments-section">
        <h4 style="font-size: 0.9rem; font-weight: 600; border-bottom: 1px solid var(--dark-border); padding-bottom: 0.5rem; margin-bottom: 0.5rem;">
          ${isQuestion ? 'Discussion & Answers' : 'Feedback Loop'}
        </h4>
        
        <div class="comments-list">
          ${comments.length === 0 
            ? `<p style="font-size: 0.8rem; color: var(--text-muted); text-align: center; padding: 1rem 0;">No inputs yet. Start the conversation!</p>`
            : comments.map(c => `
                <div class="comment-card">
                  <div class="comment-avatar">
                    ${c.author.substring(0, 2).toUpperCase()}
                  </div>
                  <div class="comment-body">
                    <div class="comment-header">
                      <span class="comment-author">${c.author}</span>
                      <span class="comment-time">${c.time || 'Just now'}</span>
                    </div>
                    <p class="comment-text">${c.content}</p>
                  </div>
                </div>
              `).join('')
          }
        </div>

        <form class="comment-form" data-id="${item.id}" data-type="${isQuestion ? 'question' : 'idea'}">
          <input type="text" class="comment-input" placeholder="${isQuestion ? 'Suggest an answer...' : 'Share your thought or ask a sub-question...'}" required>
          <button type="submit" class="btn btn-primary" style="padding: 0.4rem 1rem; border-radius: 8px; font-size: 0.8rem;">
            Submit
          </button>
        </form>
      </div>
    `;
  },

  init(state, actions) {
    lucide.createIcons();

    // Bind searches
    const searchInput = document.getElementById('dashboard-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        actions.updateSearch(e.target.value);
      });
    }

    const clearSearchBtn = document.getElementById('btn-clear-dashboard-search');
    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        actions.updateSearch('');
      });
    }

    // Bind reset all filters buttons
    const resetFilterBtns = document.querySelectorAll('.btn-reset-all-filters');
    resetFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        actions.updateSearch('');
        actions.setFacultyFilter('all');
        actions.setStageFilter('all');
      });
    });

    // Bind pitch button
    const pitchBtn = document.getElementById('dashboard-pitch-btn');
    if (pitchBtn) {
      pitchBtn.addEventListener('click', () => {
        const currentTab = state.dashboardTab || 'ideas';
        actions.openPitcher(currentTab === 'ideas' ? 'idea' : 'question');
      });
    }
    
    const emptyPitchBtn = document.getElementById('empty-pitch-btn');
    if (emptyPitchBtn) {
      emptyPitchBtn.addEventListener('click', () => {
        actions.openPitcher('idea');
      });
    }

    const emptyQuestionPitchBtn = document.getElementById('empty-question-pitch-btn');
    if (emptyQuestionPitchBtn) {
      emptyQuestionPitchBtn.addEventListener('click', () => {
        actions.openPitcher('question');
      });
    }

    // Bind tabs
    const tabIdeas = document.getElementById('tab-ideas');
    const tabQuestions = document.getElementById('tab-questions');

    if (tabIdeas) {
      tabIdeas.addEventListener('click', () => {
        actions.setDashboardTab('ideas');
      });
    }
    if (tabQuestions) {
      tabQuestions.addEventListener('click', () => {
        actions.setDashboardTab('questions');
      });
    }

    // Bind faculty filter buttons
    const facultyBtns = document.querySelectorAll('.filter-options button[data-faculty]');
    facultyBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const faculty = btn.getAttribute('data-faculty');
        actions.setFacultyFilter(faculty);
      });
    });

    // Bind stage filter buttons
    const stageBtns = document.querySelectorAll('.filter-options button[data-stage]');
    stageBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const stage = btn.getAttribute('data-stage');
        actions.setStageFilter(stage);
      });
    });

    // Bind upvoting buttons
    const upvoteIdeaBtns = document.querySelectorAll('.upvote-idea-btn');
    upvoteIdeaBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(btn.getAttribute('data-id'));
        actions.upvoteIdea(id);
      });
    });

    const upvoteQuestionBtns = document.querySelectorAll('.upvote-question-btn');
    upvoteQuestionBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(btn.getAttribute('data-id'));
        actions.upvoteQuestion(id);
      });
    });

    // Bind comment toggle button
    const commentToggleBtns = document.querySelectorAll('.btn-comment-toggle');
    commentToggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        actions.toggleComments(id);
      });
    });

    // Bind comment form submission
    const commentForms = document.querySelectorAll('.comment-form');
    commentForms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = parseInt(form.getAttribute('data-id'));
        const type = form.getAttribute('data-type');
        const input = form.querySelector('.comment-input');
        const content = input.value.trim();
        
        if (content) {
          if (type === 'idea') {
            actions.addIdeaComment(id, content);
          } else {
            actions.addQuestionComment(id, content);
          }
          input.value = '';
        }
      });
    });
  }
};
