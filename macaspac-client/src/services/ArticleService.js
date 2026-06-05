import axios from 'axios';
import constants from '../constants';

const API = axios.create({
  baseURL: `${constants.HOST}/articles`,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fetch articles
export const fetchArticles = () => API.get('/');

// Fetch article by slug
export const fetchArticleBySlug = (slug) => API.get(`/${slug}`);

// Create article
export const createArticle = (article) => API.post('/', article);

// Update article
export const updateArticle = (id, article) => API.put(`/${id}`, article);

// Delete article (toggle visibility)
export const deleteArticle = (id) => API.delete(`/${id}`);
