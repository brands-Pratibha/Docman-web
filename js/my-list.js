document.addEventListener('DOMContentLoaded', () => {
    // Static Product Catalog (Rich Data)
    const productCatalog = {
        1: {
            id: 1,
            name: "Digital X-Ray Machine",
            category: "Diagnostic Equipment",
            description: "High-resolution digital X-ray system with advanced imaging capabilities for accurate diagnostics.",
            specs: "Detector Type: Flat Panel (CsI/GoS)\nPower Output: 32kW / 40kW / 50kW\nPixel Pitch: 139 µm",
            usage: "Used in hospitals and diagnostic centers for general radiography and skeletal imaging.",
            composition: "Includes X-ray tube, High-frequency generator, Flat Panel Detector, and Workstation.",
            material: "Medical grade steel chassis with lead shielding.",
            image: "http://localhost:3845/assets/6daa41b1f7a685690c48c31671c3cdea0960b420.png"
        },
        2: {
            id: 2,
            name: "Patient Monitoring System",
            category: "Monitoring Equipment",
            description: "Advanced patient monitoring system with real-time vitals tracking and remote access capabilities.",
            specs: "Screen Size: 12.1 inch TFT Color Display\nParameters: ECG, SPO2, NIBP, RESP, TEMP\nBattery: Rechargeable Li-ion (4 hours)",
            usage: "ICU, Operation Theatres, and General Wards for continuous patient monitoring.",
            composition: "Main monitor unit, ECG cables, SpO2 sensor, NIBP cuff, and Temperature probe.",
            material: "High-impact ABS plastic casing.",
            image: "http://localhost:3845/assets/a560a1395995c99d482c6a902ba94275ebe68c12.png"
        },
        3: {
            id: 3,
            name: "Hospital Bed - Electric",
            category: "Patient Care",
            description: "Fully electric hospital bed with adjustable height, backrest, and leg rest, designed for patient comfort.",
            specs: "Load Capacity: 250 kg\nAdjustments: Backrest (0-75°), Knee rest (0-45°), Height (450 mm - 750 mm)\nMotors: 3 Linear Actuators",
            usage: "In-patient departments for long-term patient care and recovery.",
            composition: "Steel frame with epoxy powder coating, ABS head/foot panels, and collateral railings.",
            material: "Cold-rolled steel with anti-bacterial ABS plastic panels.",
            image: "http://localhost:3845/assets/a691331be57ebdf2a73f2c065e45414b8e560d53.png"
        },
        4: {
            id: 4,
            name: "Ultrasound Scanner",
            category: "Diagnostic Equipment",
            description: "Portable ultrasound scanner with multiple probe options for versatile diagnostic applications.",
            specs: "Display: 15-inch LCD\nModes: B, B/B, 4B, M, B/M\nProbes: Convex, Linear, Transvaginal",
            usage: "Obstetrics, Gynecology, Cardiology, and Abdominal imaging.",
            composition: "Main console, Transducer probes, and Imaging software.",
            material: "Reinforced plastic housing with silicone probe grips.",
            image: "http://localhost:3845/assets/8cf9544ac2f0fe8c693c2361244966deb3c9fdec.png"
        },
        5: {
            id: 5,
            name: "Amoxicillin 500mg",
            category: "Pharmaceutical Products",
            description: "Broad-spectrum antibiotic effective against a wide range of bacterial infections.",
            specs: "Dosage: 500mg\nForm: Capsule / Tablet\nShelf Life: 24 Months",
            usage: "Treatment of respiratory tract infections, urinary tract infections, and skin infections.",
            composition: "Active Ingredient: Amoxicillin Trihydrate.",
            material: "Medical grade blister packaging.",
            image: "assets/logo.png" // Placeholder or specific image
        },
        6: {
            id: 6,
            name: "Surgical Gloves",
            category: "Medical Disposables",
            description: "Sterile latex surgical gloves providing excellent tactile sensitivity and protection.",
            specs: "Material: Natural Rubber Latex\nSterilization: Gamma Radiation\nSize: 6.0 - 8.5",
            usage: "Surgical procedures and invasive medical examinations.",
            composition: "Latex with polymer coating.",
            material: "Natural Rubber Latex.",
            image: "assets/logo.png" // Placeholder
        }
    };

    // Load Items from LocalStorage
    let storedItems = JSON.parse(localStorage.getItem('myProductList')) || [];

    // If empty, seed with demo data logic removed to show actual empty state
    // if (storedItems.length === 0) { ... }

    // Merge Stored Items with Catalog Data
    let displayProducts = storedItems.map(item => {
        const catalogItem = productCatalog[item.id];
        if (!catalogItem) return null; // Skip if not in catalog

        return {
            ...catalogItem,
            qty: item.qty,
            unit: item.unit || 'units',
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

        const detailHTML = `
            <div class="product-detail-view">
                 <div class="panel-header" style="border-bottom:none; margin-bottom: 40px;">
                    <h2>Product Specifications</h2>
                 </div>
                <!-- Image Removed per request -->
                
                <div class="detail-info">
                    <h2>${product.name}</h2>
                    <p class="detail-category" style="margin-bottom: 32px;">${product.category}</p>
                    
                    <div class="detail-row">
                        <span class="detail-label">Units / Quantity</span>
                        <div class="detail-value">${formatNumber(product.qty)} ${product.unit}</div>
                    </div>

                    <div class="detail-row">
                        <span class="detail-label">Product Specifications</span>
                        <div class="detail-value" style="white-space: pre-line;">${product.specs}</div>
                    </div>
                    
                    <div class="detail-row">
                         <span class="detail-label">How and where to use</span>
                         <div class="detail-value">${product.usage}</div>
                    </div>

                    <div class="detail-row">
                         <span class="detail-label">Composition</span>
                         <div class="detail-value">${product.composition}</div>
                    </div>

                    <div class="detail-row">
                         <span class="detail-label">Material</span>
                         <div class="detail-value">${product.material}</div>
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
