import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../../styles/ChooseLeague.css";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";


export default function ChooseLeagueTeams({
  setLeagueID,
  setLeagueChosen,
  setNavState,
  setTeamsSelected
}) {
  const [leagueArray, setLeagueArray] = useState([]);

  const [ChosenLeagueID, setChosenLeagueID] = useState([]);

  
  const [searchBar, setsearchBar] = useState("");

  const [SearchDisplay, setSearchDisplay] = useState(false);
  const [searchedTeams, setSearchedTeams] = useState([])

  const [teamsIDs, setTeamsIDs] = useState([]);



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
        key={card.league_Id}
        id={card.league_Id + "top"}
        className="League_card"
      >
        <Card.Img
          onClick={() => {
            document
              .getElementById(`${card.league_Id}top`)
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
              .getElementById(`${card.league_Id}top`)
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
    setLeagueID(ChosenLeagueID);
    setLeagueChosen(true);
    setNavState("Teams");
  };

  
  const renderSearch = (card) => {
    return (
      <Card key={card.id} id={card.id + "top"} className="League_card">
        <Card.Img
          onClick={() => {
            document
              .getElementById(`${card.id}top`)
              .classList.toggle("League_card_selected");
              teamsIDs.push(card.id);
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
              teamsIDs.push(card.id);
          }}
          className="League_name"
        >
          {card.name}
        </Card.Title>
      </Card>
    );
  };

  const Search = async () => {
    await fetch("/user/Search/Teams", {
      headers: {
        teamName: searchBar,
      },
    })
      .then((res) => res.json())
      .then((arr) => {
        setSearchedTeams(arr)
      });
  };

  const SubmitSearch = () => {
    setTeamsSelected(teamsIDs)
  }

  return (
    <>
      <Navbar />
      <div className="League_selection">
        <h1 className="page_title">First choose a league</h1>
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
          <Button as={Link} to="/Guest/Teams/SelectTeam" className="button" onClick={Submit}>
            {" "}
            Submit selection
          </Button>
        </div>
        {<br></br>}
          {<br></br>}
          <h1 className="page_title">Or search your for team directly here</h1>
          <InputGroup className="mb-3">
            <Form.Control
              type="search"
              name="search_team"
              placeholder="Search for your favourite team"
              value={searchBar}
              onChange={(e) => {
                setsearchBar(e.target.value);
              }}
            />
            <InputGroup.Text
              className="search_button"
              onClick={() => {
                setSearchDisplay(true);
                Search()
              }}
            >
              Search
            </InputGroup.Text>
          </InputGroup>
          {<br></br>}
          {<br></br>}
          {<br></br>}
          {SearchDisplay === true && searchedTeams.map(renderSearch)}
          {<br></br>}
          {<br></br>}
          {<br></br>}
          <div className="Submit_button">
            <Button as={Link} to="/Guest/calendar" onClick={SubmitSearch}>Go to Calendar</Button>
          </div>
          {<br></br>}
          {<br></br>}
          {<br></br>}
        </div>
    </>
  );
}
