import React, { useEffect, useState } from "react";

import moment from "moment-timezone";
import styled from "@emotion/styled";

import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

export const StyleWrapper = styled.div`
  .fc td {
    background: white;
  }
`;

export default function CalendarView({ favouriteLeagues, favouriteTeams }) {
  const [leaguegames, setLeagueGames] = useState([]);
  const [teamsgames, setTeamsGames] = useState([]);

  useEffect(() => {
    (async () => {
      if (favouriteLeagues !== undefined) {
        if (favouriteLeagues.length >= 1) {
          await fetch("/user/favourites/Leagues/Games", {
            headers: {
              leagues: favouriteLeagues,
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
            .then((res) => {
              return res.json();
            })
            .then((result) => setLeagueGames(result));
        }
      }
      if (favouriteTeams !== undefined) {
        if (favouriteTeams.length >= 1) {
          await fetch("/user/favourites/Teams/Games", {
            headers: {
              teams: favouriteTeams,
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
            .then((res) => {
              return res.json();
            })
            .then((result) => setTeamsGames(result));
        }
      }
    })();
  }, [favouriteLeagues, favouriteTeams]);

  const renderLeaguesContent = (event) => {
    const GamesArray = [];
    leaguegames.forEach((event) => {
      let obj = {
        color: "282c34",
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
    <StyleWrapper>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,listWeek",
        }}
        events={renderLeaguesContent()}
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          meridiem: "short",
          hour12: false,
        }}
        eventClick={(e) => handleClick(e.event.id)}
        timeZone="Asia/Tokyo"
        initialView="dayGridMonth"
      />
    </StyleWrapper>
  );
}
