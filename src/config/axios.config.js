import axios from 'axios';
import { toast } from 'react-toastify';
const instance = axios.create({
    baseURL: 'https://api.unsplash.com'
});
const secretID = 'ShpDfvm3-Va343PSYDqHEUSCPp9BlDcY-LvnYaKKtTI';

console.log(secretID);

instance.defaults.headers.common['Authorization'] = `Client-ID ${secretID}`;

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers.Authorization = `Client-ID ${secretID}`;
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = (error && error.response && error.response.status) || 500;
    switch (status) {
        case 401:
            {
                toast.error("Unauthorized the user.");
                return error && error.response.data;

            }
        case 403:
            {
                toast.error("You don't have permission to access this resource");
                return Promise.reject(error);

            }
        case 403:
            {
                toast.error("this resource is not found");
                return Promise.reject(error);

            }
        default: {
            return Promise.reject(error);
        }

    }
});


export default instance;