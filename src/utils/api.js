
const RENDER_API_URL = 'https://umang-backend-ty0e.onrender.com';
const LOCAL_API_URL = 'http://localhost:1337';
// const API_BASE_URL = process.env.REACT_APP_STRAPI_URL || RENDER_API_URL;

// Dummy placeholder data for development fallback
const dummyProjects = [
  {
    id: 1,
    documentId: 'dummy1',
    title: 'Sample Project',
    slug: 'sample-project',
    description: 'This is a placeholder project used when the API is unavailable.',
    content: [
      { type: 'paragraph', children: [{ text: 'Sample content for development.' }] }
    ],
    statuus: 'Ongoing',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
    images: null
  }
];

const dummyPartners = [
  {
    id: 1,
    attributes: {
      name: 'Sample Partner',
      logo: {
        data: {
          attributes: {
            url: 'https://via.placeholder.com/180x80?text=Partner'
          }
        }
      }
    }
  }
];


// Helper function to fetch data from Strapi with error handling and fallback
export const fetchData = async (endpoint, { fallback = null } = {}) => {
  // Try Render API first, then localhost, then dummy data (in dev)
  const urlsToTry = [RENDER_API_URL, LOCAL_API_URL];
  // let lastError = null;
  for (const base of urlsToTry) {
    try {
      const url = `${base}/api${endpoint}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data && data.data && Array.isArray(data.data) && data.data.length === 0) {
        continue;
      }
      return { ...data, _baseUrl: base };
    } catch (error) {
      // lastError = error;
    }
  }
  if (process.env.NODE_ENV === 'development' && fallback) {
    // Return dummy data in development if both APIs fail
    return { data: fallback, _baseUrl: LOCAL_API_URL };
  }
  // For production, return null or handle as needed
  return null;
};

// Specific API functions
export const getProjects = () =>
  fetchData('/projects?populate=*', { fallback: dummyProjects });
export const getProjectBySlug = (slug) => fetchData(`/projects?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`);
export const getSchools = () => fetchData('/schools?populate=*');
export const getMedia = () => fetchData('/medias?populate=*');
export const getPartners = () => fetchData('/partners?populate=*', { fallback: dummyPartners });
export const getEvents = () => fetchData('/events?populate=*');
export const getBoardMembers = () => fetchData('/board-members?populate=*');
export const getTrustees = () => fetchData('/trustees?populate=*');
export const getYouTubeLinks = () => fetchData('/youtube-links?populate=*');
export const getCorporateLogos = () => fetchData('/corporate-logos?populate=*');
export const getHeroImages = () => fetchData('/hero-images?populate=*');
export const getLogo = () => fetchData('/logo?populate=*');
export const getResourceManagers = () => fetchData('/resource-managers?populate=*');