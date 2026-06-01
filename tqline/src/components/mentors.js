/* Mentor Matching component - search postgraduate advisors and book sessions */

export default {
  render(state) {
    const selectedSkill = state.selectedSkillFilter || 'all';
    const searchQuery = (state.mentorSearchQuery || '').toLowerCase();
    
    // Filter mentors
    const filteredMentors = state.mentors.filter(mentor => {
      const matchesSearch = mentor.name.toLowerCase().includes(searchQuery) ||
                            mentor.bio.toLowerCase().includes(searchQuery) ||
                            mentor.department.toLowerCase().includes(searchQuery);
      const matchesSkill = selectedSkill === 'all' || mentor.skills.includes(selectedSkill);
      return matchesSearch && matchesSkill;
    });

    // Unique list of all skills across all mentors for filters
    const allSkills = Array.from(
      new Set(state.mentors.reduce((acc, m) => acc.concat(m.skills), []))
    );

    return `
      <div class="mentors-layout">
        <!-- Introduction Header -->
        <div style="border-bottom: 1px solid var(--dark-border); padding-bottom: 1.5rem;">
          <h2 style="font-size: 1.75rem; font-weight: 700; margin-bottom: 0.5rem; background: linear-gradient(to right, #ffffff, var(--accent-grey)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
            Lancs Peer Advisors & Tutors
          </h2>
          <p style="color: var(--text-secondary); font-size: 0.95rem;">
            Struggling with a thesis roadblock? Book a direct virtual peer review session with Lancaster PhD and senior postgraduate researchers who specialize in your academic methodology.
          </p>
        </div>

        <!-- Booked Sessions Panel -->
        ${state.bookedSessions && state.bookedSessions.length > 0 ? `
          <div class="glass-card" style="padding: 1.5rem; margin-top: 1.5rem; position: relative; overflow: hidden; border-left: 3px solid var(--accent-blue);">
            <div style="position: absolute; top: -50px; right: -50px; width: 150px; height: 150px; background: rgba(59, 130, 246, 0.08); border-radius: 50%; filter: blur(40px);"></div>
            
            <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; color: var(--text-primary);">
              <i data-lucide="calendar-check" style="color: var(--accent-blue); width: 20px; height: 20px;"></i> Your Scheduled Consultations
            </h3>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem;">
              ${state.bookedSessions.map((session, index) => `
                <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--dark-border); border-radius: 12px; padding: 1rem; display: flex; flex-direction: column; justify-content: space-between; position: relative;">
                  <div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.25rem;">
                      <span style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary);">${session.mentorName}</span>
                      <span class="badge badge-proposal" style="font-size: 0.65rem; background: rgba(59, 130, 246, 0.1); color: var(--accent-blue); border-color: rgba(59, 130, 246, 0.2);">Confirmed</span>
                    </div>
                    
                    <div style="display: flex; flex-direction: column; gap: 0.25rem; font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 0.75rem;">
                      <div style="display: flex; align-items: center; gap: 0.4rem;">
                        <i data-lucide="clock" style="width: 12px; height: 12px; color: var(--accent-blue);"></i>
                        <span>Thursday, May ${session.day} at ${session.time}</span>
                      </div>
                    </div>
                    
                    ${session.notes ? `
                      <div style="background: rgba(0, 0, 0, 0.1); border-left: 2px solid var(--accent-blue); padding: 0.5rem; border-radius: 0 6px 6px 0; margin-bottom: 1rem;">
                        <span style="display: block; font-size: 0.65rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; margin-bottom: 0.15rem;">Your Dilemma:</span>
                        <p style="font-size: 0.75rem; color: var(--text-secondary); line-height: 1.3; margin: 0;">"${session.notes}"</p>
                      </div>
                    ` : ''}
                  </div>
                  
                  <button class="btn btn-secondary btn-cancel-booking" data-index="${index}" style="width: 100%; justify-content: center; padding: 0.4rem; font-size: 0.75rem; border-color: rgba(181, 18, 27, 0.2); color: var(--text-secondary); transition: all 0.2s;">
                    <i data-lucide="trash-2" style="width: 12px; height: 12px;"></i> Cancel Consultation
                  </button>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Toolbar and Search -->
        <div class="feed-header" style="flex-wrap: wrap;">
          <div class="search-bar" style="max-width: 400px; width: 100%; position: relative;">
            <i data-lucide="search"></i>
            <input type="text" class="search-input" id="mentor-search" placeholder="Search by name, department, expertise..." value="${state.mentorSearchQuery || ''}" style="padding-right: 2.5rem;">
            ${state.mentorSearchQuery ? `
              <button id="btn-clear-mentor-search" style="position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--text-muted); cursor: pointer; display: flex; align-items: center; padding: 0;" title="Clear search">
                <i data-lucide="x" style="width: 16px; height: 16px;"></i>
              </button>
            ` : ''}
          </div>

          <div class="mentors-filters">
            <button class="btn ${selectedSkill === 'all' ? 'btn-primary' : 'btn-secondary'}" data-skill="all" style="padding: 0.5rem 1rem; font-size: 0.85rem;">
              All Expertises
            </button>
            ${allSkills.map(skill => `
              <button class="btn ${selectedSkill === skill ? 'btn-primary' : 'btn-secondary'}" data-skill="${skill}" style="padding: 0.5rem 1rem; font-size: 0.85rem;">
                ${skill}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Mentors Card Grid -->
        <div class="grid-3" style="margin-top: 1rem;">
          ${filteredMentors.length === 0 
            ? `
              <div class="glass-card" style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem; color: var(--text-secondary);">
                <i data-lucide="users" style="width: 48px; height: 48px; color: var(--text-muted); margin-bottom: 1rem; margin-left: auto; margin-right: auto;"></i>
                <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--text-primary);">No Peer Tutors Found</h3>
                <p style="margin-bottom: 1.5rem;">Try resetting filters or adjusting search terms.</p>
                <button class="btn btn-primary" id="btn-reset-mentor-filters" style="margin: 0 auto; justify-content: center;">
                  <i data-lucide="rotate-ccw"></i> Reset Filters & Search
                </button>
              </div>
            `
            : filteredMentors.map(m => {
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
                          <span class="mentor-dept">${m.department} faculty</span>
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
              }).join('')
          }
        </div>

        <!-- Booking Modal overlay inside component -->
        ${state.bookingMentorId ? this.renderBookingModal(state) : ''}
      </div>
    `;
  },

  renderBookingModal(state) {
    const mentor = state.mentors.find(m => m.id === state.bookingMentorId);
    if (!mentor) return '';

    const selectedDay = state.bookingSelectedDay || 28; // default to 28th
    const selectedSlot = state.bookingSelectedSlot || '';

    // Mock calendar dates
    const days = [
      { num: 25, label: 'Mon', disabled: true },
      { num: 26, label: 'Tue', disabled: true },
      { num: 27, label: 'Wed', disabled: false },
      { num: 28, label: 'Thu', disabled: false },
      { num: 29, label: 'Fri', disabled: false },
      { num: 30, label: 'Sat', disabled: true },
      { num: 31, label: 'Sun', disabled: true }
    ];

    const timeSlots = ['10:00 AM', '11:30 AM', '2:00 PM', '4:30 PM'];

    return `
      <div class="modal-overlay" id="booking-modal">
        <div class="modal-content" style="max-width: 500px;">
          <button class="modal-close" id="close-booking-btn">
            <i data-lucide="x"></i>
          </button>
          
          <h2 style="font-size: 1.4rem; font-weight: 700; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem; color: var(--text-primary);">
            <i data-lucide="calendar-days" style="color: var(--primary-red); width: 22px; height: 22px;"></i> Book Session
          </h2>
          <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 1.5rem;">
            Booking with <strong>${mentor.name}</strong> (${mentor.role})
          </p>

          <div class="calendar-widget">
            <div class="calendar-header">May 2026</div>
            <div class="calendar-grid">
              ${days.map(d => `<div class="calendar-day-label">${d.label}</div>`).join('')}
              ${days.map(d => `
                <button class="calendar-cell ${d.disabled ? 'disabled' : ''} ${d.num === selectedDay ? 'selected' : ''}" 
                        data-day="${d.num}" ${d.disabled ? 'disabled' : ''}>
                  ${d.num}
                </button>
              `).join('')}
            </div>
            
            <div class="calendar-header">Available Time Slots</div>
            <div class="time-slots">
              ${timeSlots.map(slot => `
                <button class="time-slot-btn ${selectedSlot === slot ? 'selected' : ''}" data-slot="${slot}">
                  ${slot}
                </button>
              `).join('')}
            </div>
          </div>

          <div style="margin-top: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
            <label class="form-label" style="font-size: 0.8rem;">Write your dissertation question / dilemma</label>
            <textarea class="form-textarea" id="booking-notes" style="min-height: 80px;" placeholder="E.g., I want help reviewing my sample questionnaire for LUMS ethics check..."></textarea>
          </div>

          <div style="display: flex; gap: 1rem; margin-top: 1.5rem; border-top: 1px solid var(--dark-border); padding-top: 1.25rem;">
            <button class="btn btn-secondary" id="cancel-booking-btn" style="flex: 1; justify-content: center;">
              Cancel
            </button>
            <button class="btn btn-primary" id="confirm-booking-btn" style="flex: 1.5; justify-content: center;">
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    `;
  },

  init(state, actions) {
    lucide.createIcons();

    // Bind searches
    const searchInput = document.getElementById('mentor-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        actions.updateMentorSearch(e.target.value);
      });
    }

    const clearSearchBtn = document.getElementById('btn-clear-mentor-search');
    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        actions.updateMentorSearch('');
      });
    }

    // Bind skill filter buttons
    const skillBtns = document.querySelectorAll('.mentors-filters button[data-skill]');
    skillBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const skill = btn.getAttribute('data-skill');
        actions.setSkillFilter(skill);
      });
    });

    // Bind booking button on cards
    const bookBtns = document.querySelectorAll('.btn-book-session');
    bookBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        actions.openBookingModal(id);
      });
    });

    // Bind cancellation buttons
    const cancelBtns = document.querySelectorAll('.btn-cancel-booking');
    cancelBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-index'));
        actions.cancelBooking(index);
      });
    });

    // Bind reset filters button
    const resetFiltersBtn = document.getElementById('btn-reset-mentor-filters');
    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener('click', () => {
        actions.setSkillFilter('all');
        actions.updateMentorSearch('');
      });
    }

    // Modal Specific Initializers
    if (state.bookingMentorId) {
      const modal = document.getElementById('booking-modal');
      const closeBtn = document.getElementById('close-booking-btn');
      const cancelBtn = document.getElementById('cancel-booking-btn');
      const confirmBtn = document.getElementById('confirm-booking-btn');

      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            actions.closeBookingModal();
          }
        });
      }

      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          actions.closeBookingModal();
        });
      }
      if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
          actions.closeBookingModal();
        });
      }

      // Bind Day selects
      const dayCells = document.querySelectorAll('.calendar-cell:not(.disabled)');
      dayCells.forEach(cell => {
        cell.addEventListener('click', () => {
          const day = parseInt(cell.getAttribute('data-day'));
          actions.setBookingDay(day);
        });
      });

      // Bind Slot selects
      const slotBtns = document.querySelectorAll('.time-slot-btn');
      slotBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const slot = btn.getAttribute('data-slot');
          actions.setBookingSlot(slot);
        });
      });

      // Confirm click
      if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
          const notesText = document.getElementById('booking-notes').value.trim();
          actions.confirmBooking(notesText);
        });
      }
    }
  }
};
