<script setup lang="ts">
import { useDirections } from '@/stores/directions';
import { useDirectionRemovalModal } from '@/composables/directionRemovalModal';
import { handleMaps } from '@/handlers/maps';
import { shareDirection } from '@/handlers/share';
import DirectionCard from '@/components/DirectionCard.vue';
import DirectionRemovalModal from '@/components/DirectionRemovalModal.vue';

const { directions } = useDirections();

const {
  removing,
  removalModalOpened,
  openRemovalModal,
  confirmRemoval,
  cancelRemoval,
} = useDirectionRemovalModal();
</script>

<template>
  <DirectionRemovalModal
    v-model="removalModalOpened"
    :direction="directions[removing!]"
    @confirm="confirmRemoval"
    @cancel="cancelRemoval"
  />
  <DirectionCard
    v-for="(direction, index) in directions"
    :key="index"
    :direction="direction"
    class="card"
    @remove="() => openRemovalModal(index)"
    @maps="() => handleMaps(direction)"
    @share="() => shareDirection(direction)"
  />
</template>

<style scoped>
.card {
  margin-bottom: 1rem;
}
</style>
