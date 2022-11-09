import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "../styles/ChooseLeague.css";

export default function ChooseTeams(props) {
    const { leagueID , setTeamsSelected, setTeamsChosen, setNavState} = props;

  const [teamsArray, setTeamsArray] = useState([]);

  const [teams, setTeams ]= useState([])

  useEffect(() => {
    fetch("/soccer/teams", {
        headers: {
        "leagueID": leagueID
        }})
        .then(res => res.json())
        .then(arr => {
            setTeamsArray(arr)
        })
  }, []);

  const renderCard = (card) => {
    return (
      <Card key={card.id} className="League_card">
        <Card.Img
          onClick={() => {
            teams.push(card.id);
          }}
          className="League_Logo"
          alt={`${card.name} poster`}
          src={card.logo}
        ></Card.Img>
        <Card.Title
          onClick={() => {
            teams.push(card.id);
          }}
          className="League_name"
        >
          {card.name}
        </Card.Title>
      </Card>
    );
  };

  return (
    <div className="League_selection">
      <h1 className="page_title">Now choose up to 3 teams</h1>
      {teamsArray.length == 0 ? (
        <h3>"Loading, please wait"</h3>
      ) : (
        teamsArray.map(renderCard)
      )}
      {<br></br>}
      {<br></br>}
      <Button onClick={() => {setTeamsSelected(teams); setTeamsChosen(true); setNavState("")}}> Submit selection</Button>
    </div>
  );
}
