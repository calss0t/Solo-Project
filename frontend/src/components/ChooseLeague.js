import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "../styles/ChooseLeague.css"

export default function ChooseLeague({ setLeagueID }) {
  const [leagueArray, setLeagueArray] = useState([]);

  useEffect(() => {
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
            setLeagueID(card.league_Id);
          }}
          className="League_Logo"
          alt={`${card.league_name} poster`}
          src={card.league_logo}
        ></Card.Img>
        <Card.Title
          onClick={() => {
            setLeagueID(card.league_Id);
          }}
          className="League_name"
        >
          {card.league_name}
        </Card.Title>
      </Card>
    );
  };

  return (
    <div className="League_selection">
      <h1 className="page_title">First choose a league</h1>
      {leagueArray.length == 0 ? <h3>"Sorry, there are no movies with your current search options"</h3> : leagueArray.map(renderCard)}
    </div>
  )


}
