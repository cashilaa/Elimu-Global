/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_URL: string; 
  VITE_INSTRUCTOR_API_URL: string; // Just declare the type, don't assign a value here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}