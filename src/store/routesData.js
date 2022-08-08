/**
 * 第一次登陆后储存
 * 储存路由
 */

import { defineStore } from 'pinia'

export const useRoutesDatatStore = defineStore('routestData', {
    //持久化
    persist: true,

    state: () => {
        return {
            routesListData: [],
        }
    },
    getters: {

    },
    actions: {
        setRoutesListData(e) {
            this.routesListData = e
        },
        resetRoutesListData() {
            this.$reset()
        }

    }
})