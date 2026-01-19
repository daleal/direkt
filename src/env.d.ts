/// <reference types="vite/client" />

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface WindowEventMap {
  beforeinstallprompt: BeforeInstallPromptEvent;
}

/* Environment Variables */

interface ViteTypeOptions { // eslint-disable-line @typescript-eslint/no-empty-object-type
  // strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_RADAR_PUBLISHABLE_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
