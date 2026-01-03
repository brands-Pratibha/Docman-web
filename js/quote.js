document.addEventListener('DOMContentLoaded', () => {
    // 1. Data Source (Mirrors my-list.js logic)
    // Check if PRODUCT_DATA is available (should be loaded from product-data.js)
    if (typeof PRODUCT_DATA === 'undefined') {
        console.error('PRODUCT_DATA not found. Ensure product-data.js is included.');
        return;
    }

    // 2. Load Selected Items
    let storedItems = JSON.parse(localStorage.getItem('myProductList')) || [];

    const listContainer = document.getElementById('selected-items-list');
    const totalProductsEl = document.getElementById('total-products-count');
    const totalItemsEl = document.getElementById('total-items-qty');

    // 3. Render Items
    function renderSelectedItems() {
        if (storedItems.length === 0) {
            listContainer.innerHTML = '<p style="color: #888; text-align: center; padding: 20px;">No products selected.</p>';
            updateSummary(0, 0);
            return;
        }

        let totalQty = 0;
        let validItemCount = 0;
        listContainer.innerHTML = '';

        storedItems.forEach(item => {
            const catalogItem = PRODUCT_DATA.find(p => p.id === item.id);
            if (!catalogItem) return;

            validItemCount++;
            totalQty += (item.qty || 0);

            const itemEl = document.createElement('div');
            itemEl.className = 'selected-product-item';

            // Handle customizations display
            let configText = `Qty: ${item.qty}`;
            const unit = item.unit || catalogItem.unit || 'units';

            if (unit) configText += ` (${unit})`;

            itemEl.innerHTML = `
                <div class="product-details">
                    <div class="product-name">${catalogItem.title}</div>
                    <div class="product-config">${configText}</div>
                </div>
            `;
            listContainer.appendChild(itemEl);
        });

        updateSummary(validItemCount, totalQty);
    }

    function updateSummary(count, qty) {
        if (totalProductsEl) totalProductsEl.textContent = count;
        if (totalItemsEl) totalItemsEl.textContent = qty.toLocaleString();
    }

    // 4. Handle Form Submission & Validation
    const form = document.getElementById('quote-form');
    if (form) {
        // Real-time validation
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                validateField(input);
            });
            input.addEventListener('blur', () => {
                validateField(input);
            });
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });

            if (isValid) {
                // Collect Form Data
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());

                // Format Selected Products for Email
                let productsListString = '';
                if (storedItems.length === 0) {
                    productsListString = 'No products selected.';
                } else {
                    productsListString = storedItems.map((item, index) => {
                        const catalogItem = PRODUCT_DATA.find(p => p.id === item.id);
                        const title = catalogItem ? catalogItem.title : `Product ID: ${item.id}`;
                        const unit = item.unit || (catalogItem ? catalogItem.unit : '') || 'units';
                        return `${index + 1}. ${title} (Qty: ${item.qty} ${unit})`;
                    }).join('\n');
                }

                // Calculate Totals
                const totalQty = storedItems.reduce((sum, item) => sum + (item.qty || 0), 0);
                const totalProducts = storedItems.length;

                // Prepare Payload for FormSubmit
                const payload = {
                    ...data,
                    _subject: `New Quote Request - ${data.fullName}`,
                    _template: 'table',
                    _captcha: 'false', // Optional: disable captcha if desired, or leave enabled
                    'Selected Products': productsListString,
                    'Total Products Count': totalProducts,
                    'Total Items Quantity': totalQty
                };

                // Show loading state
                const submitBtn = form.querySelector('.submit-quote-btn');
                const originalBtnText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin" style="margin-right: 8px;"></i> Sending...';

                // Send data to FormSubmit.co
                fetch("https://formsubmit.co/ajax/info@docmanlabs.com", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })
                    .then(response => {
                        if (!response.ok) throw new Error('Network response was not ok');
                        return response.json();
                    })
                    .then(data => {
                        console.log('Quote Sent Successfully:', data);

                        // Show success message
                        form.innerHTML = `
                        <div style="text-align: center; padding: 40px 20px;">
                            <div style="width: 60px; height: 60px; background: #e6f7f5; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 6L9 17L4 12" stroke="#00A699" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <h3 style="margin-bottom: 10px; color: #333;">Quote Request Sent!</h3>
                            <p style="color: #666; margin-bottom: 25px;">Thank you for your interest. We have received your request and will get back to you shortly.</p>
                            <a href="products.html" class="btn btn-primary">Browse More Products</a>
                        </div>
                    `;

                        // Optional: Clear cart logic here if desired
                        // localStorage.removeItem('myProductList');
                    })
                    .catch(error => {
                        console.error('Quote submission failed:', error);
                        alert('There was an error sending your request. Please try again later or contact us directly at info@docmanlabs.com');

                        // Reset button
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnText;
                    });
            }
        });
    }

    function validateField(input) {
        const formGroup = input.closest('.form-group');
        const existingError = formGroup.querySelector('.error-message');

        // Reset state
        formGroup.classList.remove('error');
        if (existingError) existingError.remove();

        let errorMessage = '';

        // Check Validity
        if (input.value.trim() === '') {
            errorMessage = 'This field is required';
        } else if (input.type === 'email' && !validateEmail(input.value)) {
            errorMessage = 'Please enter a valid email address';
        } else if (input.type === 'tel' && !validatePhone(input.value)) {
            errorMessage = 'Please enter a valid phone number';
        }

        if (errorMessage) {
            formGroup.classList.add('error');
            const errorDiv = document.createElement('span');
            errorDiv.className = 'error-message';
            errorDiv.textContent = errorMessage;
            formGroup.appendChild(errorDiv);
            return false;
        }

        return true;
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        // Basic length check, allowing +, -, spaces, ()
        return phone.length >= 7;
    }

    // Init
    renderSelectedItems();
});
