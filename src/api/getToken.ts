// token获取
import axios, { AxiosRequestConfig } from "axios";

const options: AxiosRequestConfig = {
  method: "POST",
  withCredentials: true,
  headers: { "content-type": "application/x-www-form-urlencoded" },
  // data: qs.stringify(body),
  url: "http://3001/token",
};

const getToken = () =>
  axios(options).then((res) => {
    console.log("token", res);
    if (res.status === 200) {
      localStorage.setItem("token", res.data.access_token);
    }
  });

export { getToken };
