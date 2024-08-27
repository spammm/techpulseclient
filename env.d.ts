/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_SERVER: string;
    NEXT_PUBLIC_SITE_URL: string;
    NEXT_PUBLIC_SITEMAP_SECRET: string;
    NEXT_PUBLIC_YANDEX_VERIFICATION: string;
    NEXT_PUBLIC_GOOGLE_VERIFICATION: string;
    NEXT_PUBLIC_YANDEX_METRIKA_ID: string;
  }
}
