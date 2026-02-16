# Umang Foundation - Strapi Content Structure Documentation

## Table of Contents
1. [Strapi Concepts Overview](#strapi-concepts-overview)
2. [Content Type Classification for Umang Foundation](#content-type-classification)
3. [Collection Types Setup](#collection-types-setup)
4. [Single Types Setup](#single-types-setup)
5. [Component Types Setup](#component-types-setup)
6. [Relationships & Relations](#relationships--relations)
7. [Implementation Checklist](#implementation-checklist)

---

## Strapi Concepts Overview

### What is Strapi?
Strapi is a **headless CMS** that allows you to create APIs without building traditional admin interfaces. The frontend (React) fetches data from Strapi via REST/GraphQL APIs.

### Three Key Content Type Categories

#### 1. **Collection Types**
- Used for **multiple entries/records** (e.g., multiple projects, multiple team members)
- Have **list views** where you can see all entries
- **Can be filtered, sorted, and paginated**
- **Examples**: Projects, Services, Team Members, Partners, Photos
- **API Pattern**: Returns an array of objects
- **Use when**: You need to create, read, update, delete multiple similar items

#### 2. **Single Types**
- Used for **one-time content** that appears only once on the site
- **No list view** - just one single entry
- **Perfect for site-wide settings and static pages**
- **Examples**: Organization Info, About Content, Site Settings, Hero Content
- **API Pattern**: Returns a single object (not an array)
- **Use when**: Content that appears once and doesn't have multiple variations

#### 3. **Component Types**
- **Reusable content blocks** that can be used inside Collection Types or Single Types
- Not stored as standalone entries
- **Allow grouping of related fields**
- **Can be used multiple times within a single entry**
- **Examples**: Team Member Info Block, Photo Gallery Item Structure, FAQ Item
- **Use when**: You have repeating patterns of fields that appear in multiple content types

---

## Content Type Classification for Umang Foundation

Based on your frontend code analysis, here's how to classify your content:

| Content | Type | Reason | Used On Pages |
|---------|------|--------|---------------|
| Projects | Collection | Multiple projects with different details | Home, Projects Page, Project Detail Page |
| Services | Single | One services section for the whole site | Home, Services Page |
| About Content | Single | One about section for the whole site | Home, About Page |
| Corporate Partners | Collection | Multiple partner organizations | Home, Partners Page |
| Team Members (Board) | Collection | Multiple board/team members | Board Member Page |
| Trustees | Collection | Multiple trustee profiles | Trustees Page |
| Hero Images | Collection | Multiple carousel images | Home (Hero Carousel) |
| Photos | Collection | Multiple photos organized by category | Photo Gallery Page |
| Media/Videos | Collection | Multiple media items | Media Gallery Page |
| YouTube Links | Collection | Multiple YouTube video links | Various pages |
| Schools Associated | Collection | Multiple school entries | Associated Schools Page |
| Events | Collection | Multiple events | Event pages |
| Corporate Logos | Collection | Multiple corporate logos | Logo pages |
| Organization Settings | Single | Global site settings, contact info | All pages (Header/Footer) |

---

## Collection Types Setup

### 1. **Projects Collection Type**

**Purpose**: Store individual project information with details, images, and descriptions

**Location in Strapi Content Manager**:
- Navigate to: `Content Manager` → `Collection Types` → Create new `Projects`

**Fields to Create**:

```
Field Name              | Field Type        | Required | Notes
------------------------|--------------------|----------|------
title                  | Text               | Yes      | Max 255 chars - Project name
slug                   | Text               | Yes      | Unique, URL-friendly (auto-generated from title)
description            | Rich Text          | Yes      | Short summary for preview cards
content                | Rich Text          | Yes      | Full project details (HTML support)
images                 | Media (Multiple)   | No       | Project photos (array of images)
youtubeLinks           | Text               | No       | Comma-separated YouTube URLs
location               | Text               | No       | Project location/area
status                 | Enumeration        | Yes      | Options: "Ongoing", "Completed", "Planned"
startDate              | Date               | No       | Project start date
endDate                | Date               | No       | Project end date
category               | Enumeration        | Yes      | Options: "Education", "Healthcare", "Community", "Environment"
beneficiaries          | Number             | No       | Number of people impacted
impact                 | Rich Text          | No       | Detailed impact statement
```

**Why these fields?**
- `slug`: Required by `ProjectPage.js` which uses `useParams()` to get slug
- `images`: Accessed in ProjectPage.js - `attributes.images?.data?.map()`
- `youtubeLinks`: ProjectPage.js renders YouTube links - `attributes.youtubeLinks.split(',')`
- `content`: ProjectPage.js uses `dangerouslySetInnerHTML` to render HTML content
- `status`, `category`: Help with filtering/organization in admin panel

**Frontend Integration**:
```javascript
// Your frontend code calls:
getProjects() → fetchData('/projects?populate=*')
getProjectBySlug(slug) → fetchData(`/projects?filters[slug][$eq]=${slug}&populate=*`)
```

---

### 2. **Corporate Partners Collection Type**

**Purpose**: Store partner organization information with logos

**Fields to Create**:

```
Field Name              | Field Type        | Required | Notes
------------------------|--------------------|----------|------
name                   | Text               | Yes      | Partner organization name
logo                   | Media (Single)     | Yes      | Company logo/image
description            | Rich Text          | No       | About the partnership
website                | Text               | No       | Partner website URL
industry               | Text               | No       | Industry type
yearJoined             | Number             | No       | Year they joined
```

**Why these fields?**
- `logo`: CorporatePartners.js renders logos - `partner.attributes.logo?.data?.attributes?.url`
- `name`: Used as alt text and display - `p.name`

**Frontend Integration**:
```javascript
// Your frontend calls:
getPartners() → fetchData('/partners?populate=*')
```

---

### 3. **Hero Images Collection Type**

**Purpose**: Store carousel images for the hero section

**Fields to Create**:

```
Field Name              | Field Type        | Required | Notes
------------------------|--------------------|----------|------
title                  | Text               | Yes      | Image title/name
image                  | Media (Single)     | Yes      | The carousel image
description            | Text               | No       | Alt text / description
order                  | Number             | No       | Sequence in carousel (1, 2, 3...)
```

**Why these fields?**
- `image`: Hero.js maps images - `img.attributes.image?.data?.attributes?.url`
- `order`: Controls carousel slide sequence in admin

**Frontend Integration**:
```javascript
// Your frontend calls:
getHeroImages() → fetchData('/hero-images?populate=*')
```

---

### 4. **Photos Collection Type**

**Purpose**: Store photo gallery images with categorization

**Fields to Create**:

```
Field Name              | Field Type        | Required | Notes
------------------------|--------------------|----------|------
title                  | Text               | Yes      | Photo title
image                  | Media (Single)     | Yes      | The actual photo
category               | Text               | Yes      | Main category (projects, events, schools)
subcategory            | Text               | Yes      | Sub-category within main category
alt                    | Text               | No       | Alt text for accessibility
location               | Text               | No       | Where photo was taken
date                   | Date               | No       | When photo was taken
description            | Text               | No       | Photo details/caption
```

**Why these fields?**
- `category` & `subcategory`: PhotoGallery.js groups photos - `photo.attributes.category`, `photo.attributes.subcategory`
- `image`: Gallery displays images - `photo.attributes.image?.data?.attributes?.url`
- `location`, `date`: PhotoGallery.js uses these - `photo.attributes.location`, `photo.attributes.date`

**Frontend Integration**:
```javascript
// Your frontend calls:
fetchData('/photos?populate=*')
// Groups by category and subcategory in the component
```

---

### 5. **Board Members Collection Type**

**Purpose**: Store governing board member information

**Fields to Create**:

```
Field Name              | Field Type        | Required | Notes
------------------------|--------------------|----------|------
name                   | Text               | Yes      | Full name
position               | Text               | Yes      | Job title/position
image                  | Media (Single)     | Yes      | Profile photo
description            | Rich Text          | Yes      | Bio/expertise details
email                  | Email              | No       | Contact email
phone                  | Text               | No       | Contact phone
linkedin               | Text               | No       | LinkedIn profile URL
experience             | Number             | No       | Years of experience
expertise              | Text               | No       | Area of expertise
order                  | Number             | No       | Display order
```

**Why these fields?**
- `image`, `name`, `position`, `description`: Used by GoverningBoardMemberPage.js (template ready)
- `order`: Control display sequence in grid layout

---

### 6. **Trustees Collection Type**

**Purpose**: Store trustee profile information

**Fields to Create**:

```
Field Name              | Field Type        | Required | Notes
------------------------|--------------------|----------|------
name                   | Text               | Yes      | Full name
position               | Text               | Yes      | Trustee position/title
image                  | Media (Single)     | Yes      | Profile photo
description            | Rich Text          | Yes      | Bio/background
email                  | Email              | No       | Contact email
phone                  | Text               | No       | Contact phone
linkedin               | Text               | No       | LinkedIn profile URL
order                  | Number             | No       | Display order
```

**Similar to Board Members but for Trustees Page**

---

### 7. **Schools Associated Collection Type**

**Purpose**: Store information about associated/partner schools

**Fields to Create**:

```
Field Name              | Field Type        | Required | Notes
------------------------|--------------------|----------|------
schoolName             | Text               | Yes      | Name of school
principal              | Text               | No       | Principal's name
students               | Number             | No       | Number of students
location               | Text               | Yes      | School location/address
state                  | Text               | No       | State/Province
district               | Text               | No       | District name
image                  | Media (Single)     | No       | School photo/logo
description            | Rich Text          | No       | School details
contact                | Text               | No       | Contact number
website                | Text               | No       | School website
programs               | Text               | No       | Programs offered (comma-separated)
renovationStatus       | Enumeration        | No       | Options: "Pending", "In Progress", "Completed"
```

**Why these fields?**
- Used by AssociatedSchoolsPage.js and SchoolRenovationPage.js
- Includes both informational and project-related fields

---

### 8. **Media/Videos Collection Type**

**Purpose**: Store multimedia content (videos, audio)

**Fields to Create**:

```
Field Name              | Field Type        | Required | Notes
------------------------|--------------------|----------|------
title                  | Text               | Yes      | Video/media title
type                   | Enumeration        | Yes      | Options: "Video", "Audio", "Podcast"
url                    | Text               | Yes      | Direct media URL
thumbnail              | Media (Single)     | No       | Video thumbnail image
description            | Rich Text          | No       | Media description
duration               | Number             | No       | Duration in seconds
category               | Text               | No       | Category/topic
uploadedDate           | Date               | No       | Upload date
featured               | Boolean            | No       | Feature on homepage
```

**Frontend Integration**:
```javascript
// Your frontend calls:
getMedia() → fetchData('/medias?populate=*')
```

---

### 9. **YouTube Links Collection Type**

**Purpose**: Store standalone YouTube video links

**Fields to Create**:

```
Field Name              | Field Type        | Required | Notes
------------------------|--------------------|----------|------
title                  | Text               | Yes      | Video title
youtubeUrl             | Text               | Yes      | Full YouTube URL
videoId                | Text               | No       | Extract YouTube ID from URL
thumbnail              | Media (Single)     | No       | Custom thumbnail
description            | Rich Text          | No       | Video description
category               | Text               | No       | Video category
featured               | Boolean            | No       | Feature this video
uploadedDate           | Date               | No       | When uploaded
views                  | Number             | No       | View count
```

**Frontend Integration**:
```javascript
// Your frontend calls:
getYouTubeLinks() → fetchData('/youtube-links?populate=*')
```

---

### 10. **Corporate Logos Collection Type**

**Purpose**: Store corporate/sponsor logos (different from partners)

**Fields to Create**:

```
Field Name              | Field Type        | Required | Notes
------------------------|--------------------|----------|------
organizationName       | Text               | Yes      | Organization name
logo                   | Media (Single)     | Yes      | Logo image
website                | Text               | No       | Organization website
category               | Text               | No       | Sponsor/Partner/Donor
year                   | Number             | No       | Year of association
```

**Frontend Integration**:
```javascript
// Your frontend calls:
getCorporateLogos() → fetchData('/corporate-logos?populate=*')
```

---

### 11. **Events Collection Type**

**Purpose**: Store event information

**Fields to Create**:

```
Field Name              | Field Type        | Required | Notes
------------------------|--------------------|----------|------
eventName              | Text               | Yes      | Event name
description            | Rich Text          | Yes      | Event details
startDate              | DateTime           | Yes      | Event start date & time
endDate                | DateTime           | Yes      | Event end date & time
location               | Text               | Yes      | Event location
image                  | Media (Single)     | No       | Event banner/photo
attendees              | Number             | No       | Expected or actual attendees
eventType              | Enumeration        | Yes      | Options: "Workshop", "Medical Camp", "Event", "Seminar"
status                 | Enumeration        | Yes      | Options: "Upcoming", "Ongoing", "Completed"
registrationUrl        | Text               | No       | Registration link
capacity               | Number             | No       | Maximum capacity
featured               | Boolean            | No       | Feature on homepage
```

---

## Single Types Setup

### 1. **Organization Info Single Type**

**Purpose**: Store global organization information used across the site

**Location in Strapi Content Manager**:
- Navigate to: `Content Manager` → `Single Types` → Create new `Organization Info`

**Fields to Create**:

```
Field Name              | Field Type        | Required | Notes
------------------------|--------------------|----------|------
organizationName       | Text               | Yes      | "Umang Foundation"
tagline                | Text               | Yes      | Short tagline/motto
description            | Rich Text          | Yes      | Organization description
logo                   | Media (Single)     | Yes      | Organization logo
favicon                | Media (Single)     | No       | Browser favicon
email                  | Email              | Yes      | Primary contact email
phone                  | Text               | Yes      | Primary phone number
address                | Text               | Yes      | Physical address
city                   | Text               | Yes      | City
state                  | Text               | Yes      | State/Province
zipCode                | Text               | Yes      | Postal code
country                | Text               | Yes      | Country
website                | Text               | No       | Website URL
registrationNumber     | Text               | No       | NGO registration number
founded                | Number             | No       | Year founded (e.g., 2015)
```

**Why this matters?**
- Used in Header.js for logo/branding
- Used in Footer.js for contact information
- Global configuration accessible on all pages

**Frontend Integration**:
```javascript
// Create new API function:
getOrganizationInfo() → fetchData('/organization-info?populate=*')
// Use in Header.js and Footer.js
```

---

### 2. **About Content Single Type**

**Purpose**: Store the main "About Us" content that appears on the About page and home

**Fields to Create**:

```
Field Name              | Field Type        | Required | Notes
------------------------|--------------------|----------|------
mainHeading            | Text               | Yes      | "About Umang Foundation"
mainDescription        | Rich Text          | Yes      | Long-form about content
missionStatement       | Text               | Yes      | Official mission
visionStatement        | Text               | Yes      | Official vision
valuesStatement        | Rich Text          | No       | Core values
foundedYear            | Number             | Yes      | Year of establishment
livesImpacted          | Number             | Yes      | Lives impacted stat (50000+)
activePrograms         | Number             | Yes      | Active programs count (15+)
transparency           | Text               | Yes      | Transparency stat description
historyDescription     | Rich Text          | No       | Organization history
achievements           | Rich Text          | No       | Major achievements
```

**Why this matters?**
- About.js currently has hardcoded content - this centralizes it
- Includes stats displayed in about-stats div
- Single source of truth for about information

**Frontend Integration**:
```javascript
// Create new API function:
getAboutContent() → fetchData('/about-content?populate=*')
// Replace hardcoded content in About.js with API data
```

---

### 3. **Services Content Single Type**

**Purpose**: Store the services section content

**Fields to Create**:

```
Field Name              | Field Type        | Required | Notes
------------------------|--------------------|----------|------
sectionTitle           | Text               | Yes      | "Our Services"
sectionIntro           | Text               | Yes      | Intro text
service1Title          | Text               | Yes      | "Quality Education"
service1Description    | Text               | Yes      | Service description
service1Icon           | Text               | Yes      | Icon emoji (📚)
service2Title          | Text               | Yes      | "Healthcare"
service2Description    | Text               | Yes      | Service description
service2Icon           | Text               | Yes      | Icon emoji (🏥)
service3Title          | Text               | Yes      | "Community Development"
service3Description    | Text               | Yes      | Service description
service3Icon           | Text               | Yes      | Icon emoji (👨‍👩‍👧‍👦)
service4Title          | Text               | Yes      | "Environmental Care"
service4Description    | Text               | Yes      | Service description
service4Icon           | Text               | Yes      | Icon emoji (🌱)
```

**Alternative Approach (Better with Components)**:
Instead of service1Title, service2Title, etc., use a Component (see Components section below)

**Frontend Integration**:
```javascript
// Create new API function:
getServicesContent() → fetchData('/services-content?populate=*')
// Replace hardcoded services array in Services.js
```

---

### 4. **Impact Content Single Type**

**Purpose**: Store the impact section stories and statistics

**Fields to Create**:

```
Field Name              | Field Type        | Required | Notes
------------------------|--------------------|----------|------
sectionTitle           | Text               | Yes      | "Our Impact"
sectionIntro           | Text               | Yes      | Section introduction
story1Title            | Text               | Yes      | "Education Transformation"
story1Description      | Rich Text          | Yes      | Story details
story1Icon             | Text               | Yes      | Story icon emoji (📖)
story1Stat             | Text               | Yes      | "10,000 students"
story2Title            | Text               | Yes      | "Health & Wellness"
story2Description      | Rich Text          | Yes      | Story details
story2Icon             | Text               | Yes      | Story icon emoji (🏥)
story2Stat             | Text               | Yes      | "30,000+ individuals"
story3Title            | Text               | Yes      | "Skill Development"
story3Description      | Rich Text          | Yes      | Story details
story3Icon             | Text               | Yes      | Story icon emoji (💼)
story3Stat             | Text               | Yes      | "5,000+ youth"
```

**Frontend Integration**:
```javascript
// Replace hardcoded stories in Impact.js
```

---

### 5. **Site Settings Single Type**

**Purpose**: Store global site configuration

**Fields to Create**:

```
Field Name              | Field Type        | Required | Notes
------------------------|--------------------|----------|------
siteName               | Text               | Yes      | "Umang Foundation"
siteDescription        | Text               | Yes      | Meta description for SEO
metaKeywords           | Text               | No       | SEO keywords (comma-separated)
socialMediaLinks       | Component          | No       | Use SocialLink component
donationLink           | Text               | No       | Primary donation URL
footerDescription      | Rich Text          | No       | Footer description text
copyrightText          | Text               | No       | Copyright notice
analyticsCode          | Text               | No       | Google Analytics code
maintenanceMode        | Boolean            | No       | Set true to show maintenance page
```

---

### 6. **Hero Content Single Type**

**Purpose**: Store hero section text and call-to-action buttons

**Fields to Create**:

```
Field Name              | Field Type        | Required | Notes
------------------------|--------------------|----------|------
mainHeading            | Text               | Yes      | "Welcome to Umang Foundation"
tagline                | Text               | Yes      | Hero tagline
primaryButtonText      | Text               | Yes      | "Donate Now"
primaryButtonLink      | Text               | Yes      | Donation URL
secondaryButtonText    | Text               | Yes      | "Learn More"
secondaryButtonLink    | Text               | Yes      | Learn more URL
overlayOpacity         | Number             | No       | 0-1 value for overlay darkness
```

**Frontend Integration**:
```javascript
// Replace hardcoded hero content in Hero.js
```

---

## Component Types Setup

### What are Components?

Components are **reusable field groupings** that can be embedded inside Collection Types or Single Types. They help organize related fields and can appear multiple times.

**Key Difference from Collections**: Components cannot exist independently - they must be nested inside other content types.

---

### 1. **Social Media Link Component**

**Purpose**: Reusable social media link structure

**Location in Strapi Content Manager**:
- Navigate to: `Content Manager` → `Components` → Create new `Social Media Link`

**Fields to Create**:

```
Field Name              | Field Type        | Required | Notes
------------------------|--------------------|----------|------
platform               | Enumeration        | Yes      | Options: "Facebook", "Twitter", "Instagram", "LinkedIn", "YouTube"
url                    | Text               | Yes      | Social media profile URL
icon                   | Text               | No       | Icon emoji or icon class
```

**Where to Use**:
- In Organization Info (Single Type) - multiple links
- In Team Members (Collection Type) - personal social links

**Frontend Integration**:
```javascript
// Access in Header/Footer:
organizationInfo.attributes.socialMediaLinks.map(link => (
  <a href={link.url} target="_blank">
    {link.platform}
  </a>
))
```

---

### 2. **Service Card Component**

**Purpose**: Reusable service card structure

**Fields to Create**:

```
Field Name              | Field Type        | Required | Notes
------------------------|--------------------|----------|------
title                  | Text               | Yes      | Service title
description            | Text               | Yes      | Service description
icon                   | Text               | Yes      | Icon emoji or icon name
order                  | Number             | No       | Display order
```

**Where to Use**:
- In Services Content (Single Type) - repeatable component with 4 instances

**Frontend Integration**:
```javascript
// In Services.js:
servicesContent.attributes.services.map(service => (
  <div className="service-card" key={service.id}>
    <div className="service-icon">{service.icon}</div>
    <h3>{service.title}</h3>
    <p>{service.description}</p>
  </div>
))
```

---

### 3. **Impact Story Component**

**Purpose**: Reusable impact story structure

**Fields to Create**:

```
Field Name              | Field Type        | Required | Notes
------------------------|--------------------|----------|------
title                  | Text               | Yes      | Story title
description            | Rich Text          | Yes      | Story details
icon                   | Text               | Yes      | Story icon emoji
statistic              | Text               | No       | Key statistic/number
order                  | Number             | No       | Display order
```

**Where to Use**:
- In Impact Content (Single Type) - repeatable component with 3 instances

**Frontend Integration**:
```javascript
// In Impact.js:
impactContent.attributes.stories.map(story => (
  <div className="story-card" key={story.id}>
    <div className="story-image-placeholder">{story.icon}</div>
    <h3>{story.title}</h3>
    <p>{story.description}</p>
  </div>
))
```

---

### 4. **FAQ Item Component**

**Purpose**: Reusable frequently asked questions structure

**Fields to Create**:

```
Field Name              | Field Type        | Required | Notes
------------------------|--------------------|----------|------
question               | Text               | Yes      | FAQ question
answer                 | Rich Text          | Yes      | FAQ answer (HTML support)
category               | Text               | No       | FAQ category
order                  | Number             | No       | Display order
```

**Where to Use**:
- Could be used in a future FAQ/Help page as repeatable component

---

### 5. **Statistic Box Component**

**Purpose**: Reusable statistic display

**Fields to Create**:

```
Field Name              | Field Type        | Required | Notes
------------------------|--------------------|----------|------
number                 | Text               | Yes      | "50,000+"
label                  | Text               | Yes      | "Lives Impacted"
icon                   | Text               | No       | Icon emoji
highlight              | Boolean            | No       | Highlight this stat
```

**Where to Use**:
- In About Content (Single Type) - for stats display
- Could be used in other pages

---

### 6. **Gallery Item Component**

**Purpose**: Reusable gallery photo structure (Note: Photos collection may be better)

**Fields to Create**:

```
Field Name              | Field Type        | Required | Notes
------------------------|--------------------|----------|------
title                  | Text               | Yes      | Photo title
image                  | Media (Single)     | Yes      | Photo image
alt                    | Text               | No       | Alt text
location               | Text               | No       | Photo location
date                   | Date               | No       | Photo date
caption                | Rich Text          | No       | Photo caption
```

**Note**: Photos are better as a Collection Type (as already proposed) since you need filtering/categorization.

---

### 7. **Team Member Card Component**

**Purpose**: Reusable team member block

**Fields to Create**:

```
Field Name              | Field Type        | Required | Notes
------------------------|--------------------|----------|------
name                   | Text               | Yes      | Member name
position               | Text               | Yes      | Position/role
image                  | Media (Single)     | Yes      | Profile photo
description            | Text               | Yes      | Bio/expertise
socialLinks            | Component          | No       | Use SocialMediaLink component
order                  | Number             | No       | Display order
```

**Where to Use**:
- Could be used in a Team Overview single type
- Alternatively, Board Members/Trustees are Collection Types with same fields

---

## Relationships & Relations

### Understanding Relations in Strapi

Relations connect different content types together. For Umang Foundation, here are key relations:

---

### 1. **Projects ↔ Related Media (One-to-Many)**

**Setup**:
- In Projects Collection: Add field `relatedMediaFiles`
- Field Type: `Relation`
- Related Collection: `Media`
- Relation Type: `One-to-Many` (One Project has Many Media files)

**Frontend Usage**:
```javascript
// In ProjectPage.js
const mediaFiles = attributes.relatedMediaFiles?.data || [];
mediaFiles.forEach(media => {
  // Render media
})
```

---

### 2. **Projects ↔ Associated Schools (Many-to-Many)**

**Setup**:
- In Projects Collection: Add field `associatedSchools`
- Field Type: `Relation`
- Related Collection: `Schools`
- Relation Type: `Many-to-Many` (Many Projects affect Many Schools)

**Frontend Usage**:
```javascript
// In ProjectPage.js
const schools = attributes.associatedSchools?.data || [];
schools.forEach(school => {
  // Display school info
})
```

---

### 3. **Organization Info ↔ Social Media Links (One-to-Many)**

**Setup**:
- In Organization Info (Single Type): Add field `socialLinks`
- Field Type: `Component`
- Component Type: `Social Media Link` (repeatable)

**Frontend Usage**:
```javascript
// In Header.js/Footer.js
orgInfo.attributes.socialLinks.map(link => (
  <a href={link.url}>{link.platform}</a>
))
```

---

### 4. **Services Content ↔ Service Cards (One-to-Many)**

**Setup**:
- In Services Content (Single Type): Add field `services`
- Field Type: `Component`
- Component Type: `Service Card` (repeatable)

**Frontend Usage**:
```javascript
// In Services.js
servicesContent.attributes.services.map(service => (
  <ServiceCard {...service} />
))
```

---

### 5. **Impact Content ↔ Impact Stories (One-to-Many)**

**Setup**:
- In Impact Content (Single Type): Add field `stories`
- Field Type: `Component`
- Component Type: `Impact Story` (repeatable)

**Frontend Usage**:
```javascript
// In Impact.js
impactContent.attributes.stories.map(story => (
  <StoryCard {...story} />
))
```

---

## Content Type Mapping by Frontend Pages

This section shows exactly which Strapi content types are used by each frontend page:

### **Home Page** (`Home.js`)
| Component | Strapi Content Type | Reason |
|-----------|-------------------|--------|
| Hero | Hero Images (Collection) | Carousel images |
| Hero | Hero Content (Single) | Heading, buttons, text |
| About | About Content (Single) | About section content |
| CorporatePartners | Corporate Partners (Collection) | Partner logos and info |

**API Calls Required**:
```javascript
getHeroImages() // Hero Images Collection
getHeroContent() // Hero Content Single (if created)
getAboutContent() // About Content Single
getPartners() // Corporate Partners Collection
```

---

### **About Page** (`AboutPage.js`)
| Component | Strapi Content Type |
|-----------|-------------------|
| About | About Content (Single) |

**API Calls Required**:
```javascript
getAboutContent() // About Content Single
```

---

### **Services Page** (`ServicesPage.js`)
| Component | Strapi Content Type |
|-----------|-------------------|
| Services | Services Content (Single) |

**API Calls Required**:
```javascript
getServicesContent() // Services Content Single
```

---

### **Projects Page** (`ProjectsPage.js`)
| Component | Strapi Content Type |
|-----------|-------------------|
| Projects | Projects (Collection) |

**API Calls Required**:
```javascript
getProjects() // Projects Collection
```

---

### **Project Detail Page** (`ProjectPage.js`)
| Component | Strapi Content Type |
|-----------|-------------------|
| Project Details | Projects (Collection) - Single entry fetched by slug |

**API Calls Required**:
```javascript
getProjectBySlug(slug) // Projects Collection filtered by slug
```

---

### **Impact Page** (`ImpactPage.js`)
| Component | Strapi Content Type |
|-----------|-------------------|
| Impact | Impact Content (Single) |

**API Calls Required**:
```javascript
getImpactContent() // Impact Content Single
```

---

### **Governing Board Member Page** (`GoverningBoardMemberPage.js`)
| Component | Strapi Content Type |
|-----------|-------------------|
| Board Members Grid | Board Members (Collection) |

**API Calls Required**:
```javascript
getBoardMembers() // Board Members Collection
```

---

### **Trustees Profile Page** (`TrusteesProfilePage.js`)
| Component | Strapi Content Type |
|-----------|-------------------|
| Trustees Grid | Trustees (Collection) |

**API Calls Required**:
```javascript
getTrustees() // Trustees Collection
```

---

### **Associated Schools Page** (`AssociatedSchoolsPage.js`)
| Component | Strapi Content Type |
|-----------|-------------------|
| Schools Grid | Schools Associated (Collection) |

**API Calls Required**:
```javascript
getSchools() // Schools Associated Collection
```

---

### **School Renovation Page** (`SchoolRenovationPage.js`)
| Component | Strapi Content Type |
|-----------|-------------------|
| School Info | Schools Associated (Collection) - filtered by renovationStatus |

**API Calls Required**:
```javascript
getSchools() // Then filter by renovationStatus = "In Progress" or "Completed"
```

---

### **Photo Gallery Page** (`PhotoGalleryPage.js`)
| Component | Strapi Content Type |
|-----------|-------------------|
| Photo Grid (categorized) | Photos (Collection) - grouped by category/subcategory |

**API Calls Required**:
```javascript
// Fetch all photos, grouped by category/subcategory
fetchData('/photos?populate=*')
```

---

### **Media Gallery Page** (`MediaGalleryPage.js`)
| Component | Strapi Content Type |
|-----------|-------------------|
| Media List | Media (Collection) |

**API Calls Required**:
```javascript
getMedia() // Media Collection
```

---

### **Blood Donation Camp Page** (`BloodDonationCampPage.js`)
| Component | Strapi Content Type |
|-----------|-------------------|
| Blood Camp Events | Events (Collection) - filtered by type="Blood Donation" |

**API Calls Required**:
```javascript
getEvents() // Then filter by type/category
```

---

### **Internship Page** (`InternshipPage.js`)
| Component | Strapi Content Type |
|-----------|-------------------|
| Internship Info | Internship Program (Single Type) - NEW |

**NEW Single Type Required**:
```
Internship Program Single Type with:
- programDescription
- eligibility
- duration
- stipend
- applicationLink
- etc.
```

---

### **Be The Change Page** (`BeTheChangePage.js`)
| Component | Strapi Content Type |
|-----------|-------------------|
| Ways to Help | Be The Change Content (Single Type) - NEW |

**NEW Single Type Required**:
```
Be The Change Single Type with:
- introduction
- ways (Component - repeatable)
- callToAction
```

---

### **Get Involved Page** (`GetInvolvedPage.js`)
| Component | Strapi Content Type |
|-----------|-------------------|
| Involvement Options | Get Involved Content (Single Type) - NEW |

**NEW Single Type Required**:
```
Get Involved Single Type with:
- introduction
- volunteerLink
- donationLink
- partnershipLink
- etc.
```

---

### **YouTube Link Page** (`YouTubeLinkPage.js`)
| Component | Strapi Content Type |
|-----------|-------------------|
| Video Grid | YouTube Links (Collection) |

**API Calls Required**:
```javascript
getYouTubeLinks() // YouTube Links Collection
```

---

### **Corporate Logos Page** (`CorporateLogosPage.js`)
| Component | Strapi Content Type |
|-----------|-------------------|
| Logo Grid | Corporate Logos (Collection) |

**API Calls Required**:
```javascript
getCorporateLogos() // Corporate Logos Collection
```

---

### **Social Media Page** (`SocialMediaPage.js`)
| Component | Strapi Content Type |
|-----------|-------------------|
| Social Media Links | Organization Info (Single) - socialLinks |

**API Calls Required**:
```javascript
getOrganizationInfo() // Get from Organization Info Single
```

---

### **Story of Change Page** (`StoryOfChangePage.js`)
| Component | Strapi Content Type |
|-----------|-------------------|
| Stories Grid | Stories (Collection) - NEW |

**NEW Collection Type Required**:
```
Stories Collection with:
- title
- description
- personName
- location
- image
- testimonial
- impact
- etc.
```

---

### **Payment Gateway Page** (`PaymentGatewayPage.js`)
| Component | Strapi Content Type |
|-----------|-------------------|
| Payment Options | Payment Settings (Single Type) - NEW |

**NEW Single Type Required**:
```
Payment Settings Single Type with:
- razorpayApiKey
- paymentDescription
- successMessage
- supportEmail
- etc.
```

---

## Implementation Checklist

### Phase 1: Core Content Types (Essential for Home Page)

**Collection Types**:
- [ ] Create `Projects` Collection
- [ ] Create `Corporate Partners` Collection
- [ ] Create `Hero Images` Collection

**Single Types**:
- [ ] Create `About Content` Single
- [ ] Create `Organization Info` Single
- [ ] Create `Hero Content` Single

**Components**:
- [ ] Create `Social Media Link` Component

**Testing**: Home page should fully load from Strapi

---

### Phase 2: Secondary Content Types (Gallery & Media Pages)

**Collection Types**:
- [ ] Create `Photos` Collection
- [ ] Create `Media` Collection
- [ ] Create `YouTube Links` Collection
- [ ] Create `Corporate Logos` Collection

**Testing**: Gallery pages should load content from Strapi

---

### Phase 3: Team & Organization

**Collection Types**:
- [ ] Create `Board Members` Collection
- [ ] Create `Trustees` Collection
- [ ] Create `Schools Associated` Collection

**Testing**: Team pages should display content from Strapi

---

### Phase 4: Additional Services Pages

**Single Types**:
- [ ] Create `Services Content` Single
- [ ] Create `Impact Content` Single

**Components** (for Single Types):
- [ ] Create `Service Card` Component
- [ ] Create `Impact Story` Component

**Testing**: Services and Impact pages should load from Strapi

---

### Phase 5: Events & Special Pages

**Collection Types**:
- [ ] Create `Events` Collection
- [ ] Create `Stories` Collection (for Story of Change page)

**Single Types**:
- [ ] Create `Internship Program` Single
- [ ] Create `Be The Change Content` Single
- [ ] Create `Get Involved Content` Single
- [ ] Create `Payment Settings` Single

**Components** (for Single Types):
- [ ] Create `FAQ Item` Component (if needed)

**Testing**: All remaining pages should load from Strapi

---

### Phase 6: Advanced Features

**Additions**:
- [ ] Add Relations between Projects and Schools
- [ ] Add Relations between Projects and Media
- [ ] Configure media file handling (optimize for web)
- [ ] Set up roles and permissions (restrict public access)
- [ ] Configure JWT authentication if needed

---

## Quick Reference: Field Type Definitions

| Field Type | Use Case | Example |
|-----------|----------|---------|
| **Text** | Short text (< 255 chars) | Project title, name |
| **Rich Text** | Long-form content with HTML | Descriptions, biographies |
| **Email** | Email addresses | Contact email |
| **Number** | Integer or decimal values | Year, count, statistics |
| **Boolean** | True/False | Featured, active status |
| **Date** | Date only (YYYY-MM-DD) | Birth date, event date |
| **DateTime** | Date and time | Event start with time |
| **Enumeration** | Dropdown with predefined options | Status, category, type |
| **Media (Single)** | One file/image upload | Logo, profile photo |
| **Media (Multiple)** | Multiple files/images | Gallery images, project photos |
| **Relation** | Link to another content type | Projects linked to Schools |
| **Component** | Repeatable field groups | Social media links, services |
| **JSON** | Complex structured data | Custom configurations |
| **UID** | Unique identifier (slug) | Project slug for URL |

---

## Database Storage Overview

### Collection Types (Multiple Records)
- **Projects**: Stores 5-50+ individual project records
- **Photos**: Stores 100-1000+ individual photos
- **Corporate Partners**: Stores 10-30+ partner records
- **Board Members**: Stores 5-15 member records
- **Media**: Stores 20-100+ media files
- **YouTube Links**: Stores 10-100+ video links

### Single Types (One Record Each)
- **About Content**: ONE entry describing the organization
- **Organization Info**: ONE entry with global settings
- **Hero Content**: ONE entry with hero section text
- **Services Content**: ONE entry with all 4 services
- **Impact Content**: ONE entry with all 3 impact stories

---

## API Endpoint Reference

Once Strapi is set up, these are the API endpoints your frontend will call:

```
Base URL: http://localhost:1337/api

Collection Types (GET):
- /projects?populate=*
- /projects?filters[slug][$eq]=project-name
- /corporate-partners?populate=*
- /hero-images?populate=*
- /photos?populate=*
- /media?populate=*
- /youtube-links?populate=*
- /corporate-logos?populate=*
- /board-members?populate=*
- /trustees?populate=*
- /schools?populate=*
- /events?populate=*
- /stories?populate=*

Single Types (GET):
- /about-content?populate=*
- /organization-info?populate=*
- /hero-content?populate=*
- /services-content?populate=*
- /impact-content?populate=*
- /internship-program?populate=*
- /be-the-change-content?populate=*
- /get-involved-content?populate=*
- /payment-settings?populate=*
```

**?populate=\*** means: Include all related data and media files in the response

---

## Common Mistakes to Avoid

1. **❌ Not using Slug field in Collections**
   - ✅ Always add a slug field when you need to fetch by URL parameter
   - Projects need slug for `/projects/{slug}` route

2. **❌ Putting repeating data in Single Types**
   - ❌ Creating 4 separate service fields in Services Single Type
   - ✅ Use repeatable Components instead

3. **❌ Using Relations when Components would work**
   - ❌ Creating a separate "Social Media Links" Collection
   - ✅ Use Social Media Link Component inside Organization Info

4. **❌ Not organizing photos with category/subcategory**
   - ❌ Flat list of 200+ photos with no grouping
   - ✅ Use category and subcategory fields for filtering

5. **❌ Uploading unoptimized images**
   - ❌ 10MB raw camera images
   - ✅ Resize and compress images before upload

6. **❌ Missing required fields**
   - ❌ Leaving fields empty that frontend expects
   - ✅ Mark as Required in Strapi and always fill them

7. **❌ Inconsistent naming conventions**
   - ❌ Mixing "Project" and "projects" in collection names
   - ✅ Use lowercase, hyphenated names: `project-stories`, `team-members`

8. **❌ Not setting up media folder structure**
   - ❌ Uploading all images to root
   - ✅ Create folders: /projects, /team, /gallery, /events

---

## Next Steps After Setup

1. **Test Strapi Locally**
   - Create 2-3 sample entries in each Collection Type
   - Test API endpoints using Postman or Strapi's built-in API client

2. **Update API.js**
   - Add new API functions for each collection/single type
   - Test all endpoints work correctly

3. **Update React Components**
   - Replace hardcoded data with API calls
   - Add loading states and error handling

4. **Deploy Strapi**
   - Choose hosting: Heroku, Railway, Render, or Strapi Cloud
   - Configure environment variables
   - Set up database (PostgreSQL recommended)

5. **Configure Permissions**
   - Set up public/private access for different roles
   - Enable JWT authentication if needed

---

**Document Version**: 1.0  
**Last Updated**: January 2026  
**For**: Umang Foundation NGO Website  
**Created For**: Strapi v4+ with PostgreSQL/SQLite Backend
