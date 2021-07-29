import { h, createApp } from "vue";
import singleSpaVue from "single-spa-vue";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import locale from "./utils/zh-cn.js";
// import locale from "element-plus/lib/locale/lang/zh-cn";
import * as locale from "element-plus/lib/locale/index.js";
import lang from "element-plus/lib/locale/lang/zh-cn";
import "@/assets/css/common.css"; // +
import App from "./App.vue";
import router from "./router";
import api from "@/api";
// import { ElMessage } from "element-plus";
// const message = ElMessage();
locale.use(lang);
const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      return h(App, {
        // single-spa props are available on the "this" object. Forward them to your component as needed.
        // https://single-spa.js.org/docs/building-applications#lifecyle-props
        // if you uncomment these, remember to add matching prop definitions for them in your App.vue file.
        /*
        name: this.name,
        mountParcel: this.mountParcel,
        singleSpa: this.singleSpa,
        */
      });
    },
  },
  handleInstance(app) {
    app.config.globalProperties.$authApi = api;
    // app.config.globalProperties.$message = message;
    app.use(router);
    app.use(ElementPlus, { locale });
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
