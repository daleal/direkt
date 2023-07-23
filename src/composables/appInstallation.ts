import { onMounted, onUnmounted, ref } from 'vue';
import { useModal } from 'geometr/composables';

export const useAppInstallation = () => {
  const { opened, open, close } = useModal();

  const installEvent = ref<BeforeInstallPromptEvent | null>(null);

  const promptInstallation = (event: BeforeInstallPromptEvent) => {
    event.preventDefault();
    installEvent.value = event;
    open();
  };

  const install = async () => {
    if (installEvent.value) {
      await installEvent.value.prompt();
      close();
    }
  };

  onMounted(() => {
    window.addEventListener('beforeinstallprompt', promptInstallation);
  });

  onUnmounted(() => {
    window.removeEventListener('beforeinstallprompt', promptInstallation);
  });

  return { prompting: opened, install, cancel: close };
};
