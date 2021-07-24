// 接口地址 及 环境配置
type Tenv = () => string;
type TShowLeftBar = () => boolean;

export enum Eenv {
  development = "development",
  local = "local",
  production = "production",
}

const env: Tenv = () => {
  // production development local
  console.log("process.env.NODE_ENV",process.env.NODE_ENV)
  return process.env.NODE_ENV;
};

// 本地开发环境 显示左侧目录
const showSidebar: TShowLeftBar = () => {
  return env() === Eenv.local;
};
export { env,showSidebar };
