import { useQuery } from "@tanstack/react-query";
import fakeData from "./data.json";
import "./App.css";
import { getApiKey } from "./utils";
import { getFakeData } from "./utils";
import MatchCard from "./MatchCard";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function gameQuery() {
  const apiKey = getApiKey();
  const useFakeData = getFakeData();

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

  if (useFakeData === "true") {
    return fakeData;
  } else {
    return fetch(
      `https://api-nba-v1.p.rapidapi.com/games?date=${formattedDate}`,
      options
    )
      .then((response) => response.json())
      .catch((err) => console.error(err));
  }
}

function Games(props) {
  const { status } = props;
  const { isLoading, error, data } = useQuery({
    queryKey: ["Games"],
    queryFn: gameQuery,
    retry: 0,
  });

  // const data = fakeData;
  // const isLoading = false;
  // const error = false;

  const gamesArr = [];
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

  for (let index = 0; index < data.response.length; index++) {
    const element = data.response[index];
    const gameStatus = element.status.long;
    if (gameStatus !== status) {
      continue;
    }
    if (gamesArr.length === 4) {
      break;
    }

    gamesArr.push(<MatchCard key={element.id} data={element} />);
  }

  if (gamesArr.length === 0 && status === "Live") {
    return (
      <Stack direction="row" justifyContent="center">
        <Typography
          sx={{
            m: 5,
            color: "grey",
            fontStyle: "bold",
            fontWeight: "100",
            fontSize: "1em",
          }}
        >
          No live matches were found 🥺
        </Typography>
      </Stack>
    );
  } else if (gamesArr.length === 0 && status === "Scheduled") {
    return (
      <Stack direction="row" justifyContent="center">
        <Typography
          sx={{
            m: 5,
            color: "grey",
            fontStyle: "bold",
            fontWeight: "100",
            fontSize: "1em",
          }}
        >
          No scheduled matches were found 🥺
        </Typography>
      </Stack>
    );
  } else if (gamesArr.length === 0 && status === "Finished") {
    return (
      <Stack direction="row" justifyContent="center">
        <Typography
          sx={{
            m: 3,
            color: "grey",
            fontStyle: "bold",
            fontWeight: "100",
            fontSize: "1em",
          }}
        >
          No finished matches were found for today 🥺
        </Typography>
      </Stack>
    );
  }
  return (
    <div>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        {gamesArr}
      </Stack>
    </div>
  );
}

function AllGames() {
  return (
    <Stack direction="column" justifyContent="center" alignItems="center">
      <Stack
        direction="row"
        alignItems="center"
        sx={{ marginTop: "20px", marginBottom: "20px" }}
      >
        <Typography
          sx={{
            color: "red",
            fontStyle: "bold",
            fontWeight: "900",
            fontSize: "2em",
          }}
        >
          FINISHED
        </Typography>
        <Typography
          sx={{
            color: "black",
            fontWeight: "100",
            fontSize: "2em",
          }}
        >
          GAMES
        </Typography>
      </Stack>
      <Games status="Finished" />

      <Stack
        direction="row"
        alignItems="center"
        sx={{ marginTop: "100px", marginBottom: "20px" }}
      >
        <Typography
          sx={{
            color: "red",
            fontStyle: "bold",
            fontWeight: "900",
            fontSize: "2em",
          }}
        >
          SCHEDULED
        </Typography>
        <Typography
          sx={{
            color: "black",
            fontWeight: "100",
            fontSize: "2em",
          }}
        >
          GAMES
        </Typography>
      </Stack>
      <Games status="Scheduled" />

      <Stack
        direction="row"
        alignItems="center"
        sx={{ marginTop: "100px", marginBottom: "20px" }}
      >
        <Typography
          sx={{
            color: "red",
            fontStyle: "bold",
            fontWeight: "900",
            fontSize: "2em",
          }}
        >
          LIVE
        </Typography>
        <Typography
          sx={{
            color: "black",
            fontWeight: "100",
            fontSize: "2em",
          }}
        >
          GAMES
        </Typography>
      </Stack>
      <Games status="Live" />
    </Stack>
  );
}

export default AllGames;
