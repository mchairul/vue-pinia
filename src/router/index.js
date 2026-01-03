import { createRouter, createWebHistory } from 'vue-router'
import { routers } from './routers'
import { useUserDataStore } from '../stores/userData'

const routes = routers

const router = createRouter({
    history: createWebHistory(),
    routes
})

// cek user data
router.beforeEach(async (to) => {
    const loginStore = useUserDataStore()

    // cek jika ada set ke login user
    if (localStorage.getItem("dataUser")) {
        const dataUser = JSON.parse(localStorage.getItem("dataUser"))
        loginStore.setLoginUser(dataUser)
    }

    const authenticated = loginStore.loginData.value !== undefined
    console.log(authenticated)

    if (!authenticated && to.name != 'login') {
        return {name: 'login'}
    }
})

export default router
