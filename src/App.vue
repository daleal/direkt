<script setup lang="ts">
import { GApplication } from 'geometr/components';
import ApplicationFooter from './components/ApplicationFooter.vue';
import PWAPrompt from './components/PWAPrompt.vue';
</script>

<template>
  <GApplication>
    <router-view />
    <PWAPrompt />
    <template #footer>
      <ApplicationFooter />
    </template>
  </GApplication>
</template>
