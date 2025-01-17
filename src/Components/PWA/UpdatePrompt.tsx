import { useRegisterSW } from 'virtual:pwa-register/react';
import { toast } from 'sonner';

export function UpdatePrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl: string) {
      console.log('SW Registered:', swUrl);
    },
    onRegisterError(error: Error) {
      console.log('SW registration error', error);
    }
  });

  const closePrompt = () => {
    setNeedRefresh(false);
  };

  const updateApp = () => {
    updateServiceWorker(true);
  };

  // Show update prompt when new version is available
  if (needRefresh) {
    toast.info('New version available!', {
      description: 'Click to update to the latest version',
      action: {
        label: 'Update',
        onClick: updateApp
      },
      onDismiss: closePrompt
    });
  }

  return null;
}
