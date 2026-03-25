/* ========================================
   MERCHANT SKYVIEW MEDIA — PORTFOLIO JS
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Smooth Scroll for Anchor Links ----
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile menu if open
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
      }
    });
  });

  // ---- Navigation ----
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  // Scroll-based nav style
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    nav.classList.toggle('scrolled', currentScroll > 80);
    lastScroll = currentScroll;
  }, { passive: true });

  // Mobile menu toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // ---- Reveal on Scroll (Intersection Observer) ----
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ---- Video Play/Pause ----
  document.querySelectorAll('.project-video-wrap').forEach(wrap => {
    const video = wrap.querySelector('.project-video');
    const overlay = wrap.querySelector('.video-overlay');
    const playBtn = wrap.querySelector('.play-btn');

    if (!video || !overlay) return;

    const togglePlay = () => {
      if (video.paused) {
        // Pause all other videos first
        document.querySelectorAll('.project-video').forEach(v => {
          if (v !== video && !v.paused) {
            v.pause();
            const otherOverlay = v.closest('.project-video-wrap').querySelector('.video-overlay');
            if (otherOverlay) otherOverlay.dataset.playing = 'false';
          }
        });

        video.play();
        overlay.dataset.playing = 'true';
      } else {
        video.pause();
        overlay.dataset.playing = 'false';
      }
    };

    playBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePlay();
    });

    // Click on video to pause
    video.addEventListener('click', () => {
      if (!video.paused) {
        video.pause();
        overlay.dataset.playing = 'false';
      }
    });

    // Show overlay on hover when playing (for pause indication)
    wrap.addEventListener('mouseenter', () => {
      if (!video.paused) {
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'all';
      }
    });

    wrap.addEventListener('mouseleave', () => {
      if (!video.paused) {
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
      }
    });

    // Reset overlay on video end (loop handles this but just in case)
    video.addEventListener('ended', () => {
      overlay.dataset.playing = 'false';
    });
  });

  // ---- Parallax-like subtle effect on hero video ----
  const heroVideo = document.querySelector('.hero-video');
  if (heroVideo && window.innerWidth > 640) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const heroHeight = document.querySelector('.hero').offsetHeight;
      if (scrolled < heroHeight) {
        const translateY = scrolled * 0.25;
        heroVideo.style.transform = `translate(-50%, calc(-50% + ${translateY}px)) scale(1.05)`;
      }
    }, { passive: true });
  }

});
