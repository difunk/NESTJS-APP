// API configuration
export const API_BASE_URL = 
  import.meta.env.VITE_API_URL || "https://quote-management-system.onrender.com";

console.log("API_BASE_URL:", API_BASE_URL);
console.log("VITE_API_URL from env:", import.meta.env.VITE_API_URL);
