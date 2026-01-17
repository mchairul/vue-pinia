<script setup>
import { onMounted, ref } from 'vue'
import { Field, Form, ErrorMessage, defineRule, useResetForm, useForm } from 'vee-validate'
import * as yup from 'yup'
import API from '../api'
import { useUserDataStore } from '../stores/userData'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
    // menambahkan class ke tag body
    document.body.classList.add('login-page', 'bg-body-secondary')
})

const schema = yup.object().shape({
    email: yup.string().email().required(), // required dan email
    password: yup.string().min(2).required() // required dan min 2
})

const { resetForm } = useForm({
  validationSchema: schema,
  // initial values can also be set here
  values: {
    email:'',
    password:''
  }
});


const isLoading = ref(false)
const pesanError = ref('')

// inisiasi login store
const loginStore = useUserDataStore()

const prosesLogin = async (formValue) => {
    loginStore.clearLoginUser()
    isLoading.value = true
    pesanError.value = ''
    try {
        await API.post('login', JSON.stringify(formValue), {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((response) => {
            let dataUser = {}

            dataUser.userId = response.data.data.id
            dataUser.name = response.data.data.name
            dataUser.email = response.data.data.email
            dataUser.apikey = response.data.data.token
            dataUser.message = response.data.message

            // simpan user data ke local storage
            localStorage.setItem('dataUser', JSON.stringify(dataUser))

            //alert(dataUser.message)

            // simpan user data ke data store
            loginStore.setLoginUser(dataUser)

            //simpan api key ke data store
            //loginStore.setApikeyUser(response.data.access_token)

            // pindah ke halaman dashboard
            router.push({name: 'dashboard'})
        })
    } catch (error) {
        if (error.status == 401) {
            resetForm()
            console.log('login gagal');
            pesanError.value = 'Email atau password salah'
        }
    } finally {
        isLoading.value = false
    }
}

</script>

<template>
    <div class="login-box">
        <div class="card card-outline card-primary">
            <div class="card-header">
                <h3>Login</h3>
            </div>
            <div class="card-body">
                <p class="login-box-msg">Sign in to start your session</p>
                

                <Form @submit="prosesLogin" :validation-schema="schema">
                    <div class="input-group mb-1">
                        <div class="form-floating">
                            <Field
                                name="email"
                                type="email"
                                placeholder="Email"
                                id="loginEmail"
                                v-model="email"
                                v-slot="{meta, field }"
                                :rules="required">
                                <input
                                    type="email"
                                    name="email"
                                    id="loginEmail"
                                    class="form-control"
                                    v-bind="field"
                                    :class="{
                                        'is-valid': meta.valid && meta.touched,
                                        'is-invalid': !meta.valid && meta.touched
                                    }"
                                    />
                                <label for="loginEmail">Email</label>
                                <ErrorMessage as="div" name="email" v-slot="{ message }" class="invalid-feedback">
                                    {{ message }}
                                </ErrorMessage>
                            </Field>
                        </div>
                        <div class="input-group-text"><span class="bi bi-envelope"></span></div>
                    </div>
                    <div class="input-group mb-1">
                        <div class="form-floating">
                            <Field
                                name="password"
                                type="password"
                                placeholder="password"
                                v-model="password"
                                v-slot="{meta, field }"
                                id="loginPassword"
                                :rules="required">
                                <input
                                    type="password"
                                    name="password"
                                    class="form-control"
                                    id="loginPassword"
                                    v-bind="field"
                                    :class="{
                                        'is-valid': meta.valid && meta.touched,
                                        'is-invalid': !meta.valid && meta.touched
                                    }"
                                    />
                                <label for="loginPassword">Password</label>
                                <ErrorMessage as="div" name="password" v-slot="{ message }" class="invalid-feedback">
                                    {{ message }}
                                </ErrorMessage>
                            </Field>
                        </div>
                        <div class="input-group-text"><span class="bi bi-lock-fill"></span></div>
                    </div>
                    <div class="input-group mb-1">
                        <button class="btn btn-primary w-100" v-if="isLoading" disabled>
                            <span class="spinner-border" role="status" aria-hidden="true"></span>
                        </button>
                        <button type="submit" class="btn btn-primary w-100" v-else>Sign In</button>
                    </div>
                </Form>
                <div class="alert alert-danger" v-if="pesanError != ''">
                    {{ pesanError }}
                </div>
            </div>
        </div>
    </div>
</template>
