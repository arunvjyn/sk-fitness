/**
 * SK Fitness - Main JavaScript
 * Universal functions for navigation, animations, and interactions
 * Reusable across all pages
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollProgress();
  initRevealAnimations();
  initSmoothScroll();
  initActiveNavLink();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const menuLinks = document.getElementById('menuLinks');

  if (!menuToggle || !menuLinks) return;

  menuToggle.addEventListener('click', () => {
    menuLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    }
  });

  // Close menu when clicking a link
  document.querySelectorAll('.menu-links a').forEach(link => {
    link.addEventListener('click', () => {
      menuLinks.classList.remove('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
      }
    });
  });
}

/**
 * Scroll Progress Bar
 */
function initScrollProgress() {
  const progressBar = document.getElementById('scrollProgress');  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = `${scrolled}%`;
  });
}

/**
 * Reveal Animations on Scroll (Intersection Observer)
 */
function initRevealAnimations() {
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      // Skip if it's not an internal anchor or is just "#"
      if (!href || href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });  });
}

/**
 * Active Navigation Link Highlighting Based on Scroll Position
 */
function initActiveNavLink() {
  const navLinks = document.querySelectorAll('.menu-links a');
  if (navLinks.length === 0) return;

  window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section[id]').forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const linkHref = link.getAttribute('href');
      // Handle both internal pages and anchors
      if (linkHref.includes(current) || linkHref === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/**
 * Utility: Add reveal class to elements dynamically (for JS-generated content)
 * @param {HTMLElement|NodeList} elements - Element(s) to add reveal class to
 */
function addRevealEffect(elements) {
  const els = elements instanceof NodeList ? elements : [elements];
  els.forEach(el => {
    if (el && !el.classList.contains('reveal')) {
      el.classList.add('reveal');
    }
  });
}

// Export utilities for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { addRevealEffect };
  }
