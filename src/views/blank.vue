<script setup>
import ComponentFooter from '../components/ComponentFooter.vue';
import ComponentHeader from '../components/ComponentHeader.vue';
import ComponentSidebar from '../components/ComponentSidebar.vue';

</script>
<template>
    <div class="app-wrapper">
        <ComponentHeader/>
        <ComponentSidebar/>
        <main class="app-main">
            <div class="app-content">
                
            </div>
        </main>
        <ComponentFooter/>
    </div>
</template>