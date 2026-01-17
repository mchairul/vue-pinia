<script setup>
import { onMounted, ref } from 'vue';
import ComponentFooter from '../components/ComponentFooter.vue';
import ComponentHeader from '../components/ComponentHeader.vue';
import ComponentSidebar from '../components/ComponentSidebar.vue';
import API from '../api';
import { useUserDataStore } from '../stores/userData';
import * as yup from 'yup'
import { ErrorMessage, Field, Form } from 'vee-validate';
import { VueDatePicker } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const userData = useUserDataStore()

const schema = yup.object().shape({
    rooms_id: yup.string().required(),
    categories_id: yup.string().required(),
    request_date: yup.date().required(),
    required_date: yup.date().required(),
    time_start: yup.object().required(),
    time_end: yup.object().required(),
})

const rooms = ref([])
const categories = ref([])
const date = ref(new Date())
const dateRequired = ref(new Date())
const timeRequest = ref(new Date().getHours())
const timeRequestEnd = ref(new Date().getHours())

const getRooms = async () => {
    await API.get('/rooms', {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + userData.loginData.value.apikey
        }
    }).then((response) => {
        rooms.value = response.data.data
    }).catch((e) => {
        console.log(e);
    })
}

const getCategories = async () => {
    await API.get('/categories', {
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + userData.loginData.value.apikey
        }
    }).then((response) => {
        categories.value = response.data.data
    }).catch((e) => {
        console.log(e);
    })
}

onMounted(() => {
    getRooms()
    getCategories()
})

</script>

<template>
    <div class="app-wrapper">
        <ComponentHeader/>
        <ComponentSidebar/>
        <main class="app-main p-4">
            <h1>Tambah Booking</h1>
            <Form @submit="" :validation-schema="schema">
                <div class="mb-3">
                    <label >Ruangan</label>
                    <Field
                        name="rooms_id"
                        type="string"
                        v-model="rooms_id"
                        v-slot="{meta, field}"
                        :rules="required">
                        <select
                            type="string"
                            class="form-control"
                            v-bind="field"
                            :class="{
                                'is-valid': meta.valid && meta.touched,
                                'is-invalid' : !meta.valid && meta.touched
                            }">
                            <option value="">-- Pilih Ruangan --</option>
                            <option v-for="(room, index) in rooms" :key="index" :value="room.id">
                                {{ room.name }}
                            </option>
                        </select>
                        <ErrorMessage as="div" name="rooms_id" v-slot="{message}" class="invalid-feedback">
                            {{ message }}
                        </ErrorMessage>
                    </Field>
                </div>
                <div class="mb-3">
                    <label >Kategori</label>
                    <Field
                        name="categories_id"
                        type="string"
                        v-model="categories_id"
                        v-slot="{meta, field}"
                        :rules="required">
                        <select
                            type="string"
                            class="form-control"
                            v-bind="field"
                            :class="{
                                'is-valid': meta.valid && meta.touched,
                                'is-invalid': !meta.valid && meta.touched
                            }">
                            <option value="">-- Pilih Kategori --</option>
                            <option v-for="(category, index) in categories" :key="index" :value="category.id">
                                {{ category.name }}
                            </option>
                        </select>
                        <ErrorMessage as="div" name="categories_id" v-slot="{message}" class="invalid-feedback">
                            {{ message }}
                        </ErrorMessage>
                    </Field>
                </div>
                <div class="mb-3">
                    <label >Request Date</label>
                    <Field
                        name="request_date"
                        type="string"
                        v-model="request_date"
                        v-slot="{meta, field}"
                        :rules="required">
                        <VueDatePicker
                            :floating="{placement:'bottom-start'}"
                            :time-config="{enableTimePicker: false}"
                            :formats="{
                                input: 'yyyy-mm-dd',
                                preview: 'yyyy-mm-dd'
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
                                !meta.valid && meta.touched ? 'is-invalid': '']}"
                            ></VueDatePicker>
                            <ErrorMessage as="div" name="request_date" v-slot="{message}" class="invalid-feedback">
                                {{ message }}
                            </ErrorMessage>
                    </Field>
                </div>
                <div class="mb-3">
                    <label >Required Date</label>
                    <Field
                        name="required_date"
                        type="string"
                        v-model="required_date"
                        v-slot="{meta, field}"
                        :rules="required">
                        <VueDatePicker
                            :floating="{placement:'bottom-start'}"
                            :time-config="{enableTimePicker: false}"
                            :formats="{
                                input: 'yyyy-mm-dd',
                                preview: 'yyyy-mm-dd'
                            }"
                            v-model="dateRequired"
                            v-bind="field"
                            :class="{
                                'is-valid': meta.valid && meta.touched,
                                'is-invalid': !meta.valid && meta.touched
                            }"
                            :ui="{input: [
                                'form-control',
                                meta.valid && meta.touched ? 'is-valid': '',
                                !meta.valid && meta.touched ? 'is-invalid': '']}"
                            ></VueDatePicker>
                            <ErrorMessage as="div" name="required_date" v-slot="{message}" class="invalid-feedback">
                                {{ message }}
                            </ErrorMessage>
                    </Field>
                </div>
                <div class="mb-3">
                    <label >Jam Mulai</label>
                    <Field
                        name="time_start"
                        type="string"
                        v-model="time_start"
                        v-slot="{meta, field}"
                        :rules="required">
                        <VueDatePicker
                            time-picker=""
                            :floating="{placement:'bottom-start'}"
                            :time-config="{enableTimePicker: false}"
                            v-model="timeRequest"
                            v-bind="field"
                            :class="{
                                'is-valid': meta.valid && meta.touched,
                                'is-invalid': !meta.valid && meta.touched
                            }"
                            :ui="{input: [
                                'form-control',
                                meta.valid && meta.touched ? 'is-valid': '',
                                !meta.valid && meta.touched ? 'is-invalid': '']}"
                            ></VueDatePicker>
                            <ErrorMessage as="div" name="time_start" v-slot="{message}" class="invalid-feedback">
                                {{ message }}
                            </ErrorMessage>
                    </Field>
                </div>
                <div class="mb-3">
                    <label >Jam Selesai</label>
                    <Field
                        name="time_end"
                        type="string"
                        v-model="time_end"
                        v-slot="{meta, field}"
                        :rules="required">
                        <VueDatePicker
                            time-picker=""
                            :floating="{placement:'bottom-start'}"
                            :time-config="{enableTimePicker: false}"
                            v-model="timeRequestEnd"
                            v-bind="field"
                            :class="{
                                'is-valid': meta.valid && meta.touched,
                                'is-invalid': !meta.valid && meta.touched
                            }"
                            :ui="{input: [
                                'form-control',
                                meta.valid && meta.touched ? 'is-valid': '',
                                !meta.valid && meta.touched ? 'is-invalid': '']}"
                            ></VueDatePicker>
                            <ErrorMessage as="div" name="time_end" v-slot="{message}" class="invalid-feedback">
                                {{ message }}
                            </ErrorMessage>
                    </Field>
                </div>
            </Form>
        </main>
        <ComponentFooter/>
    </div>
</template>