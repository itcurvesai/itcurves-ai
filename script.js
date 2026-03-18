/**
 * Nissan GT-R — Premium Landing Page
 * script.js — Vanilla JS, zero dependencies
 */

'use strict';

/* ══════════════════════════════════════════════
   1. CUSTOM CURSOR
══════════════════════════════════════════════ */
(function initCursor() {
  const ring = document.getElementById('cursor');
  const dot  = document.getElementById('cursorDot');
  if (!ring || !dot) return;

  // Only on non-touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let mx = -100, my = -100; // off-screen start
  let rx = -100, ry = -100; // ring lags behind

  dot.style.left = '-100px';
  dot.style.top  = '-100px';

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  // Smooth ring follow
  (function loop() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(loop);
  })();

  // Grow on interactive elements
  const interactables = 'a, button, input, select, [tabindex]';
  document.querySelectorAll(interactables).forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('grow'));
    el.addEventListener('mouseleave', () => ring.classList.remove('grow'));
  });
})();

/* ══════════════════════════════════════════════
   2. STICKY NAV
══════════════════════════════════════════════ */
(function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  function tick() {
    nav.classList.toggle('solid', window.scrollY > 50);
  }
  window.addEventListener('scroll', tick, { passive: true });
  tick();
})();

/* ══════════════════════════════════════════════
   3. MOBILE HAMBURGER
══════════════════════════════════════════════ */
(function initHamburger() {
  const btn  = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  const nav  = document.getElementById('nav');
  if (!btn || !menu) return;

  function set(open) {
    btn.classList.toggle('open', open);
    menu.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  btn.addEventListener('click', () => set(!btn.classList.contains('open')));
  menu.querySelectorAll('.nav-item').forEach(link => link.addEventListener('click', () => set(false)));
  document.addEventListener('click', e => { if (!nav.contains(e.target)) set(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') set(false); });
})();

/* ══════════════════════════════════════════════
   4. SMOOTH SCROLL
══════════════════════════════════════════════ */
(function initScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = (document.getElementById('nav')?.offsetHeight ?? 70) + 8;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    });
  });
})();

/* ══════════════════════════════════════════════
   5. HERO REVEAL — panel slides in from left,
      then content items stagger-fade inside it
══════════════════════════════════════════════ */
(function initHeroReveal() {
  const panel = document.getElementById('heroPanel');
  const items = document.querySelectorAll('[data-reveal]');

  // Step 1 — slide the panel in from the left (short delay)
  if (panel) {
    setTimeout(() => panel.classList.add('slide-in'), 120);
  }

  // Step 2 — stagger-reveal the text items after the panel arrives
  if (items.length) {
    // Panel transition is 0.85s; start revealing content at ~0.55s into it
    setTimeout(() => {
      items.forEach((el, i) => {
        setTimeout(() => el.classList.add('revealed'), i * 190);
      });
    }, 550);
  }
})();

/* ══════════════════════════════════════════════
   6. PARALLAX HERO VIDEO (full-screen video bg)
══════════════════════════════════════════════ */
(function initParallax() {
  const video = document.querySelector('.hero-vid');
  const hero  = document.querySelector('.hero');
  if (!video || !hero) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    requestAnimationFrame(() => {
      const sy = window.scrollY;
      if (sy <= hero.offsetHeight) {
        video.style.transform = `translateY(${sy * 0.28}px)`;
      }
      ticking = false;
    });
    ticking = true;
  }, { passive: true });
})();

/* ══════════════════════════════════════════════
   6b. VIDEO PLAY / PAUSE ON SCROLL VISIBILITY
       Plays seamlessly when hero is in view,
       pauses when scrolled away, resumes on return
══════════════════════════════════════════════ */
(function initVideoVisibility() {
  const video = document.querySelector('.hero-vid');
  if (!video) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        video.play().catch(() => {}); // resume seamless loop
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.1 });

  io.observe(video);
})();

/* ══════════════════════════════════════════════
   7. INTERSECTION OBSERVER — fade-up on scroll
══════════════════════════════════════════════ */
(function initFadeUp() {
  // Elements to animate in
  const selectors = [
    '.stat-item',
    '.spec-row',
    '.feat-card',
    '.reserve-copy',
    '.form-panel',
    '.footer-brand',
    '.footer-nav',
    '.footer-contact',
    '.footer-social',
  ];

  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => el.classList.add('fade-up'));
  });

  // Section headers
  document.querySelectorAll('.section-head, .specs-header').forEach(el => el.classList.add('fade-up'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');

      // Animate spec bars when row appears
      const fill = entry.target.querySelector('.spec-bar-fill');
      if (fill) {
        entry.target.classList.add('visible'); // trigger CSS var(--w)
      }

      io.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -70px 0px', threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => io.observe(el));
})();

/* ══════════════════════════════════════════════
   8. STAGGER DELAYS
══════════════════════════════════════════════ */
(function initStagger() {
  document.querySelectorAll('.stat-item').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.07}s`;
  });
  document.querySelectorAll('.feat-card').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.1}s`;
  });
  document.querySelectorAll('.spec-row').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.08}s`;
  });
})();

/* ══════════════════════════════════════════════
   9. ANIMATED COUNTERS (stats band)
══════════════════════════════════════════════ */
(function initCounters() {
  const items = document.querySelectorAll('.stat-item[data-count]');
  if (!items.length) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animateCount(el) {
    const target  = parseFloat(el.dataset.count);
    const suffix  = el.dataset.suffix  || '';
    const decimal = parseInt(el.dataset.decimal || '0', 10);
    const numEl   = el.querySelector('.stat-num');
    if (!numEl) return;

    if (reduced) {
      numEl.textContent = target.toFixed(decimal) + suffix;
      return;
    }

    const duration = 1600;
    const start    = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      const value  = target * eased;
      numEl.textContent = value.toFixed(decimal) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate up from 0 each time section enters view
        animateCount(entry.target);
      } else {
        // Reset to 0 so next scroll-in re-triggers cleanly
        const numEl   = entry.target.querySelector('.stat-num');
        const decimal = parseInt(entry.target.dataset.decimal || '0', 10);
        const suffix  = entry.target.dataset.suffix || '';
        if (numEl) numEl.textContent = (0).toFixed(decimal) + suffix;
      }
    });
  }, { threshold: 0.4 });

  items.forEach(el => io.observe(el));
})();

/* ══════════════════════════════════════════════
   9b. SPEC SECTION COUNTERS
       Animates .spec-num spans (3.8L, 565hp,
       2.9sec, 196mph) from 0 on scroll-in
══════════════════════════════════════════════ */
(function initSpecCounters() {
  const nums = document.querySelectorAll('.spec-num[data-target]');
  if (!nums.length) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function runCount(el) {
    const target  = parseFloat(el.dataset.target);
    const decimal = parseInt(el.dataset.decimal || '0', 10);

    if (reduced) { el.textContent = target.toFixed(decimal); return; }

    const duration = 1400;
    const start    = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      // Cubic ease-out — fast start, slow finish
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = (target * eased).toFixed(decimal);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate up from 0 each time specs section enters view
        runCount(entry.target);
      } else {
        // Reset to 0 so next scroll-in re-triggers cleanly
        const decimal = parseInt(entry.target.dataset.decimal || '0', 10);
        entry.target.textContent = (0).toFixed(decimal);
      }
    });
  }, { threshold: 0.5 });

  nums.forEach(el => {
    el.textContent = (0).toFixed(parseInt(el.dataset.decimal || '0', 10));
    io.observe(el);
  });
})();

/* ══════════════════════════════════════════════
   10. ACTIVE NAV LINK
══════════════════════════════════════════════ */
(function initActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-item:not(.nav-book)');
  if (!sections.length || !links.length) return;

  const navH = document.getElementById('nav')?.offsetHeight ?? 70;

  function update() {
    let current = '';
    sections.forEach(s => {
      if (s.offsetTop <= window.scrollY + navH + 100) current = s.id;
    });
    links.forEach(l => {
      const h = l.getAttribute('href').replace('#', '');
      l.style.color = h === current ? 'var(--white)' : '';
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ══════════════════════════════════════════════
   11. RESERVATION FORM VALIDATION
══════════════════════════════════════════════ */
(function initForm() {
  const form    = document.getElementById('bookForm');
  const success = document.getElementById('successState');
  const reset   = document.getElementById('resetBtn');
  if (!form) return;

  // Set min date to today
  const dateEl = document.getElementById('fdate');
  if (dateEl) dateEl.min = new Date().toISOString().split('T')[0];

  /* Validators */
  const rules = {
    fname(v) {
      if (!v.trim())           return 'Please enter your full name.';
      if (v.trim().length < 2) return 'Name is too short.';
      return '';
    },
    femail(v) {
      if (!v.trim()) return 'Please enter your email address.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) return 'Please enter a valid email.';
      return '';
    },
    fphone(v) {
      if (!v.trim()) return 'Please enter your phone number.';
      const d = v.replace(/\D/g, '');
      if (d.length < 7)  return 'Phone number is too short.';
      if (d.length > 15) return 'Phone number is too long.';
      return '';
    },
    fdate(v) {
      if (!v) return 'Please select a date.';
      if (new Date(v) < new Date(new Date().toDateString())) return 'Please select a future date.';
      return '';
    },
    ftime(v) {
      if (!v) return 'Please select a time slot.';
      return '';
    },
  };

  function setError(id, msg) {
    const input = document.getElementById(id);
    const span  = document.getElementById(id + '-err');
    if (!input || !span) return;
    if (msg) {
      input.classList.add('invalid');
      span.textContent = msg;
    } else {
      input.classList.remove('invalid');
      span.textContent = '';
    }
  }

  // Live validation on blur / input
  Object.keys(rules).forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('blur',  () => setError(id, rules[id](el.value)));
    el.addEventListener('input', () => {
      if (el.classList.contains('invalid')) setError(id, rules[id](el.value));
    });
  });

  // Submit
  form.addEventListener('submit', e => {
    e.preventDefault();

    let valid = true;
    Object.keys(rules).forEach(id => {
      const el  = document.getElementById(id);
      const msg = rules[id](el?.value ?? '');
      setError(id, msg);
      if (msg) valid = false;
    });

    if (!valid) {
      const first = form.querySelector('.invalid');
      if (first) {
        const off = first.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: off, behavior: 'smooth' });
        first.focus();
      }
      return;
    }

    // — In production: POST to your API here —
    form.hidden = true;
    success.hidden = false;
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  // Reset
  if (reset) {
    reset.addEventListener('click', () => {
      form.reset();
      form.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
      form.querySelectorAll('.err-msg').forEach(el => el.textContent = '');
      success.hidden = true;
      form.hidden    = false;
      form.querySelector('input')?.focus();
    });
  }
})();

/* ══════════════════════════════════════════════
   12. FOOTER YEAR
══════════════════════════════════════════════ */
(function initYear() {
  const el = document.getElementById('yr');
  if (el) el.textContent = new Date().getFullYear();
})();
