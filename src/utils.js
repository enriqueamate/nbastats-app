export function getApiKey() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const apiKey = urlParams.get("apiKey");
  return apiKey;
}
