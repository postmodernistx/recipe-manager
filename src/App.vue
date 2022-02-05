<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import PageHeader from './components/fixtures/PageHeader.vue';
</script>

<template>
  <PageHeader />
  <section class="router-view">
    <router-view v-slot="{ Component }">
      <transition
        :css="false"
        mode="out-in"
        @before-enter="beforeEnter"
        @enter="enter"
        @enter-cancelled="enterCancelled"
        @leave="leave"
        @leave-cancelled="leaveCancelled"
      >
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<script>
import { gsap } from 'gsap';

export default {
  name: 'VueApp',
  methods: {
    beforeEnter(el) {
      gsap.set(el, { opacity: 0 });
    },
    enterCancelled(el) {
      gsap.to(el, { opacity: 0 });
    },
    enter(el, done) {
      gsap.to(el, { opacity: 1, duration: 0.2, onComplete: done });
    },
    leave(el, done) {
      gsap.to(el, { opacity: 0, duration: 0.2, onComplete: done });
    },
    leaveCancelled(el) {
      gsap.to(el, { opacity: 1 });
    },
  },
};
</script>
