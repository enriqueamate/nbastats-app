import { useQuery } from "@tanstack/react-query";
import fakeData from "./teamData.json";
import "./App.css";
import { getApiKey } from "./utils";
import StandingsTable from "./StandingsTable";

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
  //   const data = fakeData;
  //   const isLoading = false;
  //   const error = false;

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <StandingsTable data={data.response} conference="east" />
      <StandingsTable data={data.response} conference="west" />
    </div>
  );
}

export default AllTeams;
