// utils/axiosInstance.js
import axios from 'axios';
import { BASE_URL } from '@/constants';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {

  config.withCredentials = true;
  return config;
});

export default axiosInstance;
