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
  generatedCitation: ''
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
    // Re-render only feed to keep input focus, or standard render
    render();
    // Keep focus at the end of the search input
    const searchInput = document.getElementById('dashboard-search');
    if (searchInput) {
      searchInput.focus();
      searchInput.setSelectionRange(query.length, query.length);
    }
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
    }

    state.isPitcherOpen = false;
    state.view = 'dashboard';
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
    render();
    
    // Keep focus
    const mentorSearch = document.getElementById('mentor-search');
    if (mentorSearch) {
      mentorSearch.focus();
      mentorSearch.setSelectionRange(query.length, query.length);
    }
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
      alert('Please select a time slot to confirm your booking.');
      return;
    }
    
    const mentor = state.mentors.find(m => m.id === state.bookingMentorId);
    
    // Check if session already exists for this mentor at this day and time to avoid clashing
    const isClashing = state.bookedSessions.some(
      s => s.mentorName === mentor.name && s.day === state.bookingSelectedDay && s.time === state.bookingSelectedSlot
    );
    if (isClashing) {
      alert(`Clash Detected!\nYou already have a booked peer session with ${mentor.name} on Thursday, May ${state.bookingSelectedDay} at ${state.bookingSelectedSlot}.\nPlease choose a different day or time slot.`);
      return;
    }

    const session = {
      mentorName: mentor.name,
      day: state.bookingSelectedDay,
      time: state.bookingSelectedSlot,
      notes: notes
    };
    
    state.bookedSessions.push(session);
    state.bookingMentorId = null;
    
    alert(`Success!\nYour peer review session with ${mentor.name} is confirmed for Thursday, May ${session.day} at ${session.time}.\nAn email invite with Teams meeting link has been sent to your Lancaster University address.`);
    
    syncStorage();
    render();
  },

  cancelBooking(index) {
    if (confirm("Are you sure you want to cancel this scheduled consultation session?")) {
      state.bookedSessions.splice(index, 1);
      syncStorage();
      render();
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
