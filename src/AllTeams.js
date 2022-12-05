import { QueryClient, useQuery } from "@tanstack/react-query";
import fakeData from "./teamData.json";
import "./App.css";
import { getApiKey } from "./utils";

const teamQuery = () => {
  const apiKey = getApiKey();

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
    },
  };

  return fetch(
    `https://api-nba-v1.p.rapidapi.com/standings?league=standard&season=2022`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
};

function AllTeams() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["Teams"],
    queryFn: teamQuery,
    retry: 0,
  });

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  const east = [];
  const west = [];

  for (let index = 0; index < data.response.length; index++) {
    const element = data.response[index];

    const teamNick = element.team.nickname;
    const gamesWon = element.win.total;
    const gamesLost = element.loss.total;
    const gamesPlayed = gamesWon + gamesLost;
    const conference = element.conference.name;

    if (conference === "east") {
      east.push(
        <tr key={element.team.id}>
          <td>{teamNick}</td>
          <td>{gamesPlayed}</td>
          <td>{gamesWon}</td>
          <td>{gamesLost}</td>
        </tr>
      );
    } else {
      west.push(
        <tr key={element.team.id}>
          <td>{teamNick}</td>
          <td>{gamesPlayed}</td>
          <td>{gamesWon}</td>
          <td>{gamesLost}</td>
        </tr>
      );
    }
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Games Played</th>
            <th>Won</th>
            <th>Lost</th>
          </tr>
        </thead>
        <tbody>{west}</tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Games Played</th>
            <th>Won</th>
            <th>Lost</th>
          </tr>
        </thead>
        <tbody>{east}</tbody>
      </table>
    </div>
  );
}

export default AllTeams;
