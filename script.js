document.addEventListener('DOMContentLoaded', () => {
    

  /* ---------- THEME TOGGLE ---------- */
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('portfolio-theme');

  if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
  }

  themeToggle.addEventListener('click', () => {
    const current = body.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
  });

  /* ---------- HEADER ON SCROLL (glass) ---------- */
  const header = document.getElementById('siteHeader');
  const toggleHeaderBg = () => {
    if (window.scrollY > 12) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };
  toggleHeaderBg();
  window.addEventListener('scroll', toggleHeaderBg, { passive: true });

  /* ---------- HAMBURGER / MOBILE NAV ---------- */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  const closeMobileNav = () => {
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('is-open');
  };

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('is-open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    mobileNav.classList.toggle('is-open', isOpen);
  });

  mobileNav.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  /* ---------- ACTIVE NAV LINK SYNC (desktop + mobile) ---------- */
  const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('is-active'));
      document
        .querySelectorAll(`a[href="${link.getAttribute('href')}"]`)
        .forEach(match => match.classList.add('is-active'));
    });
  });

/* ---------- ROTATING ROLE TEXT (bounce out / bounce in) ---------- */
  const roles = [
    'an AI Full Stack Engineer',
    'a Website Developer',
    'a Mobile App Developer',
    'a Website Designer',
    'a UI/UX Designer'
  ];

  const rotator = document.getElementById('roleRotator');
  let roleIndex = 0;
  let roleTimer = null;
  let isSwapping = false;

  const swapRole = () => {
    if (isSwapping) return; // don't let overlapping ticks stack words

    // safety: if a previous swap ever left stray words behind, clear them
    const staleWords = rotator.querySelectorAll('.role-word');
    if (staleWords.length > 1) {
      staleWords.forEach((w, i) => { if (i < staleWords.length - 1) w.remove(); });
    }

    const currentWord = rotator.querySelector('.role-word');
    if (!currentWord) return;

    isSwapping = true;
    roleIndex = (roleIndex + 1) % roles.length;

    currentWord.classList.remove('is-current');
    currentWord.classList.add('is-leaving');

    const fallback = setTimeout(finishSwap, 500); // in case animationend never fires

    function finishSwap() {
      clearTimeout(fallback);
      currentWord.remove();
      const nextWord = document.createElement('span');
      nextWord.className = 'role-word is-current';
      nextWord.textContent = roles[roleIndex];
      rotator.appendChild(nextWord);
      isSwapping = false;
    }

    currentWord.addEventListener('animationend', finishSwap, { once: true });
  };

  const startRoleRotation = () => {
    if (roleTimer) return;
    roleTimer = setInterval(swapRole, 2400);
  };
  const stopRoleRotation = () => {
    clearInterval(roleTimer);
    roleTimer = null;
  };

  startRoleRotation();

  // pause while tab/screen is hidden so ticks don't pile up and burst on return
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopRoleRotation();
    } else {
      startRoleRotation();
    }
  });

  /* ---------- DOWNLOAD CV PLACEHOLDER ---------- */
  const downloadCV = document.getElementById('downloadCV');
  downloadCV.addEventListener('click', (e) => {
    if (downloadCV.getAttribute('href') === '#') {
      e.preventDefault();
      // Replace this with: <a id="downloadCV" href="path/to/cv.pdf" download>
      console.info('Add your CV file path to the #downloadCV href in index.html');
    }
  });

});

/* ---------- COLLAPSIBLE CODE CARD ---------- */
  const codeCard = document.getElementById('codeCard');
  const codeToggle = document.getElementById('codeToggle');

  if (codeCard && codeToggle) {
    codeToggle.addEventListener('click', () => {
      const isCollapsed = codeCard.classList.toggle('is-collapsed');
      codeToggle.setAttribute('aria-expanded', String(!isCollapsed));
    });
  }


  /* ---------- ABOUT STATS COUNTER ---------- */
  const statNumbers = document.querySelectorAll('.stat-number');

  if (statNumbers.length) {
    const animateCount = (el) => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      const duration = 1200;
      const startTime = performance.now();

      const step = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        el.textContent = Math.floor(eased * target);
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target;
        }
      };
      requestAnimationFrame(step);
    };

    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    statNumbers.forEach(el => statObserver.observe(el));
  }






 /* ---------- PROJECTS SLIDER (infinite, 10-node recycling) ---------- */
const projects = [
  { title: "YTREAK GLOBAL TECHNOLOGY", sub: "Technology Company • Website Design, Development & UIUX Services ", desc: "Designed and developed a modern corporate website for YTGT, featuring responsive design, engaging animations, service showcases, and a conversion-focused user experience to strengthen the company's online presence.", img: "ytreakproject.webp", link: "http://ytreakglobaltechnology.vercel.app/" },
  { title: "MM BEAUTY", sub: "Ecommerce Company • Beauty, Baby & Skin Care Products", desc: "Designed and developed a clean, conversion-focused online store for Margaret's Market, featuring beauty product collections, category browsing, customer reviews, promotional sections, and a seamless shopping experience optimized for desktop and mobile devices.", img: "mmbeautyproject.webp", link: "https://mmbeautyshop.com/" },
  { title: "NULLCIPHER SECURITY", sub: "Cyber Company • CyberSecurity, Ethical Hacking & Pen-Testing Website", desc: "Designed and developed a modern cybersecurity website for NullCipher Security, showcasing penetration testing, red teaming, vCISO services, threat intelligence, and a professional, conversion-focused user experience.", img: "nullciphersecurity.webp", link: "https://nullciphersecurity.com/" },
  { title: "NEXA INFRA & TECHNOLOGIES", sub: "Energy & Infrastructure Company • Electrical, Civil Engineering & Energy Solutions Website", desc: "Designed and developed a corporate website for NEXA INFRA & TECHNOLOGIES, showcasing electrical works, building and civil engineering, and energy solutions", img: "nexaproject.webp", link: "https://nexa-infra.com/" },
  { title: "JAAM POWER WASHING", sub: "Home Services Company • Commercial & HOA Exterior Cleaning Website", desc: "Designed and developed a commercial website for JAAM Power Washing, showcasing exterior hard surface cleaning services for commercial properties and HOA communities in Corona, Eastvale, and Riverside.", img: "jaampowerwashingproject.webp", link: "https://jaampowerwashing.com/" },
  { title: "BUSINESS SOLUTIONS ACADEMY", sub: "Coaching Business • Course Creation Membership & Sales Website", desc: "Designed and developed a website for Business Solutions Academy's Course Creation Mastermind, a coaching program that helps coaches and consultants package their expertise into a structured, sellable online course.", img: "businesssolutionsacademyproject.webp", link: "https://businesssolutionsacademy.com/" },
  // just keep adding objects here — 6, 20, 100, doesn't matter, only 5 DOM cards ever exist
];

(() => {
  const slider = document.getElementById('projectsSlider');
  if (!slider) return;

  const cards = Array.from(slider.querySelectorAll('.proj-card'));
  const SLOTS = cards.length; // 5
  const DURATION = 600; // must match CSS transition time
  let dataIndex = 0;
  let animating = false;

  // Dots
  const dotsEl = document.getElementById('sliderDots');
  const MAX_DOTS = 10; // cap so 100+ projects don't flood the dot row

  const buildDots = () => {
    dotsEl.innerHTML = '';
    const count = Math.min(projects.length, MAX_DOTS);
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('span');
      dot.className = 'slider-dot';
      dotsEl.appendChild(dot);
    }
  };

  const updateDots = () => {
    const dots = dotsEl.querySelectorAll('.slider-dot');
    if (!dots.length) return;
    const active = dataIndex % dots.length;
    dots.forEach((d, i) => d.classList.toggle('is-active', i === active));
  };

  const fill = (card, project) => {
    const img = card.querySelector('.proj-img');
    img.src = project.img;
    img.alt = project.title;
    card.querySelector('.proj-title').textContent = project.title;
    card.querySelector('.proj-sub').textContent = project.sub;

    const descEl = card.querySelector('.proj-desc');
    descEl.textContent = project.desc;
    descEl.classList.remove('is-expanded');

    const textEl = card.querySelector('.proj-text');
    if (textEl) {
      textEl.style.height = '';
      textEl.style.overflow = '';
    }
    slider.style.paddingBottom = '';

    const toggleEl = card.querySelector('.proj-desc-toggle');
    if (toggleEl) {
      toggleEl.textContent = 'See more';
      // hide the toggle if the description is short enough to already fit fully
      requestAnimationFrame(() => {
        const overflowing = descEl.scrollHeight > descEl.clientHeight + 1;
        toggleEl.style.display = overflowing ? '' : 'none';
      });
    }

    card.querySelector('.proj-btn').href = project.link;
    card.querySelector('.proj-media-scroll').scrollTop = 0;
  };

  slider.addEventListener('click', (e) => {
    const toggleEl = e.target.closest('.proj-desc-toggle');
    if (!toggleEl) return;
    const descEl = toggleEl.previousElementSibling;
    if (!descEl || !descEl.classList.contains('proj-desc')) return;
    const textEl = toggleEl.closest('.proj-text');

    const isExpanded = descEl.classList.toggle('is-expanded');
    toggleEl.textContent = isExpanded ? 'See less' : 'See more';

    if (!textEl) return;

    if (isExpanded) {
      const currentHeight = textEl.clientHeight;
      const naturalHeight = textEl.scrollHeight;
      const extra = Math.max(0, naturalHeight - currentHeight);
      textEl.style.height = naturalHeight + 'px';
      textEl.style.overflow = 'visible';
      slider.style.paddingBottom = extra + 'px';
    } else {
      textEl.style.height = '';
      textEl.style.overflow = '';
      slider.style.paddingBottom = '';
    }
  });

  const setup = () => {
    cards.forEach((card, i) => {
      card.dataset.pos = i;
      fill(card, projects[(dataIndex + i) % projects.length]);
    });
    buildDots();
    updateDots();
  };

  const next = () => {
    if (animating || projects.length < 2) return;
    animating = true;

    cards.forEach(card => {
      const p = card.dataset.pos;
      card.dataset.pos = (p === '0') ? 'out' : String(Number(p) - 1);
    });
    const exiting = cards.find(c => c.dataset.pos === 'out');

    setTimeout(() => {
      dataIndex = (dataIndex + 1) % projects.length;
      exiting.classList.add('no-transition');
      exiting.dataset.pos = SLOTS - 1;
      fill(exiting, projects[(dataIndex + SLOTS - 1) % projects.length]);
      void exiting.offsetWidth;
      exiting.classList.remove('no-transition');
      animating = false;
      updateDots();
    }, DURATION);
  };

  const prev = () => {
    if (animating || projects.length < 2) return;
    animating = true;

    cards.forEach(card => {
      const p = card.dataset.pos;
      card.dataset.pos = (p === String(SLOTS - 1)) ? 'in' : String(Number(p) + 1);
    });
    const entering = cards.find(c => c.dataset.pos === 'in');

    entering.classList.add('no-transition');
    dataIndex = (dataIndex - 1 + projects.length) % projects.length;
    fill(entering, projects[dataIndex]);
    void entering.offsetWidth;
    entering.classList.remove('no-transition');

    requestAnimationFrame(() => {
      entering.dataset.pos = 0; // now transitions: drops down into the active spot
      setTimeout(() => { animating = false; updateDots(); }, DURATION);
    });
  };

  const nextBtn = document.getElementById('sliderNext');
  const prevBtn = document.getElementById('sliderPrev');

  nextBtn.addEventListener('click', () => { next(); });
  prevBtn.addEventListener('click', () => { prev(); });

  let touchStartX = 0;
  let touchStartY = 0;

  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  slider.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) next(); else prev();
  }, { passive: true });

  

  setup();
})();
/* ---------- SKILLS TABS ---------- */
(() => {
  const skillsData = {
    frontend: {
      label: 'Frontend Development',
      desc: 'I build fast, responsive interfaces that feel great on every screen.',
      video: 'frontendvideo.mp4',
      img: 'skills/frontend.webp',
      list: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React.js', 'Redux Toolkit', 'Responsive Design', 'CSS Animations', 'Progressive Web Apps', 'Figma to Code']
    },
    prompting: {
      label: 'AI Prompt Engineering',
      desc: 'I know how to talk to AI, and which tool to reach for depending on the job.',
      video: 'aipromptingvideo.mp4',
      img: 'skills/prompting.webp',
      list: ['Claude Code', 'DeepSeek', 'Claude AI', 'ChatGPT', 'Codex', 'Grok', 'Gemini', 'Replit', 'Lovable', 'Base44', 'Cursor', 'Perplexity', 'n8n', 'Midjourney']
    },
    mobile: {
      label: 'Mobile App Development',
      desc: 'I turn ideas into smooth, cross-platform mobile experiences.',
      video: 'mobileappvideo.mp4',
      img: 'skills/mobile.webp',
      list: ['React Native', 'Expo', 'Redux Toolkit', 'Mobile UI/UX', 'App State Management', 'Push Notifications', 'Native APIs']
    },
    ai: {
      label: 'AI & Automation',
      desc: 'I connect AI models into products that solve real problems.',
      video: 'aiautomationvideo.mp4',
      img: 'skills/ai.webp',
      list: ['AI Integration', 'Prompt Engineering', 'Automation Workflows', 'Chatbot Development', 'Multimodal Input', 'LLM-Powered Apps', 'AI Automations & Workflows', 'AI-Driven Content Generation', 'AI-Powered Analytics & Insights']
    },
    design: {
      label: 'Design & Tools',
      desc: 'I design clean, intentional interfaces before I ever write code.',
      video: 'designvideo.mp4',
      img: 'skills/design.webp',
      list: ['WebFlow', 'WordPress / Elementor', 'Graphics Design', 'Design Systems', 'UI/UX Design', 'Wireframing', 'Prototyping', 'Wix']
    }
  };

/* ---------- SKILLS TABS: arrow scroll + advance ---------- */
(() => {
  const wrap = document.getElementById('skillsTabsWrap');
  const track = document.getElementById('skillsTabs');
  const prevBtn = document.getElementById('skillsTabPrev');
  const nextBtn = document.getElementById('skillsTabNext');
  if (!wrap || !track) return;

  const tabs = Array.from(track.querySelectorAll('.skill-tab'));

  const goTo = (dir) => {
    const activeIndex = tabs.findIndex(t => t.classList.contains('is-active'));
    const nextIndex = dir === 1
      ? Math.min(activeIndex + 1, tabs.length - 1)
      : Math.max(activeIndex - 1, 0);
    if (nextIndex === activeIndex) return;
    tabs[nextIndex].click();
    tabs[nextIndex].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  nextBtn.addEventListener('click', () => goTo(1));
  prevBtn.addEventListener('click', () => goTo(-1));

  const toggleArrows = () => {
    prevBtn.style.display = track.scrollLeft <= 4 ? 'none' : 'flex';
    nextBtn.style.display = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4 ? 'none' : 'flex';
  };
  track.addEventListener('scroll', toggleArrows);
  window.addEventListener('resize', toggleArrows);
  toggleArrows();
})();

  const tabs = document.querySelectorAll('.skill-tab');
  const title = document.getElementById('skillsContentTitle');
  const desc = document.getElementById('skillsDesc');
  const list = document.getElementById('skillsList');
  const video = document.getElementById('skillsVideo');
  const img = document.getElementById('skillsImg'); // stays null unless the <img> tag is uncommented
  const media = document.querySelector('.skills-media');
  const content = document.querySelector('.skills-content');

  if (!tabs.length) return;

  let switching = false;

  const applySkill = (key) => {
    const data = skillsData[key];
    if (!data) return;

    title.textContent = data.label;
    desc.textContent = data.desc;

    list.innerHTML = '';
    data.list.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      list.appendChild(li);
    });

    if (video) {
      const source = video.querySelector('source');
      source.src = data.video;
      video.load();
      video.play().catch(() => {});
    }

    if (img) {
      img.src = data.img;
      img.alt = data.label;
    }
  };

  const renderSkill = (key, animate = true) => {
    if (!animate) { applySkill(key); return; }
    if (switching) return;
    switching = true;

    media.classList.add('skills-fade-out');
    content.classList.add('skills-fade-out');

    setTimeout(() => {
      applySkill(key);

      media.classList.remove('skills-fade-out');
      content.classList.remove('skills-fade-out');
      media.classList.add('skills-fade-in');
      content.classList.add('skills-fade-in');

      setTimeout(() => {
        media.classList.remove('skills-fade-in');
        content.classList.remove('skills-fade-in');
        switching = false;
      }, 350);
    }, 250);
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      if (tab.classList.contains('is-active')) return;
      tabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      renderSkill(tab.dataset.skill);
    });
  });

  renderSkill(tabs[0].dataset.skill, false);
})();

/* ---------- PROJECT SCROLL CUE (always sticks to active card) ---------- */
(() => {
  const slider = document.getElementById('projectsSlider');
  if (!slider) return;

  const cue = document.createElement('button');
  cue.type = 'button';
  cue.className = 'proj-scroll-cue';
  cue.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 5v14M6 13l6 6 6-6"/>
    </svg>
    Scroll
  `;

  const attachToActive = () => {
    const activeMedia = slider.querySelector('.proj-card[data-pos="0"] .proj-media');
    if (activeMedia && cue.parentElement !== activeMedia) {
      activeMedia.appendChild(cue);
    }
  };

  cue.addEventListener('click', () => {
    const scrollBox = cue.parentElement?.querySelector('.proj-media-scroll');
    if (scrollBox) scrollBox.scrollBy({ top: 200, behavior: 'smooth' });
  });

  slider.addEventListener('scroll', (e) => {
    const scrollBox = e.target.closest('.proj-media-scroll');
    if (!scrollBox) return;
    scrollBox.classList.toggle('is-scrolled', scrollBox.scrollTop > 12);
  }, true);

  const observer = new MutationObserver(attachToActive);
  slider.querySelectorAll('.proj-card').forEach(card => {
    observer.observe(card, { attributes: true, attributeFilter: ['data-pos'] });
  });

  attachToActive();
})();
/* ---------- FOOTER: DYNAMIC YEAR ---------- */
(() => {
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

/* ---------- CTA FORM SUBMIT ---------- */
/* Plug your form backend in here later — e.g. Formspree, EmailJS, or your own API endpoint. */
(() => {
  const form = document.getElementById('ctaForm');
  const note = document.getElementById('formNote');
  if (!form || !note) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      note.textContent = 'Please fill in your name, email and message.';
      note.className = 'form-note is-error';
      return;
    }

    const submitBtn = form.querySelector('.form-submit');
    const originalBtnHTML = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      const data = await res.json();

      if (data.success) {
        note.textContent = `Thanks ${name.split(' ')[0]}! Your message has been sent.`;
        note.className = 'form-note is-success';
        form.reset();
      } else {
        note.textContent = 'Something went wrong. Please try again or email me directly.';
        note.className = 'form-note is-error';
      }
    } catch (err) {
      note.textContent = 'Network error. Please email me directly.';
      note.className = 'form-note is-error';
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHTML;
    }
  });
})();


/* ---------- COMING SOON MODAL ---------- */
(() => {
  const modal = document.getElementById('comingSoonModal');
  const closeBtn = document.getElementById('modalClose');
  const triggers = document.querySelectorAll('[data-coming-soon]');
  if (!modal || !triggers.length) return;

  const openModal = () => {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
  };
  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  };

  triggers.forEach((card) => {
    card.style.cursor = 'pointer';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.addEventListener('click', openModal);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(); }
    });
  });

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
})();
