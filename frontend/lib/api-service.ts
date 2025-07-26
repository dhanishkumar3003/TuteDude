import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add auth token to every request
api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiService = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const res: AxiosResponse<T> = await api.get(url, config);
    return res.data;
  },

  post: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const res: AxiosResponse<T> = await api.post(url, data, config);
    return res.data;
  },

  put: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const res: AxiosResponse<T> = await api.put(url, data, config);
    return res.data;
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const res: AxiosResponse<T> = await api.delete(url, config);
    return res.data;
  },
};

export default api;
