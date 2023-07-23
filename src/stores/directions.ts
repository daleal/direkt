import { useStorage } from '@vueuse/core';
import { deserializeFromStore, serializeForStore } from '@/serializers/directions';

import type { Direction } from '@/types';

const DIRECTION_STORAGE_KEY = 'directions';

const directions = useStorage(
  DIRECTION_STORAGE_KEY,
  [],
  undefined,
  {
    serializer: {
      read: deserializeFromStore,
      write: serializeForStore,
    },
  },
);

export const useDirections = () => {
  const addDirection = (direction: Direction) => {
    directions.value = [...directions.value, direction];
  };

  const removeDirection = (index: number) => {
    directions.value = directions.value.filter((_, currentIndex) => currentIndex !== index);
  };

  return {
    directions,
    addDirection,
    removeDirection,
  };
};
