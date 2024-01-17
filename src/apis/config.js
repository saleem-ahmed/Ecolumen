import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.REACT_APP_BASE_URL,
});

// for storing tokens / post the tokens to headers
client.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  // console.log("Token from localStorage:", token);
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

client.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

/**
 * Request Wrapper with default success/error actions
 */
const request = (options) => {
  const onSuccess = (response) => {
    return response.data;
  };

  const onError = (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Router.push(redirectTo);
      }
    } else {
      // Something else happened while setting up the request
      // triggered the error
    }

    return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;
