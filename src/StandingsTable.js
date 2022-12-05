import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// {rows.map((row) => (
//     <TableRow
//       key={row.name}
//       sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//     >
//       <TableCell component="th" scope="row">
//         {row.name}
//       </TableCell>
//       <TableCell align="right">{row.calories}</TableCell>
//       <TableCell align="right">{row.fat}</TableCell>
//       <TableCell align="right">{row.carbs}</TableCell>
//       <TableCell align="right">{row.protein}</TableCell>
//     </TableRow>
//   ))}

export default function StandingsTable(props) {
  const { data, conference } = props;

  const teamArr = [];

  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    const teamNick = element.team.nickname;
    const gamesWon = element.win.total;
    const gamesLost = element.loss.total;
    const gamesPlayed = gamesWon + gamesLost;
    const reqConference = element.conference.name;

    if (reqConference === conference) {
      teamArr.push(
        <TableRow key={element.team.id}>
          <TableCell>{teamNick}</TableCell>
          <TableCell align="right">{gamesPlayed}</TableCell>
          <TableCell align="right">{gamesWon}</TableCell>
          <TableCell align="right">{gamesLost}</TableCell>
        </TableRow>
      );
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Team</TableCell>
            <TableCell align="right">Games Played</TableCell>
            <TableCell align="right">Won</TableCell>
            <TableCell align="right">Lost</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{teamArr}</TableBody>
      </Table>
    </TableContainer>
  );
}
