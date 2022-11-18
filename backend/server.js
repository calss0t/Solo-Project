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
  fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_TheSportsDB_KEY}/eventsnext.php?id=133602`)
  .then((resukt) => resukt.json())
  .then(result => res.send(result))
})



app.get("/test2", (req,res) => {
  fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_TheSportsDB_KEY}/eventslast.php?id=133602`)
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

app.get("/user/favourites/Leagues/Info", authenticateToken, async (req,res) => {
  const leagues = req.get("leagues");
  const leaguesArray = leagues.split(",")
  const FetchLeagueInfoPromises = leaguesArray.map((ID) => {
    return fetch(
      `https://www.thesportsdb.com/api/v1/json/${process.env.API_TheSportsDB_KEY}/lookupleague.php?id=${ID}`,
    ).then((resposne) => resposne.json());
  });

  await Promise.all(FetchLeagueInfoPromises)
    .then((result) => {
      const LeaguesInfo = [];
      result.forEach((league) => {
          const LeagueInfo = {};
          LeagueInfo.id = league.leagues[0].idLeague;
          LeagueInfo.idAPIfootball = league.leagues[0].idAPIfootball;
          LeagueInfo.name = league.leagues[0].strLeague;
          LeagueInfo.description = league.leagues[0].strDescriptionEN;
          LeagueInfo.badge = league.leagues[0].strBadge + "/preview";
          LeaguesInfo.push(LeagueInfo);
      });
      return LeaguesInfo;
    })
    .then((FinalArray) => res.send(FinalArray));
})

app.get("/user/favourites/Teams/Info", authenticateToken, async (req,res) => {
  const teams = req.get("teams");
  const teamsArray = teams.split(",")
  const FetchTeamsInfoPromises = teamsArray.map((ID) => {
    return fetch(
      `https://www.thesportsdb.com/api/v1/json/${process.env.API_TheSportsDB_KEY}/lookupteam.php?id=${ID}`,
    ).then((resposne) => resposne.json());
  });

  await Promise.all(FetchTeamsInfoPromises)
    .then((result) => {
      const TeamsInfo = [];
      result.forEach((team) => {
          const TeamInfo = {};
          TeamInfo.id = team.teams[0].idTeam;
          TeamInfo.idAPIfootball = team.teams[0].idAPIfootball;
          TeamInfo.name = team.teams[0].strTeam;
          TeamInfo.description = team.teams[0].strDescriptionEN;
          TeamInfo.badge = team.teams[0].strTeamBadge + "/preview";
          TeamsInfo.push(TeamInfo);
      });
      return TeamsInfo;
    })
    .then((FinalArray) => res.send(FinalArray));
})

app.get("/user/favourites/Leagues/Games", async (req,res) => {
  const leagues = req.get("leagues");
  const leaguesArray = leagues.split(",")
  const FetchLeagueGamesPromises = []
  await leaguesArray.forEach((ID) => {
    FetchLeagueGamesPromises.push(fetch(
      `https://www.thesportsdb.com/api/v1/json/${process.env.API_TheSportsDB_KEY}/eventsnextleague.php?id=${ID}`,
    ).then((resposne) => resposne.json()))
    FetchLeagueGamesPromises.push(fetch(
      `https://www.thesportsdb.com/api/v1/json/${process.env.API_TheSportsDB_KEY}/eventspastleague.php?id=${ID}`,
    ).then((resposne) => resposne.json()))
  });

  await Promise.all(FetchLeagueGamesPromises)
    .then((result) => {
      const LeaguesGames = [];
      result.forEach((event) => {
        event.events.forEach((singleEvent) => {
          const LeagueGame = {};
          LeagueGame.id = singleEvent.idEvent;
          LeagueGame.idAPIfootball = singleEvent.idAPIfootball;
          LeagueGame.name = singleEvent.strEvent;
          LeagueGame.timestamp = singleEvent.strTimestamp;
          LeagueGame.dateEvent = singleEvent.dateEvent;
          LeaguesGames.push(LeagueGame);
        })
      });
      return LeaguesGames;
    })
    .then((FinalArray) => res.send(FinalArray));
})

app.get("/user/favourites/Teams/Games", async (req,res) => {
  const teams = req.get("teams");
  const TeamsArray = teams.split(",")
  const FetchTeamsGamesPromises = []
  await TeamsArray.forEach((ID) => {
    FetchTeamsGamesPromises.push(fetch(
      `https://www.thesportsdb.com/api/v1/json/${process.env.API_TheSportsDB_KEY}/eventsnext.php?id=${ID}`,
    ).then((resposne) => resposne.json()))
    FetchTeamsGamesPromises.push(fetch(
      `https://www.thesportsdb.com/api/v1/json/${process.env.API_TheSportsDB_KEY}/eventslast.php?id=${ID}`,
    ).then((resposne) => resposne.json()))
  });

  await Promise.all(FetchTeamsGamesPromises)
    .then((result) => {
      const TeamsGames = [];
      result.forEach((event) => {
        if(Object.keys(event)[0] === "events"){
          event.events.forEach((singleEvent) => {
            const TeamGame = {};
            TeamGame.id = singleEvent.idEvent;
            TeamGame.idAPIfootball = singleEvent.idAPIfootball;
            TeamGame.name = singleEvent.strEvent;
            TeamGame.timestamp = singleEvent.strTimestamp;
            TeamGame.dateEvent = singleEvent.dateEvent;
            TeamsGames.push(TeamGame);
          })
        }
        else if(Object.keys(event)[0] === "results"){
          event.results.forEach((singleEvent) => {
            const TeamGame = {};
            TeamGame.id = singleEvent.idEvent;
            TeamGame.idAPIfootball = singleEvent.idAPIfootball;
            TeamGame.name = singleEvent.strEvent;
            TeamGame.timestamp = singleEvent.strTimestamp;
            TeamGame.dateEvent = singleEvent.dateEvent;
            TeamsGames.push(TeamGame);
          })
        }
      });
      return TeamsGames;
    })
    .then((FinalArray) => res.send(FinalArray));
})

app.get("/soccer/leagues", async (req, res) => {
  const leagues = await knex.select("*").from("leagues");
  res.send(leagues);
});

app.get("/soccer/teams", (req, res) => {
  const leagueID = req.get("leagueID");
  fetch(`https://www.thesportsdb.com/api/v1/json/${process.env.API_TheSportsDB_KEY}/lookup_all_teams.php?id=${leagueID}`)
    .then((response) => response.json())
    .then((result) => {
      const teamsArray = [];
      result.teams.forEach((element) => {
        teamInfo = {};
        teamInfo.id = element.idTeam;
        teamInfo.idAPIfootball = element.idAPIfootball
        teamInfo.name = element.strTeam;
        teamInfo.description = element.strDescriptionEN
        teamInfo.logo = element.strTeamBadge + "/preview";
        teamsArray.push(teamInfo);
      });
      return teamsArray;
    })
    .then((resultArray) => res.send(resultArray))
    .catch((error) => console.log("error", error));
});



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

app.get("/user/Info", authenticateToken, async (req,res) => {
  try {
    const userID = req.get("userID");
    if (userID === undefined) {
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }
    const data = await knex("users")
      .select("*")
      .where({ id: userID });
      
    if (data.length > 0) {
      res.status(200).json(data);
      return;
    } else {
      res.send([]);
    }
  } catch (error) {
    res.status(500);
  }
})

app.get("/user/Teams", authenticateToken, async (req, res) => {
  try {
    const userID = req.get("userID");
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



app.get("/user/Leagues", authenticateToken, async (req, res) => {
  try {
    const userID = req.get("userID");
    if (userID === undefined) {
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }
    const data = await knex("favourite_leagues")
      .select("leagueId")
      .where({ user_id: userID });
    const leaguesArray = [];
    for (let i = 0; i < data.length; i++) {
      leaguesArray.push(data[i].leagueId);
    }

    if (data.length > 0) {
      res.status(200).json(leaguesArray);
      return;
    } else {
      res.send([]);
    }
  } catch (error) {
    res.status(500);
  }
});

app.post("/user/addFavourite/league" , authenticateToken, async (req,res) => {
  try {
    const { leagueId, userID } = req.body;
      await knex("favourite_leagues").insert([{ leagueId: leagueId, user_id: userID }]);
    res.status(200);
  } catch (error) {
    console.log(error)
  }
})

app.put("/user/deleteFavourite/League", authenticateToken, async (req,res)=> {
  try {
    const { leagueId, userID } = req.body;
    console.log(leagueId, userID)
      await knex("favourite_leagues").where('user_id', userID).andWhere("leagueId", leagueId).del()
    res.status(200);
  } catch (error) {
    console.log(error)
  }
})

app.put("/user/deleteFavourite/Team", authenticateToken, async (req,res)=> {
  try {
    const { teamId, userID } = req.body;
    console.log(teamId, userID)
      await knex("favourite_teams").where('user_id', userID).andWhere("teamId", teamId).del()
    res.status(200);
  } catch (error) {
    console.log(error)
  }
})


app.post("/user/addFavourite/teams" , authenticateToken, async (req,res) => {
  try {
    const { teams, userID } = req.body;
    teams.forEach(async (teamID) => {
      await knex("favourite_teams").insert([{ teamId: teamID, user_id: userID }])
    })
    res.status(200);
  } catch (error) {
    console.log(error)
  }
})

// app.get("/user/teams/info", async(req,res) => {
//   const teamIDs = req.get("teamIDs");
//   const teamsIDArray = teamIDs.split(",");
//   const FetchgamesPromises = teamsIDArray.map((ID) => {
//     return fetch(
//       `${process.env.API_URL}/teams?id=${ID}`,
//       {
//         method: "GET",
//         headers: {
//           "x-rapidapi-host": `${process.env.API_HOST}`,
//           "x-rapidapi-key": `${process.env.API_KEY}`,
//         },
//       }
//     ).then((resposne) => resposne.json());
//   });

//   await Promise.all(FetchgamesPromises)
//     .then((result) => {
//       const TeamsInfo = [];
//       result.forEach((team) => {
//           const TeamInfo = {};
//           TeamInfo.name = team.response[0].team.name;
//           TeamInfo.logo = team.response[0].team.logo;
//           TeamsInfo.push(TeamInfo);
//       });
//       return TeamsInfo;
//     })
//     .then((FinalArray) => res.send(FinalArray));
// })

// app.post("/user/favouriteTeams", async (req, res) => {
//   try {
//     const { teams, userID } = req.body;
//     teams.forEach(async (team) => {
//       await knex("favourite_teams").insert([{ teamId: team, user_id: userID }]);
//     });
//     res.status(200);
//   } catch (error) {
//   }
// });

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
