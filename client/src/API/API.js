import axios from 'axios';
import Cookies from 'js-cookie';

const USER_API = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

USER_API.interceptors.request.use((req) => {
  const token = Cookies.get('USER_TOKEN');

  
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
  const token = Cookies.get('ADMIN_TOKEN');

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export { USER_API, ADMIN_API };
