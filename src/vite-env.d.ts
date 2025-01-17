/// <reference types="vite/client" />

declare module 'virtual:pwa-register/react' {
  export interface RegisterSWOptions {
    onRegisteredSW?: (swUrl: string, registration: ServiceWorkerRegistration) => void;
    onRegisterError?: (error: Error) => void;
    immediate?: boolean;
    registerType?: 'autoUpdate' | 'prompt' | 'force';
  }

  export function useRegisterSW(options?: RegisterSWOptions): {
    needRefresh: [boolean, (value: boolean) => void];
    offlineReady: [boolean, (value: boolean) => void];
    updateServiceWorker: (reloadPage?: boolean) => Promise<void>;
  };
}
