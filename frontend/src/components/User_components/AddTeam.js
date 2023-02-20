import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../../styles/ChooseLeague.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function AddTeam({
  setTeamModalShow,
  TeamModalShow,
  setLeagueID,
  setShowChildModal,
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

  const closePopup = () => {
    setTeamModalShow(false);
  };

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

  const Submit = () => {
    setLeagueID(ChosenLeagueID);
    setShowChildModal(true);
    setTeamModalShow(false);
  };

  const SubmitSearch = () => {
    const userID = localStorage.getItem("userid")
    const teams = teamsIDs
    const data = { teams, userID };
    (async () => {
      await fetch(`/user/addFavourite/teams`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive",
          "Content-Length": 123,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });
    })();
    setTeamModalShow(false)
  }

  return (
    <>
      <Modal className="modal_2" show={TeamModalShow} onHide={closePopup}>
        <div className="League_selection">
          <h1 className="page_title">Choose a league</h1>
          {leagueArray.length === 0 ? (
            <h3>
              "Sorry, there are no movies with your current search options"
            </h3>
          ) : (
            leagueArray.map(renderCard)
          )}
          {<br></br>}
          {<br></br>}
          {<br></br>}
          <div className="Submit_button">
            <Button onClick={Submit}>Submit selection</Button>
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
            <Button onClick={SubmitSearch}>Add Team</Button>
          </div>
          {<br></br>}
          {<br></br>}
          {<br></br>}
        </div>
      </Modal>
    </>
  );
}
