import { createRouter, createWebHistory } from 'vue-router'
import { useUserDataStore } from '../store/userData';
import { useRoutesDatatStore } from '../store/routesData';
import { useSidebarDataStore } from '../store/sidebarData';
import { registerRoutes } from "./dynamic";

import Home from '../views/Home.vue'

export const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: '/dashboard',
    children: [
      {
        path: `/:pathMatch(.*)*`,
        meta: {
          title: '首页'
        },
        component: () => import("../views/Dashboard.vue")
      }
    ]
  }, {
    path: "/login",
    name: "Login",
    meta: {
      title: '登录'
    },
    component: () => import("../views/Login.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 防止路由无限循环
let routeFlag = false;
// 定义全局前置守卫
router.beforeEach((to, from, next) => {

  const userData = useUserDataStore()

  if (userData.token) {
    if (routeFlag) {
      next();
    } else {
      // 注册动态路由
      registerRoutes().then(() => {
        routeFlag = true;
        next({ ...to, replace: true });
      }).catch(() => {
        // 处理异常事件
      })
    }
  } else {
    routeFlag = false;
    
    //清除 路由数据 侧边栏数据
    const routesDatat = useRoutesDatatStore();
    const SidebarData = useSidebarDataStore()
    routesDatat.resetRoutesListData();
    SidebarData.resetSidebarListData();

    if (to.name === "Login") {
      next();
    } else {
      next({
        name: "Login",
      });
    }
  }
})

export default router
