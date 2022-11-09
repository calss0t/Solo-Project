import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn_Register from "./components/SignIn_Register.js";
import ChooseLeague from "./components/ChooseLeague.js";
import ChooseTeams from "./components/ChooseTeams.js";
import FavouriteTeams from "./components/FavouriteTeams.js";
import ChooseLeagueTeams from "./components/ChooseLeagueTeams.js";
import Navbar from "./components/Navbar.js";

import "./App.css";

function App() {
  const [leagueID, setLeagueID] = useState(undefined);
  const [leagueChosen, setLeagueChosen] = useState(false)
  const [teamsSelected, setTeamsSelected] = useState([]);
  const [teamsChosen, setTeamsChosen] = useState(false)
  const [navState, setNavState] = useState("Leagues");

  const [date, setDate] = useState();

  const [leagueDisplay, setLeagueDisplay] = useState(
    <div className="League_selection">
      <div
        name="league 1"
        className="hidden"
        id="wg-api-football-games"
        data-host="v3.football.api-sports.io"
        data-key="9754ae910660619f1101739d155f3e74"
        data-date="2022-11-09"
        data-league="undefined"
        data-season="2022"
        data-theme="dark"
        data-show-toolbar="false"
        data-show-errors="false"
        data-show-logos="true"
        data-modal-game="true"
        data-modal-standings="true"
        data-modal-show-logos="true"
      ></div>
    </div>
  );

  const [modalDisplay, setModalDisplay] = useState(
    <div
      id="wg-api-football-game"
      data-host="v3.football.api-sports.io"
      data-key="9754ae910660619f1101739d155f3e74"
      data-id="undefined"
      data-theme=""
      data-show-errors="false"
      data-show-logos="true"
    ></div>
  );

  useEffect(() => {
    if (navState === "Leagues") {
      setNavState(<ChooseLeague setLeagueID={setLeagueID} setNavState={setNavState}/>)
    } else if (navState === "Teams") {
      {leagueChosen === false && setNavState(<ChooseLeagueTeams setLeagueID={setLeagueID} setNavState={setNavState} setLeagueChosen={setLeagueChosen} />)}
      {leagueChosen === true && teamsChosen === false && setNavState(<ChooseTeams
        setNavState={setNavState}
        setTeamsChosen={setTeamsChosen}
        setTeamsSelected={setTeamsSelected}
        leagueID={leagueID}
      />)}
      {leagueChosen === true && teamsChosen === true && setNavState(<FavouriteTeams teamsSelected={teamsSelected} setNavState={setNavState}/>)}
      // setNavState(
      //   <>
      //     {leagueChosen === false && <ChooseLeagueTeams setLeagueID={setLeagueID} setLeagueChosen={setLeagueChosen} />}{" "}
      //     {leagueChosen === true && teamsSelected.length === 0 && <ChooseTeams
      //       setTeamsSelected={setTeamsSelected}
      //       leagueID={leagueID}
      //     />}
      //     {leagueChosen === true && teamsSelected.length !== 0 && <FavouriteTeams teamsSelected={teamsSelected} />}
      //   </>
      // );
    } else if (navState === "Profile") {
      setNavState(<SignIn_Register/>);
    }
    console.log(leagueChosen)
    console.log(teamsSelected)
  }, [navState ,leagueID, leagueDisplay, leagueChosen, teamsChosen]);

  useEffect(() => {
    console.log(leagueDisplay);
  });

  return (
    <>
    <Navbar setNavState={setNavState}/>
    {navState}
    {leagueDisplay}
      {/* {leagueID === undefined && (
        <ChooseLeague
          setLeagueID={setLeagueID}
        />
      )}
      {leagueID !== undefined && teamsSelected.length === 0 && (
        <ChooseTeams setTeamsSelected={setTeamsSelected} leagueID={leagueID} />
      )}
      {teamsSelected.length !== 0 && <FavouriteTeams teamsSelected={teamsSelected}/>}
      
      {modalDisplay} */}
      {/* <FavouriteTeams teamsSelected={teamsSelected} /> */}

      {/* <SignIn_Register/> */}
    </>
  );
}

export default App;
