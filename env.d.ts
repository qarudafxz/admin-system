/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADMIN_LOGIN: string
  readonly VITE_ADMIN_DASHBOARD: string
  readonly VITE_ADMIN_CREATE_USER: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
