<script setup lang="ts">
import { computed } from 'vue';
import { GCard, GButton } from 'geometr/components';

import type { Direction } from '@/types';

const props = defineProps<{ direction: Direction }>();

const emit = defineEmits<{
  remove: [],
  edit: [],
  maps: [],
  share: [],
}>();

const departmentText = computed(() => (props.direction.department ? `- ${props.direction.department}` : ''));
</script>

<template>
  <GCard class="card">
    <template #header>
      {{ props.direction.owner }}
    </template>
    <template #subtitle>
      <strong>{{ props.direction.direction }}</strong> {{ departmentText }}
    </template>
    <template #actions>
      <GButton
        color="primary"
        @click="() => emit('remove')"
      >
        Remove
      </GButton>
      <GButton
        color="primary"
        @click="() => emit('edit')"
      >
        Edit
      </GButton>
      <GButton
        color="secondary"
        @click="() => emit('maps')"
      >
        Map
      </GButton>
      <GButton
        color="secondary"
        @click="() => emit('share')"
      >
        Share
      </GButton>
    </template>
  </GCard>
</template>

<style scoped>
.card {
  margin-bottom: 1rem;
}
</style>
