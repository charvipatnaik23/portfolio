/**
 * CHARVI PATNAIK - 2026 DEVELOPER PORTFOLIO
 * Modern Vanilla JavaScript Engine
 * Features:
 * - Dark / Light Mode with localStorage & System Preference Sync
 * - ScrollSpy & Responsive Navigation Drawer
 * - Interactive Skills Categorization Filter
 * - ATS Plain-Text Modal & Clipboard Engine
 * - One-Click ATS PDF / Print Engine
 * - Project Summary Quick-Copy & Feedback Toasts
 * - Client-Side Contact Form to Mailto Gateway
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Toast Notification Helper
  // --------------------------------------------------------------------------
  const toastEl = document.getElementById('toast');
  let toastTimeout = null;

  function showToast(message, duration = 2500) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('show');
    toastEl.setAttribute('aria-hidden', 'false');

    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }

    toastTimeout = setTimeout(() => {
      toastEl.classList.remove('show');
      toastEl.setAttribute('aria-hidden', 'true');
    }, duration);
  }

  // --------------------------------------------------------------------------
  // 2. Clipboard Utility Function
  // --------------------------------------------------------------------------
  async function copyToClipboard(text, successMsg = 'Copied to clipboard!') {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for non-https or older environments
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      showToast(successMsg);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      showToast('Could not copy to clipboard. Please copy manually.');
    }
  }

  // Bind global copy buttons with [data-copy]
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const text = btn.getAttribute('data-copy');
      if (text) {
        copyToClipboard(text, `Copied: ${text}`);
      }
    });
  });

  // --------------------------------------------------------------------------
  // 3. Theme Toggle (Dark & Light Mode)
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const STORAGE_KEY = 'charvi_portfolio_theme';

  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    // Default to dark, or check OS preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }

  // Initialize Theme
  applyTheme(getPreferredTheme());

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }

  // --------------------------------------------------------------------------
  // 4. Mobile Menu Navigation
  // --------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileNav.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    });

    // Close mobile nav when clicking any mobile link
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
      });
    });
  }

  // --------------------------------------------------------------------------
  // 5. ScrollSpy & Header Shadow
  // --------------------------------------------------------------------------
  const siteHeader = document.getElementById('site-header');
  const sections = document.querySelectorAll('main section[id]');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');

  window.addEventListener('scroll', () => {
    // Header shadow on scroll
    if (window.scrollY > 20) {
      siteHeader.style.boxShadow = 'var(--shadow-md)';
    } else {
      siteHeader.style.boxShadow = 'none';
    }

    // Active Section Detection
    let currentId = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    desktopNavLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // --------------------------------------------------------------------------
  // 6. Interactive Skills Filter
  // --------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Update active button state
      filterBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterCategory = btn.getAttribute('data-filter');

      skillCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCategory === filterCategory) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 7. ATS Plain-Text Resume Modal Logic
  // --------------------------------------------------------------------------
  const atsModal = document.getElementById('ats-modal');
  const openAtsBtns = [
    document.getElementById('ats-modal-btn'),
    document.getElementById('mobile-ats-btn'),
    document.getElementById('callout-ats-btn')
  ].filter(Boolean);

  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalBackdrop = atsModal ? atsModal.querySelector('.modal-backdrop') : null;
  const atsTextArea = document.getElementById('ats-plain-text-area');
  const copyAtsTextBtn = document.getElementById('copy-ats-text-btn');

  function openModal() {
    if (!atsModal) return;
    atsModal.classList.add('active');
    atsModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (atsTextArea) atsTextArea.focus();
  }

  function closeModal() {
    if (!atsModal) return;
    atsModal.classList.remove('active');
    atsModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openAtsBtns.forEach((btn) => {
    btn.addEventListener('click', openModal);
  });

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && atsModal && atsModal.classList.contains('active')) {
      closeModal();
    }
  });

  // Copy plain text from textarea
  if (copyAtsTextBtn && atsTextArea) {
    copyAtsTextBtn.addEventListener('click', () => {
      copyToClipboard(atsTextArea.value.trim(), 'ATS Resume Plain Text Copied!');
    });
  }

  // --------------------------------------------------------------------------
  // 8. Print / Save ATS PDF Buttons
  // --------------------------------------------------------------------------
  const printBtns = [
    document.getElementById('print-resume-btn'),
    document.getElementById('open-print-hero'),
    document.getElementById('callout-print-btn'),
    document.getElementById('print-from-modal-btn')
  ].filter(Boolean);

  printBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // If modal is open, close it before triggering print dialog so full page print styles take effect
      if (atsModal && atsModal.classList.contains('active')) {
        closeModal();
      }
      setTimeout(() => {
        window.print();
      }, 150);
    });
  });

  // --------------------------------------------------------------------------
  // 9. Project Quick-Copy Buttons
  // --------------------------------------------------------------------------
  document.querySelectorAll('.copy-details-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const projectName = btn.getAttribute('data-project');
      let textToCopy = '';

      if (projectName === 'TinyWin') {
        textToCopy = `TinyWin — Personalized Skill-Learning Web Application\n` +
          `Individual Project | Tech: React, Vite, NestJS, PostgreSQL, TypeORM\n` +
          `- Developed a personalized learning platform tailoring tasks to user skills, goals & available time.\n` +
          `- Implemented user registration, secure login, and email activation workflows.\n` +
          `- Built dashboard for daily tasks & progress analytics.\n` +
          `- Configured PostgreSQL & TypeORM database migrations.\n` +
          `- Automated authentication-flow tests and verified workflows.`;
      } else if (projectName === 'WalkNTrack') {
        textToCopy = `WalkNTrack — Smart Attendance System\n` +
          `Team Project (Reported Deployed) | Tech: Frontend, NFC, Facial Recognition, Cloud Server\n` +
          `- Spearheaded responsive UI development for faculty admin console and student portal.\n` +
          `- Contributed to research and technical architecture requirements.\n` +
          `- Integrated NFC and facial recognition hardware workflows with centralized cloud database.\n` +
          `- Supported team coordination, presentations, and milestone delivery.`;
      }

      if (textToCopy) {
        copyToClipboard(textToCopy, `Copied ${projectName} summary!`);
      }
    });
  });

  // --------------------------------------------------------------------------
  // 10. Contact Form to Mailto Gateway
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const subject = document.getElementById('form-subject').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.');
        return;
      }

      const emailSubject = encodeURIComponent(`[Portfolio Contact] ${subject || 'Web Developer Opportunity'}`);
      const emailBody = encodeURIComponent(
        `Hi Charvi,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}\nDate: ${new Date().toLocaleDateString()}`
      );

      showToast('Opening your email client...');
      window.location.href = `mailto:charvipatnaik23@gmail.com?subject=${emailSubject}&body=${emailBody}`;
    });
  }

  // Smooth scroll polyfill / helper for older browsers
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

})();
