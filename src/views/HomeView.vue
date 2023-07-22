<script setup lang="ts">
import { ref } from 'vue';
import { useModal } from 'geometr/composables';
import { useDirections } from '@/stores/directions';
import { handleMaps } from '@/handlers/maps';
import { shareDirection } from '@/handlers/share';
import DirectionCard from '@/components/DirectionCard.vue';
import DirectionRemovalModal from '@/components/DirectionRemovalModal.vue';

const { directions, removeDirection } = useDirections();
const { opened, open, close } = useModal();

const removing = ref<number | null>(null);

const openDirectionRemovalModal = (index: number) => {
  removing.value = index;
  open();
};

const confirmRemoval = () => {
  if (removing.value !== null) {
    removeDirection(removing.value);
    removing.value = null;
  }
  close();
};

const cancelRemoval = () => {
  removing.value = null;
  close();
};
</script>

<template>
  <DirectionRemovalModal
    v-model="opened"
    :direction="directions[removing!]"
    @confirm="confirmRemoval"
    @cancel="cancelRemoval"
  />
  <DirectionCard
    v-for="(direction, index) in directions"
    :key="index"
    :direction="direction"
    class="card"
    @remove="() => openDirectionRemovalModal(index)"
    @maps="() => handleMaps(direction)"
    @share="() => shareDirection(direction)"
  />
</template>

<style scoped>
.card {
  margin-bottom: 1rem;
}
</style>
