import Fuse from 'fuse.js';
import { ref, computed, type Ref } from 'vue';
import type { Direction } from '@/types';

export const useDirectionSearch = (directions: Ref<Direction[]>) => {
  const searchQuery = ref('');

  const fuse = computed(() => new Fuse(directions.value, {
    keys: ['owner', 'direction'],
    threshold: 0.3,
    isCaseSensitive: false,
    ignoreDiacritics: true,
  }));

  const filteredDirections = computed(() => {
    if (!searchQuery.value.trim()) return directions.value;
    return fuse.value.search(searchQuery.value).map((result) => result.item);
  });

  const clearSearch = () => { searchQuery.value = ''; };

  const findOriginalIndex = (direction: Direction) => directions.value.indexOf(direction);

  return {
    searchQuery, filteredDirections, clearSearch, findOriginalIndex,
  };
};
