import React, { useEffect, useState } from "react";
import "../styles/ChooseLeague.css";
import moment from "moment";

export default function TestComponent({ ChosenLeagueID, setChosen }) {
  useEffect(() => {
    console.log("test");
  }, []);

  return (
    <div id="league-modal">
      <div id="myModal" className="modal">
        <span
          onClick={() => {
            setChosen(false);
            document.getElementById("myModal").style.display = "none";
          }}
          className="close"
        >
          &times;
        </span>
        <div>Hello</div>
        {/* <div
        name="league 1"
        id="wg-api-football-games"
        data-host="v3.football.api-sports.io"
        data-key="0a255779144d2cce4dcbe45071efb1d4"
        data-date={`${moment().format("YYYY-MM-DD")}`}
        data-league={`${ChosenLeagueID}`}
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
}
