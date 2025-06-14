import axios from "axios";


const authRequest = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

authRequest.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
);
authRequest.interceptors.response.use(
    (response) => {
        return response;
    },
        (error: any) => {
    if (error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.replace('/auth/login');
    }
    return Promise.reject(error);
});

export default authRequest;



