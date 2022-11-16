const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const express = require("express");
const app = express();
const knex = require("./knex"); // Maybe I will have to change this
const PORT = process.env.PORT || 8080;
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./.env.local" });
const axios = require('axios');


app.get("/test", (req,res) => {
  fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_TheSportsDB_KEY}/lookupevent.php?id=441613`)
  .then((resukt) => resukt.json())
  .then(result => res.send(result))
})



app.get("/test2", (req,res) => {
  fetch(`https://www.thesportsdb.com/api/v1/json/2/all_leagues.php`)
  .then((resukt) => resukt.json())
  .then(result => res.send(result))
})

const path = require("path");
app.use(express.static(path.resolve(__dirname, "../frontend/build")));

app.use(express.json());

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"].split(' ')[1];

  if (token == null) return res.sendStatus(401)
  jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}


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
  fetch(`${process.env.API_URL}/teams?league=${leagueID}&season=2022`, {
    method: "GET",
    headers: {
      "x-rapidapi-host": `${process.env.API_HOST}`,
      "x-rapidapi-key": `${process.env.API_KEY}`,
    },
  })
    .then((response) => response.json())
    .then((result) => {
      const teamsArray = [];
      result.response.forEach((element) => {
        teamInfo = {};
        teamInfo.id = element.team.id;
        teamInfo.name = element.team.name;
        teamInfo.logo = element.team.logo;
        teamsArray.push(teamInfo);
      });
      return teamsArray;
    })
    .then((resultArray) => res.send(resultArray))
    .catch((error) => console.log("error", error));
});

app.get("/user/teams", authenticateToken, async (req, res) => {
  try {
    const userID = req.get("userID");
    console.log("userID ", userID);
    if (userID === undefined) {
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }
    const data = await knex("favourite_teams")
      .select("teamId")
      .where({ user_id: userID });
    const gamesArray = [];
    for (let i = 0; i < data.length; i++) {
      gamesArray.push(data[i].teamId);
    }

    if (data.length > 0) {
      res.status(200).json(gamesArray);
      return;
    } else {
      res.send([]);
    }
  } catch (error) {
    res.status(500);
  }
});

app.get("/user/teams/info", async(req,res) => {
  const teamIDs = req.get("teamIDs");
  const teamsIDArray = teamIDs.split(",");
  const FetchgamesPromises = teamsIDArray.map((ID) => {
    return fetch(
      `${process.env.API_URL}/teams?id=${ID}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": `${process.env.API_HOST}`,
          "x-rapidapi-key": `${process.env.API_KEY}`,
        },
      }
    ).then((resposne) => resposne.json());
  });

  await Promise.all(FetchgamesPromises)
    .then((result) => {
      console.log(result)
      const TeamsInfo = [];
      result.forEach((team) => {
          const TeamInfo = {};
          TeamInfo.name = team.response[0].team.name;
          TeamInfo.logo = team.response[0].team.logo;
          TeamsInfo.push(TeamInfo);
      });
      return TeamsInfo;
    })
    .then((FinalArray) => res.send(FinalArray));
})

app.get("/soccer/games", async (req, res) => {
  const teamIDs = req.get("teamIDs");
  const teamsIDArray = teamIDs.split(",");
  const date = req.get("DateSelected") ? req.get("DateSelected") : "2022-11-10";
  const FetchgamesPromises = teamsIDArray.map((ID) => {
    return fetch(
      `${process.env.API_URL}/fixtures?date=${date}&season=2022&team=${ID}&timezone=ASIA%2FTOKYO`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": `${process.env.API_HOST}`,
          "x-rapidapi-key": `${process.env.API_KEY}`,
        },
      }
    ).then((resposne) => resposne.json());
  });

  await Promise.all(FetchgamesPromises)
    .then((result) => {
      const GamesInfo = [];
      result.forEach((game) => {
        if (game.response.length >= 1) {
          const gameInfo = {};
          gameInfo.FixtureID = game.response[0].fixture.id;
          gameInfo.status = game.response[0].fixture.status;
          gameInfo.home = game.response[0].teams.home;
          gameInfo.away = game.response[0].teams.away;
          gameInfo.goals = game.response[0].goals;
          GamesInfo.push(gameInfo);
        }
      });
      return GamesInfo;
    })
    .then((FinalArray) => res.send(FinalArray));
});

app.post("/user/favouriteTeams", async (req, res) => {
  try {
    const { teams, userID } = req.body;
    teams.forEach(async (team) => {
      await knex("favourite_teams").insert([{ teamId: team, user_id: userID }]);
    });
    res.status(200);
  } catch (error) {
  }
});

app.post("/user/login", async (req, res) => {
  try {
    const { emailSignIn, SignInPassword } = req.body;

    const data = await knex
      .select("*")
      .from("users")
      .where({ email: emailSignIn, password: SignInPassword });

    if (data.length > 0) {
      const token = jwt.sign(
        {
          firstName: data[0]["first_name"],
          lastName: data[0]["last_name"],
          userid: data[0]["id"],
        },
        process.env.SECRET_TOKEN || "my_secret",
        {
          expiresIn: "1 h",
        }
      );
      res.status(200).json({ token: token, userid: data[0]["id"] });
      return;
    }
    res.status(401).json({ error: "error" });
  } catch (error) {
    res.status(500);
  }
});

app.post("/user/register", async (req, res) => {
  try {
    const { registerEmail, registerPassword, firstName } = req.body;
    const newUser = [
      {
        name: firstName,
        email: registerEmail,
        password: registerPassword,
      },
    ];
    const data = await knex("users").returning(["id"]).insert(newUser);

    const token = jwt.sign(
      { email: registerEmail, userid: data[0]["id"] },
      process.env.SECRET_TOKEN || "my_secret",
      {
        expiresIn: "1 h",
      }
    );
    res.status(201).json({ token: token, userid: data[0]["id"] });
    return;
  } catch (error) {
    console.log(error);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
