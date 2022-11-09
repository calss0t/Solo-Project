import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import "../styles/FavouriteTeams.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

export default function FavouriteTeams({ teamsSelected, setNavState }) {
  const [games, setGames] = useState([]);

  useEffect(() => {
    // console.log(teamsSelected);
    // teamsSelected.forEach((teamID) => {
    //   fetch("/soccer/games", {
    //     headers: {
    //       teamID: teamID,
    //       date: "2022-11-09",
    //     },
    //   })
    //     .then((res) => res.json())
    //     .then((obj) => {
    //       games.push(obj);
    //     });
    // });
    // console.log(games);

    setGames([
      {
        FixtureID: 878072,
        status: {
          long: "Match Finished",
          short: "FT",
          elapsed: 90,
        },
        home: {
          id: 531,
          name: "Athletic Club",
          logo: "https://media.api-sports.io/football/teams/531.png",
          winner: true,
        },
        away: {
          id: 720,
          name: "Valladolid",
          logo: "https://media.api-sports.io/football/teams/720.png",
          winner: false,
        },
        goals: {
          home: 3,
          away: 0,
        },
      },
    ]);
  }, []);

  const renderGames = (game) => {
    return (
      <>
        <Container >
          <Row onClick={() => console.log(game.FixtureID)} className="Games-boxes">
            <Col className="Games-Teams-Home">
              {game.home.name}
              <Image className="Games-Teams-Pictures" src={game.home.logo} />
            </Col>
            <Col className="Games-Scores" xs lg="2">
              <h5>{game.goals.home} {game.status.short} {game.goals.away}</h5>
            </Col>
            <Col className="Games-Teams-Away">
              {game.away.name} <Image className="Games-Teams-Pictures" src={game.away.logo} />{" "}
            </Col>
          </Row>
        </Container>
      </>
    );
  };

  return (
    <div className="League_selection">
      <h1 className="page_title">Your games for today</h1>
      {games.map(renderGames)}
      {<br></br>}
      {<br></br>}
    </div>
  );
}
