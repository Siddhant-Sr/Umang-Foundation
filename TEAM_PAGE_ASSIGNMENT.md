# Umang Foundation Frontend API Integration & Page Assignment Plan

## Team Members
- Siddhant
- Ishita
- Yash
- Shravani
- Aishwarya

---

## 1. Project Overview
This React project is the frontend for Umang Foundation, integrating with a Strapi backend. The backend exposes REST API endpoints for all content (see API_INTEGRATION_GUIDE.md). Each page/component should fetch and render data from the backend, replacing hardcoded/static content.

---

## 2. Page & API Mapping
Below is a mapping of frontend pages to Strapi API endpoints. Use this to guide your integration work.

| Page/Component                | API Endpoint(s)                        | Backend Type         |
|-------------------------------|----------------------------------------|---------------------|
| Home.js                       | /hero-content, /about-content, /hero-images, /partners | Single/Collection   |
| AboutPage.js, About.js        | /about-content                         | Single              |
| ImpactPage.js, Impact.js      | /impact-content                        | Single              |
| ProjectsPage.js, Projects.js  | /projects                              | Collection          |
| ProjectPage.js                | /projects?filters[slug][$eq]=...       | Collection (detail) |
| CorporatePartnersPage.js, CorporatePartners.js | /partners           | Collection          |
| CorporateLogosPage.js         | /corporate-logos                       | Collection          |
| TrusteesProfilePage.js        | /trustees                              | Collection          |
| GoverningBoardMemberPage.js   | /board-members                         | Collection          |
| PhotoGalleryPage.js, PhotoGallery.js | /photos                        | Collection          |
| MediaGalleryPage.js, MediaGallery.js | /media                         | Collection          |
| ServicesPage.js, Services.js  | /services-content                      | Single              |
| SocialMediaPage.js, SocialMedia.js | /site-setting (socialMediaLinks)   | Single/Component    |
| GetInvolvedPage.js, GetInvolved.js | /site-setting (donationLink, etc.) | Single              |
| BeTheChangePage.js, BeTheChange.js | (custom/static or future API)      | -                   |
| StoryOfChangePage.js, StoryOfChange.js | (custom/static or future API)  | -                   |
| AssociatedSchoolsPage.js      | /partner-schools                       | Collection          |
| SchoolRenovationPage.js       | /partner-schools (filter by renovationStatus) | Collection  |
| YearWiseGalleryPage.js        | /photos (filter by year/date)          | Collection          |
| YouTubeLinkPage.js            | /youtube-links                         | Collection          |
| InternshipPage.js, Internship.js | /partner-schools (internship info)   | Collection          |
| ResourceManagerPage.js        | (future API or static)                 | -                   |
| PaymentGatewayPage.js         | /site-setting (donationLink)           | Single              |
| BloodDonationCampPage.js      | /blood-donation-page (custom single)   | Single              |

---

## 3. Page Distribution
Pages are distributed to balance workload and match likely interests. Each member should handle API integration, UI refinement, and documentation for their pages.


### Siddhant
- ProjectsPage.js, Projects.js
- ProjectPage.js (project detail)
- PhotoGalleryPage.js, PhotoGallery.js
- YearWiseGalleryPage.js

### Ishita
- Home.js (Hero, About, Partners)
- Header.js, Footer.js (site-wide info, social links)
- Site-wide settings integration (site-setting, organization-info)

### Yash
- AboutPage.js, About.js
- ImpactPage.js, Impact.js
- StoryOfChangePage.js, StoryOfChange.js
- GetInvolvedPage.js, GetInvolved.js

### Shravani
- CorporatePartnersPage.js, CorporatePartners.js
- CorporateLogosPage.js
- TrusteesProfilePage.js
- GoverningBoardMemberPage.js
- MediaGalleryPage.js, MediaGallery.js

### Aishwarya
- ServicesPage.js, Services.js
- SocialMediaPage.js, SocialMedia.js
- YouTubeLinkPage.js
- InternshipPage.js, Internship.js

#### (Bonus/Optional:)
- BloodDonationCampPage.js, PaymentGatewayPage.js, ResourceManagerPage.js, BeTheChangePage.js, AssociatedSchoolsPage.js, SchoolRenovationPage.js (distribute as needed or for extra credit)

---

## 4. Guidance & Tips

### General API Integration
- Use the provided API endpoints from API_INTEGRATION_GUIDE.md.
- Always use `?populate=*` to fetch related media and nested fields.
- Use the utility functions in `src/utils/api.js` for API calls (or extend as needed).
- Replace all static/hardcoded data with dynamic data from the backend.
- For detail pages (e.g., ProjectPage.js), use route params (like slug) to fetch specific entries.
- For images/media, use the full URL: `http://localhost:1337` + media path.
- Render rich text/blocks fields as HTML (use `dangerouslySetInnerHTML` in React).

### UI/UX & Code Quality
- Ensure loading and error states are handled gracefully.
- Keep UI consistent with the design and responsive.
- Use existing CSS files in `src/styles/`.
- Refactor and clean up code as you integrate APIs.
- Add comments and documentation for maintainability.

### Collaboration
- Communicate regularly with your team.
- Share reusable code (e.g., API helpers, UI components).
- Review each other's code for consistency and quality.
- Document any new API endpoints or changes in the README.

### Backend Reference
- Refer to API_INTEGRATION_GUIDE.md and STRAPI_CONTENT_STRUCTURE_GUIDE.md for field definitions and endpoint details.
- If a field or endpoint is missing, coordinate with the backend team to add it.
- Use filters for collection types to fetch specific data (e.g., by slug, year, category).

---

## 5. Deliverables
- All pages/components should fetch and render live data from the backend.
- No hardcoded/static content (except placeholders where backend is not ready).
- Code should be clean, commented, and documented.
- Update the README with any new integration notes or API usage examples.

---

**Good luck! Collaborate, communicate, and build a robust, dynamic site for Umang Foundation!**
