import { useQuery } from "@tanstack/react-query";
import fakeData from "./teamData.json";
import "./App.css";
import { getApiKey } from "./utils";
import { getFakeData } from "./utils";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import StandingsTable from "./StandingsTable";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const teamQuery = () => {
  const apiKey = getApiKey();
  const useFakeData = getFakeData();

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
    },
  };
  if (useFakeData === "true") {
    return fakeData;
  } else {
    return fetch(
      `https://api-nba-v1.p.rapidapi.com/standings?league=standard&season=2022`,
      options
    )
      .then((response) => response.json())
      .catch((err) => console.error(err));
  }
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

  const loadingElement = (
    <Backdrop
      sx={{ color: "#000", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );

  if (isLoading) return loadingElement;
  if (error)
    return (
      <Alert severity="error">
        This is an error alert — check it out! {error.message}
      </Alert>
    );

  return (
    <Stack
      direction="row"
      spacing={10}
      justifyContent="center"
      alignItems="center"
    >
      <Stack direction="column" alignItems="center">
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Typography
            sx={{
              color: "red",
              fontStyle: "bold",
              fontWeight: "900",
              fontSize: "2em",
            }}
          >
            EASTERN
          </Typography>
          <Typography
            sx={{
              color: "black",
              fontWeight: "100",
              fontSize: "2em",
            }}
          >
            CONFERENCE
          </Typography>
        </Stack>
        <StandingsTable data={data.response} conference="east" />
      </Stack>

      <Stack direction="column" alignItems="center">
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Typography
            sx={{
              color: "red",
              fontStyle: "bold",
              fontWeight: "900",
              fontSize: "2em",
            }}
          >
            WESTERN
          </Typography>
          <Typography
            sx={{
              color: "black",
              fontWeight: "100",
              fontSize: "2em",
            }}
          >
            CONFERENCE
          </Typography>
        </Stack>
        <StandingsTable data={data.response} conference="west" />
      </Stack>
    </Stack>
  );
}

export default AllTeams;
