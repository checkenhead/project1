export const ENV = {
  API_URL: import.meta.env.VITE_API_URL as string,
  ACCESS_TOKEN_NAME: import.meta.env.VITE_ACCESS_TOKEN_NAME as string,
  REFRESH_TOKEN_NAME: import.meta.env.VITE_REFRESH_TOKEN_NAME as string,
} as const;
