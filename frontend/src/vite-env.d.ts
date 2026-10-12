/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Backend manzili (origin), masalan https://altin-orda-api.onrender.com. Lokal: bo'sh. */
  readonly VITE_API_URL?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
