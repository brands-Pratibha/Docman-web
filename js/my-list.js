document.addEventListener('DOMContentLoaded', () => {
    let displayProducts = [];
    let selectedProductId = null;

    // Elements
    const productListEl = document.getElementById('product-list');
    const listCountEl = document.getElementById('list-count');
    const totalQtyEl = document.getElementById('total-qty');
    const detailPanelEl = document.getElementById('detail-panel');

    // Outline Trash Icon SVG
    const trashIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 6H5H21" stroke="#FF5C5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="#FF5C5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="#FF5C5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

    function formatNumber(num) {
        return num.toLocaleString();
    }

    function saveToLocalStorage() {
        // Map displayProducts back to minimal storage format
        const itemsToSave = displayProducts.map(p => ({
            id: p.id,
            qty: p.qty,
            unit: p.unit,
            whiteLabel: p.whiteLabel
        }));
        localStorage.setItem('myProductList', JSON.stringify(itemsToSave));
    }

    function loadData() {
        // Check dependencies
        if (typeof PRODUCT_DATA === 'undefined') {
            console.error('PRODUCT_DATA not found. Ensure product-data.js is included.');
            return;
        }

        const storedItems = JSON.parse(localStorage.getItem('myProductList')) || [];
        const currentLang = localStorage.getItem('selectedLanguage') || 'EN';

        // Map Stored Items with Catalog Data & Translation
        displayProducts = storedItems.map(item => {
            const catalogItem = PRODUCT_DATA.find(p => p.id === item.id);

            // If product not found in current data, skip it
            if (!catalogItem) return null;

            // Translation Logic
            let title = catalogItem.title;
            let category = catalogItem.category;
            let desc = catalogItem.desc;

            // Apply translation if function available
            if (typeof getTranslatedProduct === 'function') {
                const trans = getTranslatedProduct(catalogItem, currentLang);
                title = trans.title;
                category = trans.category;
                desc = trans.desc;
            }

            return {
                id: catalogItem.id,
                name: title,
                category: category,
                description: desc,
                specs: desc, // Using desc as placeholder for specs if needed, or static
                usage: window.getTranslation ? window.getTranslation('msg_refer_usage') : "Refer to product packaging or technical data sheet.",
                // usage fallback to hardcoded if no key, but we didn't add msg_refer_usage. Keeping hardcoded or using existing keys?
                // I'll leave usage hardcoded for now or use a generic string if available.
                usage: "Refer to product packaging or technical data sheet.",

                composition: "N/A",
                material: "N/A",
                image: "assets/logo.png",

                // User selections (Persisted)
                qty: item.qty,
                unit: item.unit || catalogItem.unit || 'units',
                whiteLabel: item.whiteLabel || 'Not Requested'
            };
        }).filter(item => item !== null);

        // Ensure selectedProductId is valid
        if (displayProducts.length > 0) {
            if (!selectedProductId || !displayProducts.find(p => p.id === selectedProductId)) {
                selectedProductId = displayProducts[0].id;
            }
        } else {
            selectedProductId = null;
        }
    }

    function renderList() {
        if (!productListEl) return;
        productListEl.innerHTML = '';

        if (displayProducts.length === 0) {
            const emptyMsg = window.getTranslation ? window.getTranslation('msg_list_empty') : "Your list is currently empty";
            const emptySub = window.getTranslation ? window.getTranslation('msg_list_empty_sub') : "Browse products to add items here";
            const browseBtn = window.getTranslation ? window.getTranslation('lbl_browse_products') : "Browse Products";

            productListEl.innerHTML = `
                <div class="empty-list-state" style="text-align: center; padding: 60px 20px; color: #888;">
                    <i class="fa-solid fa-basket-shopping" style="font-size: 48px; color: #ddd; margin-bottom: 16px;"></i>
                    <p style="font-size: 16px; font-weight: 500; margin: 0;">${emptyMsg}</p>
                    <p style="font-size: 14px; color: #aaa; margin-top: 8px;">${emptySub}</p>
                    <a href="products.html" style="display: inline-block; margin-top: 20px; color: #248F84; text-decoration: none; font-weight: 600;">${browseBtn}</a>
                </div>
            `;
            if (listCountEl) listCountEl.textContent = `(0)`;
            if (totalQtyEl) totalQtyEl.textContent = `0`;
            renderDetail(null);
            return;
        }

        let totalQty = 0;

        displayProducts.forEach(product => {
            totalQty += product.qty;

            const itemEl = document.createElement('div');
            itemEl.className = `list-item ${selectedProductId === product.id ? 'active' : ''}`;
            itemEl.onclick = (e) => {
                // Prevent click if clicking delete
                if (e.target.closest('.delete-btn')) return;

                selectedProductId = product.id;
                renderList(); // Re-render to update active state
                renderDetail(product.id);
            };

            const itemHTML = `
                <div class="item-top">
                    <div class="item-info">
                        <h3>${product.name}</h3>
                        <p class="item-category">${product.category}</p>
                    </div>
                    <button class="delete-btn" data-id="${product.id}">
                        ${trashIcon}
                    </button>
                </div>
                <div class="item-bottom">
                    <span class="qty-pill">Qty: ${formatNumber(product.qty)}</span>
                </div>
            `;
            itemEl.innerHTML = itemHTML;
            productListEl.appendChild(itemEl);
        });

        if (listCountEl) listCountEl.textContent = `(${displayProducts.length})`;
        if (totalQtyEl) totalQtyEl.textContent = formatNumber(totalQty);

        // Attach delete handlers
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(btn.dataset.id);
                deleteProduct(id);
            });
        });
    }

    function renderDetail(id) {
        if (!detailPanelEl) return;

        if (!id) {
            detailPanelEl.innerHTML = `
                <div class="product-detail-view" style="text-align: center; color: #888; padding-top: 50px;">
                    <p>Select an item to view details</p>
                </div>`;
            return;
        }

        const product = displayProducts.find(p => p.id === id);
        if (!product) return;

        const lblDetails = window.getTranslation ? window.getTranslation('lbl_product_details') : "Product Details";
        const lblQty = window.getTranslation ? window.getTranslation('lbl_quantity') : "Quantity";
        const lblDesc = window.getTranslation ? window.getTranslation('lbl_description') : "Description";
        const lblUsage = window.getTranslation ? window.getTranslation('lbl_usage') : "Usage Info";
        const lblWhite = window.getTranslation ? window.getTranslation('lbl_white_label') : "White Labeling";

        const detailHTML = `
            <div class="product-detail-view">
                 <div class="panel-header" style="border-bottom:none; margin-bottom: 40px;">
                    <h2>${lblDetails}</h2>
                 </div>
                
                <div class="detail-info">
                    <h2>${product.name}</h2>
                    <p class="detail-category" style="margin-bottom: 32px;">${product.category}</p>
                    
                     <div class="detail-row">
                        <span class="detail-label">${lblQty}</span>
                        <div class="detail-value">${formatNumber(product.qty)} ${product.unit}</div>
                    </div>

                    <div class="detail-row">
                        <span class="detail-label">${lblDesc}</span>
                        <div class="detail-value" style="white-space: pre-line;">${product.description}</div>
                    </div>
                    
                    <div class="detail-row">
                         <span class="detail-label">${lblUsage}</span>
                         <div class="detail-value">${product.usage}</div>
                    </div>

                    <div class="detail-row">
                        <span class="detail-label">${lblWhite}</span>
                        <div class="white-label-badge">${product.whiteLabel}</div>
                    </div>
                </div>
            </div>
        `;

        detailPanelEl.innerHTML = detailHTML;
    }

    function deleteProduct(id) {
        if (confirm('Are you sure you want to remove this item?')) {
            // Remove from storage list
            let storedItems = JSON.parse(localStorage.getItem('myProductList')) || [];
            storedItems = storedItems.filter(p => p.id !== id);
            localStorage.setItem('myProductList', JSON.stringify(storedItems));

            // Reload data to reflect change
            loadData();
            renderList();
            renderDetail(selectedProductId);
        }
    }

    // Initial Render
    loadData();
    renderList();
    if (selectedProductId) {
        renderDetail(selectedProductId);
    }

    // Update Section Headers in my-list.html using Translations if element exists
    // (This handles the static HTML headers dynamically on load/change)
    function updateStaticHeaders() {
        const itemsHeader = document.querySelector('.panel-header h2');
        // Logic: The left panel header "Items in List" is inside .panel-header h2. 
        // But detail panel also uses .panel-header h2.
        // Need specific selector.
        // Left panel: .list-left-panel .panel-header h2
        const leftHeader = document.querySelector('.list-left-panel .panel-header h2');
        if (leftHeader && window.getTranslation) leftHeader.textContent = window.getTranslation('lbl_items_in_list');
    }
    updateStaticHeaders();


    // Listen for Language Changes
    window.addEventListener('languageChanged', (e) => {
        loadData();
        renderList();
        if (selectedProductId) {
            renderDetail(selectedProductId);
        }
        updateStaticHeaders();
    });
});
