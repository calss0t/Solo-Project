import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../../styles/ChooseLeague.css";
import Modal from "react-bootstrap/Modal";



export default function AddLeague({
  setLeagueID,
  setUserLeagueChosen,
  setShow,
  show
}) {
  const [leagueArray, setLeagueArray] = useState([]);

  const [ChosenLeagueID, setChosenLeagueID] = useState([]);

  useEffect(() => {
    fetch("/soccer/leagues")
      .then((res) => res.json())
      .then((arr) => {
        setLeagueArray(arr);
      });
  }, []);

  const closePopup = () => {
    setShow(false)
  }  

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
            setChosenLeagueID(card.league_Id);
          }}
          className="League_Logo"
          alt={`${card.league_name} poster`}
          src={card.league_logo}
        ></Card.Img>
        <Card.Title
          onClick={() => {
            document
              .getElementById(`${card.league_Id}top`)
              .classList.toggle("League_card_selected");
            setChosenLeagueID(card.league_Id);
          }}
          className="League_name"
        >
          {card.league_name}
        </Card.Title>
      </Card>
    );
  };

  const Submit = () => {
    // const userID = localStorage.getItem("userid")
    // const data = { teams, userID };
    // (async () => {
    //     await fetch(`/user/favouriteTeams`, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Accept: "*/*",
    //         "Accept-Encoding": "gzip, deflate, br",
    //         Connection: "keep-alive",
    //         "Content-Length": 123,
    //       },
    //       body: JSON.stringify(data),
    //     });
    //   })();
    setShow(false)
  };

  return (
    <Modal className="modal_2" show={show} onHide={closePopup} keyboard={false}>
      <div className="League_selection">
        <h1 className="page_title">Choose a league</h1>
        {leagueArray.length == 0 ? (
          <h3>"Sorry, there are no movies with your current search options"</h3>
        ) : (
          leagueArray.map(renderCard)
        )}
        {<br></br>}
        {<br></br>}
        {<br></br>}
        <div className="Submit_button">
          <Button onClick={Submit}>Submit selection</Button>
        </div>
      </div>
    </Modal>
  );
}
