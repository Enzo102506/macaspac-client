const HOST = import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? 'http://localhost:8000/api' : 'https://macaspac-backend.onrender.com/api');

if (import.meta.env.DEV) {
  console.log('Using local API host:', HOST);
}

export default {
  HOST,
};
