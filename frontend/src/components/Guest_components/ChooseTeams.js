import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "../../styles/ChooseLeague.css";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";


export default function ChooseTeams(props) {
  const { leagueID, setTeamsSelected, } = props;

  const [teamsArray, setTeamsArray] = useState([]);

  const [teams, setTeams] = useState([]);


  useEffect(() => {
    if (leagueID !== undefined) {
      if (leagueID.length >= 1) {
        fetch("/soccer/teams", {
          headers: {
            leagueID: leagueID,
          },
        })
          .then((res) => res.json())
          .then((arr) => {
            setTeamsArray(arr);
          });
      }}
  }, [leagueID]);

  const renderCard = (card) => {
    return (
      <Card key={card.id} id={card.id + "top"} className="League_card">
        <Card.Img
          onClick={() => {
            document
              .getElementById(`${card.id}top`)
              .classList.toggle("League_card_selected");
            teams.push(card.id);
          }}
          className="League_Logo"
          alt={`${card.name} poster`}
          src={card.logo}
        ></Card.Img>
        {<br></br>}
        <Card.Title
          onClick={() => {
            document
              .getElementById(`${card.id}top`)
              .classList.toggle("League_card_selected");
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
    <>
      <Navbar />
      <div className="League_selection">
        <h1 className="page_title">Now choose the teams</h1>
        {teamsArray.length === 0 ? (
          <h3>Loading, please wait</h3>
        ) : (
          teamsArray.map(renderCard)
        )}
        {<br></br>}
        {<br></br>}
        {<br></br>}
        {<br></br>}
        <div className="Submit_button">
          <Button as={Link} to="/Guest/calendar"
            className="button"
            onClick={() => {
              setTeamsSelected(teams);
              // setTeamsChosen(true);
              // setNavState("Teams");
            }}
          >
            {" "}
            Submit selection
          </Button>
        </div>
       </div>
    </>
  );
}
