/**
 * Unified Search Functionality
 * Handles search across all pages - header search, products page search, and products-listing page search
 * Includes intelligent routing to relevant pages based on search query
 */

// Site pages index for intelligent routing
const SITE_PAGES = [
    {
        name: 'FAQ',
        url: 'faq',
        keywords: ['faq', 'faqs', 'frequently asked questions', 'questions', 'help', 'support', 'how to', 'query', 'queries', 'doubt', 'doubts'],
        description: 'Frequently Asked Questions',
        icon: 'fa-circle-question'
    },
    {
        name: 'About Us',
        url: 'about',
        keywords: ['about', 'about us', 'company', 'who we are', 'our story', 'history', 'mission', 'vision', 'team', 'docman', 'labs', 'laboratory', 'laboratories'],
        description: 'Learn about Docman Laboratories',
        icon: 'fa-building'
    },
    {
        name: 'Contact Us',
        url: 'contact',
        keywords: ['contact', 'contact us', 'reach us', 'get in touch', 'email', 'phone', 'call', 'message', 'enquiry', 'inquiry', 'location', 'address', 'office'],
        description: 'Get in touch with our team',
        icon: 'fa-envelope'
    },
    {
        name: 'Products',
        url: 'products',
        keywords: ['products', 'catalog', 'catalogue', 'browse', 'categories', 'all products', 'shop', 'view products'],
        description: 'Browse our product categories',
        icon: 'fa-box-open'
    },
    {
        name: 'Solutions',
        url: 'solutions',
        keywords: ['solutions', 'services', 'hospital', 'clinic', 'corporate', 'global', 'healthcare', 'supply chain', 'partnership', 'b2b'],
        description: 'Healthcare solutions for businesses',
        icon: 'fa-lightbulb'
    },
    {
        name: 'Blogs',
        url: 'blogs',
        keywords: ['blog', 'blogs', 'articles', 'news', 'updates', 'insights', 'read', 'posts', 'stories', 'industry news'],
        description: 'Latest healthcare insights and articles',
        icon: 'fa-newspaper'
    },
    {
        name: 'My List',
        url: 'my-list',
        keywords: ['my list', 'wishlist', 'cart', 'saved', 'favorites', 'enquiry list', 'selected products'],
        description: 'Your product enquiry list',
        icon: 'fa-heart'
    },
    {
        name: 'Request Quote',
        url: 'quote',
        keywords: ['quote', 'request quote', 'quotation', 'pricing', 'price', 'bulk order', 'order', 'buy', 'purchase', 'get quote'],
        description: 'Request a quote for products',
        icon: 'fa-file-invoice-dollar'
    },
    {
        name: 'Privacy Policy',
        url: 'privacy-policy',
        keywords: ['privacy', 'privacy policy', 'data', 'personal information', 'gdpr', 'data protection'],
        description: 'Our privacy policy',
        icon: 'fa-shield-halved'
    },
    {
        name: 'Terms of Service',
        url: 'terms-of-service',
        keywords: ['terms', 'terms of service', 'terms and conditions', 'tos', 'legal', 'agreement'],
        description: 'Terms and conditions',
        icon: 'fa-file-contract'
    },
    {
        name: 'Disclaimer',
        url: 'disclaimer',
        keywords: ['disclaimer', 'legal disclaimer', 'liability', 'notice'],
        description: 'Legal disclaimer',
        icon: 'fa-exclamation-triangle'
    },
    {
        name: 'Payment Options',
        url: 'payment-options',
        keywords: ['payment', 'payments', 'pay', 'payment options', 'payment methods', 'bank transfer', 'wire transfer', 'letter of credit', 'lc'],
        description: 'Available payment methods',
        icon: 'fa-credit-card'
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // Initialize search functionality based on what's available on the page
    initHeaderSearch();
    initProductsPageSearch();
    initProductsListingSearch();
});

/**
 * Search site pages based on query
 * @param {string} query - Search query
 * @returns {Array} - Matching pages with scores
 */
function searchSitePages(query) {
    if (!query || query.trim() === '') {
        return [];
    }

    const normalizedQuery = query.trim().toLowerCase();
    const queryWords = normalizedQuery.split(/\s+/);

    return SITE_PAGES.map(page => {
        let score = 0;

        // Exact name match
        if (page.name.toLowerCase() === normalizedQuery) {
            score += 100;
        }
        // Name contains query
        else if (page.name.toLowerCase().includes(normalizedQuery)) {
            score += 50;
        }

        // Keyword matches
        page.keywords.forEach(keyword => {
            if (keyword === normalizedQuery) {
                score += 80; // Exact keyword match
            } else if (keyword.includes(normalizedQuery) || normalizedQuery.includes(keyword)) {
                score += 40; // Partial keyword match
            }
            // Check if all query words are in the keyword
            if (queryWords.every(word => keyword.includes(word))) {
                score += 30;
            }
        });

        // Description match
        if (page.description.toLowerCase().includes(normalizedQuery)) {
            score += 20;
        }

        return { ...page, score };
    }).filter(page => page.score > 0).sort((a, b) => b.score - a.score);
}

/**
 * Search products based on query
 * @param {string} query - Search query
 * @returns {Array} - Filtered products matching the query
 */
function searchProducts(query) {
    if (!query || query.trim() === '' || typeof PRODUCT_DATA === 'undefined') {
        return [];
    }

    const normalizedQuery = query.trim().toLowerCase();
    const queryWords = normalizedQuery.split(/\s+/);

    return PRODUCT_DATA.filter(product => {
        // Search in title
        const titleMatch = product.title.toLowerCase().includes(normalizedQuery);

        // Search in category
        const categoryMatch = product.category.toLowerCase().includes(normalizedQuery);

        // Search in subcategory
        const subcategoryMatch = product.subcategory && product.subcategory.toLowerCase().includes(normalizedQuery);

        // Search in description
        const descMatch = product.desc.toLowerCase().includes(normalizedQuery);

        // Search in packaging
        const packagingMatch = product.packaging && product.packaging.toLowerCase().includes(normalizedQuery);

        // Also check if all query words match somewhere in the product
        const allWordsMatch = queryWords.every(word =>
            product.title.toLowerCase().includes(word) ||
            product.category.toLowerCase().includes(word) ||
            (product.subcategory && product.subcategory.toLowerCase().includes(word)) ||
            product.desc.toLowerCase().includes(word)
        );

        return titleMatch || categoryMatch || subcategoryMatch || descMatch || packagingMatch || allWordsMatch;
    });
}

/**
 * Rank search results by relevance
 * @param {Array} results - Search results
 * @param {string} query - Search query
 * @returns {Array} - Ranked search results
 */
function rankSearchResults(results, query) {
    const normalizedQuery = query.trim().toLowerCase();

    return results.map(product => {
        let score = 0;

        // Exact title match gets highest score
        if (product.title.toLowerCase() === normalizedQuery) {
            score += 100;
        }
        // Title starts with query
        else if (product.title.toLowerCase().startsWith(normalizedQuery)) {
            score += 80;
        }
        // Title contains query
        else if (product.title.toLowerCase().includes(normalizedQuery)) {
            score += 60;
        }

        // Category match
        if (product.category.toLowerCase().includes(normalizedQuery)) {
            score += 40;
        }

        // Subcategory match
        if (product.subcategory && product.subcategory.toLowerCase().includes(normalizedQuery)) {
            score += 30;
        }

        // Description match
        if (product.desc.toLowerCase().includes(normalizedQuery)) {
            score += 20;
        }

        return { ...product, score };
    }).sort((a, b) => b.score - a.score);
}

/**
 * Initialize header search functionality (all pages)
 */
function initHeaderSearch() {
    const searchContainer = document.querySelector('.search-container');
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');

    if (!searchContainer || !searchInput || !searchBtn) return;

    // Create search results dropdown
    let searchDropdown = createSearchDropdown(searchContainer);

    // Handle search input
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const query = e.target.value.trim();
            if (query.length >= 2) {
                // Search both pages and products
                const pageResults = searchSitePages(query);
                const productResults = searchProducts(query);
                const rankedProducts = rankSearchResults(productResults, query);
                displayIntelligentSearchResults(searchDropdown, pageResults, rankedProducts, query);
            } else {
                hideSearchDropdown(searchDropdown);
            }
        }, 300);
    });

    // Handle Enter key - intelligent routing
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query.length >= 2) {
                intelligentNavigate(query);
            }
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target)) {
            hideSearchDropdown(searchDropdown);
        }
    });
}

/**
 * Intelligent navigation based on search query
 * Routes to the most relevant page based on query analysis
 * @param {string} query - Search query
 */
function intelligentNavigate(query) {
    const pageResults = searchSitePages(query);
    const productResults = searchProducts(query);

    // If there's a strong page match (score >= 50) and it scores higher than products, go to that page
    if (pageResults.length > 0 && pageResults[0].score >= 50) {
        // Check if this is primarily a page query vs product query
        const topPageScore = pageResults[0].score;
        const hasProducts = productResults.length > 0;

        // If the page match is strong and there are few or no product matches, go to the page
        if (topPageScore >= 80 || (!hasProducts) || (topPageScore >= 50 && productResults.length < 3)) {
            window.location.href = pageResults[0].url;
            return;
        }
    }

    // Default: Go to products listing with search query
    window.location.href = `products-listing?search=${encodeURIComponent(query)}`;
}

/**
 * Display intelligent search results in dropdown (pages + products)
 * @param {Element} dropdown - Dropdown element
 * @param {Array} pageResults - Page search results
 * @param {Array} productResults - Product search results
 * @param {string} query - Search query
 */
function displayIntelligentSearchResults(dropdown, pageResults, productResults, query) {
    const hasPages = pageResults.length > 0;
    const hasProducts = productResults.length > 0;

    if (!hasPages && !hasProducts) {
        dropdown.innerHTML = `
            <div class="search-no-results">
                <i class="fa-solid fa-search"></i>
                <p>No results found for "<strong>${escapeHtml(query)}</strong>"</p>
                <span>Try different keywords or browse our categories</span>
            </div>
        `;
        dropdown.classList.add('active');
        return;
    }

    let html = '';

    // Show page results first (limited to top 3)
    if (hasPages) {
        const displayPages = pageResults.slice(0, 3);
        html += `
            <div class="search-section">
                <div class="search-section-header">
                    <i class="fa-solid fa-compass"></i>
                    <span>Pages</span>
                </div>
                <div class="search-pages-list">
                    ${displayPages.map(page => `
                        <a href="${page.url}" class="search-page-item">
                            <div class="search-page-icon">
                                <i class="fa-solid ${page.icon}"></i>
                            </div>
                            <div class="search-page-info">
                                <span class="search-page-name">${highlightMatch(page.name, query)}</span>
                                <span class="search-page-desc">${escapeHtml(page.description)}</span>
                            </div>
                            <i class="fa-solid fa-arrow-right"></i>
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Show product results
    if (hasProducts) {
        const displayProducts = productResults.slice(0, 5);
        html += `
            <div class="search-section">
                <div class="search-section-header">
                    <i class="fa-solid fa-box"></i>
                    <span>Products (${productResults.length})</span>
                </div>
                <div class="search-results-list">
                    ${displayProducts.map(product => `
                        <a href="products-listing?search=${encodeURIComponent(query)}&highlight=${product.id}" class="search-result-item">
                            <div class="search-result-info">
                                <span class="search-result-category">${escapeHtml(product.category)}</span>
                                <span class="search-result-title">${highlightMatch(product.title, query)}</span>
                                <span class="search-result-desc">${escapeHtml(product.desc.substring(0, 50))}...</span>
                            </div>
                            <i class="fa-solid fa-arrow-right"></i>
                        </a>
                    `).join('')}
                </div>
                ${productResults.length > 5 ? `
                    <a href="products-listing?search=${encodeURIComponent(query)}" class="search-view-all">
                        View all ${productResults.length} products <i class="fa-solid fa-arrow-right"></i>
                    </a>
                ` : ''}
            </div>
        `;
    }

    dropdown.innerHTML = html;
    dropdown.classList.add('active');
}

/**
 * Create search results dropdown
 * @param {Element} container - Search container element
 * @returns {Element} - Search dropdown element
 */
function createSearchDropdown(container) {
    let dropdown = container.querySelector('.search-dropdown');
    if (!dropdown) {
        dropdown = document.createElement('div');
        dropdown.className = 'search-dropdown';
        container.appendChild(dropdown);
    }
    return dropdown;
}

/**
 * Display search results in dropdown (for products page search)
 * @param {Element} dropdown - Dropdown element
 * @param {Array} results - Search results
 * @param {string} query - Search query
 */
function displaySearchResults(dropdown, results, query) {
    if (results.length === 0) {
        dropdown.innerHTML = `
            <div class="search-no-results">
                <i class="fa-solid fa-search"></i>
                <p>No products found for "<strong>${escapeHtml(query)}</strong>"</p>
                <span>Try different keywords or browse our categories</span>
            </div>
        `;
    } else {
        const displayResults = results.slice(0, 8); // Limit to 8 results
        dropdown.innerHTML = `
            <div class="search-results-header">
                <span>${results.length} result${results.length !== 1 ? 's' : ''} found</span>
            </div>
            <div class="search-results-list">
                ${displayResults.map(product => `
                    <a href="products-listing?search=${encodeURIComponent(query)}&highlight=${product.id}" class="search-result-item">
                        <div class="search-result-info">
                            <span class="search-result-category">${escapeHtml(product.category)}</span>
                            <span class="search-result-title">${highlightMatch(product.title, query)}</span>
                            <span class="search-result-desc">${escapeHtml(product.desc.substring(0, 60))}...</span>
                        </div>
                        <i class="fa-solid fa-arrow-right"></i>
                    </a>
                `).join('')}
            </div>
            ${results.length > 8 ? `
                <a href="products-listing?search=${encodeURIComponent(query)}" class="search-view-all">
                    View all ${results.length} results <i class="fa-solid fa-arrow-right"></i>
                </a>
            ` : ''}
        `;
    }
    dropdown.classList.add('active');
}

/**
 * Hide search dropdown
 * @param {Element} dropdown - Dropdown element
 */
function hideSearchDropdown(dropdown) {
    if (dropdown) {
        dropdown.classList.remove('active');
    }
}

/**
 * Navigate to search results page (products-listing.html)
 * Used by the products.html page search bar
 * @param {string} query - Search query
 */
function navigateToSearchResults(query) {
    if (query && query.trim().length >= 2) {
        window.location.href = `products-listing?search=${encodeURIComponent(query.trim())}`;
    }
}

/**
 * Initialize products page search (products.html)
 */
function initProductsPageSearch() {
    const productSearchInput = document.querySelector('.product-search-input');
    if (!productSearchInput) return;

    // Handle Enter key
    productSearchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = productSearchInput.value.trim();
            if (query.length >= 2) {
                navigateToSearchResults(query);
            }
        }
    });

    // Create search suggestions dropdown for products page
    const searchBar = productSearchInput.closest('.product-search-bar');
    if (searchBar) {
        let searchDropdown = createSearchDropdown(searchBar);

        let debounceTimer;
        productSearchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                const query = e.target.value.trim();
                if (query.length >= 2) {
                    const results = searchProducts(query);
                    const rankedResults = rankSearchResults(results, query);
                    displaySearchResults(searchDropdown, rankedResults, query);
                } else {
                    hideSearchDropdown(searchDropdown);
                }
            }, 300);
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchBar.contains(e.target)) {
                hideSearchDropdown(searchDropdown);
            }
        });
    }
}

/**
 * Initialize products listing page search (products-listing.html)
 */
function initProductsListingSearch() {
    const listSearchInput = document.querySelector('.list-search input');
    if (!listSearchInput) return;

    // Check for search query in URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');

    if (searchQuery) {
        listSearchInput.value = searchQuery;
        // Trigger search filter
        filterProductsBySearch(searchQuery);
    }

    // Handle input for live filtering
    let debounceTimer;
    listSearchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const query = e.target.value.trim();
            filterProductsBySearch(query);
            // Update URL without reloading
            updateSearchUrl(query);
        }, 300);
    });

    // Handle Enter key
    listSearchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = listSearchInput.value.trim();
            filterProductsBySearch(query);
            updateSearchUrl(query);
        }
    });
}

/**
 * Filter products by search query on products-listing page
 * @param {string} query - Search query
 */
function filterProductsBySearch(query) {
    const productsContainer = document.getElementById('products-container');
    if (!productsContainer || typeof PRODUCT_DATA === 'undefined') return;

    // Get current category filter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const categorySlug = urlParams.get('category');
    const subcategorySlug = urlParams.get('subcategory');

    let filteredProducts = PRODUCT_DATA;

    // Apply category filter first
    if (categorySlug && categorySlug !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.categorySlug === categorySlug);
    }

    if (subcategorySlug) {
        filteredProducts = filteredProducts.filter(p => p.subcategorySlug === subcategorySlug);
    }

    // Apply search filter
    if (query && query.length >= 2) {
        const normalizedQuery = query.toLowerCase();
        const queryWords = normalizedQuery.split(/\s+/);

        filteredProducts = filteredProducts.filter(product => {
            const titleMatch = product.title.toLowerCase().includes(normalizedQuery);
            const categoryMatch = product.category.toLowerCase().includes(normalizedQuery);
            const subcategoryMatch = product.subcategory && product.subcategory.toLowerCase().includes(normalizedQuery);
            const descMatch = product.desc.toLowerCase().includes(normalizedQuery);
            const packagingMatch = product.packaging && product.packaging.toLowerCase().includes(normalizedQuery);

            const allWordsMatch = queryWords.every(word =>
                product.title.toLowerCase().includes(word) ||
                product.category.toLowerCase().includes(word) ||
                (product.subcategory && product.subcategory.toLowerCase().includes(word)) ||
                product.desc.toLowerCase().includes(word)
            );

            return titleMatch || categoryMatch || subcategoryMatch || descMatch || packagingMatch || allWordsMatch;
        });

        // Rank and sort results
        filteredProducts = rankSearchResults(filteredProducts, query);
    }

    // Update page title to show search
    if (query && query.length >= 2) {
        document.title = `Search: "${query}" - Docman Labs`;
        updateSearchResultsHeader(query, filteredProducts.length);
    }

    // Render filtered products
    renderFilteredProducts(productsContainer, filteredProducts, query);
}

/**
 * Update search results header
 * @param {string} query - Search query
 * @param {number} count - Number of results
 */
function updateSearchResultsHeader(query, count) {
    // Check if there's already a search results header
    let searchHeader = document.querySelector('.search-results-banner');

    if (query && query.length >= 2) {
        if (!searchHeader) {
            // Create search results banner
            searchHeader = document.createElement('div');
            searchHeader.className = 'search-results-banner';
            const toolbar = document.querySelector('.product-toolbar');
            if (toolbar) {
                toolbar.parentNode.insertBefore(searchHeader, toolbar);
            }
        }
        searchHeader.innerHTML = `
            <div class="search-results-info">
                <i class="fa-solid fa-search"></i>
                <span>Showing ${count} result${count !== 1 ? 's' : ''} for "<strong>${escapeHtml(query)}</strong>"</span>
            </div>
            <button class="clear-search-btn" onclick="clearSearch()">
                <i class="fa-solid fa-times"></i> Clear Search
            </button>
        `;
    } else if (searchHeader) {
        searchHeader.remove();
    }
}

/**
 * Clear search and reset
 */
function clearSearch() {
    const listSearchInput = document.querySelector('.list-search input');
    if (listSearchInput) {
        listSearchInput.value = '';
    }

    // Remove search from URL but keep category
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.delete('search');
    urlParams.delete('highlight');

    const newUrl = urlParams.toString()
        ? `${window.location.pathname}?${urlParams.toString()}`
        : window.location.pathname;

    window.history.pushState({}, '', newUrl);

    // Reload products
    if (typeof renderProducts === 'function') {
        renderProducts();
    } else {
        window.location.reload();
    }

    // Remove search banner
    const searchBanner = document.querySelector('.search-results-banner');
    if (searchBanner) searchBanner.remove();
}

/**
 * Render filtered products
 * @param {Element} container - Products container
 * @param {Array} products - Products to render
 * @param {string} query - Search query for highlighting
 */
function renderFilteredProducts(container, products, query) {
    // Load list items from localStorage
    const listItems = JSON.parse(localStorage.getItem('myProductList')) || [];

    if (products.length === 0) {
        container.innerHTML = `
            <div class="no-products-message">
                <i class="fa-solid fa-search"></i>
                <h3>No products found</h3>
                <p>We couldn't find any products matching your search.</p>
                <p>Try using different keywords or <a href="products-listing">browse all products</a>.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';

        // Check if highlighted
        const urlParams = new URLSearchParams(window.location.search);
        const highlightId = urlParams.get('highlight');
        if (highlightId && parseInt(highlightId) === product.id) {
            card.classList.add('highlighted');
            // Scroll to this card after render
            setTimeout(() => {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }

        // Highlight matching text in title
        const highlightedTitle = query ? highlightMatch(product.title, query) : product.title;
        const subcategoryInfo = product.subcategory ? `<span class="card-subcategory">${escapeHtml(product.subcategory)}</span>` : '';

        // Check if in list
        const isInList = listItems.find(i => i.id === product.id);
        const btnClass = isInList ? 'add-btn added' : 'add-btn';
        const btnText = isInList ? '<i class="fa-solid fa-check"></i> Added' : '<i class="fa-solid fa-plus"></i> Add to List';

        card.innerHTML = `
            <div class="card-details">
                <span class="card-category">${escapeHtml(product.category)}</span>
                ${subcategoryInfo}
                <h3 class="card-title">${highlightedTitle}</h3>
                <p class="card-desc">${escapeHtml(product.desc)}</p>
            </div>
            <button class="${btnClass}" data-id="${product.id}" data-title="${escapeHtml(product.title)}" data-cat="${escapeHtml(product.category)}" data-pkg="${escapeHtml(product.packaging || '')}" data-unit="${escapeHtml(product.unit || 'units')}">
                ${btnText}
            </button>
        `;

        container.appendChild(card);
    });

    // Re-attach event listeners to buttons
    attachAddToListHandlers();
}

/**
 * Attach event handlers to Add to List buttons
 */
function attachAddToListHandlers() {
    const modal = document.getElementById('add-list-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalCat = document.getElementById('modal-cat');
    const modalQty = document.getElementById('modal-qty');
    const modalCustomization = document.getElementById('modal-customization');
    const modalWhiteLabel = document.getElementById('modal-white-label');
    const modalSpecs = document.getElementById('modal-specs');

    if (!modal) return;

    document.querySelectorAll('.add-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            if (this.classList.contains('added')) return;

            window.currentProductButton = this;
            const title = this.getAttribute('data-title');
            const cat = this.getAttribute('data-cat');

            if (modalTitle) modalTitle.textContent = title;
            if (modalCat) modalCat.textContent = cat;
            if (modalQty) modalQty.value = 5000;
            if (modalCustomization) modalCustomization.value = '';
            if (modalWhiteLabel) modalWhiteLabel.checked = false;
            if (modalSpecs) modalSpecs.value = '';

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
}

/**
 * Update URL with search query
 * @param {string} query - Search query
 */
function updateSearchUrl(query) {
    const urlParams = new URLSearchParams(window.location.search);

    if (query && query.length >= 2) {
        urlParams.set('search', query);
    } else {
        urlParams.delete('search');
    }

    urlParams.delete('highlight');

    const newUrl = urlParams.toString()
        ? `${window.location.pathname}?${urlParams.toString()}`
        : window.location.pathname;

    window.history.pushState({}, '', newUrl);
}

/**
 * Highlight matching text
 * @param {string} text - Text to highlight
 * @param {string} query - Search query
 * @returns {string} - HTML with highlighted matches
 */
function highlightMatch(text, query) {
    if (!query) return escapeHtml(text);

    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, 'gi');

    return escapeHtml(text).replace(regex, '<mark>$1</mark>');
}

/**
 * Escape HTML special characters
 * @param {string} text - Text to escape
 * @returns {string} - Escaped text
 */
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Make clearSearch globally available
window.clearSearch = clearSearch;
