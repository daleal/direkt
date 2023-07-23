import { ref } from 'vue';
import { useModal } from 'geometr/composables';
import { useDirections } from '@/stores/directions';

export const useDirectionRemovalModal = () => {
  const { removeDirection } = useDirections();
  const { opened, open, close } = useModal();

  const removing = ref<number | null>(null);

  const openRemovalModal = (index: number) => {
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

  return {
    removing,
    removalModalOpened: opened,
    openRemovalModal,
    confirmRemoval,
    cancelRemoval,
  };
};
