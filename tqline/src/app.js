/* T&QLine Central State, Router, and Rendering Loop */

import hero from './components/hero.js';
import dashboard from './components/dashboard.js';
import pitcher from './components/pitcher.js';
import mentors from './components/mentors.js';
import resources from './components/resources.js';
import pricing from './components/pricing.js';

// Pre-populated realistic Lancaster University academic data
const defaultState = {
  view: 'home', // 'home', 'dashboard', 'mentors', 'resources', 'pricing'
  dashboardTab: 'ideas', // 'ideas' or 'questions'
  searchQuery: '',
  activeFaculty: 'all',
  activeStage: 'all',
  upvotedIdeas: [1],
  upvotedQuestions: [2],
  openComments: null,
  isPitcherOpen: false,
  pitcherStep: 1,
  
  tempPitch: {
    type: 'idea',
    faculty: '',
    author: 'Yashraj Gupta',
    title: '',
    content: '',
    stage: 'thinking',
    thesis: '',
    methodology: 'Qualitative',
    tags: []
  },

  ideas: [
    {
      id: 1,
      title: "Analyzing Consumer Reaction to Greenwashing in FMCG Brands",
      faculty: "LUMS",
      stage: "proposal",
      author: "Sarah Jenkins",
      time: "2 hours ago",
      content: "I want to study how Lancaster local shoppers perceive 'biodegradable' labels on laundry detergents. My plan is to distribute digital questionnaires via university groups and perform regression testing on brand loyalty.",
      thesis: "Consumer skepticism toward green marketing significantly moderates the relationship between eco-labels and repeat purchase intent.",
      methodology: "Quantitative",
      tags: ["marketing", "greenwashing", "SPSS", "LUMS"],
      upvotes: 19,
      comments: [
        {
          author: "David Vance (Postgrad)",
          time: "1 hour ago",
          content: "Excellent topic Sarah. I recommend checking the LUMS Ethics Board constraints on questionnaire distribution. They are quite strict about cold messaging students."
        }
      ]
    },
    {
      id: 2,
      title: "A Secure Blockchain Framework for Student Health Data Lockers",
      faculty: "FST",
      stage: "thinking",
      author: "Marcus Vance",
      time: "Yesterday",
      content: "I'm thinking about designing a decentralized portal where students hold cryptographic keys to their clinic records. Other healthcare institutions request temporal access keys. Will use Hyperledger Fabric.",
      thesis: "",
      methodology: "Mixed Methods",
      tags: ["blockchain", "security", "FST", "healthcare"],
      upvotes: 12,
      comments: []
    },
    {
      id: 3,
      title: "Depicting Post-Brexit Industrial Decline in Lancs Poetry",
      faculty: "FASS",
      stage: "writing",
      author: "Elena Rostova",
      time: "3 days ago",
      content: "An in-depth thematic analysis of local poet collectives working in Morecambe and Lancaster from 2017 to 2025. I am analyzing how themes of industrial decay, hopelessness, and rural isolation are structurally represented.",
      thesis: "Contemporary Lancastrian poetry utilizes maritime imagery to conceptualize post-industrial economic abandonment.",
      methodology: "Literature Review",
      tags: ["poetry", "Brexit", "thematic-analysis", "FASS"],
      upvotes: 9,
      comments: []
    }
  ],

  questions: [
    {
      id: 1,
      title: "LUMS Ethics Review - Sample Size Justification?",
      faculty: "LUMS",
      stage: "proposal",
      author: "James Patel",
      time: "3 hours ago",
      content: "I'm drafting my LUMS proposal. I have a population of ~500 Lancaster businesses, how do I justify a sample size of 80 businesses for statistical validity? What formula should I cite?",
      upvotes: 6,
      tags: ["LUMS", "ethics", "SPSS", "sample-size"],
      comments: [
        {
          author: "Dr. Rebecca Hall (Adviser)",
          time: "2 hours ago",
          content: "Check Cochran's Formula or Yamane's. Cite Saunders et al. (Research Methods for Business Students). They have a wonderful table mapping population sizes to required samples at 5% margin of error!"
        }
      ]
    },
    {
      id: 2,
      title: "Qualitative Coding Software: NVivo vs Atlas.ti?",
      faculty: "FASS",
      stage: "writing",
      author: "Chloe Bennett",
      time: "1 day ago",
      content: "I have 12 semi-structured interview transcripts (around 1 hour each) on student housing anxieties. Does Lancaster University offer free student licenses for NVivo or Atlas.ti? Which is easier to learn?",
      upvotes: 15,
      tags: ["NVivo", "qualitative", "interview", "FASS"],
      comments: [
        {
          author: "Michael Chang (PhD)",
          time: "12 hours ago",
          content: "Lancaster library provides free NVivo licenses! You can download it directly from the ISS Software Portal. Personally, NVivo is much better integrated with Lancaster's OneDrive backups."
        }
      ]
    }
  ],

  mentors: [
    {
      id: 1,
      name: "Dr. Rebecca Hall",
      role: "PhD Research Advisor",
      department: "LUMS",
      bio: "Specializes in quantitative management models, SPSS regression analysis, and Lancaster ethical board clearances.",
      skills: ["SPSS", "Quantitative", "Ethics Check"]
    },
    {
      id: 2,
      name: "Michael Chang",
      role: "PhD Candidate & Tutor",
      department: "FST",
      bio: "Expert in computer science thesis structures, systems validation methodology, and LaTeX technical writing.",
      skills: ["LaTeX", "Quantitative", "Systems"]
    },
    {
      id: 3,
      name: "David Vance",
      role: "Postgraduate Peer Mentor",
      department: "FASS",
      bio: "Specializes in qualitative interview designs, thematic coding, NVivo pipelines, and sociological research methodologies.",
      skills: ["NVivo", "Qualitative", "Thematic"]
    }
  ],
  
  mentorSearchQuery: '',
  selectedSkillFilter: 'all',
  bookingMentorId: null,
  bookingSelectedDay: 28,
  bookingSelectedSlot: '',
  bookedSessions: [],

  citationType: 'book',
  generatedCitation: '',
  watchingVideoId: null
};

// Initialize State from Local Storage or defaults
let state = JSON.parse(localStorage.getItem('tqline_state')) || defaultState;

// Sync state to local storage
const syncStorage = () => {
  localStorage.setItem('tqline_state', JSON.stringify(state));
};

// Central Actions dispatcher
const actions = {
  changeView(viewName) {
    state.view = viewName;
    state.openComments = null;
    syncStorage();
    render();
  },

  setDashboardTab(tabName) {
    state.dashboardTab = tabName;
    state.activeFaculty = 'all';
    state.activeStage = 'all';
    state.openComments = null;
    syncStorage();
    render();
  },

  updateSearch(query) {
    state.searchQuery = query;
    syncStorage();
    
    if (state.view === 'dashboard') {
      const feedList = document.querySelector('.feed-list');
      if (feedList) {
        const currentTab = state.dashboardTab || 'ideas';
        const searchQuery = query.toLowerCase();
        const activeFaculty = state.activeFaculty || 'all';
        const activeStage = state.activeStage || 'all';
        
        const matchesFilters = (item) => {
          const matchesSearch = item.title.toLowerCase().includes(searchQuery) || 
                                item.content.toLowerCase().includes(searchQuery) ||
                                (item.thesis && item.thesis.toLowerCase().includes(searchQuery));
          const matchesFaculty = activeFaculty === 'all' || item.faculty.toLowerCase() === activeFaculty;
          const matchesStage = activeStage === 'all' || item.stage.toLowerCase() === activeStage;
          return matchesSearch && matchesFaculty && matchesStage;
        };

        if (currentTab === 'ideas') {
          const filteredIdeas = state.ideas.filter(item => matchesFilters(item));
          feedList.innerHTML = dashboard.renderIdeas(filteredIdeas, state);
        } else {
          const filteredQuestions = state.questions.filter(item => matchesFilters(item));
          feedList.innerHTML = dashboard.renderQuestions(filteredQuestions, state);
        }
        
        const clearBtn = document.getElementById('btn-clear-dashboard-search');
        if (clearBtn) {
          clearBtn.style.display = query ? 'flex' : 'none';
        }
        
        dashboard.init(state, actions);
        return;
      }
    }
    
    render();
  },

  setFacultyFilter(faculty) {
    state.activeFaculty = faculty;
    syncStorage();
    render();
  },

  setStageFilter(stage) {
    state.activeStage = stage;
    syncStorage();
    render();
  },

  openPitcher(defaultType = 'idea') {
    state.isPitcherOpen = true;
    state.pitcherStep = 1;
    state.tempPitch = {
      type: defaultType,
      faculty: '',
      author: 'Yashraj Gupta',
      title: '',
      content: '',
      stage: 'thinking',
      thesis: '',
      methodology: 'Qualitative',
      tags: []
    };
    render();
  },

  closePitcher() {
    state.isPitcherOpen = false;
    render();
  },

  setPitcherStep(step) {
    state.pitcherStep = step;
    render();
  },

  updateTempPitch(updates) {
    state.tempPitch = { ...state.tempPitch, ...updates };
    // DO NOT trigger render here unless changing radio buttons visually
    if (updates.type) {
      render();
    }
  },

  submitPitch() {
    const pitch = state.tempPitch;
    const timeString = "Just now";
    
    if (pitch.type === 'idea') {
      const newIdea = {
        id: state.ideas.length + 1,
        title: pitch.title,
        faculty: pitch.faculty || 'LUMS',
        stage: pitch.stage || 'thinking',
        author: pitch.author || 'Anonymous Student',
        time: timeString,
        content: pitch.content,
        thesis: pitch.thesis || '',
        methodology: pitch.methodology || 'Qualitative',
        tags: pitch.tags || [],
        upvotes: 0,
        comments: []
      };
      state.ideas.unshift(newIdea);
      state.dashboardTab = 'ideas';
    } else {
      const newQuestion = {
        id: state.questions.length + 1,
        title: pitch.title,
        faculty: pitch.faculty || 'LUMS',
        stage: pitch.stage || 'thinking',
        author: pitch.author || 'Anonymous Student',
        time: timeString,
        content: pitch.content,
        upvotes: 0,
        tags: pitch.tags || [],
        comments: []
      };
      state.questions.unshift(newQuestion);
      state.dashboardTab = 'questions';
      state.newlyCreatedPostId = newQuestion.id;
    }

    state.isPitcherOpen = false;
    state.view = 'dashboard';
    
    const typeLabel = pitch.type === 'idea' ? 'Research proposal' : 'Academic question';
    window.showToast(`${typeLabel} published successfully!`, 'success');
    
    setTimeout(() => {
      state.newlyCreatedPostId = null;
    }, 3000);

    syncStorage();
    render();
  },

  upvoteIdea(id) {
    if (state.upvotedIdeas.includes(id)) {
      // Remove upvote
      state.upvotedIdeas = state.upvotedIdeas.filter(x => x !== id);
      const idea = state.ideas.find(x => x.id === id);
      if (idea) idea.upvotes--;
    } else {
      // Add upvote
      state.upvotedIdeas.push(id);
      const idea = state.ideas.find(x => x.id === id);
      if (idea) idea.upvotes++;
    }
    syncStorage();
    render();
  },

  upvoteQuestion(id) {
    if (state.upvotedQuestions.includes(id)) {
      // Remove upvote
      state.upvotedQuestions = state.upvotedQuestions.filter(x => x !== id);
      const q = state.questions.find(x => x.id === id);
      if (q) q.upvotes--;
    } else {
      // Add upvote
      state.upvotedQuestions.push(id);
      const q = state.questions.find(x => x.id === id);
      if (q) q.upvotes++;
    }
    syncStorage();
    render();
  },

  toggleComments(id) {
    state.openComments = state.openComments === id ? null : id;
    render();
  },

  addIdeaComment(id, content) {
    const idea = state.ideas.find(x => x.id === id);
    if (idea) {
      idea.comments.push({
        author: "Yashraj Gupta (You)",
        time: "Just now",
        content: content
      });
      syncStorage();
      render();
    }
  },

  addQuestionComment(id, content) {
    const q = state.questions.find(x => x.id === id);
    if (q) {
      q.comments.push({
        author: "Yashraj Gupta (You)",
        time: "Just now",
        content: content
      });
      syncStorage();
      render();
    }
  },

  // Peer Mentor matching actions
  updateMentorSearch(query) {
    state.mentorSearchQuery = query;
    syncStorage();
    
    if (state.view === 'mentors') {
      const grid = document.querySelector('.mentors-layout .grid-3');
      if (grid) {
        const selectedSkill = state.selectedSkillFilter || 'all';
        const searchQuery = query.toLowerCase();
        
        const filteredMentors = state.mentors.filter(mentor => {
          const matchesSearch = mentor.name.toLowerCase().includes(searchQuery) ||
                                mentor.bio.toLowerCase().includes(searchQuery) ||
                                mentor.department.toLowerCase().includes(searchQuery);
          const matchesSkill = selectedSkill === 'all' || mentor.skills.includes(selectedSkill);
          return matchesSearch && matchesSkill;
        });
        
        let gridHtml = '';
        if (filteredMentors.length === 0) {
          gridHtml = `
            <div class="glass-card" style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem; color: var(--text-secondary);">
              <i data-lucide="users" style="width: 48px; height: 48px; color: var(--text-muted); margin-bottom: 1rem; margin-left: auto; margin-right: auto;"></i>
              <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--text-primary);">No Peer Tutors Found</h3>
              <p style="margin-bottom: 1.5rem;">Try resetting filters or adjusting search terms.</p>
              <button class="btn btn-primary" id="btn-reset-mentor-filters" style="margin: 0 auto; justify-content: center;">
                <i data-lucide="rotate-ccw"></i> Reset Filters & Search
              </button>
            </div>
          `;
        } else {
          gridHtml = filteredMentors.map(m => {
            let avatarGrad = 'linear-gradient(135deg, var(--primary-red), #F87171)';
            if (m.department === 'LUMS') avatarGrad = 'linear-gradient(135deg, var(--accent-orange), #fcd34d)';
            if (m.department === 'FST') avatarGrad = 'linear-gradient(135deg, var(--accent-blue), #60a5fa)';
            if (m.department === 'FASS') avatarGrad = 'linear-gradient(135deg, var(--accent-green), #34d399)';

            return `
              <div class="glass-card mentor-card">
                <div>
                  <div class="mentor-profile-header">
                    <div class="mentor-avatar" style="background: ${avatarGrad};">
                      ${m.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div class="mentor-meta-info">
                      <h3 class="mentor-name">${m.name}</h3>
                      <span class="mentor-role">${m.role}</span>
                      <span class="mentor-dept">${m.department} faculty specialising</span>
                    </div>
                  </div>
                  
                  <p class="mentor-bio">${m.bio}</p>
                  
                  <div class="mentor-skills">
                    ${m.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
                  </div>
                </div>

                <button class="btn btn-primary btn-book-session" data-id="${m.id}" style="width: 100%; justify-content: center;">
                  <i data-lucide="calendar"></i> Book Free Consultation
                </button>
              </div>
            `;
          }).join('');
        }
        
        grid.innerHTML = gridHtml;
        
        const clearBtn = document.getElementById('btn-clear-mentor-search');
        if (clearBtn) {
          clearBtn.style.display = query ? 'flex' : 'none';
        }
        
        mentors.init(state, actions);
        return;
      }
    }
    
    render();
  },

  setSkillFilter(skill) {
    state.selectedSkillFilter = skill;
    syncStorage();
    render();
  },

  openBookingModal(mentorId) {
    state.bookingMentorId = mentorId;
    state.bookingSelectedDay = 28;
    state.bookingSelectedSlot = '';
    render();
  },

  closeBookingModal() {
    state.bookingMentorId = null;
    render();
  },

  setBookingDay(day) {
    state.bookingSelectedDay = day;
    render();
  },

  setBookingSlot(slot) {
    state.bookingSelectedSlot = slot;
    render();
  },

  confirmBooking(notes) {
    if (!state.bookingSelectedSlot) {
      window.showToast('Please select a time slot to confirm your booking.', 'error');
      return;
    }
    
    const mentor = state.mentors.find(m => m.id === state.bookingMentorId);
    
    // Check if session already exists for this mentor at this day and time to avoid clashing
    const isClashing = state.bookedSessions.some(
      s => s.mentorName === mentor.name && s.day === state.bookingSelectedDay && s.time === state.bookingSelectedSlot
    );
    if (isClashing) {
      window.showToast(`Clash Detected! You already have a booked session with ${mentor.name} on ${state.bookingSelectedDay} at ${state.bookingSelectedSlot}.`, 'error');
      return;
    }

    // Capture dynamic date timestamp
    const dateMatch = state.bookingSelectedDay.match(/(\w+),\s+(\w+)\s+(\d+)/);
    let timestamp = Date.now() + 24 * 60 * 60 * 1000; // default tomorrow
    if (dateMatch) {
      const monthsMap = { Jan:0, Feb:1, Mar:2, Apr:3, May:4, Jun:5, Jul:6, Aug:7, Sep:8, Oct:9, Nov:10, Dec:11 };
      const parsedDate = new Date();
      parsedDate.setMonth(monthsMap[dateMatch[2]]);
      parsedDate.setDate(parseInt(dateMatch[3]));
      timestamp = parsedDate.getTime();
    }

    const session = {
      mentorName: mentor.name,
      day: state.bookingSelectedDay,
      time: state.bookingSelectedSlot,
      timestamp: timestamp,
      notes: notes
    };
    
    state.bookedSessions.push(session);
    state.bookingMentorId = null;
    
    window.showToast(`Success! Peer session with ${mentor.name} scheduled for ${session.day} at ${session.time}.`, 'success');
    
    syncStorage();
    render();
  },

  cancelBooking(index) {
    if (confirm("Are you sure you want to cancel this scheduled consultation session?")) {
      state.bookedSessions.splice(index, 1);
      syncStorage();
      render();
      window.showToast("Consultation session cancelled successfully.", "success");
    }
  },

  clearSearch() {
    state.searchQuery = '';
    syncStorage();
    render();
  },

  // Citations actions
  setCitationType(type) {
    state.citationType = type;
    state.generatedCitation = '';
    render();
  },

  setGeneratedCitation(cit) {
    state.generatedCitation = cit;
    render();
  },

  watchVideo(videoId) {
    state.watchingVideoId = videoId;
    render();
  },

  closeVideo() {
    state.watchingVideoId = null;
    render();
  },

  resetState() {
    if (confirm("Reset application data back to defaults?")) {
      state = defaultState;
      syncStorage();
      render();
    }
  }
};

// Renders left sidebar and page container shell
const renderAppShell = (state) => {
  const currentView = state.view;
  
  let activeContent = '';
  switch (currentView) {
    case 'home':
      activeContent = hero.render(state);
      break;
    case 'dashboard':
      activeContent = dashboard.render(state);
      break;
    case 'mentors':
      activeContent = mentors.render(state);
      break;
    case 'resources':
      activeContent = resources.render(state);
      break;
    case 'pricing':
      activeContent = pricing.render(state);
      break;
    default:
      activeContent = hero.render(state);
  }

  return `
    <div class="app-container">
      <!-- Side Navigation -->
      <aside class="sidebar">
        <div>
          <div class="logo-container">
            <div class="logo-shield">T</div>
            <div class="logo-text">T&Q<span class="logo-sub">Line</span></div>
          </div>
          
          <ul class="nav-links">
            <li class="nav-item">
              <a class="nav-link ${currentView === 'home' ? 'active' : ''}" data-view="home">
                <i data-lucide="home"></i> <span>Home</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link ${currentView === 'dashboard' ? 'active' : ''}" data-view="dashboard">
                <i data-lucide="layout-dashboard"></i> <span>Community Hub</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link ${currentView === 'mentors' ? 'active' : ''}" data-view="mentors">
                <i data-lucide="users"></i> <span>Peer Mentors</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link ${currentView === 'resources' ? 'active' : ''}" data-view="resources">
                <i data-lucide="book-open"></i> <span>Resources Vault</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link ${currentView === 'pricing' ? 'active' : ''}" data-view="pricing">
                <i data-lucide="badge-pound-sign"></i> <span>Plans</span>
              </a>
            </li>
          </ul>
        </div>
        
        <div class="sidebar-footer">
          <div class="user-profile">
            <div class="user-avatar">YG</div>
            <div class="user-info">
              <span class="user-name">Yashraj Gupta</span>
              <span class="user-role">Lancaster Student</span>
            </div>
          </div>
          <button id="btn-reset-data" style="margin-top: 1rem; background: none; border: none; color: var(--text-muted); font-size: 0.7rem; cursor: pointer; display: flex; align-items: center; gap: 0.25rem;">
            <i data-lucide="refresh-cw" style="width: 10px; height: 10px;"></i> Reset Data
          </button>
        </div>
      </aside>

      <!-- Main Panel workspace -->
      <main class="main-content">
        <!-- Render page titles dynamically -->
        <header class="page-header">
          <div class="page-title-group">
            ${currentView === 'home' ? `
              <h1>Welcome back, Yashraj</h1>
              <p>Explore your dissertation community ecosystem.</p>
            ` : ''}
            ${currentView === 'dashboard' ? `
              <h1>Lancs Discussion Hub</h1>
              <p>Pitch thesis concepts, ask academic questions, and refine proposals.</p>
            ` : ''}
            ${currentView === 'mentors' ? `
              <h1>Peer Matching & Advisory</h1>
              <p>Schedule research critique sessions with PhD student peers.</p>
            ` : ''}
            ${currentView === 'resources' ? `
              <h1>Academic Blueprints</h1>
              <p>Checklists, layout skeletons, and referencing builders.</p>
            ` : ''}
            ${currentView === 'pricing' ? `
              <h1>Student Membership Tiers</h1>
              <p>Compare basic student tiers and advanced proofreading plans.</p>
            ` : ''}
          </div>
        </header>

        <!-- Main body content container -->
        <div id="view-port-body">
          ${activeContent}
        </div>
      </main>

      <!-- Overlay Modals -->
      ${state.isPitcherOpen ? pitcher.render(state) : ''}
    </div>
  `;
};

// Global render loop
const render = () => {
  const app = document.getElementById('app');
  if (app) {
    app.innerHTML = renderAppShell(state);
    initEvents();
  }
};

// Global event binder
const initEvents = () => {
  lucide.createIcons();

  // Navigation link events
  const navLinks = document.querySelectorAll('.nav-link[data-view]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const view = link.getAttribute('data-view');
      actions.changeView(view);
    });
  });

  // Reset database trigger
  const resetBtn = document.getElementById('btn-reset-data');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      actions.resetState();
    });
  }

  // Initialize specific page interactions
  const currentView = state.view;
  if (currentView === 'home') hero.init(state, actions);
  else if (currentView === 'dashboard') dashboard.init(state, actions);
  else if (currentView === 'mentors') mentors.init(state, actions);
  else if (currentView === 'resources') resources.init(state, actions);
  else if (currentView === 'pricing') pricing.init(state, actions);

  // Initialize pitcher wizard overlay if active
  if (state.isPitcherOpen) pitcher.init(state, actions);
};

// Fire startup trigger
document.addEventListener('DOMContentLoaded', () => {
  render();
});

// Expose the dynamic, highly aesthetic HSL toast system to window
window.showToast = (message, type = 'success') => {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'error' ? 'toast-error' : ''}`;
  
  const icon = type === 'error' ? 'alert-circle' : 'check-circle';
  toast.innerHTML = `
    <div style="display: flex; align-items: center; gap: 0.75rem;">
      <i data-lucide="${icon}" style="color: ${type === 'error' ? '#ef4444' : 'var(--primary-red)'}; width: 18px; height: 18px; flex-shrink: 0;"></i>
      <span>${message}</span>
    </div>
    <button style="background: none; border: none; color: var(--text-muted); cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 0.25rem; border-radius: 50%; hover: { color: var(--text-primary); }" onclick="this.parentElement.remove()">
      <i data-lucide="x" style="width: 14px; height: 14px;"></i>
    </button>
  `;

  container.appendChild(toast);
  lucide.createIcons({
    attrs: { class: 'lucide' },
    nameAttr: 'data-lucide'
  });

  // Animate in
  setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0) scale(1)';
  }, 10);

  // Auto-dismiss after 4 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px) scale(0.95)';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4000);
};

// Global escape key modal close handler
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (state.isPitcherOpen) actions.closePitcher();
    if (state.bookingMentorId) actions.closeBookingModal();
    if (state.watchingVideoId) actions.closeVideo();
  }
});

// Dynamic iCalendar (.ics) exporter for peer consultations
window.exportToICS = (session) => {
  const today = new Date();
  const sessionDate = new Date(session.timestamp || today.getTime());
  
  const [timeStr, ampm] = session.time.split(' ');
  let [hours, minutes] = timeStr.split(':').map(Number);
  if (ampm === 'PM' && hours < 12) hours += 12;
  if (ampm === 'AM' && hours === 12) hours = 0;
  
  sessionDate.setHours(hours, minutes, 0, 0);
  
  const startDate = sessionDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const endDateObj = new Date(sessionDate.getTime() + 60 * 60 * 1000);
  const endDate = endDateObj.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//TQLine//Peer Consultation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `DTSTART:${startDate}`,
    `DTEND:${endDate}`,
    `SUMMARY:TQLine Peer Consultation with ${session.mentorName}`,
    `DESCRIPTION:Your dilemma notes: ${session.notes || 'None'}\\n\\nVirtual Microsoft Teams meeting link will be sent to your Lancaster student address.`,
    'LOCATION:Microsoft Teams (Student Portal)',
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
  
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `TQLine_Consultation_${session.mentorName.replace(/\s+/g, '_')}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  window.showToast('Calendar invite (.ics) downloaded!', 'success');
};
