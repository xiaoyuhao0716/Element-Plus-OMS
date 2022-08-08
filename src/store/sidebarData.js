/**
 * 第一次登陆后储存地址
 * 储存侧边栏地址
 */

import { defineStore } from 'pinia'

export const useSidebarDataStore = defineStore('sidebarData', {
    //持久化
    persist: true,

    state: () => {
        return {
            sidebarListData: [],
        }
    },
    getters: {

    },
    actions: {
        setSidebarListData(e) {
            this.sidebarListData = e
        },
        resetSidebarListData() {
            this.$reset()
        }

    }
})