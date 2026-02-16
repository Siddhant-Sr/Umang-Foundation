# Umang Backend API Integration Guide

## Overview
This document provides a comprehensive reference for integrating the Umang Foundation Strapi backend with your frontend application. It covers all available Collection Types, Single Types, and the Social Media Link component, including API endpoints, field definitions, and integration notes.

---

## API Base URL
```
http://localhost:1337/api
```

---

## Collection Types

### 1. Projects
- **Endpoint:** `/projects?populate=*`
- **Fields:**
  - `title` (string)
  - `slug` (string)
  - `description` (blocks)
  - `content` (blocks)
  - `images` (media, multiple)
  - `youtubeLinks` (string)
  - `location` (string)
  - `statuus` (enumeration: Ongoing)
  - `startDate` (date)
  - `endDate` (date)
  - `category` (enumeration: Education)
  - `beneficiaries` (integer)
  - `impact` (blocks)

### 2. Board Members
- **Endpoint:** `/board-members?populate=*`
- **Fields:**
  - `name` (string)
  - `position` (string)
  - `image` (media)
  - `description` (blocks)
  - `email` (email)
  - `phone` (string)
  - `linkedin` (string)
  - `experience` (integer)
  - `expertise` (string)
  - `order` (integer)
  - `Statuus` (string)

### 3. Trustees
- **Endpoint:** `/trustees?populate=*`
- **Fields:**
  - `name` (string)
  - `position` (string)
  - `image` (media)
  - `description` (blocks)
  - `email` (email)
  - `phone` (string)
  - `linkedin` (string)
  - `order` (integer)

### 4. Corporate Logos
- **Endpoint:** `/corporate-logos?populate=*`
- **Fields:**
  - `organizationName` (string)
  - `logo` (media)
  - `website` (string)
  - `category` (string)
  - `year` (integer)

### 5. Hero Images
- **Endpoint:** `/hero-images?populate=*`
- **Fields:**
  - `title` (string)
  - `image` (media)
  - `description` (text)
  - `order` (integer)

### 6. Media
- **Endpoint:** `/media?populate=*`
- **Fields:**
  - `title` (string)
  - `type` (enumeration: video)
  - `url` (string)
  - `thumbnail` (media)
  - `duration` (integer)
  - `category` (string)
  - `uploadeddate` (date)
  - `featured` (boolean)
  - `description` (blocks)

### 7. Partners
- **Endpoint:** `/partners?populate=*`
- **Fields:**
  - `name` (string)
  - `logo` (media)
  - `description` (blocks)
  - `website` (string)
  - `industry` (string)
  - `yearJoined` (biginteger)

### 8. Partner Schools
- **Endpoint:** `/partner-schools?populate=*`
- **Fields:**
  - `schoolName` (string)
  - `principal` (string)
  - `students` (integer)
  - `location` (string)
  - `state` (string)
  - `district` (string)
  - `image` (media)
  - `description` (blocks)
  - `contact` (string)
  - `website` (string)
  - `programs` (string)
  - `renovationStatus` (enumeration: Completed)

### 9. Photos
- **Endpoint:** `/photos?populate=*`
- **Fields:**
  - `title` (string)
  - `image` (media)
  - `category` (string)
  - `subcategory` (string)
  - `alt` (string)
  - `location` (string)
  - `date` (date)
  - `description` (text)

### 10. YouTube Links
- **Endpoint:** `/youtube-links?populate=*`
- **Fields:**
  - `title` (string)
  - `youtubeUrl` (string)
  - `videoId` (string)
  - `thumbnail` (media)
  - `description` (blocks)
  - `category` (string)
  - `featured` (boolean)
  - `uploadeddate` (date)
  - `views` (integer)

---

## Single Types

### 1. About Content
- **Endpoint:** `/about-content?populate=*`
- **Fields:**
  - `mainHeading` (string)
  - `mainDescription` (blocks)
  - `missionStatement` (string)
  - `visionStatement` (string)
  - `valuesStatement` (blocks)
  - `foundedYear` (integer)
  - `livesImpacted` (integer)
  - `activePrograms` (integer)
  - `transparency` (string)
  - `historyDescription` (blocks)
  - `achievements` (blocks)

### 2. Hero Content
- **Endpoint:** `/hero-content?populate=*`
- **Fields:**
  - `mainHeading` (string)
  - `tagline` (string)
  - `primaryButtonText` (string)
  - `primaryButtonLink` (text)
  - `secondaryButtonText` (string)
  - `secondaryButtonLink` (text)
  - `overlayOpacity` (integer)

### 3. Impact Content
- **Endpoint:** `/impact-content?populate=*`
- **Fields:**
  - `sectionTitle` (string)
  - `sectionIntro` (string)
  - `story1Title` (string)
  - `story1Description` (blocks)
  - `story1Icon` (string)
  - `story1Stat` (string)
  - `story2Title` (string)
  - `story2Description` (blocks)
  - `story2Icon` (string)
  - `story2Stat` (string)
  - `story3Title` (string)
  - `story3Description` (blocks)
  - `story3Icon` (string)
  - `story3Stat` (string)

### 4. Organization Info
- **Endpoint:** `/organization-info?populate=*`
- **Fields:**
  - `organizationName` (string)
  - `tagline` (string)
  - `description` (blocks)
  - `logo` (media)
  - `favicon` (media)
  - `email` (email)
  - `phone` (string)
  - `address` (string)
  - `city` (string)
  - `state` (string)
  - `zipcode` (string)
  - `country` (string)
  - `website` (string)
  - `registrationNumber` (string)
  - `founded` (integer)

### 5. Services Content
- **Endpoint:** `/services-content?populate=*`
- **Fields:**
  - `sectionTitle` (string)
  - `sectionIntro` (string)
  - `serviceTitle` (string)
  - `service1Description` (text)
  - `service1Icon` (string)
  - `service2Title` (string)
  - `service2Description` (text)
  - `service2Icon` (string)
  - `srvice3Title` (string)
  - `service3Description` (text)
  - `service3Icon` (string)
  - `service4Title` (string)
  - `service4Description` (text)
  - `service4Icon` (string)

### 6. Site Setting
- **Endpoint:** `/site-setting?populate=*`
- **Fields:**
  - `siteName` (string)
  - `siteDescription` (string)
  - `metaKeywords` (string)
  - `socialMediaLinks` (text)
  - `donationLink` (text)
  - `footerDescription` (blocks)
  - `copyrightText` (string)
  - `analyticsCode` (string)
  - `maintenanceMode` (boolean)

---

## Component

### Social Media Link
- **Used in:** Site Setting, Organization Info
- **Fields:**
  - `platform` (string/enumeration)
  - `url` (string)
  - `icon` (string)

---

## Integration Notes
- Use `?populate=*` in API calls to include related media and nested fields.
- For collection types, use filters (e.g., `?filters[slug][$eq]=value`) to fetch specific entries.
- All endpoints support GET requests for fetching data.
- Media fields return URLs for images/files.
- Blocks fields contain rich text content.

---

## Example API Call (Fetch Projects)
```js
fetch('http://localhost:1337/api/projects?populate=*')
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## Frontend Mapping
- Map API fields to frontend components as per the field definitions above.
- Use media URLs for images and files.
- Render blocks/rich text fields as HTML.
- Use enumeration fields for dropdowns or filters.

---

## Version
- Strapi v4+
- Document generated: February 2026

---

**This document is ready for use as a reference for GitHub Copilot or any frontend developer integrating with the Umang Foundation backend.**
