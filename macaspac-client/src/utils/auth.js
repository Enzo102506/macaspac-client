export const getToken = () => localStorage.getItem('token');
export const getUserType = () => localStorage.getItem('type');
export const isAuthenticated = () => Boolean(getToken());
export const isAdmin = () => getUserType() === 'admin';
export const isEditor = () => getUserType() === 'editor';
export const isViewer = () => getUserType() === 'viewer';
export const clearAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('firstName');
  localStorage.removeItem('type');
};
