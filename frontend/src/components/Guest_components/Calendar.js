import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";

import moment from "moment-timezone";

import "./../../styles/calendar.css"

import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

export default function Calendar({ leagueIDLeagueBar, teamsSelected }) {
  const [leaguegames, setLeagueGames] = useState([]);
  const [teamsgames, setTeamsGames] = useState([]);

  useEffect(() => {
    (async () => {
      if (leagueIDLeagueBar !== undefined) {
        if (leagueIDLeagueBar.length >= 1) {
          await fetch("/Guest/League/Games", {
            headers: {
              leagueID: leagueIDLeagueBar,
            },
          })
            .then((res) => {
              return res.json();
            })
            .then((result) => setLeagueGames(result));
        }
      }
      if (teamsSelected !== undefined) {
        if (teamsSelected.length >= 1) {
          await fetch("/Guest/Teams/Games", {
            headers: {
              teams: teamsSelected,
            },
          })
            .then((res) => {
              return res.json();
            })
            .then((result) => setTeamsGames(result));
        }
      }
    })();
  }, [leagueIDLeagueBar, teamsSelected]);

  const renderLeaguesContent = () => {
    const GamesArray = [];
    leaguegames.forEach((event) => {
      let obj = {
        color: "#ff0000",
        textColor: "#282c34",
        id: `${event.idAPIfootball}`,
        title: `${event.name}`, // a property!
        start: `${moment(`${event.timestamp}`).tz("Asia/Tokyo").format()}`,
        allDay: false, // will make the time show
      };
      GamesArray.push(obj);
    });

    teamsgames.forEach((event) => {
      let obj = {
        id: `${event.idAPIfootball}`,
        title: `${event.name}`, // a property!
        start: `${moment(`${event.timestamp}`).tz("Asia/Tokyo").format()}`,
        allDay: false, // will make the time show
      };
      GamesArray.push(obj);
    });
    return GamesArray;
  };

  const handleClick = (id) => {
    document.getElementById("calendar").style.zIndex = "-1"
    document.getElementById("game-modal").classList.remove("hidden");
    document.getElementById("myModal1").style.display = "block";
    let game = document.getElementById("wg-api-football-game");
    game.setAttribute("data-id", id);
    document.getElementById("wg-api-football-game").classList.remove("hidden");
    window.document.dispatchEvent(
      new Event("DOMContentLoaded", {
        bubbles: true,
        cancelable: true,
      })
    );
  };

  return (
    <>
      <Navbar />
      {<br></br>}
      {<br></br>}
      {<br></br>}
      <div id="calendar" className="calendar">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,listWeek",
          }}
          events={renderLeaguesContent()}
          eventTimeFormat={{
            // like '14:30:00'
            hour: "2-digit",
            minute: "2-digit",
            meridiem: "short",
            hour12: false,
          }}
          eventClick={(e) => handleClick(e.event.id)}
          timeZone="Asia/Tokyo"
          initialView="dayGridMonth"
        />
      </div>
    </>
  );
}
