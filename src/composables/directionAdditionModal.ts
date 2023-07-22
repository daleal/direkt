import { reactive } from 'vue';
import { useModal } from 'geometr/composables';
import { useDirections } from '@/stores/directions';

import type { Direction } from '@/types';

const generateBaseDirection = () => ({
  owner: '',
  direction: '',
  department: '',
} satisfies Direction);

export const useDirectionAdditionModal = () => {
  const { addDirection } = useDirections();
  const { opened, open, close } = useModal();

  const newDirection = reactive<Direction>(generateBaseDirection());

  const createDirection = () => {
    addDirection({ ...newDirection });
    Object.assign(newDirection, generateBaseDirection());
    close();
  };

  const cancelDirectionCreation = () => {
    Object.assign(newDirection, generateBaseDirection());
    close();
  };

  return {
    newDirection,
    creatingDirection: opened,
    openCreationModal: open,
    createDirection,
    cancelDirectionCreation,
  };
};
