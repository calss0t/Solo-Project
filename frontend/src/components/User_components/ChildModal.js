import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../../styles/ChooseLeague.css";
import Modal from "react-bootstrap/Modal";

export default function ChildModal({ leagueId, ShowChildModal, setShowChildModal }) {

  const [teamsArray, setTeamsArray] = useState([]);

  const [teamsIDs, setTeamsIDs] = useState([]);


  useEffect(() => {
    if(ShowChildModal===true){
      fetch("/soccer/teams", {
        headers: {
          leagueID: leagueId,
        },
      })
        .then((res) => res.json())
        .then((arr) => {
          setTeamsArray(arr);
        });
    }
  }, [leagueId, ShowChildModal]);

  const closePopup = () => {
    setShowChildModal(false);
  };


  const renderCard = (card) => {
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

  function submit() {
    console.log(teamsIDs)
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
    setShowChildModal(false);
  }


  return (
    <>
      <Modal className="modal_2" show={ShowChildModal} onHide={closePopup}>
        <div className="League_selection">
          <h1 className="page_title">Now choose a teams</h1>
          {teamsArray.length == 0 ? (
            <h3>Loading, please wait</h3>
          ) : (
            teamsArray.map(renderCard)
          )}
          {<br></br>}
          {<br></br>}
          {<br></br>}
          {<br></br>}
          <div className="Submit_button">
            <Button className="button" onClick={submit}>
              Submit selection
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
