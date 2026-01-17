<script setup>
import { onMounted, ref } from 'vue';
import ComponentFooter from '../components/ComponentFooter.vue';
import ComponentHeader from '../components/ComponentHeader.vue';
import ComponentSidebar from '../components/ComponentSidebar.vue';
import API from '../api';
import { useUserDataStore } from '../stores/userData';
import { useRouter } from 'vue-router';

const router = useRouter()
const loading = ref(true)
const bookings = ref([])

const loginStore = useUserDataStore()

const getChats = async () => {
    await API.get('/bookings', {
        headers:{
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + loginStore.loginData.value.apikey
        }
    }).then((response) => {
        bookings.value = response.data.data
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
                <h1>Booking</h1>
                <button class="btn btn-primary mb-3" @click="router.push({name:'booking.add'})">Tambah Booking</button>
                <div v-if="loading">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                <div v-else class="card p-4">
                    <div v-if="bookings.length == 0">
                        <p>No Data!</p>
                    </div>
                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th>Ruangan</th>
                            <th>Kategori</th>
                            <th>Remarks</th>
                            <th>Tanggal Request</th>
                            <th>Tanggal Dibutuhkan</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-if="bookings.length == 0">
                            <td colspan="6">No Data</td>
                        </tr>
                        <tr v-else v-for="(booking, index) in bookings" :key="index">
                            <td>{{ booking.room_name }}</td>
                            <td>{{ booking.category_name }}</td>
                            <td>{{ booking.category_remarks }}</td>
                            <td>{{ booking.request_date }}</td>
                            <td>{{ booking.required_date }}</td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
        <!--end::App Main-->
        <ComponentFooter />
    </div>
</template>m