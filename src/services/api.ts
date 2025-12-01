/**
 * API environment configuration
 * Uses React Native's __DEV__ flag to switch between development and production URLs
 */

const API_URLS = {
  development: "http://localhost:3000",
  production: "https://projeto-final-aos.vercel.app",
};

// Force production URL for testing (set to true to use production backend)
const FORCE_PRODUCTION = true;

export const getApiUrl = (): string => {
  if (FORCE_PRODUCTION) return API_URLS.production;
  return __DEV__ ? API_URLS.development : API_URLS.production;
};

export default {
  apiUrl: getApiUrl(),
};
