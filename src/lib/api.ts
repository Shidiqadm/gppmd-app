import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// API Configuration
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.example.com';
const API_TIMEOUT = 10000; // 10 seconds

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add auth token if available
    const token = null; // Get from your auth store
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error.response?.status, error.response?.data);
    
    // Handle common error cases
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      console.log('🔒 Unauthorized - redirecting to login');
    }
    
    if (error.response?.status >= 500) {
      // Handle server errors
      console.log('🚨 Server error occurred');
    }
    
    return Promise.reject(error);
  }
);

// API methods
export const api = {
  // GET request
  get: <T = any>(url: string, config?: any): Promise<AxiosResponse<T>> =>
    apiClient.get(url, config),
  
  // POST request
  post: <T = any>(url: string, data?: any, config?: any): Promise<AxiosResponse<T>> =>
    apiClient.post(url, data, config),
  
  // PUT request
  put: <T = any>(url: string, data?: any, config?: any): Promise<AxiosResponse<T>> =>
    apiClient.put(url, data, config),
  
  // PATCH request
  patch: <T = any>(url: string, data?: any, config?: any): Promise<AxiosResponse<T>> =>
    apiClient.patch(url, data, config),
  
  // DELETE request
  delete: <T = any>(url: string, config?: any): Promise<AxiosResponse<T>> =>
    apiClient.delete(url, config),
};

export default api;
