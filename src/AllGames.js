import { QueryClient, useQuery } from "@tanstack/react-query";
import fakeData from "./data.json";
import "./App.css";
import { getApiKey } from "./utils";

function gameQuery() {
  const apiKey = getApiKey();
  console.log(apiKey);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
    },
  };

  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = today.getFullYear() + "-" + month + "-" + day;

  return fetch(
    `https://api-nba-v1.p.rapidapi.com/games?date=${formattedDate}`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
}

function Games(props) {
  const { status } = props;
  const { isLoading, error, data } = useQuery({
    queryKey: ["Games"],
    queryFn: gameQuery,
    retry: 0,
  });

  const gamesArr = [];

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  for (let index = 0; index < data.response.length; index++) {
    const element = data.response[index];
    const gameStatus = element.status.long;
    if (gameStatus !== status) {
      continue;
    }
    if (gamesArr.length === 4) {
      break;
    }

    const homeNick = element.teams.home.nickname;
    const visitorNick = element.teams.visitors.nickname;

    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
      timeZone: "America/Mexico_City",
    };

    const gameTime = new Date(element.date.start);
    const formattedTime = new Intl.DateTimeFormat("en-US", options).format(
      gameTime
    );
    const match = `${homeNick} vs ${visitorNick} - ${formattedTime}`;
    gamesArr.push(<li key={element.id}>{match}</li>);
  }

  if (gamesArr.length === 0 && status === "Live") {
    return <h1>No se encontraron juegos en vivo </h1>;
  } else if (gamesArr.length === 0 && status === "Scheduled") {
    return <h1>No se encontraron juegos programados para hoy</h1>;
  } else if (gamesArr.length === 0 && status === "Finished") {
    return <h1>No se encontraron juegos finalizados hoy</h1>;
  }

  return (
    <div>
      <ul>{gamesArr}</ul>
    </div>
  );
}

function AllGames() {
  return (
    <div>
      <Games status="Finished" />
      <Games status="Scheduled" />
      <Games status="Live" />
    </div>
  );
}

export default AllGames;
