import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./..//Navbar.js";


function Guest({setNavState, setLeagueID, setLeagueChosen, setTeamsChosen, navState, setLogInOrRegister, setTeamsSelected}) {

  return (
    <>
      <Navbar
        setNavState={setNavState}
        setLeagueID={setLeagueID}
        setLeagueChosen={setLeagueChosen}
        setTeamsSelected={setTeamsSelected}
        setTeamsChosen={setTeamsChosen}
        setLogInOrRegister={setLogInOrRegister}
      />
      {navState}
    </>
  );
}

export default Guest;
