<script setup>
import { useRouter } from 'vue-router';
import { useUserDataStore } from '../stores/userData';
import API from '../api';

const dataUser = useUserDataStore()
const loginStore = useUserDataStore()

const router = useRouter()

const logout = async () => {
    const confirmation = confirm('apakah anda yakin untuk logout?')
    if (confirmation) {
        await API.get('/logout',{
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + loginStore.loginData.value.apikey
            }
        }).then((response) => {
            // hapus data user dari local storage
            localStorage.removeItem('dataUser')

            // hapus store user
            loginStore.clearLoginUser()

            // hapus store apikey
            loginStore.clearApikeyUser()

            router.push({name: 'login'})
        }).catch((e) => {
            console.log(e)
        })
    }
}
</script>

<template>
    <nav class="app-header navbar navbar-expand bg-body">
        <div class="container-fluid">
            <ul class="navbar-nav ms-auto">
                <!--begin::User Menu Dropdown-->
                <li class="nav-item dropdown user-menu">
                <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                    <img
                    src="/avatar5.png"
                    class="user-image rounded-circle shadow"
                    alt="User Image"
                    />
                    <span class="d-none d-md-inline" v-if="dataUser.loginData.value != null">{{ dataUser.loginData.value.name }}</span>
                </a>
                <ul class="dropdown-menu dropdown-menu-lg dropdown-menu-end">
                    <!--begin::User Image-->
                    <li class="user-header text-bg-primary">
                    <img
                        src="/avatar5.png"
                        class="rounded-circle shadow"
                        alt="User Image"
                    />
                    <p v-if="dataUser.loginData.value != null">
                        {{ dataUser.loginData.value.name }}
                        <small>{{ dataUser.loginData.value.email }}</small>
                    </p>
                    </li>
                    <!--end::User Image-->
                    <!--begin::Menu Footer-->
                    <li class="user-footer">
                    <a href="#" class="btn btn-default btn-flat">Profile</a>
                    <a href="#" class="btn btn-default btn-flat float-end" @click="logout">Sign out</a>
                    </li>
                    <!--end::Menu Footer-->
                </ul>
                </li>
                <!--end::User Menu Dropdown-->
            </ul>
        </div>
    </nav>
</template>