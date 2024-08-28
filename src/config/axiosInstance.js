import axios from 'axios';
console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL);

export const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api/v1`,
    withCredentials: true,
});


