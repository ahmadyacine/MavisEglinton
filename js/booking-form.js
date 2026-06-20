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

    async function submitAppointmentRequest(data) {
        return new Promise((resolve) => {
            const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdcy5u-8oD3jfd7cilQwKFSGxpzJ11RuDbzye4uHrtUzstpSg/formResponse";
            
            // Create a temporary hidden iframe
            const iframe = document.createElement('iframe');
            iframe.name = 'google-form-iframe';
            iframe.id = 'google-form-iframe';
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
            
            // Create a temporary hidden form
            const hiddenForm = document.createElement('form');
            hiddenForm.action = GOOGLE_FORM_ACTION_URL;
            hiddenForm.method = 'POST';
            hiddenForm.target = 'google-form-iframe';
            hiddenForm.style.display = 'none';
            
            const addField = (name, value) => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = name;
                input.value = value;
                hiddenForm.appendChild(input);
            };
            
            addField("entry.366908778", data.fullName);
            addField("entry.177957105", data.phone);
            addField("entry.305681150", data.email);
            addField("entry.1754329757", data.contactMethod);
            
            // Fix: Google Forms expects the exact string of the option
            let patientStatusValue = data.patientStatus;
            if (patientStatusValue === "New Patient") {
                patientStatusValue = "Yes, I am a new patient";
            } else if (patientStatusValue === "Returning Patient") {
                patientStatusValue = "No, I am a returning patient";
            }
            addField("entry.862576963", patientStatusValue);
            
            addField("entry.87216819", data.service);
            
            // Date split
            if (data.preferredDate) {
                const dateParts = data.preferredDate.split('-');
                if (dateParts.length === 3) {
                    addField("entry.1877400405_year", dateParts[0]);
                    addField("entry.1877400405_month", dateParts[1]);
                    addField("entry.1877400405_day", dateParts[2]);
                }
            }
            
            // Time 1 split
            if (data.firstTime) {
                const firstTimeParts = data.firstTime.split(':');
                if (firstTimeParts.length === 2) {
                    addField("entry.1223880026_hour", firstTimeParts[0]);
                    addField("entry.1223880026_minute", firstTimeParts[1]);
                }
            }
            
            // Time 2 split
            if (data.secondTime) {
                const secondTimeParts = data.secondTime.split(':');
                if (secondTimeParts.length === 2) {
                    addField("entry.761111440_hour", secondTimeParts[0]);
                    addField("entry.761111440_minute", secondTimeParts[1]);
                }
            }
            
            addField("entry.549098388", data.notes);
            addField("entry.1977812454", "I consent to Mavis Eglinton Physiotherapy contacting me by phone or email regarding this appointment request. I understand that submitting this form does not confirm an appointment.");
            
            document.body.appendChild(hiddenForm);
            
            let loadCount = 0;
            iframe.onload = () => {
                loadCount++;
                if (loadCount > 1) { // Triggers after form submits and page loads in iframe
                    setTimeout(() => {
                        document.body.removeChild(hiddenForm);
                        document.body.removeChild(iframe);
                        resolve();
                    }, 500);
                }
            };
            
            // Append and submit
            hiddenForm.submit();
            
            // Fallback timeout in case iframe onload fails to trigger
            setTimeout(() => {
                if (document.getElementById('google-form-iframe')) {
                    document.body.removeChild(hiddenForm);
                    document.body.removeChild(iframe);
                    resolve();
                }
            }, 3000);
        });
    }
});
