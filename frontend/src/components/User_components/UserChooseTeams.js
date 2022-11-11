import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "../../styles/ChooseLeague.css";

export default function UserChooseTeams(props) {
  const { leagueID, setUserTeamsSelected, setUserTeamsChosen, setNavState } =
    props;

  const [teamsArray, setTeamsArray] = useState([]);

  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch("/soccer/teams", {
      headers: {
        leagueID: leagueID,
      },
    })
      .then((res) => res.json())
      .then((arr) => {
        console.log(arr)
        setTeamsArray(arr);
      });
  }, []);

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

  const submit = () => {
    const userID = localStorage.getItem("userid")
    const data = { teams, userID };
    (async () => {
        await fetch(`/user/favouriteTeams`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            Connection: "keep-alive",
            "Content-Length": 123,
          },
          body: JSON.stringify(data),
        });
      })();

    setUserTeamsSelected(teams);
    setUserTeamsChosen(true);
    setNavState("Profile");
  };

  return (
    <div className="League_selection">
      <h1 className="page_title">Now choose your favourite teams teams</h1>
      {teamsArray.length === 0 ? (
        <h3>"Loading, please wait"</h3>
      ) : (
        teamsArray.map(renderCard)
      )}
      {<br></br>}
      {<br></br>}
      {<br></br>}
      {<br></br>}
      <div className="Submit_button">
        <Button onClick={submit}> Submit selection</Button>
      </div>
    </div>
  );
}
