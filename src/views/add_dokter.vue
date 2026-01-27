<script setup>
import { ref } from 'vue';
import * as yup from 'yup'
import { ErrorMessage, Field, Form } from 'vee-validate';
import { VueDatePicker } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import API from '../api';
import { useUserDataStore } from '../stores/userData';
import Swal from 'sweetalert2';

const schema = yup.object().shape({
    str: yup.string().required('STR harus diisi'),
    nama: yup.string().required('Nama Dokter Wajib Diisi'),
    email: yup.string().email('email tidak valid').required('email wajib diisi'),
    phone: yup.number().required('phone wajib diisi'),
    tanggal_lahir: yup.string().required('tanggal lahir wajib diisi'),
    foto: yup.mixed().required('foto wajib diisi')
})


//const newdate = new Date()
const date = ref('1990-01-01')

const loginStore = useUserDataStore()

const addDoctor = async (formValue, {setErrors}) => {
    let formData = new FormData()

    Object.entries(formValue).forEach(([key, value]) => {
        if (key == 'tanggal_lahir') {
            let postDate = new Date(value)
            value = postDate.toISOString().split('T')[0]
        }
        formData.append(key, value);
    });

    await API.post('/doctor/add', formData, {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + loginStore.loginData.value.apikey,
            'ContentType': 'multipart/form-data'
        }
    }).then((response) => {
        Swal.fire({
            title: 'tambah dokter berhasil',
            timer: 3000,
            timerProgressBar: true,
            didClose: () => {
                window.location.reload()
            }
        })
    }).catch((e) => {
        if (e.response) {
            console.log(e.response.status);
            // handle validation
            if (e.response.status == 428) {
                console.log(e.response.data);
                setErrors(e.response.data.data)
            }
        } else {
            console.log('error' + e);
        }
    })
}

</script>
<template>
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Tambah Dokter</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <Form :validation-schema="schema" @submit="addDoctor" v-slot="{ setErrors }">
        <div class="modal-body">
            <div class="mb-3">
                <label>STR</label>
                <Field
                    name="str"
                    type="text"
                    placeholder="STR"
                    v-model="str"
                    v-slot="{meta, field}"
                    :rules="required">
                    <input
                        type="text"
                        name="str"
                        class="form-control"
                        v-bind="field"
                        placeholder="STR"
                        :class="{
                            'is-valid': meta.valid && meta.touched,
                            'is-invalid': !meta.valid && meta.touched
                        }"
                        />
                    <ErrorMessage as="div" name="str" v-slot="{ message }" class="invalid-feedback">
                        {{ message }}
                    </ErrorMessage>
                </Field>
            </div>
            <div class="mb-3">
                <label>Nama</label>
                <Field
                    name="nama"
                    type="text"
                    v-model="nama"
                    v-slot="{meta, field}"
                    :rules="required">
                    <input
                        type="text"
                        name="nama"
                        class="form-control"
                        v-bind="field"
                        placeholder="Nama Dokter"
                        :class="{
                            'is-valid': meta.valid && meta.touched,
                            'is-invalid': !meta.valid && meta.touched
                        }">
                    <ErrorMessage as="div" name="nama" v-slot="{ message }" class="invalid-feedback">
                        {{ message }}
                    </ErrorMessage>
                </Field>
            </div>
            <div class="mb-3">
                <label>Email</label>
                <Field
                    name="email"
                    type="email"
                    v-model="email"
                    v-slot="{meta, field}"
                    :rules="required">
                    <input
                        type="email"
                        name="email"
                        class="form-control"
                        v-bind="field"
                        placeholder="Email Dokter"
                        :class="{
                            'is-valid': meta.valid && meta.touched,
                            'is-invalid': !meta.valid && meta.touched
                        }">
                    <ErrorMessage as="div" name="email" v-slot="{ message }" class="invalid-feedback">
                        {{ message }}
                    </ErrorMessage>
                </Field>
            </div>
            <div class="mb-3">
                <label>Phone</label>
                <Field
                    name="phone"
                    type="text"
                    v-model="phone"
                    v-slot="{meta, field}"
                    :rules="required">
                    <input
                        type="text"
                        name="phone"
                        class="form-control"
                        v-bind="field"
                        placeholder="Phone Dokter"
                        :class="{
                            'is-valid': meta.valid && meta.touched,
                            'is-invalid': !meta.valid && meta.touched
                        }">
                    <ErrorMessage as="div" name="phone" v-slot="{ message }" class="invalid-feedback">
                        {{ message }}
                    </ErrorMessage>
                </Field>
            </div>
            <div class="mb-3">
                <label>Tanggal Lahir</label>
                <Field
                    name="tanggal_lahir"
                    type="string"
                    v-model="tanggal_lahir"
                    v-slot="{meta, field}"
                    :rules="required">
                    <VueDatePicker
                        :floating="{placement:'bottom-start'}"
                        :time-config="{enableTimePicker: false}"
                        :formats="{
                            input: 'yyyy-MM-dd',
                            preview: 'yyyy-MM-dd',
                            output
                        }"
                        v-model="date"
                        v-bind="field"
                        :class="{
                            'is-valid': meta.valid && meta.touched,
                            'is-invalid': !meta.valid && meta.touched
                        }"
                        :ui="{input: [
                            'form-control',
                            meta.valid && meta.touched ? 'is-valid': '',
                            !meta.valid && meta.touched ? 'is-invalid': ''
                        ]}"></VueDatePicker>
                    <ErrorMessage as="div" name="tanggal_lahir" v-slot="{ message }" class="invalid-feedback">
                        {{ message }}
                    </ErrorMessage>
                </Field>
            </div>
            <div class="mb-3">
                <label>Foto Dokter</label>
                <Field
                    name="foto"
                    type="file"
                    v-model="foto"
                    v-slot="{meta, field}"
                    :rules="required">
                    <input
                        type="file"
                        name="foto"
                        class="form-control"
                        v-bind="field"
                        :class="{
                            'is-valid': meta.valid && meta.touched,
                            'is-invalid': !meta.valid && meta.touched
                        }">
                    <ErrorMessage as="div" name="foto" v-slot="{message}" class="invalid-feedback">
                        {{ message }}
                    </ErrorMessage>
                </Field>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Tambah Dokter</button>
        </div>
    </Form>
</template>