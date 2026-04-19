import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000'
});

API.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!accessToken || !refreshToken) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(error);
            }

            try {
                const response = await axios.post('http://localhost:3000/api/auth/refresh', {
                    refreshToken: refreshToken
                });

                const newAccessToken = response.data.accessToken;
                const newRefreshToken = response.data.refreshToken;

                localStorage.setItem('accessToken', newAccessToken);
                localStorage.setItem('refreshToken', newRefreshToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return API(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export const getAllProducts = async () => {
    const response = await API.get('/api/products');
    return response.data;
};

export const getProductById = async (id) => {
    const response = await API.get(`/api/products/${id}`);
    return response.data;
};

export const createProduct = async (productData) => {
    const response = await API.post('/api/products', productData);
    return response.data;
};

export const updateProduct = async (id, productData) => {
    const response = await API.put(`/api/products/${id}`, productData);
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await API.delete(`/api/products/${id}`);
    return response.data;
};

export const register = async (userData) => {
    const response = await API.post('/api/auth/register', userData);
    return response.data;
};

export const login = async (credentials) => {
    const response = await API.post('/api/auth/login', credentials);
    return response.data;
};

export const getMe = async () => {
    const response = await API.get('/api/auth/me');
    return response.data;
};

export default API;