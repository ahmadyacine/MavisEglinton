document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('google-reviews-container');
    if (!container) return;

    /**
     * Configuration Placeholders for Google Reviews Integration
     */
    const GOOGLE_PLACE_ID = "REPLACE_WITH_CLINIC_PLACE_ID";
    const GOOGLE_REVIEWS_ENDPOINT = "REPLACE_WITH_SECURE_BACKEND_ENDPOINT";
    const GOOGLE_REVIEW_URL = "https://www.google.com/maps/place/Mavis+Eglinton+Physiotherapy/@43.590853,-79.671653,601m/data=!3m1!1e3!4m8!3m7!1s0x882b41e26549ddf5:0x12f95021b80673d2!8m2!3d43.590853!4d-79.671653!9m1!1b1!16s%2Fg%2F11g3_bmtyf!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D";

    // Sample Local JSON Response for demonstration purposes only.
    // In production, this should be fetched securely from GOOGLE_REVIEWS_ENDPOINT.
    const mockReviews = [
        {
            author_name: "Ruba A.",
            rating: 5,
            relative_time_description: "3 weeks ago",
            text: "Highly professional and knowledgeable staff. They really care about their patients and take their time to explain the treatment plan. My physiotherapy sessions here helped me recover from my back pain so quickly."
        },
        {
            author_name: "Bassem M.",
            rating: 5,
            relative_time_description: "a month ago",
            text: "Excellent clinic! I have been receiving massage therapy and chiropractic care here. The team is very supportive, the environment is clean, and appointments are always on time. Highly recommend this clinic in Mississauga!"
        },
        {
            author_name: "Sarah M.",
            rating: 5,
            relative_time_description: "3 months ago",
            text: "Clean and friendly clinic. The registered massage therapists are fantastic and the receptionist is always welcoming and helpful with insurance claims. Great experience overall."
        }
    ];

    function renderStarRating(rating) {
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                // Filled star
                starsHtml += `<svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>`;
            } else {
                // Empty star
                starsHtml += `<svg class="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>`;
            }
        }
        return starsHtml;
    }

    async function fetchAndRenderReviews() {
        try {
            // In a real scenario, fetch from your secure backend endpoint:
            // const response = await fetch(GOOGLE_REVIEWS_ENDPOINT);
            // const data = await response.json();
            // const reviews = data.result.reviews || [];

            // Simulating network delay
            await new Promise(resolve => setTimeout(resolve, 600));
            const reviews = mockReviews;

            container.innerHTML = ''; // Clear loading skeleton

            if (reviews.length === 0) {
                container.innerHTML = '<p class="text-center col-span-3 text-brand-gray">No reviews currently available.</p>';
                return;
            }

            // Render up to 3 reviews
            reviews.slice(0, 3).forEach(review => {
                const reviewEl = document.createElement('div');
                reviewEl.className = 'bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full';
                
                reviewEl.innerHTML = `
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-10 h-10 bg-brand text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                            ${review.author_name.charAt(0)}
                        </div>
                        <div>
                            <h4 class="font-bold text-brand-dark text-sm leading-tight">${review.author_name}</h4>
                            <span class="text-xs text-brand-gray">${review.relative_time_description}</span>
                        </div>
                    </div>
                    <div class="flex mb-3">
                        ${renderStarRating(review.rating)}
                    </div>
                    <p class="text-brand-gray text-sm italic flex-grow">"${review.text}"</p>
                `;
                container.appendChild(reviewEl);
            });

        } catch (error) {
            console.error("Failed to load reviews:", error);
            container.innerHTML = '<p class="text-center col-span-3 text-brand-gray">Unable to load reviews at this time.</p>';
        }
    }

    // Initialize reviews rendering
    fetchAndRenderReviews();
});
