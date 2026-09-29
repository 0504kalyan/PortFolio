/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Origin of the admin app allowed to send preview content (not a secret). */
  readonly VITE_ADMIN_ORIGIN?: string;
}
