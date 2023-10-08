import { reactive, ref } from 'vue';
import { useModal } from 'geometr/composables';
import { useDirections } from '@/stores/directions';

import type { Direction } from '@/types';

const generateBaseDirection = () => ({
  owner: '',
  direction: '',
  department: '',
} satisfies Direction);

const isEmpty = (value: Direction) => {
  const { owner, direction, department } = value;

  return owner === '' && direction === '' && department === '';
};

export const useDirectionEditModal = () => {
  const { updateDirection: updateStoreDirection } = useDirections();
  const { opened, open, close } = useModal();

  const directionIndex = ref<number | undefined>(undefined);
  const updatedDirection = reactive<Direction>(generateBaseDirection());

  const openEditModal = (index: number, direction: Direction) => {
    directionIndex.value = index;
    Object.assign(updatedDirection, direction);
    open();
  };

  const closeDirectionUpdate = () => {
    close();
    directionIndex.value = undefined;
    Object.assign(updatedDirection, generateBaseDirection());
  };

  const updateDirection = () => {
    if (directionIndex.value !== undefined && !isEmpty(updatedDirection)) {
      updateStoreDirection(directionIndex.value, { ...updatedDirection });
    }
    closeDirectionUpdate();
  };

  return {
    updatedDirection,
    editingDirection: opened,
    openEditModal,
    updateDirection,
    cancelDirectionUpdate: closeDirectionUpdate,
  };
};
