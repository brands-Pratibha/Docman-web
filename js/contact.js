// Contact Form Validation
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    if (!contactForm) return;

    // Form field configurations
    const fields = {
        firstName: {
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: /^[a-zA-Z\s'-]+$/,
            errorMessages: {
                required: 'First name is required',
                minLength: 'First name must be at least 2 characters',
                maxLength: 'First name must be less than 50 characters',
                pattern: 'First name can only contain letters, spaces, hyphens and apostrophes'
            }
        },
        lastName: {
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: /^[a-zA-Z\s'-]+$/,
            errorMessages: {
                required: 'Last name is required',
                minLength: 'Last name must be at least 2 characters',
                maxLength: 'Last name must be less than 50 characters',
                pattern: 'Last name can only contain letters, spaces, hyphens and apostrophes'
            }
        },
        email: {
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            errorMessages: {
                required: 'Email address is required',
                pattern: 'Please enter a valid email address'
            }
        },
        phone: {
            required: false,
            pattern: /^[\d\s\-\+\(\)]{7,20}$/,
            errorMessages: {
                pattern: 'Please enter a valid phone number'
            }
        },
        country: {
            required: true,
            errorMessages: {
                required: 'Please select or enter your country'
            }
        },
        company: {
            required: false,
            maxLength: 100,
            errorMessages: {
                maxLength: 'Company name must be less than 100 characters'
            }
        },
        subject: {
            required: true,
            errorMessages: {
                required: 'Please select a subject'
            }
        },
        message: {
            required: true,
            minLength: 10,
            maxLength: 1000,
            errorMessages: {
                required: 'Message is required',
                minLength: 'Message must be at least 10 characters',
                maxLength: 'Message must be less than 1000 characters'
            }
        }
    };

    // Validate a single field
    function validateField(fieldName, value) {
        const config = fields[fieldName];
        if (!config) return { isValid: true, error: '' };

        const trimmedValue = value.trim();

        // Check required
        if (config.required && !trimmedValue) {
            return { isValid: false, error: config.errorMessages.required };
        }

        // If not required and empty, skip other validations
        if (!trimmedValue && !config.required) {
            return { isValid: true, error: '' };
        }

        // Check minLength
        if (config.minLength && trimmedValue.length < config.minLength) {
            return { isValid: false, error: config.errorMessages.minLength };
        }

        // Check maxLength
        if (config.maxLength && trimmedValue.length > config.maxLength) {
            return { isValid: false, error: config.errorMessages.maxLength };
        }

        // Check pattern
        if (config.pattern && !config.pattern.test(trimmedValue)) {
            return { isValid: false, error: config.errorMessages.pattern };
        }

        return { isValid: true, error: '' };
    }

    // Show error for a field
    function showError(fieldName, errorMessage) {
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(`${fieldName}-error`);

        if (field && errorElement) {
            field.classList.add('error');
            field.classList.remove('valid');
            errorElement.textContent = errorMessage;
            errorElement.classList.add('visible');
        }
    }

    // Clear error for a field
    function clearError(fieldName) {
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(`${fieldName}-error`);

        if (field && errorElement) {
            field.classList.remove('error');
            errorElement.textContent = '';
            errorElement.classList.remove('visible');
        }
    }

    // Show valid state for a field
    function showValid(fieldName) {
        const field = document.getElementById(fieldName);
        if (field) {
            field.classList.remove('error');
            field.classList.add('valid');
        }
    }

    // Validate all fields and return if form is valid
    function validateForm() {
        let isFormValid = true;

        Object.keys(fields).forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (!field) return;

            const value = field.value;
            const validation = validateField(fieldName, value);

            if (!validation.isValid) {
                showError(fieldName, validation.error);
                isFormValid = false;
            } else {
                clearError(fieldName);
                if (value.trim()) {
                    showValid(fieldName);
                }
            }
        });

        return isFormValid;
    }

    // Add real-time validation on input/blur
    Object.keys(fields).forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (!field) return;

        // Validate on blur
        field.addEventListener('blur', () => {
            const value = field.value;
            const validation = validateField(fieldName, value);

            if (!validation.isValid) {
                showError(fieldName, validation.error);
            } else {
                clearError(fieldName);
                if (value.trim()) {
                    showValid(fieldName);
                }
            }
        });

        // Clear error on input (with debounce for pattern validation)
        let debounceTimer;
        field.addEventListener('input', () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                const value = field.value;
                const validation = validateField(fieldName, value);

                if (validation.isValid && value.trim()) {
                    clearError(fieldName);
                    showValid(fieldName);
                } else if (!validation.isValid && field.classList.contains('error')) {
                    // If already showing error, update it in real-time
                    showError(fieldName, validation.error);
                }
            }, 300);
        });

        // Clear error when user starts typing
        field.addEventListener('focus', () => {
            // Don't clear error on focus, let user see what's wrong
        });
    });

    // Handle form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const isValid = validateForm();

        if (!isValid) {
            // Focus on first error field
            const firstErrorField = contactForm.querySelector('.error');
            if (firstErrorField) {
                firstErrorField.focus();
                firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="31.4 31.4" transform="rotate(-90 12 12)">
                    <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
                </circle>
            </svg>
            Sending...
        `;

        // Send data to FormSubmit.co
        try {
            // Format phone number with country code
            const fullPhone = data['country-code'] && data.phone
                ? `${data['country-code']} ${data.phone}`
                : data.phone || 'Not provided';

            // Capitalize first letter of each word for names
            const formatName = (name) => {
                if (!name) return '';
                return name.trim().split(' ').map(word =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                ).join(' ');
            };

            // Format subject for display
            const subjectLabels = {
                'general': 'General Inquiry',
                'product': 'Product Information',
                'quote': 'Quote Request',
                'technical': 'Technical Support',
                'feedback': 'Feedback',
                'partnership': 'Partnership',
                'other': 'Other'
            };
            const formattedSubject = subjectLabels[data.subject] || data.subject || 'General Inquiry';

            // Create formatted payload with proper field names and grouping
            const formattedPayload = {
                _subject: `New Contact Form Submission - ${formattedSubject}`,
                _template: 'box',

                // Contact Information Section
                '═══ CONTACT INFORMATION ═══': '━━━━━━━━━━━━━━━━━━━━',
                'Full Name': `${formatName(data.firstName)} ${formatName(data.lastName)}`,
                'Email Address': data.email,
                'Phone Number': fullPhone,
                'Country': data.country || 'Not specified',
                'Company': data.company || 'Not provided',

                // Inquiry Details Section
                '═══ INQUIRY DETAILS ═══': '━━━━━━━━━━━━━━━━━━━━',
                'Subject': formattedSubject,
                'Message': data.message
            };

            const response = await fetch("https://formsubmit.co/ajax/info@docmanlabs.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formattedPayload)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Success - show success message
            showSuccessMessage();
            contactForm.reset();

            // Clear all valid states
            Object.keys(fields).forEach(fieldName => {
                const field = document.getElementById(fieldName);
                if (field) {
                    field.classList.remove('valid', 'error');
                }
            });

        } catch (error) {
            console.error('Form submission failed:', error);
            // Error - show error message
            showFormError('Failed to send message. Please try again or contact us directly at info@docmanlabs.com.');
        } finally {
            // Restore button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });

    // Show success message
    function showSuccessMessage() {
        // Create success message element
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success-message';
        successMessage.innerHTML = `
            <div class="success-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#248F84" stroke-width="2"/>
                    <path d="M8 12L11 15L16 9" stroke="#248F84" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
            <button type="button" class="btn btn-primary close-success-btn">Send Another Message</button>
        `;

        // Insert after form
        const formCard = contactForm.closest('.contact-form-card');
        formCard.style.position = 'relative';

        // Hide form and show success
        contactForm.style.display = 'none';
        formCard.appendChild(successMessage);

        // Handle close button
        const closeBtn = successMessage.querySelector('.close-success-btn');
        closeBtn.addEventListener('click', () => {
            successMessage.remove();
            contactForm.style.display = 'block';
        });
    }

    // Show form error
    function showFormError(message) {
        // Check if error already exists
        let errorBanner = document.querySelector('.form-error-banner');
        if (!errorBanner) {
            errorBanner = document.createElement('div');
            errorBanner.className = 'form-error-banner';
            contactForm.insertBefore(errorBanner, contactForm.firstChild);
        }

        errorBanner.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <circle cx="12" cy="16" r="1" fill="currentColor"/>
            </svg>
            <span>${message}</span>
            <button type="button" class="close-error-btn" aria-label="Close">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button>
        `;

        errorBanner.classList.add('visible');

        // Handle close button
        const closeBtn = errorBanner.querySelector('.close-error-btn');
        closeBtn.addEventListener('click', () => {
            errorBanner.classList.remove('visible');
        });

        // Auto-hide after 5 seconds
        setTimeout(() => {
            errorBanner.classList.remove('visible');
        }, 5000);
    }
});
