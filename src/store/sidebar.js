import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', {
    //持久化
    persist: true,

    state: () => {
        return {
            collapse: false
        }
    },
    getters: {

    },
    actions: {
        handleCollapse() {
            this.collapse = !this.collapse;
        }
    }
})