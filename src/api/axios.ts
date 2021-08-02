// axios拦截请求
import axios from "axios";
import { ElMessage } from "element-plus";
import { env, Eenv } from "@/utils";
import { getToken } from "./getToken";

const token = env.apiToken();

function serves(serve: string) {
  const service = axios.create({
    baseURL: serve,
    timeout: 10000, // 请求超时时间
    headers: { common: { Authorization: "Bearer " + token } },
  });

  // axios
  service.interceptors.request.use(
    (config) => {
      // config.headers.common.Authorization = "Bearer " + token;
      // 请求前
      return config;
    },
    (error) => {
      // 请求错误处理
      // Message.error('请求失败，请查看控制台提示')
      return Promise.reject(error);
    }
  );

  service.interceptors.response.use(
    (response) => {
      console.log("response", response);
      return response;
    },
    (error) => {
      // apm
      if (error.message.search(/40*/g) > -1 && env.env() === Eenv.local) {
        getToken();
      } else {
        try {
          if (error.response.data.error.message) {
            ElMessage.error(error.response.data.error.message);
          } else if (error.message) {
            ElMessage.error(error.message);
          }
        } catch (error) {
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    }
  );
  return service;
}

export default serves;
