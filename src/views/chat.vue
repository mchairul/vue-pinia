<script setup>
import { onMounted, ref } from 'vue';
import ComponentFooter from '../components/ComponentFooter.vue';
import ComponentHeader from '../components/ComponentHeader.vue';
import ComponentSidebar from '../components/ComponentSidebar.vue';
import API from '../api';
import { useUserDataStore } from '../stores/userData';


const loading = ref(true)
const chats = ref([])

const loginStore = useUserDataStore()

const getChats = async () => {
    await API.get('/messages', {
        headers:{
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + loginStore.loginData.value.apikey
        }
    }).then((response) => {
        chats.value = response.data
    }).catch((e) => {

    }).finally(() => {
        loading.value = false
    })
}

onMounted(() => {
    getChats()
})
</script>

<template>
    <div class="app-wrapper">
        <ComponentHeader />
        <ComponentSidebar />
        <!--begin::App Main-->
        <main class="app-main">
            <div class="app-content">
                <h1>Chat</h1>
                <div v-if="loading">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                <div v-else>
                    <div v-if="chats.length == 0">
                        <p>No Data!</p>
                    </div>
                    <div v-else v-for="(chat, index) in chats" :key="index" class="card p-4 mb-3">
                        <h3>{{ chat.title }}</h3>
                        <p>{{ chat.description }}</p>
                    </div>
                </div>
            </div>
        </main>
        <!--end::App Main-->
        <ComponentFooter />
    </div>
</template>m