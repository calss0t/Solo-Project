import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import "../../styles/ChooseLeague.css";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

export default function DeleteFavouriteLeague({
  favouriteLeaguesInfo,
  DeleteLeagueModalShow,
  setDeleteLeagueModalShow,
}) {
  const [ChosenLeagueID, setChosenLeagueID] = useState();

  const renderfavourites = (card) => {
    return (
      //   <Col id={card.id + "top"} key={card.id} className="League_card">
      //     <Image
      //       key={card.id}
      //       onClick={() => {
      //         document
      //           .getElementById(`${card.id}top`)
      //           .classList.toggle("League_card_selected");
      //         setChosenLeagueID(card.id);
      //       }}
      //       className="Favourite_teams_Pictures"
      //       src={card.badge}
      //     />
      //   </Col>
      <Col key={card.id}>
        <Card key={card.id} id={card.id + "top1"} className="Favourite_card">
          <Card.Img
            className="Favourite_teams_Pictures"
            alt={`${card.name} poster`}
            src={card.badge}
            onClick={() => {
                      document
                        .getElementById(`${card.id}top1`)
                        .classList.toggle("Favourite_card_selected");
                      setChosenLeagueID(card.id);
                    }}
          ></Card.Img>
          {<br></br>}
          <Card.Title className="Favourite_name">{card.name}</Card.Title>
        </Card>
        {/* <Image className="Favourite_teams_Pictures" src={card.badge} />
            {card.name} */}
      </Col>
    );
  };

  const Submit = () => {
    const userID = localStorage.getItem("userid");
    const leagueId = ChosenLeagueID;
    const data = { leagueId, userID };
    (async () => {
      await fetch("/user/deleteFavourite/League", {
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
    setDeleteLeagueModalShow(false);
  };

  return (
    <>
      <Modal
        className="modal_2"
        show={DeleteLeagueModalShow}
        onHide={() => setDeleteLeagueModalShow(false)}
      >
        <div className="League_selection">
          <h1 className="page_title">Choose the league you want to delete</h1>
          {favouriteLeaguesInfo === undefined ? (
            <h3>"First add a favourite league"</h3>
          ) : favouriteLeaguesInfo.length == 0 ? (
            <h3>"First add a favourite league"</h3>
          ) : (
            <Container>
              <Row>{favouriteLeaguesInfo.map(renderfavourites)}</Row>
            </Container>
          )}
          {<br></br>}
          {<br></br>}
          {<br></br>}
          <div className="Submit_button">
            <Button onClick={Submit}>Delete League</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
