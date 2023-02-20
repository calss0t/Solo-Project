import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../../styles/ChooseLeague.css";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";


export default function ChooseLeague({ setLeagueIDLeagueBar }) {
  const [leagueArray, setLeagueArray] = useState([]);

  const [ChosenLeagueID, setChosenLeagueID] = useState([]);

  useEffect(() => {
    fetch("/soccer/leagues")
      .then((res) => res.json())
      .then((arr) => {
        setLeagueArray(arr);
      });
  }, []);

  const renderCard = (card) => {
    return (
      <Card
        key={card.League_Id_TheSportsDB}
        id={card.League_Id_TheSportsDB + "top"}
        className="League_card"
      >
        <Card.Img
          onClick={() => {
            document
              .getElementById(`${card.League_Id_TheSportsDB}top`)
              .classList.toggle("League_card_selected");
            setChosenLeagueID(card.League_Id_TheSportsDB);
          }}
          className="League_Logo"
          alt={`${card.league_name} poster`}
          src={card.league_logo}
        ></Card.Img>
        {<br></br>}
        <Card.Title
          onClick={() => {
            document
              .getElementById(`${card.League_Id_TheSportsDB}top`)
              .classList.toggle("League_card_selected");
            setChosenLeagueID(card.League_Id_TheSportsDB);
          }}
          className="League_name"
        >
          {card.league_name}
        </Card.Title>
      </Card>
    );
  };

  const Submit = () => {
    setLeagueIDLeagueBar(ChosenLeagueID)
  };

  return (
    <>
      <Navbar />
      <div className="League_selection">
        <h1 className="page_title">Choose a league to see the games</h1>
        {leagueArray.length === 0 ? (
          <h3>"Sorry, there are no movies with your current search options"</h3>
        ) : (
          leagueArray.map(renderCard)
        )}
        {<br></br>}
        {<br></br>}
        {<br></br>}
        {<br></br>}
        <div className="Submit_button">
          <Button className="button" as={Link} to="/Guest/calendar" onClick={Submit}>
            {" "}
            Go to Calendar
          </Button>
        </div>
      </div>
    </>
  );
}
