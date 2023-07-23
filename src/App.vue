<script setup lang="ts">
import { GApplication } from 'geometr/components';
import PWAPrompt from './components/PWAPrompt.vue';
</script>

<template>
  <GApplication>
    <router-view />
    <PWAPrompt />
  </GApplication>
</template>
