/*
 * HIWIN homepage JavaScript
 * Handles slider transitions, keyboard navigation, swipe support, and site interactions.
 */

const slider = document.querySelector('.hero-slider');
const slides = Array.from(document.querySelectorAll('.hero-slider .slide'));
const prevButton = document.querySelector('.slider-control.prev');
const nextButton = document.querySelector('.slider-control.next');
const dotsContainer = document.querySelector('.slider-dots');
const backToTop = document.querySelector('.back-to-top');
const sliderLoader = document.querySelector('.slider-loader');

let activeIndex = 0;
let autoSlideTimer;
const autoSlideDelay = 5000;
let touchStartX = 0;
let touchEndX = 0;

function showSlide(index) {
    activeIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === activeIndex);
    });

    const dotButtons = Array.from(dotsContainer.children);
    dotButtons.forEach((button, idx) => {
        button.classList.toggle('active', idx === activeIndex);
    });
}

function createDots() {
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.addEventListener('click', () => {
            showSlide(index);
            resetSlider();
        });
        dotsContainer.appendChild(dot);
    });
}

function goToPreviousSlide() {
    showSlide(activeIndex - 1);
    resetSlider();
}

function goToNextSlide() {
    showSlide(activeIndex + 1);
    resetSlider();
}

function resetSlider() {
    clearInterval(autoSlideTimer);
    autoSlideTimer = setInterval(goToNextSlide, autoSlideDelay);
}

function handleKeyboard(event) {
    if (event.key === 'ArrowLeft') {
        goToPreviousSlide();
    }
    if (event.key === 'ArrowRight') {
        goToNextSlide();
    }
}

function handleTouchStart(event) {
    touchStartX = event.changedTouches[0].screenX;
}

function handleTouchEnd(event) {
    touchEndX = event.changedTouches[0].screenX;
    const delta = touchEndX - touchStartX;
    if (Math.abs(delta) > 40) {
        if (delta > 0) goToPreviousSlide();
        else goToNextSlide();
    }
}

function initSlider() {
    createDots();
    showSlide(0);

    prevButton.addEventListener('click', goToPreviousSlide);
    nextButton.addEventListener('click', goToNextSlide);
    document.addEventListener('keydown', handleKeyboard);

    if (slider) {
        slider.addEventListener('mouseenter', () => clearInterval(autoSlideTimer));
        slider.addEventListener('mouseleave', resetSlider);
        slider.addEventListener('touchstart', handleTouchStart, { passive: true });
        slider.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    resetSlider();
    window.setTimeout(() => {
        slider?.classList.remove('loading');
        sliderLoader?.classList.remove('visible');
    }, 800);
}

function initBackToTop() {
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.scrollY > 420);
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function initNewsletterForm() {
    const newsletterForm = document.querySelector('#newsletter-form');
    const newsletterEmail = document.querySelector('#newsletter-email');
    if (!newsletterForm || !newsletterEmail) return;

    newsletterForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = newsletterEmail.value.trim();
        if (!email || !email.includes('@')) {
            newsletterEmail.focus();
            return;
        }

        newsletterEmail.value = '';
        alert('Thank you for subscribing to HIWIN updates.');
    });
}

function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 24);
    });
}

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-card');
    if (!('IntersectionObserver' in window)) {
        revealElements.forEach((element) => element.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
    });

    revealElements.forEach((element) => observer.observe(element));
}

function initGlobalSearch() {
    const searchInputs = document.querySelectorAll('.search-panel input[type="search"]');
    const searchBtns = document.querySelectorAll('.search-panel .search-button');

    searchInputs.forEach((input, index) => {
        const btn = searchBtns[index];
        if (!input || !btn) return;

        function executeSearch() {
            const query = input.value.trim();
            if (query) {
                sessionStorage.setItem('hiwin_search_query', query);
                window.location.href = 'search.html?q=' + encodeURIComponent(query);
            }
        }

        btn.addEventListener('click', executeSearch);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                executeSearch();
            }
        });
    });
}

function initHomepage() {
    if (slider && slides.length > 0) {
        initSlider();
    }

    initBackToTop();
    initNewsletterForm();
    initHeaderScroll();
    initScrollReveal();
    initGlobalSearch();
}

initHomepage();
