/* ===========================================================
   TOKENS
=========================================================== */
:root{
  --font-display: 'Space Grotesk', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 24px;

  --header-h: 76px;

  --accent-1: #FFB05C;
  --accent-2: #FF6F3C;
  --accent-grad: linear-gradient(120deg, var(--accent-1), var(--accent-2));
}

[data-theme="dark"]{
  --bg: #582D16;
  --bg-deep: #371A0C;
  --bg-raised: #6B3A20;
  --surface: rgba(255,255,255,0.06);
  --surface-strong: rgba(255,255,255,0.1);
  --border: rgba(255,235,220,0.14);
  --text: #FBF1E7;
  --text-dim: #E2C2A6;
  --text-faint: #C29A78;
  --header-bg: rgba(88,45,22,0.55);
  --mobile-nav-bg: #6b3a20f5;
  --code-bg: #2A150A;
  --shadow: 0 20px 60px rgba(20,8,2,0.45);
}

[data-theme="light"]{
  --bg: #FBF3EA;
  --bg-deep: #F1E3D2;
  --bg-raised: #FFFFFF;
  --surface: rgba(88,45,22,0.05);
  --surface-strong: rgba(88,45,22,0.08);
  --border: rgba(88,45,22,0.14);
  --text: #2B160A;
  --text-dim: #5C3C26;
  --text-faint: #8A6347;
  --header-bg: rgba(251,243,234,0.7);
  --mobile-nav-bg: rgba(251,243,234,0.98);
  --code-bg: #2A150A;
  --shadow: 0 20px 50px rgba(88,45,22,0.12);
}

/* ===========================================================
   RESET / BASE
=========================================================== */
*,*::before,*::after{ box-sizing:border-box; margin:0; padding:0; }

html{ scroll-behavior:smooth; -webkit-tap-highlight-color: transparent; overflow-x:hidden; }


body{
  background:var(--bg);
  color:var(--text);
  font-family:var(--font-body);
  -webkit-font-smoothing:antialiased;
  transition:background .35s ease, color .35s ease;
  overflow-x:hidden;
}

img{ max-width:100%; display:block; }
a{ color:inherit; text-decoration:none; }
button{ font:inherit; background:none; border:none; cursor:pointer; color:inherit; }
ul{ list-style:none; }

::selection{ background:var(--accent-2); color:#fff; }

:focus-visible{ outline:2px solid var(--accent-1); outline-offset:3px; }

/* ===========================================================
   BUTTONS
=========================================================== */
.btn{
  display:inline-flex; align-items:center; justify-content:center; gap:8px;
  padding:11px 20px;
  border-radius:999px;
  font-family:var(--font-body);
  font-weight:600;
  font-size:0.92rem;
  white-space:nowrap;
  transition:transform .25s ease, box-shadow .25s ease, background .25s ease, border-color .25s ease;
}
.btn svg{ flex-shrink:0; }

.btn-primary{
  background:var(--accent-grad);
  color:#2A1304;
}
.btn-primary:hover{ transform:translateY(-2px); }

.btn-outline{
  background:transparent;
  border:1.5px solid var(--border);
  color:var(--text);
}
.btn-outline:hover{ border-color:var(--accent-1); color:var(--accent-1); transform:translateY(-2px); }

.btn-lg{ padding:14px 26px; font-size:0.98rem; }

/* ===========================================================
   HEADER
=========================================================== */
.site-header{
  position:fixed; top:0; left:0; right:0; z-index:100;
  height:var(--header-h);
  display:flex; align-items:center;
  background:transparent;
  border-bottom:1px solid transparent;
  transition:background .35s ease, border-color .35s ease, backdrop-filter .35s ease;
}

.site-header.is-scrolled{
  background:var(--header-bg);
  backdrop-filter:blur(18px) saturate(140%);
  -webkit-backdrop-filter:blur(18px) saturate(140%);
  border-bottom:1px solid var(--border);
  box-shadow:0 10px 30px rgba(0,0,0,0.15);
}

.header-inner{
  width:100%;
  max-width:1320px;
  margin:0 auto;
  padding:0 32px;
  display:flex; align-items:center; justify-content:space-between;
  gap:24px;
}

.brand{ display:flex; align-items:center; gap:9px; }
.brand-mark{
  display:flex; align-items:center; justify-content:center;
  width:34px; height:34px;
  border-radius:10px;
  background:var(--accent-grad);
  color:#2A1304;
}
.brand-name{ font-family:var(--font-display); font-weight:700; font-size:1.12rem; letter-spacing:-0.01em; }
.brand-dot{ color:var(--accent-1); }

.main-nav{ display:flex; align-items:center; gap:34px; }
.nav-link{
  position:relative;
  font-size:0.93rem; font-weight:500;
  color:var(--text-dim);
  padding:6px 0;
  transition:color .2s ease;
}
.nav-link:hover{ color:var(--text); }
.nav-link.is-active{ color:var(--text); }
.nav-link.is-active::after{
  content:''; position:absolute; left:0; right:0; bottom:-4px; height:2px;
  background:var(--accent-grad); border-radius:2px;
}

.header-actions{ display:flex; align-items:center; gap:14px; }

.theme-toggle{
  display:flex; align-items:center; justify-content:center;
  width:38px; height:38px;
  border-radius:50%;
  border:1px solid var(--border);
  color:var(--text-dim);
  transition:color .2s ease, border-color .2s ease, transform .3s ease;
}
.theme-toggle:hover{ color:var(--accent-1); border-color:var(--accent-1); }
.icon-moon{ display:none; }
[data-theme="dark"] .icon-sun{ display:none; }
[data-theme="dark"] .icon-moon{ display:block; }

.header-cta{ display:inline-flex; }

/* Hamburger */
.hamburger{
  display:none;
  flex-direction:column; justify-content:center; align-items:center;
  gap:5px;
  width:38px; height:38px;
  border-radius:10px;
  border:1px solid var(--border);
}
.hamburger span{
  width:18px; height:2px;
  background:var(--text);
  border-radius:2px;
  transition:transform .3s ease, opacity .3s ease, background .3s ease;
}
.hamburger.is-open span:nth-child(1){ transform:translateY(7px) rotate(45deg); }
.hamburger.is-open span:nth-child(2){ opacity:0; }
.hamburger.is-open span:nth-child(3){ transform:translateY(-7px) rotate(-45deg); }

/* Mobile nav panel */
.mobile-nav{
  position:fixed;
  top:var(--header-h); left:0; right:0;
  max-height:0;
  overflow:hidden;
  background:var(--mobile-nav-bg);
  backdrop-filter:blur(40px) saturate(140%);
  -webkit-backdrop-filter:blur(40px) saturate(140%);
  border-bottom:1px solid var(--border);
  display:flex; flex-direction:column;
  transition:max-height .4s ease;
  z-index:99;
}
.mobile-nav.is-open{ max-height:480px; }
.mobile-link{
  padding:16px 32px;
  font-size:1rem; font-weight:500;
  color:var(--text-dim);
  border-bottom:1px solid var(--border);
}
.mobile-link.is-active{ color:var(--accent-1); }
.mobile-cta{ margin:18px 32px 24px; }

/* ===========================================================
   HERO
=========================================================== */
.hero{
  position:relative;
  min-height:100vh;
  display:flex; align-items:center;
  padding:calc(var(--header-h) + 40px) 32px 80px;
  overflow:hidden;
}

.hero-glow{
  position:absolute;
  top:8%; right:-10%;
  width:620px; height:620px;
  border-radius:50%;
  background:radial-gradient(circle at 40% 40%, rgba(255,176,92,0.35), transparent 70%);
  filter:blur(40px);
  pointer-events:none;
}

.hero-grid-dots{
  position:absolute;
  top:14%; right:6%;
  width:140px; height:140px;
  background-image:radial-gradient(var(--text-faint) 1.4px, transparent 1.4px);
  background-size:16px 16px;
  opacity:.35;
  pointer-events:none;
}

.hero-inner{
  position:relative;
  max-width:1320px;
  margin:0 auto;
  width:100%;
  display:grid;
  grid-template-columns:1.05fr 0.95fr;
  gap:48px;
  align-items:center;
}

/* eyebrow */
.eyebrow{
  display:inline-flex; align-items:center; gap:8px;
  padding:7px 14px;
  border-radius:999px;
  background:var(--surface);
  border:1px solid var(--border);
  font-size:0.8rem; font-weight:600;
  letter-spacing:0.04em; text-transform:uppercase;
  color:var(--text-dim);
  margin-bottom:22px;
}
.eyebrow-dot{
  width:7px; height:7px; border-radius:50%;
  background:#7BE38B;
  box-shadow:0 0 0 3px rgba(123,227,139,0.25);
}

.hero-title{
  font-family:var(--font-display);
  font-weight:700;
  font-size:clamp(2.4rem, 4.4vw, 3.6rem);
  line-height:1.08;
  letter-spacing:-0.02em;
  margin-bottom:20px;
}
.hero-title-line{ display:block; }
.accent-text{
  background:var(--accent-grad);
  -webkit-background-clip:text;
  background-clip:text;
  color:transparent;
}

/* rotating role line */
.role-line{
  display:flex; align-items:center; gap:10px;
  font-family:var(--font-mono);
  font-size:clamp(1rem, 1.6vw, 1.25rem);
  font-weight:500;
  color:var(--text-dim);
  margin-bottom:22px;
  min-height:1.6em;
}
.role-prefix{ color:var(--text-faint); flex-shrink:0; }
.role-rotator{
  position:relative;
  display:inline-block;
  min-height:1.5em;
  overflow:hidden;
  white-space:nowrap;
}
.role-word{
  display:inline-block;
  color:var(--accent-1);
  white-space:nowrap;
}
.role-word.is-current{ animation:roleIn .5s cubic-bezier(.34,1.56,.64,1) both; }
.role-word.is-leaving{ animation:roleOut .4s cubic-bezier(.5,0,.75,0) both; }

@keyframes roleIn{
  0%{ transform:translateY(60%) scale(.9); opacity:0; }
  100%{ transform:translateY(0) scale(1); opacity:1; }
}
@keyframes roleOut{
  0%{ transform:translateY(0) scale(1); opacity:1; }
  100%{ transform:translateY(-60%) scale(.9); opacity:0; }
}

.hero-desc{
  max-width:480px;
  font-size:1.02rem;
  line-height:1.65;
  color:var(--text-dim);
  margin-bottom:34px;
}

.hero-cta-row{ display:flex; gap:14px; margin-bottom:46px; flex-wrap:wrap; }

.tech-row{ display:flex; flex-direction:column; gap:14px; }
.tech-label{
  font-size:0.78rem; font-weight:600;
  letter-spacing:0.06em; text-transform:uppercase;
  color:var(--text-faint);
}
.tech-icons{ display:flex; align-items:center; gap:12px; flex-wrap:wrap; }
.tech-icon{
  display:flex; align-items:center; justify-content:center;
  width:42px; height:42px;
  border-radius:11px;
  background:var(--surface);
  border:1px solid var(--border);
  color:var(--text-dim);
  transition:color .25s ease, border-color .25s ease, transform .25s ease;
}
.tech-icon:hover{ color:var(--accent-1); border-color:var(--accent-1); transform:translateY(-3px); }

/* ===========================================================
   HERO VISUAL
=========================================================== */
.hero-visual{
  position:relative;
  display:flex; align-items:center; justify-content:center;
  min-height:480px;
}

.visual-blob{
  position:absolute;
  width:420px; height:420px;
  border-radius:50%;
  background:radial-gradient(circle at 35% 30%, var(--accent-1), var(--accent-2) 65%, transparent 100%);
  opacity:0.9;
  filter:blur(2px);
  top:50%; left:50%;
  transform:translate(-50%,-50%);
}

.portrait-frame{
  position:relative;
  width:340px; aspect-ratio:4/4.7;
  border-radius:28px;
  overflow:hidden;
  box-shadow:var(--shadow);
}
.portrait-img{ width:100%; height:100%; object-fit:cover; }

.code-card{
  position:absolute;
  right:-4%; bottom:8%;
  width:280px;
  background:var(--code-bg);
  border:1px solid rgba(255,255,255,0.08);
  border-radius:var(--radius-md);
  box-shadow:0 24px 50px rgba(0,0,0,0.4);
  overflow:hidden;
}
.code-card-head{
  display:flex; align-items:center; gap:8px;
  padding:10px 14px;
  font-family:var(--font-mono);
  font-size:0.74rem;
  color:#C9A98C;
  border-bottom:1px solid rgba(255,255,255,0.07);
}
.code-dot{
  margin-left:auto;
  width:7px; height:7px; border-radius:50%;
  background:#7BE38B;
}
.code-card-body{
  padding:14px;
  font-family:var(--font-mono);
  font-size:0.72rem;
  line-height:1.65;
  color:#E8D2BC;
  white-space:pre-wrap;
  max-height:240px;
  overflow:hidden;
  opacity:1;
  transition:max-height .35s ease, padding .35s ease, opacity .25s ease;
}
.code-kw{ color:#FF9D6C; }
.code-var{ color:#7CC9FF; }
.code-str{ color:#A8E0A0; }
.code-bool{ color:#FFB05C; }

.code-toggle{
  display:flex; align-items:center; justify-content:center;
  width:18px; height:18px;
  margin-left:6px;
  color:#C9A98C;
}
.code-toggle svg{ transition:transform .3s ease; }

.code-card.is-collapsed .code-card-body{
  max-height:0;
  padding-top:0;
  padding-bottom:0;
  opacity:0;
}
.code-card.is-collapsed .code-toggle svg{ transform:rotate(-90deg); }

.float-pill{
  position:absolute;
  display:flex; align-items:center; gap:7px;
  padding:9px 14px;
  border-radius:999px;
  background:var(--bg-raised);
  border:1px solid var(--border);
  font-size:0.78rem; font-weight:600;
  color:var(--text);
  box-shadow:var(--shadow);
}
.float-pill svg{ color:var(--accent-1); }
.pill-top{ top:4%; left:-2%; animation:floatY 4.5s ease-in-out infinite; }
.pill-bottom{ bottom:-2%; left:14%; animation:floatY 5.5s ease-in-out infinite reverse; }

@keyframes floatY{
  0%,100%{ transform:translateY(0); }
  50%{ transform:translateY(-10px); }
}

.scroll-cue{
  position:absolute;
  bottom:28px; left:32px;
  display:flex; align-items:center; gap:8px;
  font-size:0.78rem; font-weight:600;
  letter-spacing:0.05em; text-transform:uppercase;
  color:var(--text-faint);
}
.scroll-cue svg{ animation:bounceDown 1.8s ease-in-out infinite; }
@keyframes bounceDown{
  0%,100%{ transform:translateY(0); }
  50%{ transform:translateY(5px); }
}





/* ===========================================================
   ABOUT
=========================================================== */
.about-section{
  position:relative;
  padding:120px 32px;
  border-top:1px solid var(--border);
}

.about-inner{
  max-width:1320px;
  margin:0 auto;
  display:grid;
  grid-template-columns:0.85fr 1.15fr;
  gap:64px;
  align-items:center;
}

.about-visual{ display:flex; justify-content:center; }

.about-portrait-frame{
  width:320px;
  background:none;
  transform:scale(2.00);
  transform-origin:center;
  transition:transform .4s ease;
}
.about-portrait-frame:hover{
  transform:scale(1.50) translateY(-4px);
}
.about-portrait-img{
  width:100%; height:auto;
  object-fit:contain;
  background:none;
  transition:transform .5s ease;
}
.about-portrait-frame:hover .about-portrait-img{
  transform:scale(1.04);
}

.about-title{
  font-family:var(--font-display);
  font-weight:700;
  font-size:clamp(1.8rem, 3vw, 2.6rem);
  letter-spacing:-0.02em;
  margin-bottom:18px;
}

.about-desc{
  font-size:1.02rem;
  line-height:1.7;
  color:var(--text-dim);
  max-width:560px;
  margin-bottom:30px;
}

.stats-row{
  display:flex;
  gap:40px;
  margin-top:44px;
  flex-wrap:wrap;
}
.stat-value{
  display:inline-flex;
  align-items:baseline;
}

.stat-item{
  display:flex;
  flex-direction:column;
}

.stat-number{
  font-family:var(--font-display);
  font-weight:700;
  font-size:2.2rem;
  color:var(--accent-1);
  line-height:1;
}
.stat-plus{
  font-family:var(--font-display);
  font-weight:700;
  font-size:2.2rem;
  color:var(--accent-1);
  line-height:1;
}
.stat-label{
  font-size:0.82rem;
  color:var(--text-faint);
  margin-top:8px;
  font-weight:500;
}

@media (max-width:1080px) and (min-width:561px){
  .about-inner{ gap:36px; }
  .about-portrait-frame{ width:220px; transform:scale(1.7); }
  .about-portrait-frame:hover{ transform:scale(1.3) translateY(-4px); }
}

@media (max-width:560px){
  .about-section{ padding:50px 20px; }
  .about-inner{ grid-template-columns:1fr; gap:60px; text-align:center; }
  .about-portrait-frame{ width:220px; transform:scale(1.55); }
  .about-portrait-frame:hover{ transform:scale(1.15) translateY(-4px); }

  .about-content{ text-align:left; }
  .about-title{ text-align:left; }

  .about-desc{
    margin-left:auto;
    margin-right:auto;
    text-align:justify;
    text-align-last:left;
  }

  .about-content > .btn{
    display:flex;
    width:85%;
    margin:0 auto 10px;
  }

.stats-row{ justify-content:center; gap:28px; }
.stat-item{ align-items:flex-start; }
.stat-number, .stat-plus{ font-size:1.7rem; display:inline; }
.stat-label{ display:block; }
}
@media (max-width:380px){
  .stats-row{ justify-content:flex-start; gap:22px 28px; row-gap:24px; }
  .stat-item{ flex:0 1 calc(50% - 14px); }
}



/* placeholders for upcoming sections */
.placeholder-section{
  min-height:60vh;
  display:flex; align-items:center; justify-content:center;
  color:var(--text-faint);
  border-top:1px solid var(--border);
  font-family:var(--font-mono);
  font-size:0.95rem;
}

/* ===========================================================
   RESPONSIVE
=========================================================== */
@media (max-width:1080px){
  .hero{ align-items:flex-start; min-height:auto; padding-bottom:70px; }
  .hero-inner{ grid-template-columns:1.1fr 0.9fr; gap:28px; }
  .hero-visual{ min-height:340px; }
  .portrait-frame{ width:220px; }
  .visual-blob{ width:300px; height:300px; }
  .code-card{ width:200px; top:58%; bottom:auto; }
  .float-pill{ font-size:0.7rem; padding:7px 11px; }
  .hero-desc{ max-width:560px; }
}

@media (max-width:860px){
  .main-nav{ display:none; }
  .header-cta{ display:none; }
  .hamburger{ display:flex; }
  .header-inner{ padding:0 20px; }
}

@media (max-width:560px){
  .hero{ padding:calc(var(--header-h) + 60px) 20px 60px; align-items:center; }
  .hero-inner{ grid-template-columns:1fr; }
  .hero-title{ font-size:2rem; }
  .hero-cta-row{ flex-direction:column; align-items:stretch; }
  .hero-cta-row .btn{ width:100%; }
  .hero-visual{ display:none; }
  .scroll-cue{ display:none; }
  .role-line{ min-width:0; }
  .role-rotator{ min-width:0; width:100%; }
  .role-word{ white-space:normal; word-break:break-word; }
}

/* reduced motion */
@media (prefers-reduced-motion: reduce){
  *{ animation-duration:0.001ms !important; animation-iteration-count:1 !important; transition-duration:0.001ms !important; }
}







/* ===========================================================
   PROJECTS SLIDER
=========================================================== */
.projects-section{ padding:120px 32px; border-top:1px solid var(--border); overflow:hidden; }
.projects-inner{ max-width:1320px; margin:0 auto; }

.projects-head{
  display:flex; align-items:flex-end; justify-content:space-between;
  gap:24px; flex-wrap:wrap; margin-bottom:40px;
}
.projects-title{ font-family:var(--font-display); font-weight:700; font-size:clamp(1.8rem,3vw,2.6rem); letter-spacing:-0.02em; margin-top:8px; }
.slider-nav{ display:flex; gap:6px; }
.slider-arrow{
  width:44px; height:44px; border-radius:50%; border:1px solid var(--border);
  display:flex; align-items:center; justify-content:center; color:var(--text-dim);
  transition:color .2s ease, border-color .2s ease, background .2s ease;
}
.slider-arrow:hover{ color:var(--accent-1); border-color:var(--accent-1); background:var(--surface); }

.projects-slider{ position:relative; height:520px; }

/* card = pure layout wrapper (no border). only left/width/opacity/z/translate live here */
.proj-card{
  position:absolute; top:0; height:100%; display:flex;
  transition:left .6s cubic-bezier(.65,0,.35,1), width .6s cubic-bezier(.65,0,.35,1), opacity .5s ease, transform .6s cubic-bezier(.65,0,.35,1);
  will-change:left, width, opacity, transform;
}
.proj-card.no-transition,
.proj-card.no-transition .proj-media,
.proj-card.no-transition .proj-text{ transition:none !important; }

/* media = the actual bordered box in your sketch. bottom-aligned, height cascades by position */
.proj-media{
  align-self:flex-end;
  border-radius:var(--radius-lg);
  overflow:hidden;
  background:var(--bg-raised);
  border:1px solid var(--border);
  box-shadow:var(--shadow);
  transition:height .6s cubic-bezier(.65,0,.35,1), width .6s cubic-bezier(.65,0,.35,1);
}
.proj-media-scroll{ height:100%; overflow-y:auto; -webkit-overflow-scrolling:touch; scrollbar-width:none; -ms-overflow-style:none; }
.proj-media-scroll::-webkit-scrollbar{ display:none; width:0; height:0; }
.proj-img{ width:100%; height:auto; display:block; }

/* text = only ever visible on the active card, beside the image, top ~40% */
.proj-text{
  align-self:flex-start; height:40%;
  width:0; flex:0 0 0; opacity:0; overflow:hidden; pointer-events:none; padding:0;
  display:flex; flex-direction:column; gap:8px;
  transition:width .5s ease, flex-basis .5s ease, opacity .4s ease, padding .5s ease, height .4s ease;
}
.proj-title{ font-family:var(--font-display); font-weight:700; font-size:1.3rem; letter-spacing:-0.01em; }
.proj-sub{ font-size:.82rem; font-weight:600; letter-spacing:.04em; text-transform:uppercase; color:var(--text-faint); }
.proj-desc{
  font-size:.92rem; line-height:1.55; color:var(--text-dim);
  display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden;
}
.proj-desc.is-expanded{ -webkit-line-clamp:unset; overflow:visible; }
.proj-desc-toggle{
  background:none; border:none; padding:0; margin:-4px 0 0;
  font:inherit; font-size:.82rem; font-weight:600; color:var(--accent-1);
  cursor:pointer; align-self:flex-start;
}
.proj-desc-toggle:hover{ text-decoration:underline; }
.proj-btn{ margin-top:auto; align-self:flex-start; flex-shrink:0; }

/* ---- positions (this is the cascade) ---- */
.proj-card[data-pos="0"]{ left:0%;   width:92%; opacity:1;   z-index:5; transform:translateY(0); }
.proj-card[data-pos="0"] .proj-media{ height:100%; width:52%; }
.proj-card[data-pos="0"] .proj-text{ width:44%; flex:0 0 44%; opacity:1; padding:0 0 0 24px; pointer-events:auto; }

.proj-card[data-pos="1"]{ left:50%;  width:30%; opacity:.65; z-index:4; transform:translateY(0); }
.proj-card[data-pos="1"] .proj-media{ height:48%; width:100%; }

.proj-card[data-pos="2"]{ left:82%;  width:17%; opacity:.35; z-index:3; transform:translateY(0); }
.proj-card[data-pos="2"] .proj-media{ height:28%; width:100%; }

.proj-card[data-pos="3"]{ left:100%;  width:12%; opacity:0;   z-index:2; transform:translateY(0); pointer-events:none; }
.proj-card[data-pos="3"] .proj-media{ height:16%; width:100%; }

.proj-card[data-pos="4"]{ left:104%; width:12%; opacity:0;   z-index:1; transform:translateY(0); pointer-events:none; }
.proj-card[data-pos="4"] .proj-media{ height:16%; width:100%; }

/* exiting when going forward — ascends up + fades ("When going" arrow) */
.proj-card[data-pos="out"]{ left:0%; width:58%; opacity:0; z-index:6; transform:translateY(-70px); pointer-events:none; }
.proj-card[data-pos="out"] .proj-media{ height:100%; width:52%; }

/* entering when going back — drops down into place ("When coming back in" arrow) */
.proj-card[data-pos="in"]{ left:0%; width:58%; opacity:0; z-index:6; transform:translateY(-70px); pointer-events:none; }
.proj-card[data-pos="in"] .proj-media{ height:100%; width:52%; }

/* responsive nav dots */
.slider-dots{ display:flex; justify-content:center; gap:8px; margin-top:28px; }
.slider-dot{ width:8px; height:8px; border-radius:50%; background:var(--border); transition:background .3s ease, transform .3s ease; }
.slider-dot.is-active{ background:var(--accent-grad); transform:scale(1.35); }

@media (max-width:860px){
  .proj-card[data-pos="0"]{ width:74%; }
  .proj-card[data-pos="0"] .proj-media{ width:56%; }
  .proj-card[data-pos="0"] .proj-text{ width:44%; flex:0 0 44%; }
  .proj-card[data-pos="1"]{ width:24%; }
  .proj-card[data-pos="2"], .proj-card[data-pos="3"], .proj-card[data-pos="4"]{ opacity:0; pointer-events:none; }
}

@media (max-width:560px){
  .projects-section{ padding:60px 20px; }
  .proj-card[data-pos="1"], .proj-card[data-pos="2"], .proj-card[data-pos="3"], .proj-card[data-pos="4"]{ opacity:0; pointer-events:none; width:0; }
  .proj-card[data-pos="0"]{ left:0; width:100%; flex-direction:column; }
  .proj-card[data-pos="0"] .proj-media{ width:100%; height:60%; align-self:flex-start; }
  .proj-card[data-pos="0"] .proj-text{ width:100%; flex:0 0 40%; height:40%; padding:16px 0 0; }
}
@media (min-width:861px) and (max-width:1080px){
  .slider-nav{ position:relative; top:0px; left:-500px; }
}

@media (min-width:1081px){
  .slider-nav{ position:relative; top:0px; left:-700px; }
}
