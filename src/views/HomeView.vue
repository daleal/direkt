<script setup lang="ts">

import { useDirections } from '@/stores/directions';
import { useDirectionAdditionModal } from '@/composables/directionAdditionModal';
import { useDirectionEditModal } from '@/composables/directionEditModal';
import { useDirectionRemovalModal } from '@/composables/directionRemovalModal';
import { useDirectionSearch } from '@/composables/directionSearch';
import { handleMaps } from '@/handlers/maps';
import { handleUber } from '@/handlers/uber';
import { shareDirection } from '@/handlers/share';
import DirectionCard from '@/components/DirectionCard.vue';
import DirectionRemovalModal from '@/components/DirectionRemovalModal.vue';
import DirectionDataModal from '@/components/DirectionDataModal.vue';
import SearchBar from '@/components/SearchBar.vue';

const { directions } = useDirections();
const {
  searchQuery, filteredDirections, clearSearch, findOriginalIndex,
} = useDirectionSearch(directions);

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
  <SearchBar
    v-model="searchQuery"
    @clear="clearSearch"
    @add="openCreationModal"
  />
  <DirectionDataModal
    v-model:opened="creatingDirection"
    v-model:direction="newDirection"
    type="creation"
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
    v-for="direction in filteredDirections"
    :key="direction.owner + direction.direction"
    :direction="direction"
    @remove="() => openRemovalModal(findOriginalIndex(direction))"
    @edit="() => openEditModal(findOriginalIndex(direction), direction)"
    @maps="() => handleMaps(direction)"
    @uber="() => handleUber(direction)"
    @share="() => shareDirection(direction)"
  />
</template>
