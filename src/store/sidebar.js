import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', {
    //ζδΉε
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