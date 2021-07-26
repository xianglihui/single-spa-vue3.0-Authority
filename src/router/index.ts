import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import * as View from "@/views";
// import Home from "../views/Home.vue";

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
        path: "permission",
        name: "permission",
        component: View.PermissionTree,
        meta: {
          title: "权限系统 - 角色管理",
        },
      },
      // {
      //   path: "role",
      //   name: "role",
      //   component: View.RoleManage,
      //   meta: {
      //     title: "权限系统 - 角色管理",
      //   },
      // },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
