/* ═══════════════════════════════════════
   script.js — Portfolio Interactions
   ═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── 1. NAVBAR: shrink on scroll ─── */
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.padding = '12px 60px';
    } else {
      navbar.style.padding = '18px 60px';
    }
  });


  /* ─── 2. SKILL BARS: animate when in view ─── */
  const skillFills = document.querySelectorAll('.skill-fill');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = el.getAttribute('data-width');
        el.style.width = target + '%';
        skillObserver.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  skillFills.forEach(el => skillObserver.observe(el));


  /* ─── 3. SCROLL REVEAL: fade-up on scroll ─── */
  const revealEls = document.querySelectorAll(
    '.skill, .project, .about-visual, .section-title, .section-sub, .section-label'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '0';
        entry.target.style.transform = 'translateY(20px)';
        entry.target.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;

        requestAnimationFrame(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        });

        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ─── 4. ACTIVE NAV LINK on scroll ─── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}` ? '#f0f0f0' : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));


  /* ─── 5. SMOOTH SCROLL for nav links ─── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });


  /* ─── 6. COUNTER ANIMATION for hero stats ─── */
  const statNums = document.querySelectorAll('.stat-num');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const raw = el.textContent.replace(/\D/g, '');
        const suffix = el.textContent.replace(/[0-9]/g, '');
        const target = parseInt(raw, 10);
        let current = 0;
        const step = Math.ceil(target / 30);

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            el.textContent = target + suffix;
            clearInterval(timer);
          } else {
            el.textContent = current + suffix;
          }
        }, 40);

        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => counterObserver.observe(el));

});