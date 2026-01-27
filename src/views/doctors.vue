<script setup>
import { useRouter } from 'vue-router';
import ComponentFooter from '../components/ComponentFooter.vue';
import ComponentHeader from '../components/ComponentHeader.vue';
import ComponentSidebar from '../components/ComponentSidebar.vue';
import { onMounted, ref } from 'vue';
import { useUserDataStore } from '../stores/userData';
import API from '../api';
import Add_dokter from './add_dokter.vue';
import Swal from 'sweetalert2';

const router = useRouter()
const loading = ref(true)
const doctors = ref([])

const loginStore = useUserDataStore()

const getDoctors = async () => {
    await API.get('/doctors', {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + loginStore.loginData.value.apikey
        }
    }).then((response) => {
        doctors.value = response.data.data
    }).catch((e) => {
        console.log(e);
    }).finally(()=>{
        loading.value = false
    })
}

const confirmDelete = (id) => {
    Swal.fire({
        title: "apakah anda yakin?",
        text: "untuk menghapus dokter ini!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus!"
    }).then((result) => {
        if (result.isConfirmed) {
            deleteDoctor(id)
        }
    });
}

const deleteDoctor = async (id) => {
    API.delete('/doctor/delete/' + id, {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + loginStore.loginData.value.apikey
        }
    }).then((response) => {
        Swal.fire({
            title: 'hapus dokter berhasil',
            timer: 3000,
            timerProgressBar: true,
            didClose: () => {
                window.location.reload()
            }
        })
    }).catch((e) => {
        console.log(e);
    })
}

onMounted(() => {
    getDoctors()
})

</script>

<template>
    <div class="app-wrapper">
        <ComponentHeader/>
        <ComponentSidebar/>
        <main class="app-main">
            <div class="app-content">
                <h1>Dokter</h1>
                <button class="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Tambah Dokter</button>
                <div v-if="loading">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                <div v-else class="card p-4">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>STR</th>
                                <th>Nama</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Tgl Lahir</th>
                                <th>Foto</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="doctors.length == 0">
                                <td colspan="6">No Data</td>
                            </tr>
                            <tr v-else v-for="(doctor,index) in doctors" :key="index" >
                                <td>{{ doctor.str }}</td>
                                <td>{{ doctor.nama }}</td>
                                <td>{{ doctor.email }}</td>
                                <td>{{ doctor.phone }}</td>
                                <td>{{ doctor.tanggal_lahir }}</td>
                                <td>
                                    <img :src="doctor.foto" width="150">
                                </td>
                                <td>
                                    <router-link :to="{name: 'dokter.edit', params: {id: doctor.id}}" class="btn btn-warning btn-sm">Edit</router-link> &nbsp;
                                    <button class="btn btn-danger btn-sm" @click="confirmDelete(doctor.id)">Hapus</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>    
                </div>
            </div>
        </main>
        <ComponentFooter/>
        <!-- Modal -->
        <div class="modal modal-xl fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <Add_dokter/>
            </div>
        </div>
        </div>

    </div>
</template>