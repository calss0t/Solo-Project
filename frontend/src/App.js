import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import SignIn_Register from './components/SignIn_Register.js' 
import ChooseLeague from './components/ChooseLeague.js'
import ChooseTeams from './components/ChooseTeams.js';




import './App.css';

function App() {
  const [leagueID, setLeagueID] = useState(undefined)
  const [teamsSelected, setTeamsSelected] = useState([])

  return (
    <>
    {leagueID === undefined && <ChooseLeague setLeagueID={setLeagueID}/>}
    {leagueID !== undefined && <ChooseTeams setTeamsSelected={setTeamsSelected} leagueID={leagueID}/>}
    {/* <SignIn_Register/> */}
    </>
  );
}

export default App;
