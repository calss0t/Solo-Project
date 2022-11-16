import Nav from "react-bootstrap/Nav";
import "../styles/Navbar.css";
import { useEffect, useState } from "react";
import logo from "../heroPic.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Guest_SignIn_Register from "./Guest_components/Guest_SignIn_Register";



const Navbar = (props) => {
  const {
    setNavState,
    setLeagueID,
    setLeagueChosen,
    setTeamsSelected,
    setTeamsChosen,
    setLogInOrRegister,
  } = props;

  const location = useLocation();

  console.log(setLogInOrRegister)


  const activeKey = location.pathname === "/" ? "/projects" : location.pathname;

  return (
    <>
      <div className="title-background">
        <img className="title" alt="saga logo" src={logo} />
        <Button
          className="float-end"
          size="lg"
          variant="dark"
          as={Link}
          to="/SignIn"
          onClick={() =>
            setNavState(
              <Guest_SignIn_Register
                setLogInOrRegister={setLogInOrRegister}
              />
            )
          }
        >
          Log In or Register
        </Button>
      </div>
      <Nav
        activeKey={activeKey}
        variant="tabs"
        className="nav justify-content-center"
      >
        <Nav.Item className="nav-item">
          <Nav.Link
            as={Link}
            to="/Guest/Leagues"
            onClick={() => {
              setNavState("Leagues");
              setLeagueID(undefined);
              setLeagueChosen(false);
              setTeamsSelected([]);
              setTeamsChosen(false);
            }}
          >
            Leagues
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={Link}
            to="/Guest/Teams"
            onClick={() => {
              setNavState("Teams");
              setLeagueID(undefined);
              setLeagueChosen(false);
              setTeamsSelected([]);
              setTeamsChosen(false);
            }}
          >
            Teams
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default Navbar;
