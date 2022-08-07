import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

function deleteAllCookies() {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

const refresh = async () => {
  try {
    const refresh_token = await cookies.get("refresh_token");
    if (!refresh_token) {
      throw new Error("No token");
    }
    const res = await axios.post(
      `${process.env.NEXT_APP_API_URL}/auth/refresh`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refresh_token}`,
        },
      }
    );
    if (res.data) {
      cookies.set(`access_token`, `${res.data.access_token}`, {
        maxAge: 899,
        path: "/",
      });
      cookies.set("refresh_token", `${res.data.refresh_token}`, {
        maxAge: 604799,
        path: "/",
      });
      return res.data.access_token;
    }
  } catch (error: any) {
    deleteAllCookies();
    localStorage.clear();
    window.location.href = "/";
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
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (res) => {
    return res;
  },
  async (error) => {
    const originalConfig = error.config;
    if (error.response) {
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        const new_access_token = await refresh();
        axiosInstance.defaults.headers.common["Authorization"] =
          "Bearer " + new_access_token;
        return axiosInstance(error.config);
      }
      if (error.response.status === 403) {
        window.location.href = "/forbidden";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
