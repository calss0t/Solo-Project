import React, { useEffect, useState } from "react";
import "../../styles/SignIn_Register.css";
import { Link, Route, Routes } from "react-router-dom";
import Background from "../../heroPic.jpg";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import CalendarView from "./CalendarView";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";


import DeleteFavouriteLeague from "./DeleteFavouriteLeague";
import DeleteFavouriteTeam from "./DeleteFavouriteTeam";

import AddLeague from "./AddLeague";
import AddTeam from "./AddTeam";
import ChildModal from "./ChildModal";

export default function Profile({ props }) {
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });
  const [numTeamsFollowing, setNumTeamsFollowing] = useState(0);
  const [numLeaguesFollowing, setNumLeaguesFollowing] = useState(0);
  const [favouriteTeams, setFavouriteTeams] = useState(undefined);
  const [favouriteLeagues, setFavouriteLeagues] = useState(undefined);

  const [leagueModalShow, setLeagueModalShow] = useState(false);
  const [TeamModalShow, setTeamModalShow] = useState(false);

  const [DeleteLeagueModalShow, setDeleteLeagueModalShow] = useState(false);
  const [DeleteTeamModalShow, setDeleteTeamModalShow] = useState(false);

  const [leagueId, setLeagueID] = useState();
  const [favouriteLeaguesInfo, setFavouriteLeaguesInfo] = useState([]);
  const [favouriteTeamsInfo, setFavouriteTeamsInfo] = useState([]);

  const [ShowChildModal, setShowChildModal] = useState(false);

  //Fetch user info, fav leagues and fav teams
  useEffect(() => {
    console.log(leagueId);
    const userID = localStorage.getItem("userid");
    fetch("/user/Info", {
      headers: {
        userID: userID,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => setUserInfo(result[0]));

    fetch("/user/Teams", {
      headers: {
        userID: userID,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(
      (res) => {
        if (res.status === 200) {
          res.json().then((arr) => {
            setNumTeamsFollowing(arr.length);
            setFavouriteTeams(arr);
          });
        } else {
          setFavouriteTeams([]);
          setNumTeamsFollowing(0);
        }
      },
      [userID]
    );

    fetch("/user/Leagues", {
      headers: {
        userID: userID,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((arr) => {
          setNumLeaguesFollowing(arr.length);
          setFavouriteLeagues(arr);
        });
      } else {
        setFavouriteLeagues([]);
        setNumLeaguesFollowing(0);
      }
    });
  }, []);

  //Fetch the leagues and teams logos and information
  useEffect(() => {
    fetch("/user/favourites/Leagues/Info", {
      headers: {
        leagues: favouriteLeagues,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        if (result.length >= 1) {
          setFavouriteLeaguesInfo(result);
        } else {
          setFavouriteLeaguesInfo([]);
        }
      });

    fetch("/user/favourites/Teams/Info", {
      headers: {
        teams: favouriteTeams,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        if (result.length >= 1) {
          setFavouriteTeamsInfo(result);
        } else {
          setFavouriteTeamsInfo([]);
        }
      });
  }, [favouriteLeagues, favouriteTeams]);

  const AddLeaguefunction = () => {
    setLeagueModalShow(true);
  };

  const DeleteLeaguefunction = () => {
    setDeleteLeagueModalShow(true);
  };

  const AddTeamfunction = () => {
    setTeamModalShow(true);
  };

  const DeleteTeamfunction = () => {
    setDeleteTeamModalShow(true);
  };

  const renderfavourites = (card) => {
    return (
      <Col key={card.id}>
        <Card key={card.id} id={card.id + "top"} className="Favourite_card">
          <Card.Img
            className="Favourite_teams_Pictures"
            alt={`${card.name} poster`}
            src={card.badge}
          ></Card.Img>
          {<br></br>}
          <Card.Title className="Favourite_name">{card.name}</Card.Title>
        </Card>
        {/* <Image className="Favourite_teams_Pictures" src={card.badge} />
        {card.name} */}
      </Col>
    );
  };

  return (
    <>
      <div>
        <div>
          <div>
            <div>
              <div
                style={{
                  backgroundImage: `url(${Background})`,
                  height: "250px",
                }}
              >
                <div>
                  <img
                    src="https://pbs.twimg.com/media/E8bU5ubVUAYwf2N.jpg"
                    alt="Generic placeholder image"
                    className="img-fluid img-thumbnail mt-4 mb-2"
                    style={{ width: "200px", margin: "20px", height: "150px" }}
                  />
                </div>
                <div className="ms-3" style={{ marginTop: "90px" }}>
                  <h5>{userInfo.name}</h5>
                  <p>{userInfo.email}</p>
                </div>
              </div>
              <div
                className="p-4 text-black"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <p className="mb-1 h5">{numLeaguesFollowing}</p>
                    <p className="small text-muted mb-0">Leagues Following</p>
                  </div>
                  <div className="px-3">
                    <p className="mb-1 h5">{numTeamsFollowing}</p>
                    <p className="small text-muted mb-0">Teams Following</p>
                  </div>
                </div>
              </div>
              <div className="card-body p-4 text-black">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">Favourite Leagues</p>
                  <Container>
                    <Row>{favouriteLeaguesInfo.map(renderfavourites)}</Row>
                  </Container>
                  <Stack direction="horizontal" gap={5}>
                  <Button variant="outline-primary"
                      as={Link}
                      to="/User/Addleague"
                      onClick={() => {
                        AddLeaguefunction();
                      }}
                    >
                      {" "}
                      Add a league
                    </Button>
                    <Button variant="outline-primary"
                      as={Link}
                      to="/User/DeleteLeague"
                      onClick={() => {
                        DeleteLeaguefunction();
                      }}
                    >
                      {" "}
                      Delete a league
                    </Button>
                  </Stack>
                  <p></p>
                  <p className="lead fw-normal mb-1">Favourite Teams</p>
                  <Container>
                    <Row>{favouriteTeamsInfo.map(renderfavourites)}</Row>
                  </Container>
                  <Stack direction="horizontal" gap={5}>
                  <Button variant="outline-primary"
                    onClick={() => {
                      AddTeamfunction();
                    }}
                  >
                    {" "}
                    Add a team
                  </Button>
                  <Button variant="outline-primary"
                    as={Link}
                    to="/User/DeleteTeam"
                    onClick={() => {
                      DeleteTeamfunction();
                    }}
                  >
                    {" "}
                    Delete a team
                  </Button>
                  </Stack>
                </div>

                <CalendarView
                  favouriteLeagues={favouriteLeagues}
                  favouriteTeams={favouriteTeams}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddLeague show={leagueModalShow} setShow={setLeagueModalShow} />

      <DeleteFavouriteLeague
        favouriteLeaguesInfo={favouriteLeaguesInfo}
        DeleteLeagueModalShow={DeleteLeagueModalShow}
        setDeleteLeagueModalShow={setDeleteLeagueModalShow}
      />

      <DeleteFavouriteTeam
        favouriteTeamsInfo={favouriteTeamsInfo}
        DeleteTeamModalShow={DeleteTeamModalShow}
        setDeleteTeamModalShow={setDeleteTeamModalShow}
      />

      <AddTeam
        setShowChildModal={setShowChildModal}
        setLeagueID={setLeagueID}
        TeamModalShow={TeamModalShow}
        setTeamModalShow={setTeamModalShow}
      />

      <ChildModal
        leagueId={leagueId}
        setShowChildModal={setShowChildModal}
        ShowChildModal={ShowChildModal}
      />
    </>
  );
}
