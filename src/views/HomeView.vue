<script setup lang="ts">
import { useDirections } from '@/stores/directions';
import { handleMaps } from '@/handlers/maps';
import { shareDirection } from '@/handlers/share';
import DirectionCard from '@/components/DirectionCard.vue';

const { directions, removeDirection } = useDirections();
</script>

<template>
  <DirectionCard
    v-for="(direction, index) in directions"
    :key="index"
    :direction="direction"
    class="card"
    @remove="() => removeDirection(index)"
    @maps="() => handleMaps(direction)"
    @share="() => shareDirection(direction)"
  />
</template>

<style scoped>
.card {
  margin-bottom: 1rem;
}
</style>
