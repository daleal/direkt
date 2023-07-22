<script setup lang="ts">
import { GButton, GModal } from 'geometr/components';
import type { Direction } from '@/types';

const opened = defineModel<boolean>({ required: true });

const props = defineProps<{ direction?: Direction }>();

const emit = defineEmits<{
  confirm: [],
  cancel: [],
}>();
</script>

<template>
  <GModal
    v-model="opened"
    persistent
  >
    <div v-if="props.direction">
      Are you sure you want to remove the direction "{{ props.direction.owner }}"?
    </div>
    <div v-else>
      Are you sure you want to remove this direction?
    </div>
    <div class="actions">
      <GButton
        color="primary"
        @click="emit('confirm')"
      >
        Remove
      </GButton>
      <GButton
        color="secondary"
        @click="emit('cancel')"
      >
        Cancel
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
