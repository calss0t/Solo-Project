import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn_Register from "./components/User_components/SignIn_Register.js";
import ChooseLeague from "./components/ChooseLeague.js";
import ChooseTeams from "./components/ChooseTeams.js";
import TeamsGames from "./components/TeamsGames.js";
import ChooseLeagueTeams from "./components/ChooseLeagueTeams.js";
import Navbar from "./components/Navbar.js";
import moment from "moment";
import UserChooseLeague from "./components/User_components/UserChooseLeague.js";
import UserChooseTeams from "./components/User_components/UserChooseTeams.js";
import UserFavourites from "./components/User_components/UserFavourites.js";

import "./App.css";

function App() {
  const [leagueID, setLeagueID] = useState(undefined);
  const [leagueChosen, setLeagueChosen] = useState(false);
  const [teamsSelected, setTeamsSelected] = useState([]);
  const [teamsChosen, setTeamsChosen] = useState(false);
  const [navState, setNavState] = useState("Leagues");
  const [logInOrRegister, setLogInOrRegister] = useState(false);
  const [userLeagueChosen, setUserLeagueChosen] = useState(false);
  const [userTeamsSelected, setUserTeamsSelected] = useState([]);
  const [userTeamsChosen, setUserTeamsChosen] = useState(false);


  window.onclick = function (event) {
    if (event.target == document.getElementById("myModal")) {
      document.getElementById("myModal").style.display = "none";
    }
  };
  window.onclick = function (event) {
    if (event.target == document.getElementById("myModal")) {
      document.getElementById("myModal1").style.display = "none";
    }
  };

  useEffect(() => {
    const userID = localStorage.getItem("userid");
    fetch("/user/teams", {
      headers: {
        userID: userID,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((arr) => setUserTeamsSelected(arr));
      } else {
        setUserTeamsSelected([]);
        console.log(res);
      }
    });
  }, [navState]);

  const [leagueDisplay, setLeagueDisplay] = useState(
    <div id="league-modal" className="hidden">
      <div id="myModal" className="modal">
        <span
          onClick={() => {
            document.getElementById("myModal").style.display = "none";
            setLeagueID(undefined);
          }}
          className="close"
        >
          &times;
        </span>
        <div
          name="league 1"
          className="hidden"
          id="wg-api-football-games"
          data-host="v3.football.api-sports.io"
          data-key="0a255779144d2cce4dcbe45071efb1d4"
          data-date={`${moment().format("YYYY-MM-DD")}`}
          data-league="undefined"
          data-season="2022"
          data-theme="dark"
          data-show-toolbar="true"
          data-show-errors="false"
          data-show-logos="true"
          data-modal-game="true"
          data-modal-standings="true"
          data-modal-show-logos="true"
        ></div>
      </div>
    </div>
  );

  const [modalDisplay, setModalDisplay] = useState(
    <div id="game-modal" className="hidden">
      <div id="myModal1" className="modal">
        <span
          onClick={() => {
            document.getElementById("myModal1").style.display = "none";
          }}
          className="close"
        >
          &times;
        </span>
        <div
          className="hidden"
          id="wg-api-football-game"
          data-host="v3.football.api-sports.io"
          data-key="0a255779144d2cce4dcbe45071efb1d4"
          data-id="undefined"
          data-theme=""
          data-show-errors="false"
          data-show-logos="true"
        ></div>
      </div>
    </div>
  );

  useEffect(() => {
    if (navState === "Leagues") {
      setNavState(
        <ChooseLeague setNavState={setNavState} />
      );
    } else if (navState === "Teams") {
      {
        leagueChosen === false &&
          setNavState(
            <ChooseLeagueTeams
              setLeagueID={setLeagueID}
              setNavState={setNavState}
              setLeagueChosen={setLeagueChosen}
            />
          );
      }
      {
        leagueChosen === true &&
          teamsChosen === false &&
          setNavState(
            <ChooseTeams
              setNavState={setNavState}
              setTeamsChosen={setTeamsChosen}
              setTeamsSelected={setTeamsSelected}
              leagueID={leagueID}
            />
          );
      }
      {
        leagueChosen === true &&
          teamsChosen === true &&
          setNavState(
            <TeamsGames
              teamsSelected={teamsSelected}
            />
          );
      }
    } else if (navState === "Profile") {
      {
        logInOrRegister === false &&
          userTeamsSelected.length === 0 &&
          setNavState(
            <SignIn_Register
              setNavState={setNavState}
              setLogInOrRegister={setLogInOrRegister}
            />
          );
      }
      {
        userTeamsSelected.length >= 1 &&
          setNavState(<UserFavourites userTeamsSelected={userTeamsSelected} />);
      }
      {
        logInOrRegister === true &&
          userLeagueChosen === false &&
          userTeamsSelected.length === 0 &&
          setNavState(
            <UserChooseLeague
              setLeagueID={setLeagueID}
              setUserLeagueChosen={setUserLeagueChosen}
              setNavState={setNavState}
            />
          );
      }
      {
        logInOrRegister === true &&
          userLeagueChosen === true &&
          userTeamsChosen === false &&
          userTeamsSelected.length === 0 &&
          setNavState(
            <UserChooseTeams
              setNavState={setNavState}
              setUserTeamsSelected={setUserTeamsSelected}
              setUserTeamsChosen={setUserTeamsChosen}
              leagueID={leagueID}
            />
          );
      }
    }
  }, [navState]);

  return (
    <>
      <Navbar
        setNavState={setNavState}
        setLeagueID={setLeagueID}
        setLeagueChosen={setLeagueChosen}
        setTeamsSelected={setTeamsSelected}
        setTeamsChosen={setTeamsChosen}
      />
      {navState}
      {leagueDisplay}
      {modalDisplay}
    </>
  );
}

export default App;
