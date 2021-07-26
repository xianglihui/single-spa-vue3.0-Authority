import { h, createApp } from "vue";
import singleSpaVue from "single-spa-vue";
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import "@/assets/css/common.css"; // +
import App from "./App.vue";
import router from "./router";
import api from "@/api";
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
    app.use(router).use(ElementPlus);
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
