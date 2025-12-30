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

    let currentProductButton = null;

    // Dummy Data - 6 items matching my-list.js IDs generally
    // Note: IDs in my-list.js are 1, 2, 3, 4. We should align them or handle mapping.
    // Ideally, products-listing.js should pull from a central catalog, but for now we maintain the mock matching.
    const products = [
        {
            id: 1,
            category: "Diagnostic Equipment",
            title: "Digital X-Ray Machine",
            desc: "High-resolution digital X-ray system with advanced imaging.",
            packaging: "Unit",
            unit: "unit"
        },
        {
            id: 2,
            category: "Monitoring Equipment",
            title: "Patient Monitoring System",
            desc: "Advanced patient monitoring with real-time vitals tracking.",
            packaging: "Unit",
            unit: "units"
        },
        {
            id: 3,
            category: "Patient Care",
            title: "Hospital Bed - Electric",
            desc: "Fully electric hospital bed with adjustable positioning.",
            packaging: "Unit",
            unit: "unit"
        },
        {
            id: 4,
            category: "Diagnostic Equipment",
            title: "Ultrasound Scanner",
            desc: "Portable ultrasound scanner with multiple probe options.",
            packaging: "Unit",
            unit: "units"
        },
        {
            id: 5,
            category: "Pharmaceutical Products",
            title: "Amoxicillin 500mg",
            desc: "Broad-spectrum antibiotic.",
            packaging: "Blister Pack",
            unit: "pack"
        },
        {
            id: 6,
            category: "Medical Disposables",
            title: "Surgical Gloves",
            desc: "Sterile latex surgical gloves.",
            packaging: "Box (50 pairs)",
            unit: "box"
        }
    ];

    // Render Function (No Images)
    function renderProducts() {
        // Only if we are on the products-listing page
        if (!productsContainer) return;

        productsContainer.innerHTML = '';
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';

            const contentHtml = `
                <div class="card-details">
                    <span class="card-category">${product.category}</span>
                    <h3 class="card-title">${product.title}</h3>
                    <p class="card-desc">${product.desc}</p>
                </div>
                <!-- Pass packaging data attribute -->
                <button class="add-btn" data-id="${product.id}" data-title="${product.title}" data-cat="${product.category}" data-pkg="${product.packaging}" data-unit="${product.unit}">
                    <i class="fa-solid fa-plus"></i> Add to List
                </button>
            `;

            card.innerHTML = contentHtml;
            productsContainer.appendChild(card);
        });

        // Add Event Listeners to new buttons
        document.querySelectorAll('.add-btn').forEach(btn => {
            // Check if already in list (from localStorage)
            const id = parseInt(btn.dataset.id);
            if (listItems.find(i => i.id === id)) {
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Added';
                btn.classList.add('added');
            }

            btn.addEventListener('click', function () {
                if (this.classList.contains('added')) return; // Ignore if already added

                currentProductButton = this;
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

    // Modal Logic
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        currentProductButton = null;
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
            if (currentProductButton) {
                const qty = parseInt(modalQty.value) || 1;
                const title = modalTitle.textContent;
                const category = modalCat.textContent;
                const id = parseInt(currentProductButton.getAttribute('data-id'));
                const packaging = currentProductButton.getAttribute('data-pkg');
                const unit = currentProductButton.getAttribute('data-unit') || 'units';

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
                currentProductButton.innerHTML = '<i class="fa-solid fa-check"></i> Added';
                currentProductButton.classList.add('added');

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
            const itemEl = document.createElement('div');
            itemEl.className = 'qv-item';

            // Text Only Content (No Image)
            itemEl.innerHTML = `
                <div class="qv-item-details">
                    <div class="qv-item-cat">${item.category}</div>
                    <div class="qv-item-title">${item.title}</div>
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
});
