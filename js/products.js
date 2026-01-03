/**
 * Products Page JavaScript
 * Handles category filtering, pagination, and dynamic product counts
 */

document.addEventListener('DOMContentLoaded', function () {
    initProductsPage();
});

function initProductsPage() {
    updateCategoryCounts();
    initCategoryFilters();
    initPagination();
    initCategoryNavigation();
}

/**
 * Update Category Counts Dynamically
 * Uses the shared PRODUCT_DATA from product-data.js
 */
function updateCategoryCounts() {
    // Check if PRODUCT_DATA is available
    if (typeof PRODUCT_DATA === 'undefined' || typeof getAllCategoryCounts !== 'function') {
        console.warn('Product data not loaded. Category counts will not be updated dynamically.');
        return;
    }

    const counts = getAllCategoryCounts();

    // Update each category count element
    document.querySelectorAll('[data-category-count]').forEach(countElement => {
        const categorySlug = countElement.getAttribute('data-category-count');
        const count = counts[categorySlug] || 0;

        // Get the count label element
        const countLabel = countElement.querySelector('.count-label');
        const labelText = countLabel ? countLabel.textContent : 'products';

        // Update the count with proper formatting
        if (count > 0) {
            countElement.innerHTML = `${count}+ <span class="count-label">${labelText}</span>`;
        } else {
            countElement.innerHTML = `0 <span class="count-label">${labelText}</span>`;
        }
    });
}

/**
 * Initialize Category Navigation
 * Handles click events for categories (hover effects removed per user request)
 */
function initCategoryNavigation() {
    // Hover effects removed per user request - only buttons should have hover effects
}


/**
 * Category Filter Functionality
 */
function initCategoryFilters() {
    const filterBtns = document.querySelectorAll('.category-filter-btn');
    const productCards = document.querySelectorAll('.product-page-card');

    if (!filterBtns.length || !productCards.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const category = this.getAttribute('data-category');
            filterProducts(category, productCards);
        });
    });
}

function filterProducts(category, cards) {
    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            // Add fade-in animation
            card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
            card.style.display = 'none';
        }
    });
}

/**
 * Pagination Functionality
 */
function initPagination() {
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const pageNumbers = document.querySelectorAll('.page-number');

    if (!pageNumbers.length) return;

    let currentPage = 1;
    const totalPages = 12;

    pageNumbers.forEach(btn => {
        btn.addEventListener('click', function () {
            const page = parseInt(this.textContent);
            if (!isNaN(page)) {
                setActivePage(page, pageNumbers);
                currentPage = page;
                updateArrowStates(currentPage, totalPages, prevArrow, nextArrow);
            }
        });
    });

    if (prevArrow) {
        prevArrow.addEventListener('click', function () {
            if (currentPage > 1) {
                currentPage--;
                setActivePage(currentPage, pageNumbers);
                updateArrowStates(currentPage, totalPages, prevArrow, nextArrow);
            }
        });
    }

    if (nextArrow) {
        nextArrow.addEventListener('click', function () {
            if (currentPage < totalPages) {
                currentPage++;
                setActivePage(currentPage, pageNumbers);
                updateArrowStates(currentPage, totalPages, prevArrow, nextArrow);
            }
        });
    }
}

function setActivePage(page, pageNumbers) {
    pageNumbers.forEach(btn => {
        btn.classList.remove('active');
        if (parseInt(btn.textContent) === page) {
            btn.classList.add('active');
        }
    });
}

function updateArrowStates(currentPage, totalPages, prevArrow, nextArrow) {
    if (prevArrow) {
        prevArrow.disabled = currentPage === 1;
    }
    if (nextArrow) {
        nextArrow.disabled = currentPage === totalPages;
    }
}

// Add CSS animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
