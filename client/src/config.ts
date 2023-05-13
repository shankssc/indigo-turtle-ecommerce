export const SERVER_URL_FINAL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api'
    : 'https://drab-pink-dalmatian-gear.cyclic.app/api';

export const CORS_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};
