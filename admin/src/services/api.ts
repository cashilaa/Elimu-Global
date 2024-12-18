const API_URL = import.meta.env.NODE_ENV === 'production' 
  ? import.meta.env.VITE_API_URL 
  : import.meta.env.VITE_LOCAL_API_URL;

export { API_URL }; 