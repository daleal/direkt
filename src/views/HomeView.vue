<script setup lang="ts">
import { GButton } from 'geometr/components';
import { useDirections } from '@/stores/directions';
import { useDirectionAdditionModal } from '@/composables/directionAdditionModal';
import { useDirectionRemovalModal } from '@/composables/directionRemovalModal';
import { handleMaps } from '@/handlers/maps';
import { shareDirection } from '@/handlers/share';
import DirectionCard from '@/components/DirectionCard.vue';
import DirectionRemovalModal from '@/components/DirectionRemovalModal.vue';
import DirectionCreationModal from '@/components/DirectionCreationModal.vue';

const { directions } = useDirections();

const {
  newDirection, creatingDirection, openCreationModal, createDirection, cancelDirectionCreation,
} = useDirectionAdditionModal();
const {
  removing, removalModalOpened, openRemovalModal, confirmRemoval, cancelRemoval,
} = useDirectionRemovalModal();
</script>

<template>
  <GButton
    color="secondary"
    class="top-button"
    @click="openCreationModal"
  >
    <template #icon>
      <span class="mdi mdi-plus" />
    </template>
  </GButton>
  <DirectionCreationModal
    v-model:opened="creatingDirection"
    v-model:direction="newDirection"
    @create="createDirection"
    @cancel="cancelDirectionCreation"
  />
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
    @remove="() => openRemovalModal(index)"
    @maps="() => handleMaps(direction)"
    @share="() => shareDirection(direction)"
  />
</template>

<style scoped>
.top-button {
  margin-bottom: 1rem;
}
</style>
