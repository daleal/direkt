<script setup lang="ts">
import { GButton } from 'geometr/components';
import { useDirections } from '@/stores/directions';
import { useDirectionAdditionModal } from '@/composables/directionAdditionModal';
import { useDirectionEditModal } from '@/composables/directionEditModal';
import { useDirectionRemovalModal } from '@/composables/directionRemovalModal';
import { handleMaps } from '@/handlers/maps';
import { shareDirection } from '@/handlers/share';
import DirectionCard from '@/components/DirectionCard.vue';
import DirectionRemovalModal from '@/components/DirectionRemovalModal.vue';
import DirectionDataModal from '@/components/DirectionDataModal.vue';

const { directions } = useDirections();

const {
  newDirection, creatingDirection, openCreationModal, createDirection, cancelDirectionCreation,
} = useDirectionAdditionModal();
const {
  updatedDirection, editingDirection, openEditModal, updateDirection, cancelDirectionUpdate,
} = useDirectionEditModal();
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
  <DirectionDataModal
    v-model:opened="creatingDirection"
    v-model:direction="newDirection"
    @create="createDirection"
    @cancel="cancelDirectionCreation"
  />
  <DirectionDataModal
    v-model:opened="editingDirection"
    v-model:direction="updatedDirection"
    type="update"
    @create="updateDirection"
    @cancel="cancelDirectionUpdate"
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
    @edit="() => openEditModal(index, direction)"
    @maps="() => handleMaps(direction)"
    @share="() => shareDirection(direction)"
  />
</template>

<style scoped>
.top-button {
  margin-bottom: 1rem;
}
</style>
