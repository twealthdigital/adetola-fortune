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