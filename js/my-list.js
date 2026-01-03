document.addEventListener('DOMContentLoaded', () => {
    // Load Items from LocalStorage
    let storedItems = JSON.parse(localStorage.getItem('myProductList')) || [];

    // Check if PRODUCT_DATA is available (should be loaded from product-data.js)
    if (typeof PRODUCT_DATA === 'undefined') {
        console.error('PRODUCT_DATA not found. Ensure product-data.js is included.');
        return;
    }

    // Merge Stored Items with Catalog Data (PRODUCT_DATA)
    let displayProducts = storedItems.map(item => {
        const catalogItem = PRODUCT_DATA.find(p => p.id === item.id);

        // If product not found in current data, we skip it (or could show as "Unknown Product")
        if (!catalogItem) return null;

        return {
            id: catalogItem.id,
            name: catalogItem.title, // Map title to name for compatibility
            category: catalogItem.category,
            // Fallback for rich data that isn't in PRODUCT_DATA
            description: catalogItem.desc,
            specs: catalogItem.desc, // Use desc as simple specs
            usage: "Refer to product packaging or technical data sheet.",
            composition: "N/A",
            material: "N/A",
            image: "assets/logo.png", // Default placeholder

            // User selections
            qty: item.qty,
            unit: item.unit || catalogItem.unit || 'units',
            whiteLabel: item.whiteLabel || 'Not Requested'
        };
    }).filter(item => item !== null);


    let selectedProductId = displayProducts.length > 0 ? displayProducts[0].id : null;

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

    function renderList() {
        productListEl.innerHTML = '';

        if (displayProducts.length === 0) {
            productListEl.innerHTML = `
                <div class="empty-list-state" style="text-align: center; padding: 60px 20px; color: #888;">
                    <i class="fa-solid fa-basket-shopping" style="font-size: 48px; color: #ddd; margin-bottom: 16px;"></i>
                    <p style="font-size: 16px; font-weight: 500; margin: 0;">Your list is currently empty</p>
                    <p style="font-size: 14px; color: #aaa; margin-top: 8px;">Browse products to add items here</p>
                    <a href="products-listing.html" style="display: inline-block; margin-top: 20px; color: #248F84; text-decoration: none; font-weight: 600;">Browse Products</a>
                </div>
            `;
            listCountEl.textContent = `(0)`;
            totalQtyEl.textContent = `0`;
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

        listCountEl.textContent = `(${displayProducts.length})`;
        totalQtyEl.textContent = formatNumber(totalQty);

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
        if (!id) {
            detailPanelEl.innerHTML = `
                <div class="product-detail-view" style="text-align: center; color: #888; padding-top: 50px;">
                    <p>Select an item to view details</p>
                </div>`;
            return;
        }

        const product = displayProducts.find(p => p.id === id);
        if (!product) return;

        // Since we removed detailed specs/usage/etc from PRODUCT_DATA, we simplified this view
        // to show available info + user choices.

        const detailHTML = `
            <div class="product-detail-view">
                 <div class="panel-header" style="border-bottom:none; margin-bottom: 40px;">
                    <h2>Product Details</h2>
                 </div>
                
                <div class="detail-info">
                    <h2>${product.name}</h2>
                    <p class="detail-category" style="margin-bottom: 32px;">${product.category}</p>
                    
                     <div class="detail-row">
                        <span class="detail-label">Quantity</span>
                        <div class="detail-value">${formatNumber(product.qty)} ${product.unit}</div>
                    </div>

                    <div class="detail-row">
                        <span class="detail-label">Description</span>
                        <div class="detail-value" style="white-space: pre-line;">${product.description}</div>
                    </div>
                    
                    <div class="detail-row">
                         <span class="detail-label">Usage Info</span>
                         <div class="detail-value">${product.usage}</div>
                    </div>

                    <div class="detail-row">
                        <span class="detail-label">White Labeling</span>
                        <div class="white-label-badge">${product.whiteLabel}</div>
                    </div>
                </div>
            </div>
        `;

        detailPanelEl.innerHTML = detailHTML;
    }

    function deleteProduct(id) {
        if (confirm('Are you sure you want to remove this item?')) {
            displayProducts = displayProducts.filter(p => p.id !== id);
            saveToLocalStorage(); // Persist removal

            if (selectedProductId === id) {
                if (displayProducts.length > 0) {
                    selectedProductId = displayProducts[0].id;
                } else {
                    selectedProductId = null;
                }
            }
            renderList();
            renderDetail(selectedProductId);
        }
    }

    // Initial Render
    renderList();
    if (selectedProductId) {
        renderDetail(selectedProductId);
    }
});
