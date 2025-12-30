document.addEventListener('DOMContentLoaded', () => {
    // 1. Data Source (Mirrors my-list.js)
    const productCatalog = {
        1: {
            id: 1,
            name: "Digital X-Ray Machine",
            category: "Diagnostic Equipment",
            image: "http://localhost:3845/assets/6daa41b1f7a685690c48c31671c3cdea0960b420.png"
        },
        2: {
            id: 2,
            name: "Patient Monitoring System",
            category: "Monitoring Equipment",
            image: "http://localhost:3845/assets/a560a1395995c99d482c6a902ba94275ebe68c12.png"
        },
        3: {
            id: 3,
            name: "Hospital Bed - Electric",
            category: "Patient Care",
            image: "http://localhost:3845/assets/a691331be57ebdf2a73f2c065e45414b8e560d53.png"
        },
        4: {
            id: 4,
            name: "Ultrasound Scanner",
            category: "Diagnostic Equipment",
            image: "http://localhost:3845/assets/8cf9544ac2f0fe8c693c2361244966deb3c9fdec.png"
        },
        5: {
            id: 5,
            name: "Amoxicillin 500mg",
            category: "Pharmaceutical Products",
            image: "assets/logo.png" // Fallback/Placeholder
        },
        6: {
            id: 6,
            name: "Surgical Gloves",
            category: "Medical Disposables",
            image: "assets/logo.png" // Fallback/Placeholder
        }
    };

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
        listContainer.innerHTML = '';

        storedItems.forEach(item => {
            const catalogItem = productCatalog[item.id];
            if (!catalogItem) return;

            totalQty += (item.qty || 0);

            const itemEl = document.createElement('div');
            itemEl.className = 'selected-product-item';

            // Handle customizations display
            let configText = `Qty: ${item.qty}`;
            if (item.unit) configText += ` (${item.unit})`;

            itemEl.innerHTML = `
                <div class="product-details">
                    <div class="product-name">${catalogItem.name}</div>
                    <div class="product-config">${configText}</div>
                </div>
            `;
            listContainer.appendChild(itemEl);
        });

        updateSummary(storedItems.length, totalQty);
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

                console.log('Form Submitted:', data);
                console.log('Products:', storedItems);

                // Mock success
                alert('Your quote request has been submitted successfully! We will contact you shortly.');
                window.location.href = 'index.html';
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
