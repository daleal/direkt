<script setup lang="ts">
import { computed } from 'vue';
import { GCard, GButton } from 'geometr/components';

import type { Direction } from '@/types';

const props = defineProps<{ direction: Direction }>();

const emit = defineEmits<{
  remove: []
}>();

const departmentText = computed(() => (props.direction.department ? `- ${props.direction.department}` : ''));

const remove = () => emit('remove');
</script>

<template>
  <GCard>
    <template #header>
      {{ props.direction.owner }}
    </template>
    <template #subtitle>
      <strong>{{ props.direction.direction }}</strong> {{ departmentText }}
    </template>
    <template #content />
    <template #actions>
      <GButton
        color="primary"
        @click="remove"
      >
        Remove
      </GButton>
      <GButton
        color="secondary"
        @click="() => null"
      >
        Map
      </GButton>
      <GButton
        color="secondary"
        @click="() => null"
      >
        Share
      </GButton>
    </template>
  </GCard>
</template>
