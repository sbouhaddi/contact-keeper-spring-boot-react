import axios from 'axios';

const setAuthToken = () => {
  axios.interceptors.request.use((config) => {
    if (localStorage.getItem('token') !== null) {
      const finalToken = 'Bearer ' + localStorage.getItem('token');
      config.headers.authorization = finalToken;
    }
    return config;
  });
};

export default setAuthToken;
