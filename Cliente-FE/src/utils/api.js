// Cliente-FE/src/utils/api.js (CORREGIDO)

import axios from "axios";

// Crear instancia de Axios. La baseURL vacía o con '/' 
// permite que el proxy de Vite configurado funcione correctamente.
const API = axios.create({
  baseURL: "/", 
});

// Interceptor que añade el token JWT a cada request automáticamente
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;