import { defineStore } from 'pinia'

export const useUserDataStore = defineStore('userData', {
    //ζδΉε
    persist: true,

    state: () => {
        return {
            createTime: 0,
            email: "",
            id: 0,
            phone: "",
            role: "",
            token: "",
            updateTime: "",
            username: "",
        }
    },

    getters: {
    },

    actions: {

        checkTokenTime() {
            if (this.createTime == 1234) {
                this.deleteUserData()
            }

        },

        setUserData(data) {
            this.createTime = data.createTime;
            this.email = data.email;
            this.id = data.id;
            this.phone = data.phone;
            this.role = data.role;
            this.token = data.token;
            this.updateTime = data.updateTime;
            this.username = data.username;
        },

        deleteUserData() {
            this.$reset()
        }

    }
})