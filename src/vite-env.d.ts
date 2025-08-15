interface ImportMetaEnv {
  readonly VITE_SERVER_URL: string;
  readonly VITE_TURN_URL: string;
  readonly VITE_TURN_USERNAME: string;
  readonly VITE_TURN_CREDENTIAL: string;
  readonly VITE_GOOGLE_OAUTH_CALLBACK_URL: string;
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
