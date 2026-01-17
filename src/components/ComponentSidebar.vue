<script setup>
import { useRouter } from 'vue-router';


const router = useRouter();

const pindahHalaman = (namaHalaman) => {
    router.push({name: namaHalaman})
}

</script>

<template>
    <aside class="app-sidebar bg-body-secondary shadow" data-bs-theme="dark">
        <!--begin::Sidebar Brand-->
        <div class="sidebar-brand">
            <!--begin::Brand Link-->
            <a href="./index.html" class="brand-link">
                <!--begin::Brand Text-->
                <span class="brand-text fw-light">Admin Panel</span>
                <!--end::Brand Text-->
            </a>
            <!--end::Brand Link-->
        </div>
        <!--end::Sidebar Brand-->

        <!--begin::Sidebar Wrapper-->
        <div class="sidebar-wrapper">
            <nav class="mt-2">
                <!--begin::Sidebar Menu-->
                <ul
                class="nav sidebar-menu flex-column"
                data-lte-toggle="treeview"
                role="navigation"
                aria-label="Main navigation"
                data-accordion="false"
                id="navigation"
                >

                <!-- <li class="nav-header">EXAMPLES</li> -->
                <li class="nav-item">
                    <a href="#" class="nav-link" @click="pindahHalaman('dashboard')">
                    <i class="nav-icon bi bi-speedometer"></i>
                    <p>Dashboard</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" @click="pindahHalaman('booking')">
                    <i class="nav-icon bi bi-chat"></i>
                    <p>Booking</p>
                    </a>
                </li>
            </ul>
            </nav>
        </div>
        <!--end::Sidebar Wrapper-->
    </aside>
</template>