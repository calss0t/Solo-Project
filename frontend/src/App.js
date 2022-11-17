import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn_Register from "./components/SignIn_Register.js";
import ChooseLeague from "./components/Guest_components/ChooseLeague.js";
import ChooseTeams from "./components/Guest_components/ChooseTeams.js";
import TeamsGames from "./components/Guest_components/TeamsGames.js";
import ChooseLeagueTeams from "./components/Guest_components/ChooseLeagueTeams.js";
import moment from "moment";
import Profile from "./components/User_components/Profile.js";


import { Link, Routes, Route } from "react-router-dom";

import "./App.css";
import Guest_SignIn_Register from "./components/Guest_components/Guest_SignIn_Register.js";

function App() {
  const [leagueID, setLeagueID] = useState(undefined);
  const [leagueChosen, setLeagueChosen] = useState(false);
  const [teamsSelected, setTeamsSelected] = useState([]);
  const [teamsChosen, setTeamsChosen] = useState(false);
  const [navState, setNavState] = useState("Leagues");
  const [logInOrRegister, setLogInOrRegister] = useState(false);
  const [guest, setGuest] = useState(false);

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
        {/* <div
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
        ></div> */}
      </div>
    </div>
  );

  const [modalDisplay, setModalDisplay] = useState(
    <div id="game-modal" className="hidden">
      <div id="myModal1" className="modal">
        <span
          onClick={() => {
            let game = document.getElementById("wg-api-football-game");
            game.setAttribute("data-id", "undefined");
            document.getElementById("myModal1").style.display = "none";
          }}
          className="close"
        >
          &times;
        </span>
        {/* <div
          className="hidden"
          id="wg-api-football-game"
          data-host="v3.football.api-sports.io"
          data-key="0a255779144d2cce4dcbe45071efb1d4"
          data-id="undefined"
          data-theme=""
          data-show-errors="false"
          data-show-logos="true"
        ></div> */}
      </div>
    </div>
  );

  useEffect(() => {
    if (navState === "Leagues") {
      setNavState(<ChooseLeague setNavState={setNavState} />);
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
          setNavState(<TeamsGames teamsSelected={teamsSelected} />);
      }
    }
  }, [navState, guest]);

  return (
    <>
      {leagueDisplay}
      {modalDisplay}
      <Routes>
        <Route
          exact
          path="/"
          element={
            <SignIn_Register
              setLogInOrRegister={setLogInOrRegister}
              setGuest={setGuest}
            />
          }
        ></Route>
        <Route
          exact
          path="/SignIn"
          element={
            <SignIn_Register
              setLogInOrRegister={setLogInOrRegister}
              setGuest={setGuest}
            />
          }
        ></Route>
        <Route exact path="/User" element={<Profile />}></Route>
        {/* <Route
          exact
          path="/Guest"
          element={
            <Guest
              setNavState={setNavState}
              setLeagueID={setLeagueID}
              setLeagueChosen={setLeagueChosen}
              setTeamsSelected={setTeamsSelected}
              setTeamsChosen={setTeamsChosen}
              setLogInOrRegister={setLogInOrRegister}
              navState={navState}
            />
          }
        ></Route> */}
        <Route exact path="/SignIn" element={<Guest_SignIn_Register />}></Route>
        <Route
          exact
          path="/Register"
          element={
            <SignIn_Register
              setLogInOrRegister={setLogInOrRegister}
              setGuest={setGuest}
            />
          }
        ></Route>
        <Route
          exact
          path="/Guest/Teams/SelectLeague"
          element={
            <ChooseLeagueTeams
              setLeagueID={setLeagueID}
              setNavState={setNavState}
              setLeagueChosen={setLeagueChosen}
            />
          }
        ></Route>
        <Route
          exact
          path="/Guest/Teams/SelectTeam"
          element={
            <ChooseTeams
              setNavState={setNavState}
              setTeamsChosen={setTeamsChosen}
              setTeamsSelected={setTeamsSelected}
              leagueID={leagueID}
            />
          }
        ></Route>
        <Route
          exact
          path="/Guest/Teams/Calendar"
          element={<TeamsGames teamsSelected={teamsSelected} />}
        ></Route>
        <Route
          exact
          path="/Guest/Leagues"
          element={<ChooseLeague setNavState={setNavState} />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
