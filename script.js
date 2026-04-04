/* ============================================
   PORTFOLIO SCRIPT.JS
   ============================================ */

// ─── Hamburger Menu ───────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  // Close on link click (mobile)
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ─── Navbar scroll shadow ─────────────────────
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.5)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  }, { passive: true });
}

// ─── Skill bar animation on load ─────────────
function animateSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  if (!bars.length) return;

  bars.forEach(bar => {
    const targetWidth = bar.style.width;
    bar.style.width = '0%';
    setTimeout(() => {
      bar.style.width = targetWidth;
    }, 200);
  });
}

// ─── Skills filter pills ─────────────────────
function initFilterPills() {
  const pills = document.querySelectorAll('.filter-pill');
  if (!pills.length) return;

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });
}

// ─── Contact form validation ─────────────────
function initContactForm() {
  const submitBtn = document.getElementById('submit-btn');
  if (!submitBtn) return;

  const fields = {
    name:    { el: document.getElementById('name'),    err: document.getElementById('name-error'),    validate: v => v.trim().length >= 2 },
    email:   { el: document.getElementById('email'),   err: document.getElementById('email-error'),   validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
    subject: { el: document.getElementById('subject'), err: document.getElementById('subject-error'), validate: v => v.trim().length >= 3 },
    message: { el: document.getElementById('message'), err: document.getElementById('message-error'), validate: v => v.trim().length >= 10 },
  };

  // Live validation on blur
  Object.values(fields).forEach(({ el, err, validate }) => {
    if (!el) return;
    el.addEventListener('blur', () => {
      if (!validate(el.value)) {
        el.classList.add('error');
        err.classList.add('visible');
      } else {
        el.classList.remove('error');
        err.classList.remove('visible');
      }
    });

    el.addEventListener('input', () => {
      if (el.classList.contains('error') && validate(el.value)) {
        el.classList.remove('error');
        err.classList.remove('visible');
      }
    });
  });

  submitBtn.addEventListener('click', () => {
    let valid = true;

    Object.values(fields).forEach(({ el, err, validate }) => {
      if (!el) return;
      if (!validate(el.value)) {
        el.classList.add('error');
        err.classList.add('visible');
        valid = false;
      } else {
        el.classList.remove('error');
        err.classList.remove('visible');
      }
    });

    if (!valid) return;

    // Success state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    setTimeout(() => {
      const wrapper = document.getElementById('contact-form-wrapper');
      const success = document.getElementById('form-success');
      if (wrapper) wrapper.style.display = 'none';
      if (success) success.classList.add('visible');
    }, 1200);
  });
}

// ─── Subtle card hover tilt ───────────────────
function initCardTilt() {
  const cards = document.querySelectorAll('.project-card, .trait-card, .cert-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const tiltX = (y / rect.height) * 4;
      const tiltY = -(x / rect.width) * 4;
      card.style.transform = `perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ─── Page transition ─────────────────────────
function initPageTransitions() {
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;

    link.addEventListener('click', e => {
      e.preventDefault();
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.25s ease';
      setTimeout(() => {
        window.location.href = href;
      }, 250);
    });
  });

  // Fade in on load
  document.body.style.opacity = '0';
  requestAnimationFrame(() => {
    document.body.style.transition = 'opacity 0.4s ease';
    document.body.style.opacity = '1';
  });
}

// ─── Init All ─────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  animateSkillBars();
  initFilterPills();
  initContactForm();
  initCardTilt();
  initPageTransitions();
});
