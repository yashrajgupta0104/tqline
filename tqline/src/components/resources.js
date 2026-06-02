/* Resources component - downloads, library links, APA citation generator, and Lancs Video Vault */

const videos = [
  {
    id: 'lums-roadmap',
    title: 'LUMS Dissertation Roadmap: Proposal to Distinction',
    desc: 'A comprehensive guide to structuring a LUMS dissertation, writing literature reviews, and avoiding structural pitfalls.',
    duration: '18:42',
    faculty: 'LUMS',
    speaker: 'Dr. Rebecca Hall',
    role: 'PhD Research Advisor',
    initials: 'RH',
    youtubeId: 'K-G_71-l_kQ', // Swappable unlisted YouTube video ID
    badgeClass: 'badge-lums',
    avatarGradient: 'linear-gradient(135deg, var(--accent-orange), var(--primary-red))'
  },
  {
    id: 'ethics-review',
    title: 'Lancaster Ethics Review: High-Risk Sample Approval Guide',
    desc: 'Critical pitfalls that lead to delayed ethics reviews in FASS and LUMS. Learn how to draft participant consent forms.',
    duration: '14:15',
    faculty: 'FASS / LUMS',
    speaker: 'Michael Chang',
    role: 'PhD Candidate & Tutor',
    initials: 'MC',
    youtubeId: '5e971L05Wjg', // Swappable unlisted YouTube video ID
    badgeClass: 'badge-fass',
    avatarGradient: 'linear-gradient(135deg, var(--accent-blue), var(--accent-green))'
  },
  {
    id: 'methodology-coding',
    title: 'Mastering NVivo Thematic Coding & SPSS Statistics',
    desc: 'Practical walkthrough on importing semi-structured interviews into NVivo, parent theme coding, and SPSS regression analysis.',
    duration: '22:30',
    faculty: 'FST / LUMS',
    speaker: 'David Vance',
    role: 'Postgraduate Peer Mentor',
    initials: 'DV',
    youtubeId: 'c52wV53ZtT4', // Swappable unlisted YouTube video ID
    badgeClass: 'badge-fst',
    avatarGradient: 'linear-gradient(135deg, var(--accent-blue), var(--primary-red))'
  }
];

export default {
  render(state) {
    const generatedCitation = state.generatedCitation || '';
    const citType = state.citationType || 'book'; // 'book', 'journal', 'web'
    const watchingVideoId = state.watchingVideoId || null;
    const watchingVideo = videos.find(v => v.id === watchingVideoId);

    return `
      <div class="mentors-layout">
        <!-- Header -->
        <div style="border-bottom: 1px solid var(--dark-border); padding-bottom: 1.5rem;">
          <h2 style="font-size: 1.75rem; font-weight: 700; margin-bottom: 0.5rem; background: linear-gradient(to right, #ffffff, var(--accent-grey)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
            Lancs Academic Blueprint Vault
          </h2>
          <p style="color: var(--text-secondary); font-size: 0.95rem;">
            Curated blueprints, checklists, and academic tools configured for Lancaster University's stringent assessment standards.
          </p>
        </div>

        <div class="grid-2">
          <!-- Left side: Blueprints & checklists downloads -->
          <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <h3 style="font-size: 1.2rem; font-weight: 700; display: flex; align-items: center; gap: 0.5rem; color: var(--text-primary);">
              <i data-lucide="folder-down" style="color: var(--primary-red); width: 20px; height: 20px;"></i> Checklists & Templates
            </h3>

            <div class="resource-grid" style="display: flex; flex-direction: column; gap: 1rem;">
              
              <!-- Card 1 -->
              <div class="glass-card resource-card" style="padding: 1.25rem;">
                <div style="display: flex; gap: 1rem; align-items: flex-start;">
                  <div class="resource-icon-box red" style="margin-bottom: 0; width: 40px; height: 40px;">
                    <i data-lucide="shield-alert" style="width: 18px; height: 18px;"></i>
                  </div>
                  <div style="flex: 1;">
                    <h4 class="resource-title" style="font-size: 1rem; margin-bottom: 0.25rem;">Lancaster Ethics Review Blueprint</h4>
                    <p class="resource-desc" style="font-size: 0.8rem; margin-bottom: 0.75rem; line-height: 1.4;">
                      Pre-submission guide for LUMS, FST, and FASS ethics committees. Avoid common setbacks on sample approvals.
                    </p>
                    <button class="btn btn-secondary btn-download-mock" data-file="Lancs_Ethics_Review_Blueprint.pdf" style="padding: 0.35rem 0.75rem; font-size: 0.75rem;">
                      <i data-lucide="download"></i> Download PDF
                    </button>
                  </div>
                </div>
              </div>

              <!-- Card 2 -->
              <div class="glass-card resource-card" style="padding: 1.25rem;">
                <div style="display: flex; gap: 1rem; align-items: flex-start;">
                  <div class="resource-icon-box orange" style="margin-bottom: 0; width: 40px; height: 40px;">
                    <i data-lucide="layout" style="width: 18px; height: 18px;"></i>
                  </div>
                  <div style="flex: 1;">
                    <h4 class="resource-title" style="font-size: 1rem; margin-bottom: 0.25rem;">Dissertation Structural Skeleton</h4>
                    <p class="resource-desc" style="font-size: 0.8rem; margin-bottom: 0.75rem; line-height: 1.4;">
                      A Microsoft Word structural skeleton mapping Introduction, Lit Review, Methodology, Analysis, and Discussion formats.
                    </p>
                    <button class="btn btn-secondary btn-download-mock" data-file="Lancs_Dissertation_Skeleton.docx" style="padding: 0.35rem 0.75rem; font-size: 0.75rem;">
                      <i data-lucide="download"></i> Download Word Doc
                    </button>
                  </div>
                </div>
              </div>

              <!-- Card 3 -->
              <div class="glass-card resource-card" style="padding: 1.25rem;">
                <div style="display: flex; gap: 1rem; align-items: flex-start;">
                  <div class="resource-icon-box blue" style="margin-bottom: 0; width: 40px; height: 40px;">
                    <i data-lucide="bar-chart-3" style="width: 18px; height: 18px;"></i>
                  </div>
                  <div style="flex: 1;">
                    <h4 class="resource-title" style="font-size: 1rem; margin-bottom: 0.25rem;">SPSS / NVivo Analysis Checklist</h4>
                    <p class="resource-desc" style="font-size: 0.8rem; margin-bottom: 0.75rem; line-height: 1.4;">
                      Simple checklists on data cleaning, running regression tests, and coding thematic interview datasets.
                    </p>
                    <button class="btn btn-secondary btn-download-mock" data-file="Lancs_SPSS_NVivo_Blueprint.pdf" style="padding: 0.35rem 0.75rem; font-size: 0.75rem;">
                      <i data-lucide="download"></i> Download PDF
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- Right side: APA-7 Citation generator -->
          <div class="glass-card" style="display: flex; flex-direction: column; gap: 1.25rem;">
            <h3 style="font-size: 1.2rem; font-weight: 700; display: flex; align-items: center; gap: 0.5rem; color: var(--text-primary);">
              <i data-lucide="bookmark" style="color: var(--primary-red); width: 20px; height: 20px;"></i> APA 7th Referencing Tool
            </h3>
            
            <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 0.5rem;">
              Quickly draft a citation compiled in perfect APA 7th format. Perfect for academic reference indices!
            </p>

            <div style="display: flex; gap: 0.5rem; background: var(--dark-bg); padding: 0.25rem; border-radius: 8px;">
              <button class="btn ${citType === 'book' ? 'btn-primary' : 'btn-secondary'}" id="cit-tab-book" style="flex: 1; padding: 0.35rem; font-size: 0.75rem; justify-content: center; border-radius: 6px;">
                Book
              </button>
              <button class="btn ${citType === 'journal' ? 'btn-primary' : 'btn-secondary'}" id="cit-tab-journal" style="flex: 1; padding: 0.35rem; font-size: 0.75rem; justify-content: center; border-radius: 6px;">
                Journal
              </button>
              <button class="btn ${citType === 'web' ? 'btn-primary' : 'btn-secondary'}" id="cit-tab-web" style="flex: 1; padding: 0.35rem; font-size: 0.75rem; justify-content: center; border-radius: 6px;">
                Website
              </button>
            </div>

            <form id="citation-form" onsubmit="event.preventDefault();" style="display: flex; flex-direction: column; gap: 1rem;">
              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label" style="font-size: 0.75rem;">Author(s) <span style="color: var(--text-muted);">E.g., Smith, J. D., & Taylor, R.</span></label>
                <input type="text" class="form-input" id="cit-author" style="padding: 0.5rem 0.75rem; font-size: 0.85rem;" placeholder="Surname, Initials" required>
              </div>

              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label" style="font-size: 0.75rem;">Year of Publication</label>
                <input type="number" class="form-input" id="cit-year" style="padding: 0.5rem 0.75rem; font-size: 0.85rem;" placeholder="E.g., 2026" min="1500" max="2030" required>
              </div>

              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label" style="font-size: 0.75rem;">Title of ${citType.charAt(0).toUpperCase() + citType.slice(1)}</label>
                <input type="text" class="form-input" id="cit-title" style="padding: 0.5rem 0.75rem; font-size: 0.85rem;" placeholder="Title of the work" required>
              </div>

              ${citType === 'book' ? `
                <div class="form-group" style="margin-bottom: 0;">
                  <label class="form-label" style="font-size: 0.75rem;">Publisher</label>
                  <input type="text" class="form-input" id="cit-extra" style="padding: 0.5rem 0.75rem; font-size: 0.85rem;" placeholder="E.g., Routledge" required>
                </div>
              ` : ''}

              ${citType === 'journal' ? `
                <div class="form-group" style="margin-bottom: 0; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 0.5rem;">
                  <div>
                    <label class="form-label" style="font-size: 0.75rem;">Journal Title</label>
                    <input type="text" class="form-input" id="cit-journal" style="padding: 0.5rem 0.75rem; font-size: 0.85rem;" placeholder="E.g., Lancet" required>
                  </div>
                  <div>
                    <label class="form-label" style="font-size: 0.75rem;">Volume(Issue)</label>
                    <input type="text" class="form-input" id="cit-volume" style="padding: 0.5rem 0.75rem; font-size: 0.85rem;" placeholder="14(2)" required>
                  </div>
                  <div>
                    <label class="form-label" style="font-size: 0.75rem;">Pages</label>
                    <input type="text" class="form-input" id="cit-pages" style="padding: 0.5rem 0.75rem; font-size: 0.85rem;" placeholder="45-56" required>
                  </div>
                </div>
                <div class="form-group" style="margin-bottom: 0; margin-top: 0.5rem;">
                  <label class="form-label" style="font-size: 0.75rem;">DOI or URL (Optional)</label>
                  <input type="text" class="form-input" id="cit-doi" style="padding: 0.5rem 0.75rem; font-size: 0.85rem;" placeholder="https://doi.org/10.1016/...">
                </div>
              ` : ''}

              ${citType === 'web' ? `
                <div class="form-group" style="margin-bottom: 0;">
                  <label class="form-label" style="font-size: 0.75rem;">Website / Publisher Name</label>
                  <input type="text" class="form-input" id="cit-webname" style="padding: 0.5rem 0.75rem; font-size: 0.85rem;" placeholder="E.g., BBC News" required>
                </div>
                <div class="form-group" style="margin-bottom: 0;">
                  <label class="form-label" style="font-size: 0.75rem;">URL</label>
                  <input type="url" class="form-input" id="cit-extra" style="padding: 0.5rem 0.75rem; font-size: 0.85rem;" placeholder="https://example.com" required>
                </div>
              ` : ''}

              <button type="submit" class="btn btn-primary" style="padding: 0.5rem; justify-content: center; font-size: 0.85rem; margin-top: 0.5rem;">
                <i data-lucide="play"></i> Format Reference
              </button>
            </form>

            <!-- Results Output Box -->
            ${generatedCitation ? `
              <div style="background: rgba(0,0,0,0.2); border: 1px solid var(--dark-border); border-radius: 10px; padding: 1rem; position: relative;">
                <h4 style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.5rem;">Formatted Citation:</h4>
                <div style="font-family: var(--font-serif); font-size: 0.85rem; color: var(--text-primary); line-height: 1.5; padding-right: 2rem;" id="citation-result-text">${generatedCitation}</div>
                <div style="margin-top: 0.75rem; padding-top: 0.5rem; border-top: 1px solid rgba(255,255,255,0.05); font-size: 0.7rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.25rem;">
                  <i data-lucide="info" style="width: 12px; height: 12px; flex-shrink: 0; color: var(--accent-orange);"></i>
                  <span>Draft only - always verify against official Lancaster guidelines.</span>
                </div>
                <button class="btn btn-secondary" id="btn-copy-citation" style="position: absolute; top: 0.75rem; right: 0.75rem; padding: 0.25rem; border-radius: 6px;" title="Copy to Clipboard">
                  <i data-lucide="copy" style="width: 14px; height: 14px;"></i>
                </button>
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Divider -->
        <div style="margin: 2.5rem 0; border-top: 1px solid var(--dark-border);"></div>

        <!-- Premium Video Vault Section -->
        <div>
          <div style="margin-bottom: 1.5rem;">
            <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 0.5rem; background: linear-gradient(to right, #ffffff, var(--accent-grey)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; display: flex; align-items: center; gap: 0.5rem;">
              <i data-lucide="video" style="color: var(--primary-red); width: 22px; height: 22px;"></i> Lancs Dissertation Masterclasses
            </h3>
            <p style="color: var(--text-secondary); font-size: 0.95rem;">
              Exclusive, bite-sized unlisted guide videos covering dissertation methodology, academic styling, and ethics approvals.
            </p>
          </div>

          <div class="grid-3" style="margin-top: 1.5rem;">
            ${videos.map(video => `
              <div class="glass-card resource-card video-card" style="padding: 0; overflow: hidden; display: flex; flex-direction: column; height: 100%;">
                <!-- Thumbnail Container -->
                <div class="video-thumbnail-container" style="position: relative; width: 100%; aspect-ratio: 16/9; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid var(--dark-border); cursor: pointer;" data-video-id="${video.id}">
                  <!-- Play button overlay -->
                  <div class="video-play-btn" style="width: 50px; height: 50px; border-radius: 50%; background: var(--primary-red); display: flex; align-items: center; justify-content: center; color: white; box-shadow: 0 0 20px var(--primary-red-glow); position: relative; z-index: 5;">
                    <i data-lucide="play" style="width: 20px; height: 20px; fill: white; margin-left: 2px;"></i>
                  </div>
                  <!-- Duration Badge -->
                  <div style="position: absolute; bottom: 0.75rem; right: 0.75rem; background: rgba(0, 0, 0, 0.75); backdrop-filter: blur(4px); padding: 0.25rem 0.5rem; border-radius: 6px; font-size: 0.7rem; font-weight: 600; color: white; display: flex; align-items: center; gap: 0.25rem; z-index: 5;">
                    <i data-lucide="clock" style="width: 10px; height: 10px;"></i> ${video.duration}
                  </div>
                  <!-- Faculty Badge -->
                  <div style="position: absolute; top: 0.75rem; left: 0.75rem; z-index: 5;">
                    <span class="badge ${video.badgeClass}">${video.faculty}</span>
                  </div>
                </div>
                
                <!-- Info Container -->
                <div style="padding: 1.25rem; display: flex; flex-direction: column; flex: 1; justify-content: space-between; gap: 1rem;">
                  <div>
                    <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: 0.5rem; line-height: 1.4; color: var(--text-primary);" class="video-title-hover" data-video-id="${video.id}">
                      ${video.title}
                    </h4>
                    <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 0;">
                      ${video.desc}
                    </p>
                  </div>
                  
                  <!-- Speaker & Action -->
                  <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--dark-border); padding-top: 0.75rem; margin-top: auto;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                      <div style="width: 28px; height: 28px; border-radius: 50%; background: ${video.avatarGradient}; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700; color: white;">
                        ${video.initials}
                      </div>
                      <div style="display: flex; flex-direction: column;">
                        <span style="font-size: 0.75rem; font-weight: 600; color: var(--text-primary);">${video.speaker}</span>
                        <span style="font-size: 0.65rem; color: var(--text-muted);">${video.role}</span>
                      </div>
                    </div>
                    <button class="btn btn-secondary watch-video-btn" data-video-id="${video.id}" style="padding: 0.35rem 0.75rem; font-size: 0.75rem;">
                      <i data-lucide="eye" style="width: 12px; height: 12px;"></i> Watch
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Video Player Modal Overlay -->
        ${watchingVideo ? `
          <div class="modal-overlay" id="video-player-modal" style="z-index: 2000;">
            <div class="modal-content" style="max-width: 800px; padding: 1.5rem;">
              <button class="modal-close" id="close-video-btn" style="top: 1.5rem; right: 1.5rem; z-index: 10;">
                <i data-lucide="x"></i>
              </button>
              
              <!-- Video Title -->
              <h3 style="font-size: 1.3rem; font-weight: 700; margin-bottom: 1rem; padding-right: 2.5rem; color: var(--text-primary); line-height: 1.4;">
                ${watchingVideo.title}
              </h3>
              
              <!-- Responsive Video Container -->
              <div style="position: relative; width: 100%; padding-top: 56.25%; background: #000; border-radius: 12px; overflow: hidden; border: 1px solid var(--dark-border);">
                <iframe 
                  src="https://www.youtube.com/embed/${watchingVideo.youtubeId}?autoplay=1&rel=0" 
                  frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen 
                  style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;">
                </iframe>
              </div>
              
              <!-- Video Details & Associated Resources -->
              <div style="margin-top: 1.25rem; display: flex; gap: 1.5rem; align-items: flex-start; justify-content: space-between; border-top: 1px solid var(--dark-border); padding-top: 1rem; flex-wrap: wrap;">
                <div style="flex: 1; min-width: 250px;">
                  <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                    <div style="width: 32px; height: 32px; border-radius: 50%; background: ${watchingVideo.avatarGradient}; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700; color: white;">
                      ${watchingVideo.initials}
                    </div>
                    <div>
                      <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-primary); display: block;">${watchingVideo.speaker}</span>
                      <span style="font-size: 0.7rem; color: var(--text-muted); display: block;">${watchingVideo.role}</span>
                    </div>
                  </div>
                  <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4; margin: 0;">
                    ${watchingVideo.desc}
                  </p>
                </div>
                
                <div style="width: 250px; background: rgba(0,0,0,0.2); border: 1px solid var(--dark-border); border-radius: 10px; padding: 0.75rem; display: flex; flex-direction: column; gap: 0.5rem;">
                  <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-primary); text-transform: uppercase; letter-spacing: 0.5px; display: block;">
                    Associated Blueprints
                  </span>
                  <div style="display: flex; flex-direction: column; gap: 0.25rem;">
                    ${watchingVideo.id === 'lums-roadmap' ? `
                      <button class="btn btn-secondary btn-download-mock" data-file="Lancs_Ethics_Review_Blueprint.pdf" style="padding: 0.35rem 0.5rem; font-size: 0.7rem; width: 100%; justify-content: flex-start;">
                        <i data-lucide="file-text" style="width: 12px; height: 12px; color: var(--primary-red);"></i> Ethics Blueprint PDF
                      </button>
                      <button class="btn btn-secondary btn-download-mock" data-file="Lancs_Dissertation_Skeleton.docx" style="padding: 0.35rem 0.5rem; font-size: 0.7rem; width: 100%; justify-content: flex-start;">
                        <i data-lucide="file-text" style="width: 12px; height: 12px; color: var(--accent-orange);"></i> Structural Skeleton Word
                      </button>
                    ` : ''}
                    ${watchingVideo.id === 'ethics-review' ? `
                      <button class="btn btn-secondary btn-download-mock" data-file="Lancs_Ethics_Review_Blueprint.pdf" style="padding: 0.35rem 0.5rem; font-size: 0.7rem; width: 100%; justify-content: flex-start;">
                        <i data-lucide="file-text" style="width: 12px; height: 12px; color: var(--primary-red);"></i> Ethics Review PDF
                      </button>
                    ` : ''}
                    ${watchingVideo.id === 'methodology-coding' ? `
                      <button class="btn btn-secondary btn-download-mock" data-file="Lancs_SPSS_NVivo_Blueprint.pdf" style="padding: 0.35rem 0.5rem; font-size: 0.7rem; width: 100%; justify-content: flex-start;">
                        <i data-lucide="file-text" style="width: 12px; height: 12px; color: var(--accent-blue);"></i> SPSS/NVivo Checklist PDF
                      </button>
                    ` : ''}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  },

  init(state, actions) {
    lucide.createIcons();

    // Bind mock download buttons
    const downloadBtns = document.querySelectorAll('.btn-download-mock');
    downloadBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const file = btn.getAttribute('data-file');
        window.showToast(`Downloading ${file}... Reference blueprint guide downloaded successfully.`, 'success');
      });
    });

    // Bind Citation tabs
    const tabBook = document.getElementById('cit-tab-book');
    const tabJournal = document.getElementById('cit-tab-journal');
    const tabWeb = document.getElementById('cit-tab-web');

    if (tabBook) tabBook.addEventListener('click', () => actions.setCitationType('book'));
    if (tabJournal) tabJournal.addEventListener('click', () => actions.setCitationType('journal'));
    if (tabWeb) tabWeb.addEventListener('click', () => actions.setCitationType('web'));

    // Form submit generator
    const form = document.getElementById('citation-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const author = document.getElementById('cit-author').value.trim();
        const year = document.getElementById('cit-year').value.trim();
        const title = document.getElementById('cit-title').value.trim();
        const citType = state.citationType || 'book';
        
        let citation = '';
        
        if (citType === 'book') {
          const publisher = document.getElementById('cit-extra').value.trim();
          citation = `${author} (${year}). <em>${title}</em>. ${publisher}.`;
        } else if (citType === 'journal') {
          const journal = document.getElementById('cit-journal').value.trim();
          const volume = document.getElementById('cit-volume').value.trim();
          const pages = document.getElementById('cit-pages').value.trim();
          const doi = document.getElementById('cit-doi').value.trim();
          
          const volMatch = volume.match(/^([^(]+)(?:\(([^)]+)\))?$/);
          let formattedVol = '';
          if (volMatch) {
            const volNum = volMatch[1].trim();
            const issueNum = volMatch[2] ? volMatch[2].trim() : '';
            formattedVol = `<em>${volNum}</em>` + (issueNum ? `(${issueNum})` : '');
          } else {
            formattedVol = `<em>${volume}</em>`;
          }
          
          citation = `${author} (${year}). ${title}. <em>${journal}</em>, ${formattedVol}, ${pages}.` + (doi ? ` ${doi}` : '');
        } else if (citType === 'web') {
          const webname = document.getElementById('cit-webname').value.trim();
          const url = document.getElementById('cit-extra').value.trim();
          citation = `${author} (${year}). ${title}. <em>${webname}</em>. ${url}`;
        }
        
        actions.setGeneratedCitation(citation);
      });
    }

    // Copy to clipboard
    const copyBtn = document.getElementById('btn-copy-citation');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const textElement = document.getElementById('citation-result-text');
        if (textElement) {
          const cleanText = textElement.textContent.replace(/\s+/g, ' ').trim();
          navigator.clipboard.writeText(cleanText).then(() => {
            window.showToast('Reference copied to clipboard!', 'success');
          }).catch(() => {
            window.showToast(`Reference compiled: ${cleanText}`, 'success');
          });
        }
      });
    }

    // Bind Watch Video button events (both thumbnails & titles & watch CTA buttons)
    const watchBtns = document.querySelectorAll('.watch-video-btn, .video-thumbnail-container, .video-title-hover');
    watchBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Prevent click events from triggering twice if children elements are clicked
        e.stopPropagation();
        const videoId = btn.getAttribute('data-video-id');
        if (videoId) {
          actions.watchVideo(videoId);
        }
      });
    });

    // Bind Close Video button events
    const closeVideoBtn = document.getElementById('close-video-btn');
    if (closeVideoBtn) {
      closeVideoBtn.addEventListener('click', () => {
        actions.closeVideo();
      });
    }

    // Close video modal on overlay click
    const videoModal = document.getElementById('video-player-modal');
    if (videoModal) {
      videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
          actions.closeVideo();
        }
      });
    }
  }
};
