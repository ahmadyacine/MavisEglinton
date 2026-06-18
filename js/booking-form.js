document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('appointment-form');
    if (!form) return;

    // Set minimum date to today
    const dateInput = document.getElementById('preferredDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    const validateField = (input, errorEl) => {
        if (!input.checkValidity() || (input.type === 'checkbox' && !input.checked) || (input.tagName === 'SELECT' && input.value === '')) {
            input.classList.add('border-red-500');
            input.classList.remove('border-gray-300');
            if (errorEl) errorEl.classList.remove('hidden');
            return false;
        } else {
            input.classList.remove('border-red-500');
            input.classList.add('border-gray-300');
            if (errorEl) errorEl.classList.add('hidden');
            return true;
        }
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Basic Honeypot Check
        const honeypot = document.querySelector('input[name="b_address"]');
        if (honeypot && honeypot.value !== '') {
            console.log("Spam detected");
            return;
        }

        let isValid = true;
        
        // Validate required fields
        const requiredFields = [
            { id: 'fullName', errorId: 'fullName-error' },
            { id: 'phone', errorId: 'phone-error' },
            { id: 'email', errorId: 'email-error' },
            { id: 'service', errorId: 'service-error' },
            { id: 'preferredDate', errorId: 'preferredDate-error' },
            { id: 'firstTime', errorId: 'firstTime-error' },
            { id: 'consent', errorId: 'consent-error' }
        ];

        requiredFields.forEach(field => {
            const input = document.getElementById(field.id);
            const errorEl = document.getElementById(field.errorId);
            if (input) {
                const isFieldValid = validateField(input, errorEl);
                if (!isFieldValid) isValid = false;
            }
        });

        if (!isValid) {
            document.getElementById('form-error-global').classList.remove('hidden');
            document.getElementById('form-success').classList.add('hidden');
            return;
        }

        // Hide global error
        document.getElementById('form-error-global').classList.add('hidden');

        // Show spinner
        const submitBtn = document.getElementById('submit-btn');
        const spinner = document.getElementById('submit-spinner');
        submitBtn.disabled = true;
        spinner.classList.remove('hidden');

        // Gather Data
        const formData = {
            fullName: document.getElementById('fullName').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            service: document.getElementById('service').value,
            preferredDate: document.getElementById('preferredDate').value,
            firstTime: document.getElementById('firstTime').value,
            secondTime: document.getElementById('secondTime').value,
            notes: document.getElementById('notes').value,
            contactMethod: document.getElementById('contactMethod').value,
            patientStatus: document.getElementById('patientStatus').value
        };

        try {
            // Call the adapter function to submit
            await submitAppointmentRequest(formData);

            // Show Success Page / Message
            window.location.href = "thank-you.html";

        } catch (error) {
            console.error(error);
            document.getElementById('form-error-global').classList.remove('hidden');
        } finally {
            submitBtn.disabled = false;
            spinner.classList.add('hidden');
        }
    });

    /**
     * Adapter function for form submission.
     * Can be replaced with Google Forms hidden iframe, Google Apps Script fetch, etc.
     */
    async function submitAppointmentRequest(data) {
        // --- Google Forms Integration Example ---
        /*
        const GOOGLE_FORM_CONFIG = {
            actionUrl: "REPLACE_WITH_GOOGLE_FORM_RESPONSE_URL",
            fields: {
                fullName: "entry.REPLACE_ID_1",
                phone: "entry.REPLACE_ID_2",
                email: "entry.REPLACE_ID_3",
                service: "entry.REPLACE_ID_4",
                preferredDate: "entry.REPLACE_ID_5",
                firstTime: "entry.REPLACE_ID_6",
                secondTime: "entry.REPLACE_ID_7",
                notes: "entry.REPLACE_ID_8",
                contactMethod: "entry.REPLACE_ID_9",
                patientStatus: "entry.REPLACE_ID_10"
            }
        };

        const formBody = new URLSearchParams();
        formBody.append(GOOGLE_FORM_CONFIG.fields.fullName, data.fullName);
        // ... append other fields ...

        // Fetch to Google Apps Script endpoint or directly to Form
        return fetch("YOUR_GOOGLE_APPS_SCRIPT_URL", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });
        */

        // Simulate network request for demonstration
        return new Promise(resolve => setTimeout(resolve, 1000));
    }
});
