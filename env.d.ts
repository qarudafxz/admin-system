/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADMIN_LOGIN: string
  readonly VITE_ADMIN_DASHBOARD: string
  readonly VITE_ADMIN_CREATE_USER: string
  readonly VITE_ADMIN_VIEW_USER: string
  readonly VITE_ADMIN_LOGOUT: string
  readonly VITE_ADMIN_CREATE_EXPENSES: string
  readonly VITE_ADMIN_VIEW_RESULT: string
  readonly VITE_ADMIN_CREATE_RESULT: string
  readonly VITE_ADMIN_VIEW_STALL_SHEET: string
  readonly VITE_ADMIN_VIEW_STALL_SUMMARY: string
  readonly VITE_ADMIN_VIEW_HITS: string
  readonly VITE_ADMIN_ADD_LIMIT: string
  readonly VITE_ADMIN_VIEW_LIMIT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
