const API_BASE_URL = process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337/api';

// Helper function to fetch data from Strapi
export const fetchData = async (endpoint) => {
  try {
    const url = `${API_BASE_URL}/api${endpoint}`;
    console.log('Fetching from:', url);
    const response = await fetch(url);
    console.log('Response status:', response.status);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

// Specific API functions
export const getProjects = () => fetchData('/projects?populate=*');
export const getProjectBySlug = (slug) => fetchData(`/projects?filters[slug][$eq]=${slug}&populate=*`);
export const getSchools = () => fetchData('/schools?populate=*');
export const getMedia = () => fetchData('/medias?populate=*');
export const getPartners = () => fetchData('/partners?populate=*');
export const getEvents = () => fetchData('/events?populate=*');
export const getBoardMembers = () => fetchData('/board-members?populate=*');
export const getTrustees = () => fetchData('/trustees?populate=*');
export const getYouTubeLinks = () => fetchData('/youtube-links?populate=*');
export const getCorporateLogos = () => fetchData('/corporate-logos?populate=*');
export const getHeroImages = () => fetchData('/hero-images?populate=*');
export const getLogo = () => fetchData('/logo?populate=*');