// 接口地址 及 环境配置
type Tenv = () => string;
type TShowLeftBar = () => boolean;
type TApiToken = () => string;
type TApiserve = () => string;

export enum Eenv {
  development = "development",
  local = "local",
  production = "production",
}

const getUrl = (dev: string, pro: string, def: any = "") => {
  const envs: string = env();
  return envs === Eenv.development || envs === Eenv.local
    ? dev
    : envs === Eenv.production
    ? pro
    : def;
};

const env: Tenv = () => {
  // production development local
  console.log("process.env.NODE_ENV", process.env.NODE_ENV);
  return process.env.NODE_ENV;
};

// 本地开发环境 显示左侧目录
const showSidebar: TShowLeftBar = () => {
  return env() === Eenv.local;
};

const apiToken: TApiToken = () => {
  // const proToken = localStorage.token
  return localStorage.token; // getUrl(devToken, proToken)
};

// 通用接口 mock
const mockServe: TApiserve = () => {
  const devUrl = "http://localhost:3001";
  const proUrl = "http://online.com";
  return getUrl(devUrl, proUrl);
};
export { env, showSidebar, apiToken, mockServe };
