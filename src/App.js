import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import AllGames from "./AllGames";
import AllTeams from "./AllTeams";
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
    <QueryClientProvider client={queryClient}>
      <AllGames />
      <AllTeams />
    </QueryClientProvider>
  );
}

export default App;
