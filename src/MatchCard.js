import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { formatMatchDate } from "./utils";

const data = {
  id: 11389,
  league: "standard",
  season: 2022,
  date: {
    start: "2022-12-04T01:00:00.000Z",
    end: null,
    duration: null,
  },
  stage: 2,
  status: {
    clock: null,
    halftime: false,
    short: 3,
    long: "Finished",
  },
  periods: { current: 4, total: 4, endOfPeriod: false },
  arena: { name: null, city: null, state: null, country: null },
  teams: {
    visitors: {
      id: 26,
      name: "Orlando Magic",
      nickname: "Magic",
      code: "ORL",
      logo: "https://upload.wikimedia.org/wikipedia/fr/b/bd/Orlando_Magic_logo_2010.png",
    },
    home: {
      id: 38,
      name: "Toronto Raptors",
      nickname: "Raptors",
      code: "TOR",
      logo: "https://upload.wikimedia.org/wikipedia/fr/8/89/Raptors2015.png",
    },
  },
  scores: {
    visitors: {
      win: 0,
      loss: 0,
      series: { win: 0, loss: 0 },
      linescore: ["22", "26", "25", "35"],
      points: 108,
    },
    home: {
      win: 0,
      loss: 0,
      series: { win: 0, loss: 0 },
      linescore: ["36", "28", "30", "27"],
      points: 121,
    },
  },
  officials: [],
  timesTied: null,
  leadChanges: null,
  nugget: null,
};

export default function MatchCard(props) {
  const { data } = props;
  return (
    <Card sx={{ maxWidth: 345, padding: 4 }}>
      <Stack justifyContent="center" alignItems="center">
        <Typography gutterBottom variant="h5">
          {formatMatchDate(data.date.start)}
        </Typography>
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Avatar
          alt="Logo equipo local"
          src={data.teams.home.logo}
          sx={{ width: 72, height: 72 }}
        />
        <Typography>{data.scores.home.points} </Typography>
        <Typography>VS</Typography>
        <Typography>{data.scores.visitors.points} </Typography>
        <Avatar
          alt="Logo equipo Visitante"
          src={data.teams.visitors.logo}
          sx={{ width: 72, height: 72 }}
        />
      </Stack>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{
          paddingRight: 6,
          paddingLeft: 5,
        }}
      >
        <Typography>{data.teams.home.nickname}</Typography>
        <Typography>{data.teams.visitors.nickname}</Typography>
      </Stack>
    </Card>
  );
}
