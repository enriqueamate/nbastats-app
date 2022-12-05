export function getApiKey() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const apiKey = urlParams.get("apiKey");
  return apiKey;
}

export function formatMatchDate(date) {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    timeZone: "America/Mexico_City",
  };

  const gameTime = new Date(date);
  const formattedTime = new Intl.DateTimeFormat("en-US", options).format(
    gameTime
  );
  return formattedTime;
}
