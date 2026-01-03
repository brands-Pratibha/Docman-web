document.addEventListener('DOMContentLoaded', () => {
    // Search Interactivity
    const searchBtn = document.querySelector('.search-btn');
    const searchContainer = document.querySelector('.search-container');
    const searchInput = document.querySelector('.search-input');

    if (searchBtn && searchContainer && searchInput) {
        searchBtn.addEventListener('click', (e) => {
            searchContainer.classList.toggle('active');
            if (searchContainer.classList.contains('active')) {
                searchInput.focus();
            }
        });
    }

    // Language Selector & Translation Logic
    const langSelector = document.querySelector('.lang-selector');
    const langContainer = document.querySelector('.lang-container');
    const langOptions = document.querySelectorAll('.lang-dropdown li');
    const currentLangSpan = document.querySelector('.lang-selector span');

    // Global translation function for use in other scripts
    window.getTranslation = function (key, lang) {
        if (typeof TRANSLATIONS === 'undefined') return key;
        const currentLang = lang || localStorage.getItem('selectedLanguage') || 'EN';
        return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) || key;
    };

    // Get current language
    window.getCurrentLanguage = function () {
        return localStorage.getItem('selectedLanguage') || 'EN';
    };

    function applyLanguage(lang) {
        if (typeof TRANSLATIONS === 'undefined') {
            console.warn('TRANSLATIONS not found');
            return;
        }
        if (!TRANSLATIONS[lang]) lang = 'EN';

        // Update selector UI
        if (currentLangSpan) currentLangSpan.textContent = lang;

        // Save preference
        localStorage.setItem('selectedLanguage', lang);

        // Update HTML lang attribute
        document.documentElement.lang = lang.toLowerCase();

        // Update text content using data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (TRANSLATIONS[lang][key]) {
                el.innerHTML = TRANSLATIONS[lang][key];
            }
        });

        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (TRANSLATIONS[lang][key]) {
                el.placeholder = TRANSLATIONS[lang][key];
            }
        });

        // Update title attributes
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            if (TRANSLATIONS[lang][key]) {
                el.title = TRANSLATIONS[lang][key];
            }
        });

        // Update aria-label attributes
        document.querySelectorAll('[data-i18n-aria]').forEach(el => {
            const key = el.getAttribute('data-i18n-aria');
            if (TRANSLATIONS[lang][key]) {
                el.setAttribute('aria-label', TRANSLATIONS[lang][key]);
            }
        });

        // Update select option text
        document.querySelectorAll('select[data-i18n-options]').forEach(select => {
            const optionsMap = select.getAttribute('data-i18n-options');
            if (optionsMap) {
                try {
                    const map = JSON.parse(optionsMap);
                    select.querySelectorAll('option').forEach(option => {
                        const key = map[option.value];
                        if (key && TRANSLATIONS[lang][key]) {
                            option.textContent = TRANSLATIONS[lang][key];
                        }
                    });
                } catch (e) {
                    console.warn('Invalid data-i18n-options format');
                }
            }
        });

        // Dispatch custom event for other scripts to react
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
    }

    if (langSelector && langContainer) {
        langSelector.addEventListener('click', (e) => {
            e.stopPropagation();
            langContainer.classList.toggle('active');
        });

        langOptions.forEach(option => {
            option.addEventListener('click', () => {
                const selectedLang = option.getAttribute('data-lang');
                applyLanguage(selectedLang);
                langContainer.classList.remove('active');
            });
        });
    }

    // Initialize Language (always run even if selector not present)
    const savedLang = localStorage.getItem('selectedLanguage') || 'EN';
    applyLanguage(savedLang);

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('section, .product-card, .solution-card, .quality-card');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    // Add reveal class to sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('reveal');
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (langContainer && !langContainer.contains(e.target)) {
            langContainer.classList.remove('active');
        }

        if (searchContainer && !searchContainer.contains(e.target)) {
            if (searchInput.value === '') {
                searchContainer.classList.remove('active');
            }
        }
    });

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-links a, .footer-col a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Products Carousel Navigation
    const carouselLeftArrow = document.querySelector('.carousel-arrow-left');
    const carouselRightArrow = document.querySelector('.carousel-arrow-right');
    const productsScrollWrapper = document.querySelector('.products-scroll-wrapper');

    if (carouselLeftArrow && carouselRightArrow && productsScrollWrapper) {
        const scrollAmount = 384; // Card width (360px) + gap (24px)

        carouselLeftArrow.addEventListener('click', () => {
            productsScrollWrapper.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        carouselRightArrow.addEventListener('click', () => {
            productsScrollWrapper.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        // Update arrow visibility based on scroll position
        const updateArrowVisibility = () => {
            const scrollLeft = productsScrollWrapper.scrollLeft;
            const maxScrollLeft = productsScrollWrapper.scrollWidth - productsScrollWrapper.clientWidth;

            carouselLeftArrow.style.opacity = scrollLeft <= 0 ? '0.4' : '1';
            carouselLeftArrow.style.pointerEvents = scrollLeft <= 0 ? 'none' : 'auto';

            carouselRightArrow.style.opacity = scrollLeft >= maxScrollLeft - 1 ? '0.4' : '1';
            carouselRightArrow.style.pointerEvents = scrollLeft >= maxScrollLeft - 1 ? 'none' : 'auto';
        };

        productsScrollWrapper.addEventListener('scroll', updateArrowVisibility);
        updateArrowVisibility(); // Initial check
    }

    // Blog Filter Tags
    // Blog Filter Tags & Logic
    const filterTags = document.querySelectorAll('.filter-tag');
    const blogCards = document.querySelectorAll('.blog-card, .featured-blog-card');

    if (filterTags.length > 0) {
        filterTags.forEach(tag => {
            tag.addEventListener('click', () => {
                // Remove active class from all tags
                filterTags.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tag
                tag.classList.add('active');

                const selectedCategory = tag.textContent.trim();

                blogCards.forEach(card => {
                    const categoryElement = card.querySelector('.blog-category');
                    if (categoryElement) {
                        const cardCategory = categoryElement.textContent.trim();
                        if (selectedCategory === 'All' || cardCategory === selectedCategory) {
                            card.style.display = '';
                            // Restore display property (flex for featured, flex/block for cards)
                            // For featured-blog-card, it is flex. For blog-card, it is flex (column).
                            // Setting '' usually reverts to stylesheet value which is correct.
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items (optional - commented out for single open behavior)
            // faqItems.forEach(otherItem => {
            //     if (otherItem !== item) otherItem.classList.remove('active');
            // });

            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Hero "Get Quote" Button Logic
    const heroGetQuoteBtn = document.getElementById('hero-get-quote-btn');

    if (heroGetQuoteBtn) {
        heroGetQuoteBtn.addEventListener('click', () => {
            // Check if user has products in their list
            const storedItems = JSON.parse(localStorage.getItem('myProductList')) || [];

            if (storedItems.length > 0) {
                // Navigate to quote page
                window.location.href = 'quote.html';
            } else {
                // Show toast notification
                showToast(window.getTranslation('msg_empty_list'), 'warning');
            }
        });
    }

    // CTA Section "Request Quote" Button Logic (same behavior as Hero)
    const ctaGetQuoteBtn = document.getElementById('cta-get-quote-btn');

    if (ctaGetQuoteBtn) {
        ctaGetQuoteBtn.addEventListener('click', () => {
            // Check if user has products in their list
            const storedItems = JSON.parse(localStorage.getItem('myProductList')) || [];

            if (storedItems.length > 0) {
                // Navigate to quote page
                window.location.href = 'quote.html';
            } else {
                // Show toast notification
                showToast(window.getTranslation('msg_empty_list'), 'warning');
            }
        });
    }

    // Toast Notification Function
    function showToast(message, type = 'info') {
        // Remove existing toast if any
        const existingToast = document.querySelector('.toast-notification');
        if (existingToast) {
            existingToast.remove();
        }

        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast-notification toast-${type}`;

        // Icon based on type
        let icon = '';
        if (type === 'warning') {
            icon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9V13M12 17H12.01M10.29 3.86L1.82 18C1.64 18.3 1.55 18.64 1.55 19C1.55 19.36 1.64 19.7 1.82 20C2 20.3 2.26 20.56 2.56 20.74C2.86 20.91 3.2 21 3.55 21H20.45C20.8 21 21.14 20.91 21.44 20.74C21.74 20.56 22 20.3 22.18 20C22.36 19.7 22.45 19.36 22.45 19C22.45 18.64 22.36 18.3 22.18 18L13.71 3.86C13.53 3.56 13.27 3.32 12.97 3.15C12.67 2.98 12.33 2.89 12 2.89C11.67 2.89 11.33 2.98 11.03 3.15C10.73 3.32 10.47 3.56 10.29 3.86Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`;
        } else if (type === 'success') {
            icon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49707C5.79935 3.85782 7.69279 2.71538 9.79619 2.24015C11.8996 1.76491 14.1003 1.98234 16.07 2.86" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`;
        } else {
            icon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 16V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 8H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`;
        }

        toast.innerHTML = `
            <div class="toast-icon">${icon}</div>
            <div class="toast-content">
                <p class="toast-message">${message}</p>
                <a href="products-listing.html" class="toast-link">${window.getTranslation('msg_browse')}</a>
            </div>
            <button class="toast-close" aria-label="Close">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        `;

        document.body.appendChild(toast);

        // Trigger animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        // Close button handler
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        });

        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }
        }, 5000);
    }
});

