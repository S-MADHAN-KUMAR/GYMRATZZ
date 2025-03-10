import axios from 'axios';
const USER_API = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true, 
});

USER_API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem('USER_TOKEN');  
    const email = localStorage.getItem('USER_EMAIL');  

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    if (email) {
      req.headers['x-user-email'] = email;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
)

const ADMIN_API = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

ADMIN_API.interceptors.request.use((req) => {
  const token = localStorage.getItem('ADMIN_TOKEN');

  if (token) {
    req.headers.Authorization = `Bearer ${token}`
  }
  return req;
});

export { USER_API, ADMIN_API };
