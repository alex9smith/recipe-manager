export function getApiBaseUrl() {
  return import.meta.env.VITE_API_BASE_URL;
}

export function getOAuthClientId() {
  return import.meta.env.VITE_OAUTH_CLIENT_ID;
}

export function isProduction() {
  return import.meta.env.PROD;
}

export function getAllowedUserEmails() {
  return import.meta.env.VITE_ALLOWED_USER_EMAILS.split(",");
}
