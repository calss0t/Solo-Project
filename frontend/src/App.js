import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn_Register from "./components/SignIn_Register.js";
import ChooseLeague from "./components/Guest_components/ChooseLeague.js";
import ChooseTeams from "./components/Guest_components/ChooseTeams.js";
import TeamsGames from "./components/Guest_components/TeamsGames.js";
import ChooseLeagueTeams from "./components/Guest_components/ChooseLeagueTeams.js";
import moment from "moment";
import UserChooseLeague from "./components/User_components/AddLeague.js";
import UserChooseTeams from "./components/User_components/UserChooseTeams.js";
import UserFavourites from "./components/User_components/UserFavourites.js";
import Profile from "./components/User_components/Profile.js";
import Guest from "./components/Guest_components/Guest.js";

import { Link, Routes, Route } from "react-router-dom";

import "./App.css";
import Guest_SignIn_Register from "./components/Guest_components/Guest_SignIn_Register.js";
import { SimpleScrollGrid } from "@fullcalendar/react";

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
    } else if (navState === "Profile") {
      {
        logInOrRegister === false &&
          userTeamsSelected.length === 0 &&
          setNavState(
            <SignIn_Register
              as={Link}
              to="/Profile/SignIn"
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
  }, [navState, guest]);

  return (
    <>
      {/* {logInOrRegister === false && guest === false && (
        <SignIn_Register
          setLogInOrRegister={setLogInOrRegister}
          setGuest={setGuest}
        />
      )}
      {logInOrRegister === true && <Profile/>}
      {logInOrRegister === false && guest === true && (
        <Guest
          setNavState={setNavState}
          setLeagueID={setLeagueID}
          setLeagueChosen={setLeagueChosen}
          setTeamsSelected={setTeamsSelected}
          setTeamsChosen={setTeamsChosen}
          setLogInOrRegister={setLogInOrRegister}
          navState={navState}
        />
      )} */}
      {leagueDisplay}
      {modalDisplay}
      <Routes>
        <Route exact path="/" element={<SignIn_Register setLogInOrRegister={setLogInOrRegister}
          setGuest={setGuest} />}></Route>
        <Route exact path="/User" element={<Profile />}></Route>
        <Route exact path="/Guest/Leagues" element={<Guest setNavState={setNavState}
          setLeagueID={setLeagueID}
          setLeagueChosen={setLeagueChosen}
          setTeamsSelected={setTeamsSelected}
          setTeamsChosen={setTeamsChosen}
          setLogInOrRegister={setLogInOrRegister}
          navState={navState}/>}></Route>
        <Route exact path="/SignIn" element={<Guest_SignIn_Register />}></Route>
        <Route
          exact
          path="/Guest/Teams"
          element={<ChooseLeagueTeams setLogInOrRegister={setLogInOrRegister}/>}
        ></Route>
        {/* <Route exact path="/User/Addleague" element={<UserChooseLeague />} > </Route> */}
      </Routes>
    </>
  );
}

export default App;
