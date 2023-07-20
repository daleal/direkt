<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { GApplication } from 'geometr/components';

/**
 * A hack to be able to use the view height attribute
 * when on mobile and avoid weird overflow bugs.
 */
const setViewHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

onMounted(() => {
  setViewHeight();
  window.addEventListener('resize', setViewHeight);
});

onUnmounted(() => {
  window.removeEventListener('resize', setViewHeight);
});
</script>

<template>
  <GApplication class="application">
    <router-view />
  </GApplication>
</template>

<style scoped>
div .application {
  height: calc(var(--vh) * 100);
}
</style>
