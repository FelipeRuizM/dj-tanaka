/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_DATABASE_URL: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
  readonly VITE_ADMIN_UID: string;
  readonly VITE_INSTAGRAM_HANDLE: string;
  readonly VITE_BEHOLD_FEED_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
