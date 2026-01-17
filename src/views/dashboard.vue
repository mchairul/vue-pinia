<script setup>
import { onMounted, ref } from 'vue';
import ComponentFooter from '../components/ComponentFooter.vue';
import ComponentHeader from '../components/ComponentHeader.vue';
import ComponentSidebar from '../components/ComponentSidebar.vue';
import API from '../api';
import { useUserDataStore } from '../stores/userData';

const saldo = ref(0)
const userStore = useUserDataStore()

const getSaldo = async () => {
    await API.get('/balance-user', {
        headers:{
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + userStore.loginData.value.apikey
        }
    }).then((response) => {
        console.log(response.data.amount);
        
        saldo.value = response.data.amount
    }).catch((e) => {
        console.log(e);
    })
}

onMounted(() => {
    document.body.classList.remove('login-page', 'bg-body-secondary')
    document.body.classList.add('layout-fixed', 'sidebar-expand-lg', 'sidebar-open', 'bg-body-tertiary')
    //getSaldo()
})
</script>

<template>
    <div class="app-wrapper">
        <ComponentHeader />
        <ComponentSidebar />
        <!--begin::App Main-->
        <main class="app-main">
            <div class="app-content">
                <h1>Saldo anda Rp <strong>{{ saldo }}</strong></h1>
            </div>
        </main>
        <!--end::App Main-->
        <ComponentFooter />
    </div>
</template>
