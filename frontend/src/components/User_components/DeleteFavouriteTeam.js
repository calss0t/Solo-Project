import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import "../../styles/ChooseLeague.css";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

export default function DeleteFavouriteTeam({
    favouriteTeamsInfo,
    DeleteTeamModalShow,
    setDeleteTeamModalShow,
}) {
  const [ChosenTeamID, setChosenTeamID] = useState();
  
  const renderfavourites = (card) => {
    return (
      <Col  id={card.id + "top"} key={card.id} className="League_card">
        <Image  key={card.id} onClick={() => {
        document
          .getElementById(`${card.id}top`)
          .classList.toggle("League_card_selected");
          setChosenTeamID(card.id);
      }} className="Favourite_teams_Pictures" src={card.badge} />
      </Col>
    );
  };

  const Submit = () => {
    const userID = localStorage.getItem("userid");
    const teamId = ChosenTeamID;
    const data = { teamId, userID };
    (async () => {
      await fetch("/user/deleteFavourite/Team", {
        method: "PUT",
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
    setDeleteTeamModalShow(false);
  };

  return (
    <>
      <Modal
        className="modal_2"
        show={DeleteTeamModalShow}
        onHide={() => setDeleteTeamModalShow(false)}
      >
        <div className="League_selection">
          <h1 className="page_title">Choose the team you want to delete</h1>
          {favouriteTeamsInfo === undefined ? (
            <h3>"First add a favourite league"</h3>
          ) : favouriteTeamsInfo.length == 0 ? (
            <h3>"First add a favourite league"</h3>
          ) : (
            <Container>
              <Row>{favouriteTeamsInfo.map(renderfavourites)}</Row>
            </Container>
          )}
          {<br></br>}
          {<br></br>}
          {<br></br>}
          <div className="Submit_button">
            <Button onClick={Submit}>Delete Team</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
