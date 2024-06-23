/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEB3_AUTH_CLIENT_ID: string
  readonly VITE_GOOGLE_MAP_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
