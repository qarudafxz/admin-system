/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADMIN_LOGIN: string
  readonly VITE_ADMIN_DASHBOARD: string
  readonly VITE_ADMIN_CREATE_USER: string
  readonly VITE_ADMIN_VIEW_USER: string
  readonly VITE_ADMIN_LOGOUT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
