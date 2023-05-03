import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn_Register from "./components/SignIn_Register.js";
import ChooseLeague from "./components/Guest_components/ChooseLeague.js";
import ChooseTeams from "./components/Guest_components/ChooseTeams.js";
import TeamsGames from "./components/Guest_components/TeamsGames.js";
import ChooseLeagueTeams from "./components/Guest_components/ChooseLeagueTeams.js";
import moment from "moment";
import Profile from "./components/User_components/Profile.js";


import { Routes, Route } from "react-router-dom";

import "./App.css";
import Guest_SignIn_Register from "./components/Guest_components/Guest_SignIn_Register.js";
import Calendar from "./components/Guest_components/Calendar.js";

function App() {
  const [leagueIDLeagueBar, setLeagueIDLeagueBar] = useState(undefined);
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
            document.getElementById("calendar").style.zIndex = "1"
          }}
          className="close"
        >
          &times;
        </span>
        <div
          name="league 1"
          className="hidden"
          id="wg-api-football-games"
          data-host="api-football-v1.p.rapidapi.com"
          data-key={process.env.REACT_APP_APIKEY}
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
            let game = document.getElementById("wg-api-football-game");
            game.setAttribute("data-id", "undefined");
            document.getElementById("myModal1").style.display = "none";
            document.getElementById("game-modal").classList.add("hidden");
            document.getElementById("calendar").style.zIndex = "1"
            document.getElementById("wg-api-football-game").classList.add("hidden");
          }}
          className="close"
        >
          &times;
        </span>
        <div
          className="hidden"
          id="wg-api-football-game"
          data-host="api-football-v1.p.rapidapi.com"
          data-key={process.env.REACT_APP_APIKEY}
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
      setNavState(<ChooseLeague setNavState={setNavState} />);
    } else if (navState === "Teams") {
        leagueChosen === false &&
          setNavState(
            <ChooseLeagueTeams
              setLeagueID={setLeagueID}
              setNavState={setNavState}
              setLeagueChosen={setLeagueChosen}
            />
          );
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
              setTeamsSelected={setTeamsSelected}
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
          element={<ChooseLeague setNavState={setNavState} setLeagueIDLeagueBar={setLeagueIDLeagueBar}/>}
        ></Route>
        <Route
          exact
          path="/Guest/calendar"
          element={<Calendar leagueIDLeagueBar={leagueIDLeagueBar}  teamsSelected={teamsSelected}/>}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
