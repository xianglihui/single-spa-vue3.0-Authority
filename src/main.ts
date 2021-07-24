import { h, createApp } from "vue";
import singleSpaVue from "single-spa-vue";
import ElementPlus from "element-plus"; // +
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from "@/api";
import "@/assets/css/common.css"; // +
import "element-plus/lib/theme-chalk/index.css";
const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    // el: "#root_app1",
    render() {
      return h(App, {
        // single-spa props are available on the "this" object. Forward them to your component as needed.
        // https://single-spa.js.org/docs/building-applications#lifecyle-props
        // if you uncomment these, remember to add matching prop definitions for them in your App.vue file.
        /*
        // name: this.name,
        mountParcel: this.mountParcel,
        singleSpa: this.singleSpa,
        */
      });
    },
  },
  handleInstance(app) {
    // 全局挂载api
    app.config.globalProperties.$authApi = api;
    app.use(router).use(store).use(ElementPlus);
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
