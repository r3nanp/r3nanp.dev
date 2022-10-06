// eslint-disable-next-line no-unused-vars
declare namespace NodeJS {
  export interface ProcessEnv {
    GITHUB_CLIENT_ID?: string
    GITHUB_CLIENT_SECRET?: string
    NEXT_PUBLIC_SANITY_DATASET?: string
    NEXT_PUBLIC_SANITY_PROJECT_ID?: string
    DATABASE_URL?: string
  }
}
