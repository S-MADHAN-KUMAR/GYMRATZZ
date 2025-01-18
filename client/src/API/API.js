import axios from 'axios';

const USER_API = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

USER_API.interceptors.request.use((req) => {
  const token = localStorage.getItem('USER_TOKEN') ; 
  
  if (token) {
    req.headers.Authorization = `Bearer ${token}`; 
  }
  return req;
});


const ADMIN_API = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

ADMIN_API.interceptors.request.use((req) => {
  const token = localStorage.getItem('ADMIN_TOKEN');

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export { USER_API, ADMIN_API };
