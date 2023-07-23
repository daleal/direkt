<script setup lang="ts">
import { GButton, GModal } from 'geometr/components';
import { useAppInstallation } from '@/composables/appInstallation';

const { prompting, install, cancel } = useAppInstallation();
</script>

<template>
  <GModal
    v-model="prompting"
    persistent
  >
    <div>
      Do you want to add this application to your home screen for easier usage?
    </div>
    <div class="actions">
      <GButton
        color="primary"
        @click="cancel"
      >
        No, thanks
      </GButton>
      <GButton
        color="secondary"
        @click="install"
      >
        OK!
      </GButton>
    </div>
  </GModal>
</template>

<style scoped>
.actions {
  display: flex;
  gap: 0.4rem;
  margin-top: 1rem;
}
</style>
