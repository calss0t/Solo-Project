import React, { useEffect, useState } from "react";
import "../../styles/TeamsGames.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import moment from "moment";
import Navbar from "../Navbar";

export default function TeamsGames({ teamsSelected }) {
  const [games, setGames] = useState([]);

  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  useEffect(() => {
    console.log(teamsSelected);
    console.log(date);
    fetch("/soccer/games", {
      headers: {
        teamIDs: teamsSelected,
        DateSelected: date,
      },
    })
      .then((res) => res.json())
      .then((arr) => {
        console.log(arr);
        setGames(arr);
      });
  }, [date]);

  const ShowModal = (prop) => {
    document.getElementById("game-modal").classList.remove("hidden");
    document.getElementById("myModal1").style.display = "block";
    let game = document.getElementById("wg-api-football-game");
    game.setAttribute("data-id", prop);
    document.getElementById("wg-api-football-game").classList.remove("hidden");
    window.document.dispatchEvent(
      new Event("DOMContentLoaded", {
        bubbles: true,
        cancelable: true,
      })
    );
  };

  const renderGames = (game) => {
    return (
      <Container key={game.FixtureID}>
        <Row
          onClick={() => {
            ShowModal(game.FixtureID);
          }}
          className="Games-boxes"
        >
          <Col className="Games-Teams-Home">
            {game.home.name}
            <Image className="Games-Teams-Pictures" src={game.home.logo} />
          </Col>
          <Col className="Games-Scores" xs lg="2">
            <h5>
              {game.goals.home} {game.status.short} {game.goals.away}
            </h5>
          </Col>
          <Col className="Games-Teams-Away">
            {game.away.name}{" "}
            <Image className="Games-Teams-Pictures" src={game.away.logo} />{" "}
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <>
      <Navbar />
      <div className="League_selection">
        <h1 className="page_title">
          Your games for {<br></br>} {date}
        </h1>
        {games.map(renderGames)}
        {<br></br>}
        {<br></br>}
        <div className="form">
          <h6>Choose another day</h6>
          <Form.Control
            type="date"
            name="date_of_birth"
            placeholder={date}
            value={date}
            onChange={(e) => {
              console.log(moment(e.target.value).format("YYYY-MM-DD"));
              setDate(moment(e.target.value).format("YYYY-MM-DD"));
            }}
          />
        </div>
      </div>
    </>
  );
}
