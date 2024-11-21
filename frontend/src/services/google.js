export async function fetchUserProfile(tokenResponse) {
  const response = await fetch(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
  );

  if (!response.ok) {
    console.error(response);
  }

  return await response.json();
}
