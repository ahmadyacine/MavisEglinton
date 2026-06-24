# Mavis Eglinton Physiotherapy Website

This is a complete, production-ready, responsive website for Mavis Eglinton Physiotherapy in Mississauga, Canada. It is built using Semantic HTML5, Tailwind CSS, and Vanilla JavaScript, ensuring high performance, local SEO optimization, and accessible components without relying on complex frontend frameworks.

## Project Structure

```
mavis-eglinton-physiotherapy/
├── index.html                  # Home Page
├── services.html               # General Services
├── mva-rehabilitation.html     # Dedicated MVA Rehab Page
├── about.html                  # About the Clinic & Team
├── contact.html                # Contact info & Booking Form
├── privacy-policy.html         # Privacy Policy
├── thank-you.html              # Form Submission Success Page
├── template.html               # Base template with Header/Footer
├── build.py                    # Script to compile pages into template
├── pages/                      # Page content modules (compiled into root via build.py)
├── assets/                     
│   ├── images/                 # Placeholder images
│   ├── icons/                  
│   └── logo/                   # Clinic Logo
├── css/                        
│   ├── input.css               # Tailwind source file
│   └── style.css               # Compiled Tailwind CSS (generated)
├── js/                         
│   ├── main.js                 # Mobile menu, sticky header, accordion logic
│   ├── booking-form.js         # Booking form validation and submission adapter
│   └── reviews.js              # Google Reviews fetch and render logic
├── tailwind.config.js          # Tailwind Configuration
└── package.json                # NPM configuration for Tailwind CSS
```

## How to Run the Website Locally

1. **Prerequisites**: Ensure you have [Node.js](https://nodejs.org/) installed, as well as [Python 3](https://www.python.org/) for the build script.
2. **Navigate to the Directory**: Open your terminal and change into the project folder:
   ```bash
   cd mavis-eglinton-physiotherapy
   ```
3. **Build the HTML**: If you make changes to the header/footer in `template.html` or the content in `pages/`, run the build script to generate the root HTML files:
   ```bash
   python build.py
   ```
4. **Install Dependencies**: Install Tailwind CSS:
   ```bash
   npm install
   ```
5. **Compile Tailwind CSS**:
   ```bash
   npm run build:css
   ```
   *To watch for changes during development, run: `npm run watch:css`*
5. **View in Browser**: You can open any of the HTML files directly in your browser or use an extension like Live Server in VS Code.

## Updating Content

- **Images**: Replace the placeholder images inside `assets/images/` and `assets/logo/` with your final assets. Ensure they are optimized (WebP or compressed JPEG/PNG) and match the expected dimensions.
- **Contact Info & Business Hours**: Update `template.html` to change the global header and footer, then run `python build.py` to propagate changes to all pages. Contact information on the `contact.html` and `index.html` pages should be updated in their respective `pages/` source files.
- **Team Profiles**: Inside `pages/about.html`, replace the placeholder practitioner cards with actual team member details.

## Google Forms Integration

The online appointment form in `contact.html` is built with a custom design. To securely capture submissions to a Google Form while maintaining this design:

### Recommended Approach (Google Apps Script)
1. Create a Google Form with all required fields (Name, Phone, Email, Service, etc.).
2. In the Google Form, enable email notifications for new responses (Settings -> Responses -> "Get email notifications for new responses").
3. Create a Google Apps Script endpoint that accepts POST requests, validates the data, appends it to the connected Google Sheet, and returns a JSON response.
4. Update `js/booking-form.js` by uncommenting the fetch implementation in `submitAppointmentRequest()` and replacing `YOUR_GOOGLE_APPS_SCRIPT_URL` with your deployed web app URL.

### Alternative (Hidden Iframe)
Alternatively, you can map the `name` attributes of the form inputs directly to the Google Form `entry.ID` values and submit the form to a hidden iframe on the page.

*Important:* The form submission adapter in `js/booking-form.js` is currently simulating a network request. This must be wired to your actual endpoint before launch.

## Google Reviews Configuration

The `js/reviews.js` file handles rendering patient reviews. 

1. **Production Endpoint**: Google's API key should **not** be exposed in the frontend. You must create a serverless endpoint (e.g., Vercel Serverless Function, Netlify Function, or a simple Node/Python backend) that queries the Google Places API for your Place ID.
2. **Setup Placeholders**:
   - Update `GOOGLE_PLACE_ID`, `GOOGLE_REVIEWS_ENDPOINT`, and `GOOGLE_REVIEW_URL` in `js/reviews.js`.
   - The current script renders a fallback mock dataset. Once your endpoint is ready, uncomment the `fetch` block inside `fetchAndRenderReviews()`.

## Social Media & Map Links

- Update the Facebook and Instagram link placeholders (`<!-- FACEBOOK_URL_PLACEHOLDER -->`, etc.) inside `template.html`.
- The Google Map iframe currently points to the clinic's address. If the location changes, update the iframe `src` URL in `pages/index.html` and `pages/contact.html`.

## CAPTCHA Setup

To protect your form from spam:
1. Register for Google reCAPTCHA or Cloudflare Turnstile.
2. Follow their integration guide to add the necessary script tag to `template.html`'s head.
3. Uncomment the CAPTCHA placeholder inside `pages/contact.html`.
4. Validate the token on your server-side endpoint (e.g., Google Apps Script) before processing the form.

## Google Analytics & Search Console

- **Google Analytics**: Paste your GA4 tracking snippet into the `<!-- HEAD_META -->` section of `template.html` (or place it globally in the `<head>`).
- **Search Console**: You can verify ownership via DNS or by uploading the HTML verification file to the root directory before deployment.

## Deployment Checklist

Before going live, verify the following:

- [ ] All `<!-- PLACEHOLDER -->` tags have been updated or removed.
- [ ] Real URLs have been added for social media profiles and Google Reviews.
- [ ] Google Form or backend endpoint is connected, tested, and successfully emails `mephysiotherapy1@gmail.com`.
- [ ] CAPTCHA is enabled and functioning.
- [ ] Practitioner names, bios, and specific service details (e.g., direct billing options, holistic massage availability) have been verified.
- [ ] The `privacy-policy.html` and other healthcare disclaimers have been reviewed by the clinic or a legal professional.
- [ ] Ownership of the domain, hosting, Google Cloud project, and analytics accounts are in the clinic's control.
- [ ] The CSS is compiled using `npm run build:css` and the final files are generated using `python build.py`.

The site consists of static HTML/CSS/JS files and can be deployed easily on any standard shared hosting, VPS, or modern static site host like Netlify, Vercel, or GitHub Pages. Simply upload the root folder contents (excluding `node_modules` and `pages` if desired) to your server's public directory.
