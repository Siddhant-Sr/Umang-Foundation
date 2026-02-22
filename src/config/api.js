const RENDER_API_URL = 'https://umang-backend-ty0e.onrender.com';
const LOCAL_API_URL = 'http://localhost:1337';

export const API_BASE_URL = process.env.REACT_APP_STRAPI_URL || RENDER_API_URL;
export const FALLBACK_API_URL = LOCAL_API_URL;