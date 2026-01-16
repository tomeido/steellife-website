/**
 * STEELLIFE Co., Ltd. - Interactive JavaScript
 * Premium Architecture Website Functionality
 */

// =====================================================
// Initialize GSAP and ScrollTrigger
// =====================================================
gsap.registerPlugin(ScrollTrigger);

// =====================================================
// DOM Elements
// =====================================================
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');
const langToggle = document.getElementById('lang-toggle');
const portfolioTrack = document.querySelector('.portfolio-track');
const prevSlideBtn = document.getElementById('prev-slide');
const nextSlideBtn = document.getElementById('next-slide');
const slideDots = document.querySelectorAll('.slide-dot');
const contactForm = document.getElementById('contact-form');

// =====================================================
// State Variables
// =====================================================
let currentSlide = 0;
let totalSlides = 5;
let isKorean = false;
let autoSlideInterval;
let isMobileMenuOpen = false;

// =====================================================
// Navbar Scroll Effect
// =====================================================
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleNavbarScroll);
handleNavbarScroll(); // Initial check

// =====================================================
// Mobile Menu Toggle
// =====================================================
function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;

    if (mobileMenuBtn) {
        mobileMenuBtn.classList.toggle('active', isMobileMenuOpen);
    }

    if (mobileNav) {
        mobileNav.classList.toggle('active', isMobileMenuOpen);
    }

    // Prevent body scroll when menu is open
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
}

function closeMobileMenu() {
    isMobileMenuOpen = false;
    if (mobileMenuBtn) {
        mobileMenuBtn.classList.remove('active');
    }
    if (mobileNav) {
        mobileNav.classList.remove('active');
    }
    document.body.style.overflow = '';
}

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

// Close menu on link click
if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

// =====================================================
// Language Toggle
// =====================================================
const translations = {
    en: {
        profile: 'Profile',
        expertise: 'Expertise',
        projects: 'Projects',
        technology: 'Technology',
        contact: 'Contact',
        heroTitle1: 'Pioneering',
        heroTitle2: '3D Cladding',
        heroTitle3: 'Excellence',
        heroSubtitle: "Korea's leading specialist in parametric facades and metal roofing since 2001",
        exploreProjects: 'Explore Projects'
    },
    kr: {
        profile: '회사소개',
        expertise: '제품',
        projects: '프로젝트',
        technology: '기술',
        contact: '연락처',
        heroTitle1: '선도하는',
        heroTitle2: '3D 클래딩',
        heroTitle3: '전문 기업',
        heroSubtitle: '2001년부터 파라메트릭 파사드와 금속 지붕 전문',
        exploreProjects: '프로젝트 보기'
    }
};

if (langToggle) {
    langToggle.addEventListener('click', () => {
        isKorean = !isKorean;
        const lang = isKorean ? 'kr' : 'en';

        // Update language indicator
        langToggle.querySelector('.lang-en').classList.toggle('text-steel-600', isKorean);
        langToggle.querySelector('.lang-en').classList.toggle('text-steel-400', !isKorean);
        langToggle.querySelector('.lang-kr').classList.toggle('text-steel-400', isKorean);
        langToggle.querySelector('.lang-kr').classList.toggle('text-steel-600', !isKorean);

        // Update HTML lang attribute
        document.documentElement.lang = isKorean ? 'ko' : 'en';

        // Animate text change
        gsap.to('.hero-title span, .hero-subtitle, .hero-cta', {
            opacity: 0,
            y: -10,
            duration: 0.2,
            stagger: 0.05,
            onComplete: () => {
                // Update text content based on language
                // (In production, you'd update all text elements)
                gsap.to('.hero-title span, .hero-subtitle, .hero-cta', {
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                    stagger: 0.05
                });
            }
        });
    });
}

// =====================================================
// Portfolio Slider
// =====================================================
function updateSlider() {
    const slideWidth = document.querySelector('.portfolio-slide')?.offsetWidth || 0;
    const gap = 24; // 6 * 4 (tailwind gap-6)
    const offset = currentSlide * (slideWidth + gap);

    gsap.to(portfolioTrack, {
        x: -offset,
        duration: 0.7,
        ease: 'power3.out'
    });

    // Update dots
    slideDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
        dot.classList.toggle('bg-accent-blue', index === currentSlide);
        dot.classList.toggle('bg-steel-700', index !== currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}

if (prevSlideBtn && nextSlideBtn) {
    prevSlideBtn.addEventListener('click', prevSlide);
    nextSlideBtn.addEventListener('click', nextSlide);
}

// Dot navigation
slideDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
    });
});

// Auto-advance slider
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Pause on hover
if (portfolioTrack) {
    portfolioTrack.addEventListener('mouseenter', stopAutoSlide);
    portfolioTrack.addEventListener('mouseleave', startAutoSlide);
    startAutoSlide();
}

// Touch/swipe support for slider
let touchStartX = 0;
let touchEndX = 0;

if (portfolioTrack) {
    portfolioTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoSlide();
    }, { passive: true });

    portfolioTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoSlide();
    }, { passive: true });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (diff > swipeThreshold) {
        nextSlide();
    } else if (diff < -swipeThreshold) {
        prevSlide();
    }
}

// =====================================================
// GSAP Scroll Animations
// =====================================================

// Hero Section Animations
gsap.timeline({ delay: 0.5 })
    .to('.hero-title span', {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power4.out'
    })
    .to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.5')
    .to('.hero-cta', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.4')
    .to('.project-label', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
    }, '-=0.3');

// Hero parallax effect
gsap.to('.hero-strip img', {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    }
});

// About Section
gsap.from('.about-content', {
    scrollTrigger: {
        trigger: '#about',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    x: -60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

gsap.from('.about-image', {
    scrollTrigger: {
        trigger: '#about',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    x: 60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

// Stats counter animation
gsap.from('.stat-number', {
    scrollTrigger: {
        trigger: '.stat-item',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
    },
    textContent: 0,
    duration: 2,
    ease: 'power2.out',
    snap: { textContent: 1 },
    stagger: 0.2
});

// Products Section
gsap.from('.product-card', {
    scrollTrigger: {
        trigger: '#products',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
    },
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out'
});

// Portfolio Section
gsap.from('.portfolio-slide', {
    scrollTrigger: {
        trigger: '#portfolio',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out'
});

// Technology Section
gsap.from('.tech-content', {
    scrollTrigger: {
        trigger: '#technology',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
    },
    x: 60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

gsap.from('.tech-image', {
    scrollTrigger: {
        trigger: '#technology',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
    },
    x: -60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

gsap.from('.tech-item', {
    scrollTrigger: {
        trigger: '.tech-item',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
    },
    x: -30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2,
    ease: 'power3.out'
});

// Contact Section
gsap.from('.contact-info', {
    scrollTrigger: {
        trigger: '#contact',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
    },
    x: -60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

gsap.from('.contact-form', {
    scrollTrigger: {
        trigger: '#contact',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
    },
    x: 60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

// =====================================================
// Contact Form Handling
// =====================================================
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = `
            <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
        `;
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            submitBtn.innerHTML = `
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Message Sent!
            `;
            submitBtn.classList.remove('bg-accent-blue');
            submitBtn.classList.add('bg-green-500');

            // Reset form after delay
            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.classList.add('bg-accent-blue');
                submitBtn.classList.remove('bg-green-500');
                submitBtn.disabled = false;
            }, 3000);
        }, 1500);

        console.log('Form submitted:', data);
    });
}

// =====================================================
// Smooth Scroll for Anchor Links
// =====================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');

        // Handle # only (logo click - scroll to top)
        if (href === '#') {
            if (typeof gsap !== 'undefined' && gsap.plugins && gsap.plugins.scrollTo) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: { y: 0, offsetY: 0 },
                    ease: 'power3.inOut'
                });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            return;
        }

        const target = document.querySelector(href);

        if (target) {
            // Close mobile menu if open
            if (isMobileMenuOpen) {
                closeMobileMenu();
            }

            // Use GSAP if available, otherwise native smooth scroll
            if (typeof gsap !== 'undefined' && gsap.plugins && gsap.plugins.scrollTo) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: target,
                        offsetY: 80
                    },
                    ease: 'power3.inOut'
                });
            } else {
                // Native fallback
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        }
    });
});

// =====================================================
// Lazy Loading Images
// =====================================================
const lazyImages = document.querySelectorAll('img[loading="lazy"]');

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');

                // Animate image appearance
                gsap.from(img, {
                    opacity: 0,
                    scale: 1.05,
                    duration: 0.6,
                    ease: 'power2.out'
                });

                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '100px'
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

// =====================================================
// Resize Handler
// =====================================================
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        updateSlider();
        ScrollTrigger.refresh();
    }, 250);
});

// =====================================================
// Initialize
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
    // Set initial state for hero elements
    gsap.set('.hero-title span', { opacity: 0, y: 40 });
    gsap.set('.hero-subtitle', { opacity: 0, y: 20 });
    gsap.set('.hero-cta', { opacity: 0, y: 20 });

    // Update slider on load
    setTimeout(updateSlider, 100);

    console.log('STEELLIFE website initialized');
});

// =====================================================
// Performance: Reduce animations on low-end devices
// =====================================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    gsap.globalTimeline.timeScale(10); // Speed up all animations
    stopAutoSlide(); // Stop auto-advancing carousel
}
