import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
});

const refresh = async () => {
  try {
    const res = await axios.post(`http://localhost:3000/api/auth/refresh`);
    if (res.data) {
      return res.data.access_token;
    }
  } catch (error: any) {
    await axios.post(`http://localhost:3000/api/auth/clear`);
    localStorage.clear();
    window.location.href = "/";
  }
};

const errorFunctions = async (error: any) => {
  const originalConfig = error.config;
  if (error.response) {
    if (error.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      const new_access_token = await refresh();
      axiosInstance.defaults.headers.common["Authorization"] =
        "Bearer " + new_access_token;
      return axiosInstance(error.config);
    }
  }
};

axiosInstance.interceptors.request.use(
  async (req) => {
    const access_token = await cookies.get(`access_token`);

    if (access_token && req.headers) {
      req.headers.Authorization = "Bearer " + access_token;
    }
    return req;
  },
  async (error) => {
    errorFunctions(error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (res) => {
    return res;
  },
  async (error) => {
    errorFunctions(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
