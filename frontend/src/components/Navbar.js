import Nav from 'react-bootstrap/Nav'
import '../styles/Navbar.css';
import { useEffect, useState } from "react";
import logo from "../heroPic.jpg";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = (props) => {
  const { setNavState, setLeagueID, setLeagueChosen, setTeamsSelected, setTeamsChosen } = props;

  return (
    <>
    
      <div className="title-background">
        <img className="title" alt="saga logo" src={logo}  />
      </div>
      <Nav variant="tabs" className="nav justify-content-center" defaultActiveKey="#home">
        <Nav.Item className="nav-item">
          <Nav.Link onClick={() => {
            setNavState("Leagues")
            setLeagueID(undefined)
            setLeagueChosen(false)
            setTeamsSelected([])
            setTeamsChosen(false)
          }}
          href="#Leagues">Leagues</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => {
            setNavState("Teams")
            setLeagueID(undefined)
            setLeagueChosen(false)
            setTeamsSelected([])
            setTeamsChosen(false)
            }
          }
          href="#Teams">Teams</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => {
            setNavState("Profile")
            setLeagueID(undefined)
            setLeagueChosen(false)
            setTeamsSelected([])
            setTeamsChosen(false)
            }
          } href="#Profile">Profile</Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
}

export default Navbar