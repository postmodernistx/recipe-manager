<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import PageHeader from './components/fixtures/PageHeader.vue';
</script>

<template>
  <PageHeader />
  <section class="router-view">
    <router-view></router-view>
  </section>
</template>
