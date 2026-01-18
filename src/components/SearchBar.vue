<script setup lang="ts">
import { GButton, GInput } from 'geometr/components';

const searchQuery = defineModel<string>({ required: true });
const emit = defineEmits<{ clear: [], add: [] }>();
</script>

<template>
  <div class="search-bar">
    <GInput
      v-model="searchQuery"
      class="search-input"
      placeholder="Search by owner or direction"
    />
    <GButton
      color="secondary"
      class="clear-button"
      @click="emit('clear')"
    >
      <template #icon>
        <span class="mdi mdi-close" />
      </template>
    </GButton>
    <GButton
      color="primary"
      class="add-button"
      @click="emit('add')"
    >
      <template #icon>
        <span class="mdi mdi-plus" />
      </template>
    </GButton>
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.search-input {
  flex: 1;
}
</style>
