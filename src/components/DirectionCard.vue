<script setup lang="ts">
import { ref, computed } from 'vue';
import { GCard, GButton } from 'geometr/components';

import type { Direction } from '@/types';

const props = defineProps<{ direction: Direction }>();

const emit = defineEmits<{
  remove: [],
  edit: [],
  maps: [],
  share: [],
  uber: [],
}>();

const showMore = ref(false);

const departmentText = computed(() => (props.direction.department ? `- ${props.direction.department}` : ''));

const toggleShowMore = () => {
  showMore.value = !showMore.value;
};
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
      <div class="actions-container">
        <div class="primary-actions">
          <GButton
            color="secondary"
            @click="() => emit('maps')"
          >
            <template #icon>
              <span class="mdi mdi-map" />
            </template>
            Map
          </GButton>
          <GButton
            color="secondary"
            @click="() => emit('uber')"
          >
            <template #icon>
              <span class="mdi mdi-car" />
            </template>
            Uber
          </GButton>
          <GButton
            color="primary"
            @click="toggleShowMore"
          >
            <template #icon>
              <span
                class="mdi"
                :class="showMore ? 'mdi-chevron-up' : 'mdi-dots-horizontal'"
              />
            </template>
          </GButton>
        </div>
        <div
          v-if="showMore"
          class="secondary-actions"
        >
          <GButton
            color="primary"
            @click="() => emit('share')"
          >
            <template #icon>
              <span class="mdi mdi-share-variant" />
            </template>
          </GButton>
          <GButton
            color="primary"
            @click="() => emit('edit')"
          >
            <template #icon>
              <span class="mdi mdi-pencil" />
            </template>
          </GButton>
          <GButton
            color="primary"
            @click="() => emit('remove')"
          >
            <template #icon>
              <span class="mdi mdi-delete" />
            </template>
          </GButton>
        </div>
      </div>
    </template>
  </GCard>
</template>

<style scoped>
.card {
  margin-bottom: 1rem;
}

.actions-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.primary-actions,
.secondary-actions {
  display: flex;
  gap: 0.5rem;
}
</style>
