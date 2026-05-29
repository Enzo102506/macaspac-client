import axios from 'axios';
import constants from '../constants';

// API Access to Front-end JSON data transformation or decoder
const API = axios.create({
  baseURL: `${constants.HOST}/articles`,
});

// Fetch articles
export const fetchArticles = (article) => API.get('/', article);

// Create article
export const createArticle = (article) => API.post('/', article);

// Update article
export const updateArticle = (id, article) => API.put(`/${id}`, article);

// Delete article (toggle status)
export const deleteArticle = (id) => API.delete(`/${id}`);
