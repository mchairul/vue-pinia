import { defineStore } from "pinia";

export const useUserDataStore = defineStore("dataUser", {
    state: () => {
        return{
            loginData:{}
        }
    },
    actions: {
        setLoginUser(dataUser) {
            this.loginData.value = dataUser
        },
        clearLoginUser(){
            this.loginData.value = null
        }
    }
})
