import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import * as View from "@/views";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/authority",
    name: "authority",
    component: View.Nav,
    meta: {
      title: "authority - 首页",
    },
    children: [
      {
        path: "role",
        name: "role",
        component: View.RoleManage,
        meta: {
          title: "权限系统 - 角色管理",
        },
      },
    ],
  },

  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  console.log("to", to);
  // return false
  next();
});
export default router;
