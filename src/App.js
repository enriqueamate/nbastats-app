import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import AllGames from "./AllGames";
import AllTeams from "./AllTeams";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { getApiKey } from "./utils";

const queryClient = new QueryClient();

function App() {
  const apiKey = getApiKey();
  if (!apiKey) {
    const message = "Please provide an apiKey param in the URL";
    alert(message);
    return <h1>{message}</h1>;
  }
  return (
    <Container maxWidth="lg" sx={{ m: 5 }}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={0}
        marginBottom="4em"
      >
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Typography
            sx={{
              color: "red",
              fontStyle: "bold",
              fontWeight: "900",
              fontSize: "5em",
            }}
          >
            NBA
          </Typography>
          <Typography
            sx={{ color: "black", fontWeight: "200", fontSize: "5em" }}
          >
            STATS
          </Typography>
        </Stack>
        <Typography
          sx={{
            color: "black",
            fontWeight: "100",
            fontSize: "1em",
            marginTop: "5px",
          }}
        >
          A PROJECT BY ENRIQUE AMATE
        </Typography>
        <Typography
          sx={{
            color: "grey",
            fontWeight: "100",
            fontSize: "1em",
            marginTop: "5px",
            fontStyle: "italic",
          }}
        >
          A simple application to consume data from API-NBA by Rapidapi
        </Typography>
      </Stack>

      <QueryClientProvider client={queryClient}>
        <AllGames />
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ marginTop: "100px", marginBottom: "20px" }}
        >
          <Stack direction="row" justifyContent="center" alignItems="center">
            <Typography
              sx={{ color: "black", fontWeight: "200", fontSize: "2em" }}
            >
              SEASON
            </Typography>
            <Typography
              sx={{
                color: "red",
                fontStyle: "bold",
                fontWeight: "900",
                fontSize: "2em",
              }}
            >
              STANDINGS
            </Typography>
          </Stack>
          <Typography
            sx={{
              color: "grey",
              fontWeight: "100",
              fontSize: "1em",
              marginBottom: "50px",
            }}
          >
            Watch how your favorite team is doing so far!
          </Typography>

          <AllTeams />
        </Stack>
      </QueryClientProvider>
    </Container>
  );
}

export default App;
