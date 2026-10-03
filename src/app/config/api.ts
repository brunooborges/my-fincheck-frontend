/** Address of the wake-up check, built from the API address (VITE_API_URL, read at build time). */
export function healthUrlFor(apiUrl: string | undefined): string {
  return `${(apiUrl ?? '').replace(/\/+$/, '')}/health`;
}

export const HEALTH_URL = healthUrlFor(import.meta.env.VITE_API_URL);
