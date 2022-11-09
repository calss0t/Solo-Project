import Nav from 'react-bootstrap/Nav'
import '../styles/Navbar.css';
import { useEffect, useState } from "react";
import logo from "../logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = (props) => {
  const { setNavState } = props;

  return (
    <>
    
      <div className="title-background">
        <img className="title" alt="saga logo" src={logo}  />
      </div>
      <Nav variant="tabs" className="nav justify-content-center" defaultActiveKey="#home">
        <Nav.Item className="nav-item">
          <Nav.Link onClick={() => {
            setNavState("Leagues")
          }}
          href="#Leagues">Leagues</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => {
            setNavState("Teams")
            }
          }
          href="#Teams">Teams</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => {
            setNavState("Profile")
            }
          } href="#Profile">Profile</Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
}

export default Navbar