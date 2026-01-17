document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products-container');
    const viewListBtn = document.getElementById('view-list');
    const viewGrid2Btn = document.getElementById('view-grid-2');
    const viewGrid3Btn = document.getElementById('view-grid-3');

    // Modal Elements
    const modal = document.getElementById('add-list-modal');
    const modalCloseBtn = document.getElementById('modal-close');
    const modalCancelBtn = document.getElementById('modal-cancel');
    const modalConfirmBtn = document.getElementById('modal-confirm');

    // Modal Inputs
    const modalTitle = document.getElementById('modal-title');
    const modalCat = document.getElementById('modal-cat');
    const modalQty = document.getElementById('modal-qty');
    const modalCustomization = document.getElementById('modal-customization');
    const modalWhiteLabel = document.getElementById('modal-white-label');
    const modalSpecs = document.getElementById('modal-specs');

    // Global variable managed via window to share state with search.js
    // window.currentProductButton = null; 

    // Use the shared product data from product-data.js
    // PRODUCT_DATA is available globally from the script include

    // Get URL parameter helper function
    function getUrlParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Update sidebar active state based on current category
    function updateSidebarActiveState(categorySlug, subcategorySlug) {
        const sidebarLinks = document.querySelectorAll('.sidebar-categories .category-item');
        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            const linkCategory = link.getAttribute('data-category');
            if (linkCategory === categorySlug || (!categorySlug && linkCategory === 'all')) {
                link.classList.add('active');
            }
        });

        // Update page title based on filter
        updatePageTitle(categorySlug, subcategorySlug);
    }

    // Update page title based on current filter
    function updatePageTitle(categorySlug, subcategorySlug) {
        const categoryNames = {
            'pharmaceutical-products': 'Pharmaceutical Products',
            'bandages-surgical': 'Bandages and Surgical Dressings',
            'dental-equipment': 'Dental Equipment',
            'hospital-equipment': 'Hospital Equipment',
            'medical-disposables': 'Medical Disposables',
            'wound-care': 'Wound Care & Oncology',
            'diagnostic-equipment': 'Diagnostic Equipment',
            'patient-care': 'Patient Care'
        };

        const subcategoryNames = {
            'antibiotics': 'Antibiotics',
            'cardiovascular': 'Cardiovascular',
            'cns': 'CNS',
            'anti-diabetic': 'Anti-diabetic',
            'analgesics': 'Analgesics',
            'gauze': 'Gauze',
            'crepe': 'Crepe',
            'elastic': 'Elastic',
            'compress': 'Compress',
            'paraffin': 'Paraffin',
            'cotton': 'Cotton',
            'plaster-of-paris': 'Plaster of Paris Bandages',
            'machines': 'Machines',
            'hand-pieces': 'Hand Pieces',
            'filling-materials': 'Filling Materials',
            'polishing-items': 'Polishing Items',
            'diagnostic': 'Diagnostic',
            'surgical': 'Surgical',
            'patient-care': 'Patient Care',
            'laboratory': 'Laboratory',
            'syringes': 'Syringes',
            'gloves': 'Gloves',
            'catheters': 'Catheters',
            'iv-sets': 'IV Sets'
        };

        let title = 'All Products';

        // Base English Names
        if (categorySlug && categoryNames[categorySlug]) {
            title = categoryNames[categorySlug];

            // Attempt Translation
            const currentLang = localStorage.getItem('selectedLanguage') || 'EN';
            if (currentLang !== 'EN' && typeof getTranslatedProduct === 'function') {
                const dummy = { categorySlug: categorySlug, subcategorySlug: subcategorySlug };
                const trans = getTranslatedProduct(dummy, currentLang);

                // If translation found (and different from dummy which has undefined props?), getTranslatedProduct returns keys if properties missing? 
                // No, it checks product.categorySlug.
                // It sets p.category if map found.
                if (trans.category) title = trans.category;
            }

            if (subcategorySlug && subcategoryNames[subcategorySlug]) {
                let subTitle = subcategoryNames[subcategorySlug];
                // Translate Subcategory
                const currentLang = localStorage.getItem('selectedLanguage') || 'EN';
                if (currentLang !== 'EN' && typeof getTranslatedProduct === 'function') {
                    const dummy = { categorySlug: categorySlug, subcategorySlug: subcategorySlug };
                    const trans = getTranslatedProduct(dummy, currentLang);
                    if (trans.subcategory) subTitle = trans.subcategory;
                }
                title += ' - ' + subTitle;
            }
        }

        // Update the document title
        document.title = title + ' - Docman Labs';
    }

    // Get filtered products based on category and subcategory
    function getFilteredProductsLocal(categorySlug, subcategorySlug) {
        // Use the global function from product-data.js if available
        if (typeof getFilteredProducts === 'function') {
            return getFilteredProducts(categorySlug, subcategorySlug);
        }

        // Fallback to PRODUCT_DATA if function not available
        let filtered = PRODUCT_DATA || [];

        if (categorySlug && categorySlug !== 'all') {
            filtered = filtered.filter(p => p.categorySlug === categorySlug);
        }

        if (subcategorySlug) {
            filtered = filtered.filter(p => p.subcategorySlug === subcategorySlug);
        }

        return filtered;
    }

    // Pagination State
    let currentPage = parseInt(getUrlParameter('page')) || 1;
    const productsPerPage = 10;
    let currentFilteredProducts = []; // Store currently filtered products for pagination

    // Reset pagination when filter changes
    function resetPagination() {
        currentPage = 1;
    }

    // Scroll to top of product container
    function scrollToTop() {
        if (productsContainer) {
            const headerOffset = 120; // Adjust for header height
            const elementPosition = productsContainer.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    }

    // Go to specific page
    window.goToPage = function (page) {
        if (page < 1) return;
        const totalPages = Math.ceil(currentFilteredProducts.length / productsPerPage);
        if (page > totalPages) return;

        currentPage = page;

        // Update URL
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('page', page);
        const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
        window.history.pushState({ path: newUrl }, '', newUrl);

        renderProductsPage(); // Render specific page
        scrollToTop();
    };

    // Render Pagination Controls
    function renderPaginationControls(totalItems) {
        const paginationInfo = document.getElementById('pagination-info');
        const paginationControls = document.getElementById('pagination-controls');

        if (!paginationInfo || !paginationControls) return;

        const totalPages = Math.ceil(totalItems / productsPerPage);

        // Hide if no items or single page (optional, but requested requirement implies controls always or just for navigation. 
        // Use case: if 0 items, hide. If < 10 items, show disabled or hide? usually hide controls but show info)
        if (totalItems === 0) {
            paginationInfo.innerHTML = '';
            paginationControls.innerHTML = '';
            return;
        }

        // Update Info
        const startItem = (currentPage - 1) * productsPerPage + 1;
        const endItem = Math.min(currentPage * productsPerPage, totalItems);
        paginationInfo.innerHTML = `Showing <strong>${startItem}-${endItem}</strong> of <strong>${totalItems}</strong> products`;

        // Generate Controls
        let controlsHtml = '';

        // Previous Button
        controlsHtml += `
            <button class="page-btn nav-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="window.goToPage(${currentPage - 1})">
                <i class="fa-solid fa-chevron-left"></i> <span>Prev</span>
            </button>
        `;

        // Page Numbers
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        if (startPage > 1) {
            controlsHtml += `<button class="page-btn" onclick="window.goToPage(1)">1</button>`;
            if (startPage > 2) {
                controlsHtml += `<span class="page-ellipsis">...</span>`;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            controlsHtml += `
                <button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="window.goToPage(${i})">
                    ${i}
                </button>
            `;
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                controlsHtml += `<span class="page-ellipsis">...</span>`;
            }
            controlsHtml += `<button class="page-btn" onclick="window.goToPage(${totalPages})">${totalPages}</button>`;
        }

        // Next Button
        controlsHtml += `
            <button class="page-btn nav-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="window.goToPage(${currentPage + 1})">
                <span>Next</span> <i class="fa-solid fa-chevron-right"></i>
            </button>
        `;

        paginationControls.innerHTML = controlsHtml;
    }

    // Expose functions for search.js (and other modules)
    window.setFilteredProducts = function (products) {
        currentFilteredProducts = products;
    };
    window.renderProductsPage = renderProductsPage;
    window.resetPagination = resetPagination;
    window.renderPaginationControls = renderPaginationControls;

    // Render current page of products
    function renderProductsPage() {
        productsContainer.innerHTML = '';

        // Handle Empty State
        if (currentFilteredProducts.length === 0) {
            productsContainer.innerHTML = `
                <div class="no-products-message">
                    <i class="fa-solid fa-box-open"></i>
                    <p>No products found.</p>
                </div>
            `;
            renderPaginationControls(0);
            updateSidebarCounts();
            return;
        }

        // Slice products for current page
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const productsToShow = currentFilteredProducts.slice(startIndex, endIndex);

        productsToShow.forEach(product => {
            // Translate Product Data
            const currentLang = localStorage.getItem('selectedLanguage') || 'EN';
            let displayProduct = product;
            if (typeof getTranslatedProduct === 'function') {
                displayProduct = getTranslatedProduct(product, currentLang);
            }

            const card = document.createElement('div');
            card.className = 'product-card';

            // Add subcategory info if available
            const subcategoryInfo = displayProduct.subcategory ? `<span class="card-subcategory">${displayProduct.subcategory}</span>` : '';

            // Check for search query to highlight
            const urlParams = new URLSearchParams(window.location.search);
            const searchQuery = urlParams.get('search');
            let displayTitle = displayProduct.title;

            if (searchQuery && typeof window.highlightMatch === 'function') {
                displayTitle = window.highlightMatch(displayTitle, searchQuery);
            }

            // Check for highlight ID (scroll to)
            const highlightId = urlParams.get('highlight');
            if (highlightId && parseInt(highlightId) === displayProduct.id) {
                card.classList.add('highlighted');
                // Scroll to this card after render
                setTimeout(() => {
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
            }

            const contentHtml = `
                <div class="card-details">
                    <span class="card-category">${displayProduct.category}</span>
                    ${subcategoryInfo}
                    <h3 class="card-title">${displayTitle}</h3>
                    <p class="card-desc">${displayProduct.desc}</p>
                </div>
                <button class="add-btn" data-id="${displayProduct.id}" data-title="${displayProduct.title}" data-cat="${displayProduct.category}" data-pkg="${displayProduct.packaging}" data-unit="${displayProduct.unit}">
                    <i class="fa-solid fa-plus"></i> Add to List
                </button>
            `;

            card.innerHTML = contentHtml;
            productsContainer.appendChild(card);
        });

        // Re-attach listeners
        attachAddListeners();

        // Render Pagination Controls
        renderPaginationControls(currentFilteredProducts.length);

        // Update Sidebar (counts remain total)
        updateSidebarCounts();
    }

    function attachAddListeners() {
        document.querySelectorAll('.add-btn').forEach(btn => {
            // Check if already in list (from localStorage)
            const id = parseInt(btn.dataset.id);
            if (listItems.find(i => i.id === id)) {
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Added';
                btn.classList.add('added');
            }

            btn.addEventListener('click', function () {
                if (this.classList.contains('added')) return; // Ignore if already added

                window.currentProductButton = this;
                const title = this.getAttribute('data-title');
                const cat = this.getAttribute('data-cat');
                const pkg = this.getAttribute('data-pkg');

                // Populate Modal Data
                modalTitle.textContent = title;
                modalCat.textContent = cat;

                // Reset Form Fields
                modalQty.value = 5000;
                modalCustomization.value = '';
                modalWhiteLabel.checked = false;
                modalSpecs.value = '';

                // Open Modal
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
    }

    // Render Function (No Images)
    function renderProducts() {
        // Only if we are on the products-listing page
        if (!productsContainer) return;

        // If there's a search query in the URL, let search.js handle rendering
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('search');
        if (searchQuery && searchQuery.trim().length >= 2) {
            // search.js will handle filtering and rendering
            updateSidebarCounts();
            return;
        }

        // Get category and subcategory from URL parameters
        const categorySlug = getUrlParameter('category');
        const subcategorySlug = getUrlParameter('subcategory');

        // Update sidebar active state
        updateSidebarActiveState(categorySlug, subcategorySlug);

        // Get filtered products
        currentFilteredProducts = getFilteredProductsLocal(categorySlug, subcategorySlug);

        // Show message if no products found
        if (currentFilteredProducts.length === 0) {
            productsContainer.innerHTML = `
                <div class="no-products-message">
                    <i class="fa-solid fa-box-open"></i>
                    <p>No products found in this category.</p>
                </div>
            `;
            // Clear pagination
            const paginationInfo = document.getElementById('pagination-info');
            const paginationControls = document.getElementById('pagination-controls');
            if (paginationInfo) paginationInfo.innerHTML = '';
            if (paginationControls) paginationControls.innerHTML = '';
            return;
        }

        // Reset pagination if category changed (checked typically by comparing stored slug, but simpler to just reset on full render call)
        // Ideally we only want to reset if the *filter set* changed, not just a re-render. 
        // But renderProducts() is usually called on load or filter change.
        // We need to persist page if only language changed?
        // For now, let's reset to page 1 on fresh render calls primarily driven by filter changes.
        // resetPagination(); // Called explicitly? Or logic here?
        // Let's assume renderProducts implies a fresh set or initial load.
        // If we want to support "refresh current page", we'd call renderProductsPage directly.

        // Reset pagination only if page param is missing?
        // Actually since we init currentPage from URL, we should NOT reset it blindly here.
        // But if filtering changed logic... (e.g. language change?)
        // Let's assume URL is truth.
        // resetPagination(); 

        // If the calculated page is out of bounds (e.g. filtered list smaller), we should adjust.
        const totalPages = Math.ceil(currentFilteredProducts.length / productsPerPage);
        if (currentPage > totalPages && totalPages > 0) {
            currentPage = 1; // Fallback
        }

        renderProductsPage();
    }

    // Update sidebar category counts dynamically
    function updateSidebarCounts() {
        if (typeof getAllCategoryCounts !== 'function' || typeof PRODUCT_DATA === 'undefined') return;

        const counts = getAllCategoryCounts();
        const sidebarLinks = document.querySelectorAll('.sidebar-categories .category-item');

        sidebarLinks.forEach(link => {
            const category = link.getAttribute('data-category');
            const countSpan = link.querySelector('.cat-count');

            if (countSpan) {
                if (category === 'all') {
                    countSpan.textContent = PRODUCT_DATA.length;
                } else if (counts[category]) {
                    countSpan.textContent = counts[category];
                } else {
                    countSpan.textContent = '0';
                }
            }
        });
    }

    // Modal Logic
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        window.currentProductButton = null;
    }

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalCancelBtn) modalCancelBtn.addEventListener('click', closeModal);

    // Close on clicking outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // List / Cart State - Load from LocalStorage
    let listItems = JSON.parse(localStorage.getItem('myProductList')) || [];

    // Sidebar Elements
    const qvSidebar = document.getElementById('quick-view-sidebar');
    const qvBody = document.getElementById('qv-body');
    const qvCloseBtn = document.getElementById('qv-close');
    const myListBtn = document.querySelector('.my-list-btn');

    function saveList() {
        localStorage.setItem('myProductList', JSON.stringify(listItems));
    }

    // Confirm Add Logic
    if (modalConfirmBtn) {
        modalConfirmBtn.addEventListener('click', () => {
            if (window.currentProductButton) {
                const qty = parseInt(modalQty.value) || 1;
                const title = modalTitle.textContent;
                const category = modalCat.textContent;
                const id = parseInt(window.currentProductButton.getAttribute('data-id'));
                const packaging = window.currentProductButton.getAttribute('data-pkg');
                const unit = window.currentProductButton.getAttribute('data-unit') || 'units';

                const customization = modalCustomization.value;
                const whiteLabel = modalWhiteLabel.checked ? "Requested" : "Not Requested";
                const specs = modalSpecs.value;

                // Check if already in list
                const existingItem = listItems.find(item => item.id === id);
                if (existingItem) {
                    existingItem.qty += qty;
                    // Update other fields if needed, or keep original? Overwrite for now.
                    existingItem.customization = customization;
                    existingItem.whiteLabel = whiteLabel;
                    existingItem.userSpecs = specs;
                } else {
                    listItems.push({
                        id,
                        title, // name in my-list.js
                        category,
                        packaging,
                        qty,
                        unit,
                        customization,
                        whiteLabel,
                        userSpecs: specs
                    });
                }

                saveList();

                // Change Button State
                window.currentProductButton.innerHTML = '<i class="fa-solid fa-check"></i> Added';
                window.currentProductButton.classList.add('added');

                // Close modal
                closeModal();

                // Start Quick View Update
                updateQuickView();
                openQuickView(true);
            }
        });
    }

    // Quick View Functions
    const catToggleBtn = document.getElementById('cat-toggle-btn');
    const reopenSidebarBtn = document.getElementById('reopen-sidebar-btn');
    const reopenCount = document.getElementById('reopen-count');

    function updateReopenBtnState() {
        if (!reopenSidebarBtn) return;

        // Show if: List has items AND sidebar is NOT active
        const hasItems = listItems.length > 0;
        const isClosed = !document.body.classList.contains('split-view');

        if (hasItems) {
            reopenCount.textContent = listItems.length;
        }

        if (hasItems && isClosed) {
            reopenSidebarBtn.style.display = 'flex';
        } else {
            reopenSidebarBtn.style.display = 'none';
        }
    }

    function updateQuickView() {
        if (!qvSidebar) return;

        const currentLang = localStorage.getItem('selectedLanguage') || 'EN';

        // Update Header Subtitle (Total Items)
        const totalItems = listItems.length;
        // Find or create subtitle in header
        let subtitle = qvSidebar.querySelector('.qv-subtitle');
        if (!subtitle) {
            const header = qvSidebar.querySelector('.qv-header');
            subtitle = document.createElement('p');
            subtitle.className = 'qv-subtitle';
            header.appendChild(subtitle);
        }
        subtitle.textContent = `${totalItems} items`;


        if (listItems.length === 0) {
            qvBody.innerHTML = `
                <div class="qv-empty">
                    <i class="fa-solid fa-basket-shopping"></i>
                    <p>Your list is empty</p>
                </div>
            `;

            // Auto Close if empty
            closeQuickView();
            return;
        }

        // Open if persistent rules apply
        if (!document.body.classList.contains('split-view')) {
            // Logic to auto-open only on ADD, but here we just update.
            // We'll rely on openQuickView() call from the add handler.
        }

        qvBody.innerHTML = '';

        listItems.forEach(item => {
            let displayTitle = item.title;
            let displayCat = item.category;

            // Attempt to translate using global data if available
            if (typeof PRODUCT_DATA !== 'undefined' && typeof getTranslatedProduct === 'function') {
                const originalProduct = PRODUCT_DATA.find(p => p.id === item.id);
                if (originalProduct) {
                    const translated = getTranslatedProduct(originalProduct, currentLang);
                    displayTitle = translated.title;
                    displayCat = translated.category;
                }
            }

            const itemEl = document.createElement('div');
            itemEl.className = 'qv-item';

            // Text Only Content (No Image)
            itemEl.innerHTML = `
                <div class="qv-item-details">
                    <div class="qv-item-cat">${displayCat}</div>
                    <div class="qv-item-title">${displayTitle}</div>
                    <div class="qv-item-pkg">Packaging: ${item.packaging || 'N/A'}</div>
                    
                    <div class="qv-item-actions">
                        <div class="qv-qty-selector">
                            <span class="qv-qty-pill">Qty: ${item.qty}</span>
                        </div>
                        <button class="qv-remove-btn" data-id="${item.id}">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </div>
            `;
            qvBody.appendChild(itemEl);
        });

        updateReopenBtnState();
    }

    function openQuickView(showAddedMsg = false) {
        if (!qvSidebar) return;
        qvSidebar.classList.add('active');
        document.body.classList.add('split-view'); // Enable Split View
        updateReopenBtnState();
    }

    function closeQuickView() {
        if (!qvSidebar) return;
        qvSidebar.classList.remove('active');
        document.body.classList.remove('split-view'); // disable Split View
        updateReopenBtnState();
    }

    // Sidebar Events
    if (qvCloseBtn) {
        qvCloseBtn.addEventListener('click', closeQuickView);
    }

    // Reopen Button Logic
    if (reopenSidebarBtn) {
        reopenSidebarBtn.addEventListener('click', () => openQuickView(false));
    }

    // Category Toggle restores normal view (closes QV which restores sidebar)
    if (catToggleBtn) {
        catToggleBtn.addEventListener('click', closeQuickView);
    }

    // Event Delegation for Sidebar Buttons
    if (qvBody) {
        qvBody.addEventListener('click', (e) => {
            const btn = e.target.closest('.qv-remove-btn');
            if (!btn) return;

            const id = parseInt(btn.dataset.id);
            listItems = listItems.filter(i => i.id !== id);
            saveList();

            // Update button state back on the page
            const addBtn = document.querySelector(`.add-btn[data-id="${id}"]`);
            if (addBtn) {
                addBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add to List';
                addBtn.classList.remove('added');
            }

            updateQuickView();
        });
    }

    // View Switching logic
    function switchView(viewName) {
        if (!productsContainer) return;
        productsContainer.classList.remove('list-view', 'grid-view-2', 'grid-view-3');
        [viewListBtn, viewGrid2Btn, viewGrid3Btn].forEach(btn => btn && btn.classList.remove('active'));

        if (viewName === 'list') {
            productsContainer.classList.add('list-view');
            viewListBtn && viewListBtn.classList.add('active');
        } else if (viewName === 'grid-2') {
            productsContainer.classList.add('grid-view-2');
            viewGrid2Btn && viewGrid2Btn.classList.add('active');
        } else if (viewName === 'grid-3') {
            productsContainer.classList.add('grid-view-3');
            viewGrid3Btn && viewGrid3Btn.classList.add('active');
        }
    }

    if (viewListBtn) viewListBtn.addEventListener('click', () => switchView('list'));
    if (viewGrid2Btn) viewGrid2Btn.addEventListener('click', () => switchView('grid-2'));
    if (viewGrid3Btn) viewGrid3Btn.addEventListener('click', () => switchView('grid-3'));

    renderProducts();
    if (productsContainer && !productsContainer.classList.contains('list-view') &&
        !productsContainer.classList.contains('grid-view-2') &&
        !productsContainer.classList.contains('grid-view-3')) {
        switchView('list');
    }

    // Initialize Quick View if items exist (but don't force open unless user interacts)
    if (listItems.length > 0) {
        updateQuickView();
    }

    // Listen for Language Changes handled by main.js
    window.addEventListener('languageChanged', (e) => {
        // e.detail.language contains the new language
        renderProducts();

        // Also update title
        const categorySlug = getUrlParameter('category');
        const subcategorySlug = getUrlParameter('subcategory');
        updatePageTitle(categorySlug, subcategorySlug);
    });
});
