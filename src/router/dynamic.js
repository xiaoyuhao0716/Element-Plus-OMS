import router from '@/router'
import { apiRouter } from "../apis/index";
import { useRoutesDatatStore } from "../store/routesData";

/**
 * 注册路由
 * 用户切换账号需移除 sessionStorage 中的 routesListData 数据
 */
export const registerRoutes = () => {
    const routestData = useRoutesDatatStore();
    return new Promise((resolve) => {
        if (routestData.routesListData.length) {
            addRoutes(routestData.routesListData, 'Home');
            resolve(true);
        } else {
            apiRouter().then(res => {
                routestData.setRoutesListData(res.data.router);
                addRoutes(res.data.router, 'Home');
                resolve(true);
            })
        }
    })
}

/**
 * 动态添加路由
 */
const addRoutes = (routes, parentName = "") => {
    routes.forEach((navigation) => {
        if (navigation.path && navigation.component) {
            const route = {
                path: navigation.path,
                meta: { title: navigation.meta.title },
                name: navigation.name,
                component: () => import(`../views/${navigation.component}`),
            }
            parentName ? router.addRoute(parentName, route) : router.addRoute(route);
            // if (item.children && item.children.length) {
            //     addRoutes(item.children, item.name);
            // }
        }
    })

};

/**
 * 生成管理菜单
 */
export const getAuthMenu = () => {

}