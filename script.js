/* ========================================
   Merchant Skyview Media - JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Mobile Menu Toggle ----
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden');
      // Swap hamburger / X icon
      menuIcon.setAttribute('d', isOpen
        ? 'M4 6h16M4 12h16M4 18h16'
        : 'M6 18L18 6M6 6l12 12'
      );
    });

    // Close menu when a nav link is clicked
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
      });
    });
  }

  // ---- Header Shadow on Scroll ----
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  // ---- Animated Counters (Intersection Observer) ----
  const counters = document.querySelectorAll('.counter');

  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.target);
    const decimals = parseInt(el.dataset.decimals) || 0;
    const duration = 2000;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      el.textContent = decimals > 0
        ? current.toFixed(decimals)
        : Math.floor(current).toString();

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = decimals > 0 ? target.toFixed(decimals) : target.toString();
      }
    };

    requestAnimationFrame(update);
  };

  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  // ---- Fade-in-up Animations ----
  const fadeElements = document.querySelectorAll('.fade-in-up');
  if (fadeElements.length > 0) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => fadeObserver.observe(el));
  }

  // ---- Conversion Tracking on tel: Links ----
  document.querySelectorAll('.call-tracking').forEach(link => {
    link.addEventListener('click', () => {
      // Google Ads conversion tracking
      // UPDATE: Replace 'AW-XXXXXXXXXX/YYYYYYY' with your actual conversion ID/label
      if (typeof gtag === 'function') {
        gtag('event', 'conversion', {
          send_to: 'AW-XXXXXXXXXX/YYYYYYY',
          event_callback: () => {}
        });
      }

      // Google Analytics 4 event
      if (typeof gtag === 'function') {
        gtag('event', 'phone_call_click', {
          event_category: 'engagement',
          event_label: 'header_call_button'
        });
      }
    });
  });

  // ---- Form Submission Tracking ----
  const contactForm = document.querySelector('#contact form');
  if (contactForm) {
    contactForm.addEventListener('submit', () => {
      if (typeof gtag === 'function') {
        gtag('event', 'form_submission', {
          event_category: 'engagement',
          event_label: 'contact_form'
        });
      }
    });
  }

  // ---- FAQ Accordion ----
  document.querySelectorAll('.faq-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const content = item.querySelector('.faq-content');
      const isActive = item.classList.contains('active');

      // Close all other FAQ items
      document.querySelectorAll('.faq-item.active').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('active');
          const openContent = openItem.querySelector('.faq-content');
          openContent.classList.remove('visible');
          openContent.classList.add('hidden');
        }
      });

      // Toggle this item
      if (isActive) {
        item.classList.remove('active');
        content.classList.remove('visible');
        setTimeout(() => content.classList.add('hidden'), 300);
      } else {
        item.classList.add('active');
        content.classList.remove('hidden');
        // Trigger reflow before adding visible class for transition
        content.offsetHeight;
        content.classList.add('visible');
      }
    });
  });

  // ---- Service Card Expand/Collapse ----
  document.querySelectorAll('.service-expand-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.service-card');
      const details = card.querySelector('.service-details');
      const isVisible = details.classList.contains('visible');

      if (isVisible) {
        details.classList.remove('visible');
        setTimeout(() => details.classList.add('hidden'), 300);
        btn.textContent = 'Learn More +';
      } else {
        details.classList.remove('hidden');
        details.offsetHeight;
        details.classList.add('visible');
        btn.textContent = 'Show Less -';
      }
    });
  });

  // ---- Before/After Slider ----
  const container = document.querySelector('.before-after-container');
  if (container) {
    const beforeImage = container.querySelector('.before-image');
    const handle = container.querySelector('.slider-handle');
    let isDragging = false;

    const updateSlider = (x) => {
      const rect = container.getBoundingClientRect();
      let position = (x - rect.left) / rect.width;
      position = Math.max(0.05, Math.min(0.95, position));
      const percent = position * 100;
      beforeImage.style.width = percent + '%';
      handle.style.left = percent + '%';
    };

    // Mouse events
    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      updateSlider(e.clientX);
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        updateSlider(e.clientX);
      }
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch events
    container.addEventListener('touchstart', (e) => {
      isDragging = true;
      updateSlider(e.touches[0].clientX);
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
      if (isDragging) {
        updateSlider(e.touches[0].clientX);
      }
    }, { passive: true });

    document.addEventListener('touchend', () => {
      isDragging = false;
    });
  }

});
