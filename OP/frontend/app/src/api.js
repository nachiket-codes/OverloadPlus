import axios from 'axios'

const API = axios.create({
    baseURL:  'https://api.overloadplus.fun'
})

// To send token while requesting
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

// To catch authorization error from backend if our token is invalid or expired
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status == 401){
            // store.dispatch(logoutUser());
            window.location.href = '/login';
        }
        return Promise.reject(error)
    })

export default API;