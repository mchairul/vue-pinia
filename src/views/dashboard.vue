<script setup>
import { onMounted } from 'vue';
import ComponentFooter from '../components/ComponentFooter.vue';
import ComponentHeader from '../components/ComponentHeader.vue';
import ComponentSidebar from '../components/ComponentSidebar.vue';

onMounted(() => {
    document.body.classList.remove('login-page', 'bg-body-secondary')
    document.body.classList.add('layout-fixed', 'sidebar-expand-lg', 'sidebar-open', 'bg-body-tertiary')
})
</script>

<template>
    <div class="app-wrapper">
        <ComponentHeader />
        <ComponentSidebar />
        <!--begin::App Main-->
        <main class="app-main">
            <div class="app-content">
                <h1>Ini Content</h1>
            </div>
        </main>
        <!--end::App Main-->
        <ComponentFooter />
    </div>
</template>
