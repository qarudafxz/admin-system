/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADMIN_LOGIN: string
  readonly VITE_ADMIN_DASHBOARD: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
