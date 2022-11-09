import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";
import "../styles/ChooseLeague.css"

export default function ChooseLeagueTeams({ setLeagueID , setLeagueChosen, setNavState}) {
  const [leagueArray, setLeagueArray] = useState([]);

  const [ChosenLeagueID, setChosenLeagueID] = useState([])

  useEffect(() => {
    console.log(setLeagueID)
    fetch("/soccer/leagues")
      .then((res) => res.json())
      .then((arr) => {
        console.log(arr);
        setLeagueArray(arr);
      });
  }, []);

  const renderCard = (card) => {
    return (
      <Card key={card.league_Id} className="League_card">
        <Card.Img
          onClick={() => {
            console.log(card.league_Id)
            setChosenLeagueID(card.league_Id);
          }}
          className="League_Logo"
          alt={`${card.league_name} poster`}
          src={card.league_logo}
        ></Card.Img>
        <Card.Title
          onClick={() => {
            setChosenLeagueID(card.league_Id)
          }}
          className="League_name"
        >
          {card.league_name}
        </Card.Title>
      </Card>
    );
  };

  const Submit = () => {
    setLeagueID(ChosenLeagueID)
    setLeagueChosen(true)
    setNavState("Teams")

    // for (let i = 0; i<leagueIDs.length; i++){
    //   let standings = document.getElementsByName(`league ${i + 1}`);
    //   console.log(standings)
    //   standings[0].setAttribute("data-league", leagueIDs[i]);
    //   standings[0].classList.remove("hidden");
    //   window.document.dispatchEvent(
    //     new Event("DOMContentLoaded", {
    //       bubbles: true,
    //       cancelable: true,
    //     })
    //   );
    // }
  }

  return (
    <div className="League_selection">
      <h1 className="page_title">First choose a league</h1>
      {leagueArray.length == 0 ? <h3>"Sorry, there are no movies with your current search options"</h3> : leagueArray.map(renderCard)}
      {<br></br>}
      {<br></br>}
      <Button onClick={Submit}> Submit selection</Button>
    </div>
  )


}
