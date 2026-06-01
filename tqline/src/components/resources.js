/* Resources component - downloads, library links, and APA citation generator */

export default {
  render(state) {
    const generatedCitation = state.generatedCitation || '';
    const citType = state.citationType || 'book'; // 'book', 'journal', 'web'

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
                <div style="font-family: var(--font-serif); font-size: 0.85rem; color: var(--text-primary); line-height: 1.5; padding-right: 2rem;" id="citation-result-text">
                  ${generatedCitation}
                </div>
                <button class="btn btn-secondary" id="btn-copy-citation" style="position: absolute; top: 0.75rem; right: 0.75rem; padding: 0.25rem; border-radius: 6px;" title="Copy to Clipboard">
                  <i data-lucide="copy" style="width: 14px; height: 14px;"></i>
                </button>
              </div>
            ` : ''}
          </div>
        </div>
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
        alert(`Downloading ${file}...\nMock document exported successfully under Lancaster University branding.`);
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
          citation = `${author} (${year}). ${title}. <em>${journal}</em>, <em>${volume}</em>, ${pages}.`;
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
        // Simple mock copy alert as fallback/real clipboard
        if (textElement) {
          const cleanText = textElement.textContent.replace(/\s+/g, ' ').trim();
          navigator.clipboard.writeText(cleanText).then(() => {
            alert('Reference copied to clipboard!');
          }).catch(() => {
            alert(`Reference: \n${cleanText}`);
          });
        }
      });
    }
  }
};
