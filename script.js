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
    'an AI‑Powered Full Stack Engineer',
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






 /* ---------- PROJECTS SLIDER (infinite, 5-node recycling) ---------- */
const projects = [
  { title: "YTGT Corporate Website", sub: "Technology Company • Website Design, Development & UIUX Services ", desc: "Designed and developed a modern corporate website for YTGT, featuring responsive design, engaging animations, service showcases, and a conversion-focused user experience to strengthen the company's online presence.", img: "ytreakproject.webp", link: "http://ytreakglobaltechnology.vercel.app/" },
  { title: "MM Beauty Ecommerce Website", sub: "Ecommerce Company • Beauty, Baby & Skin Care Products", desc: "Designed and developed a clean, conversion-focused online store for Margaret's Market, featuring beauty product collections, category browsing, customer reviews, promotional sections, and a seamless shopping experience optimized for desktop and mobile devices.", img: "mmbeautyproject.webp", link: "https://mmbeautyshop.com/" },
  { title: "Project Three", sub: "Cyber Company • CyberSecurity, Ethical Hacking & Pen-Testing Website", desc: "Designed and developed a modern cybersecurity website for Valiant Cyber Solutions, showcasing penetration testing, red teaming, vCISO services, threat intelligence, and a professional, conversion-focused user experience.", img: "valiantcyberproject.webp", link: "https://valiantcyber.io/" },
  { title: "Project Four", sub: "AI Product", desc: "Short description of project four goes here.", img: "projects/project4.jpg", link: "#" },
  { title: "Project Five", sub: "Landing Page", desc: "Short description of project five goes here.", img: "projects/project5.jpg", link: "#" }
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
