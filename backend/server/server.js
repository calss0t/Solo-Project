const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const express = require("express");
const app = express();
const knex = require("../knex"); // Maybe I will have to change this
const PORT = process.env.PORT || 8080;
//const jwt = require('jsonwebtoken');
require("dotenv").config({ path: "./../../.env.local" });

const path = require("path");
app.use(express.static(path.resolve(__dirname, "../../frontend/build")));

app.use(express.json());

// app.get('/logIn', (req, res)=>{

//     return
//     res.status(200);
//     res.send(`name of DB User: ${process.env.DB_USER}`);
// });

// app.get('/register', (req,res) => {

// })

// var HeadersAPISports = new Headers();
// myHeaders.append("x-rapidapi-key", `${process.env.API_FOOTBALL}`);
// myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

// var requestOptions = {
//   method: 'GET',
//   headers: HeadersAPISports,
//   redirect: 'follow'
// };

// fetch("https://v3.football.api-sports.io/{endpoint}", requestOptions)
// .then(response => response.text())
// .then(result => console.log(result))
// .catch(error => console.log('error', error));

app.get("/", (req, res) => {
  res.status(200);
  res.send(`name of DB User: ${process.env.DB_USER}`);
});

app.get("/soccer/leagues", async (req, res) => {
  const leagues = await knex.select("*").from("leagues");
  res.send(leagues);
});

app.get("/soccer/teams", (req, res) => {
  const leagueID = req.get("leagueID");
  fetch(`https://v3.football.api-sports.io/teams?league=${leagueID}&season=2022`, {
    method: 'GET',
    headers: {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": `${process.env.API_FOOTBALL}`
	},
  })
    .then((response) => response.json())
    .then((result) =>{
        const teamsArray = []
        result.response.forEach((element) => {
            teamInfo = {}
            teamInfo.id = element.team.id
            teamInfo.name = element.team.name
            teamInfo.logo = element.team.logo
            teamsArray.push(teamInfo)
        })
        return teamsArray
    })
    .then((resultArray) => res.send(resultArray))
    .catch((error) => console.log("error", error));
});

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
