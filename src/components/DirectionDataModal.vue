<script setup lang="ts">
import { computed } from 'vue';
import { GButton, GInput, GModal } from 'geometr/components';
import type { Direction } from '@/types';

const opened = defineModel<boolean>('opened', { required: true });
const direction = defineModel<Direction>('direction', { required: true });

const props = withDefaults(
  defineProps<{ type: 'creation' | 'update' }>(),
  { type: 'creation' },
);

const emit = defineEmits<{
  create: [],
  cancel: [],
}>();

const executeText = computed(() => (props.type === 'creation' ? 'Create' : 'Update'));

const create = () => {
  if (!!direction.value.owner && !!direction.value.direction) {
    emit('create');
  }
};
</script>

<template>
  <GModal
    v-model="opened"
    persistent
  >
    <form
      novalidate
      @submit.prevent="create"
    >
      <div>
        <GInput
          v-model="direction.owner"
          class="input"
          label="Owner*"
          required
        />
        <GInput
          v-model="direction.direction"
          class="input"
          label="Direction*"
          required
        />
        <GInput
          v-model="direction.department"
          class="input"
          label="Department"
        />
      </div>
      <p>* indicates a required field</p>
      <div class="actions">
        <GButton
          color="primary"
          type="submit"
        >
          {{ executeText }}
        </GButton>
        <GButton
          color="secondary"
          @click="emit('cancel')"
        >
          Cancel
        </GButton>
      </div>
    </form>
  </GModal>
</template>

<style scoped>
.input {
  margin-bottom: 0.5rem;
}

.actions {
  display: flex;
  gap: 0.4rem;
  margin-top: 1.5rem;
}
</style>
