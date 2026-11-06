import api from './client';
const get = (url) => api.get(url).then((r) => r.data.data);
export const profileApi = {
  get: () => get('/profile'),
  update: (data) => api.put('/profile', data).then((r) => r.data.data),
};
export const expertiseApi = {
  list: () => get('/expertise'),
  create: (d) => api.post('/expertise', d).then((r) => r.data.data),
  update: (id, d) => api.put(`/expertise/${id}`, d).then((r) => r.data.data),
  remove: (id) => api.delete(`/expertise/${id}`).then((r) => r.data),
};
export const skillsApi = {
  list: () => get('/skills'),
  create: (d) => api.post('/skills', d).then((r) => r.data.data),
  update: (id, d) => api.put(`/skills/${id}`, d).then((r) => r.data.data),
  remove: (id) => api.delete(`/skills/${id}`).then((r) => r.data),
};
export const highlightsApi = {
  list: () => get('/highlights'),
  create: (d) => api.post('/highlights', d).then((r) => r.data.data),
  update: (id, d) => api.put(`/highlights/${id}`, d).then((r) => r.data.data),
  remove: (id) => api.delete(`/highlights/${id}`).then((r) => r.data),
};
export const educationApi = {
  list: () => get('/education'),
  create: (d) => api.post('/education', d).then((r) => r.data.data),
  update: (id, d) => api.put(`/education/${id}`, d).then((r) => r.data.data),
  remove: (id) => api.delete(`/education/${id}`).then((r) => r.data),
};
export const projectsApi = {
  list: (featured) => get(featured ? '/projects?featured=true' : '/projects'),
  getBySlug: (slug) => get(`/projects/${slug}`),
  create: (d) => api.post('/projects', d).then((r) => r.data.data),
  update: (id, d) => api.put(`/projects/${id}`, d).then((r) => r.data.data),
  remove: (id) => api.delete(`/projects/${id}`).then((r) => r.data),
};
export const messagesApi = {
  send: (d) => api.post('/messages', d).then((r) => r.data),
  list: () => get('/messages'),
  updateStatus: (id, status) => api.patch(`/messages/${id}`, { status }).then((r) => r.data.data),
  remove: (id) => api.delete(`/messages/${id}`).then((r) => r.data),
};
export const authApi = {
  login: (d) => api.post('/auth/login', d).then((r) => r.data.data),
  logout: () => api.post('/auth/logout').then((r) => r.data),
  me: () => api.get('/auth/me').then((r) => r.data.data),
};
export const uploadApi = {
  image: (file) => {
    const fd = new FormData(); fd.append('image', file);
    return api.post('/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } }).then((r) => r.data.data.url);
  },
};
