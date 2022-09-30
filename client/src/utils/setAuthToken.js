import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    let authToken = "Bearer " + token;
    axios.defaults.headers.common['Authorization'] = authToken;
    localStorage.setItem('token', token);
  } else {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

export default setAuthToken;
