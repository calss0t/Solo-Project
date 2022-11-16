import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../styles/SignIn_Register.css";
import validator from "email-validator";
import { Link } from "react-router-dom";

import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

export default function SignIn_Register({ setLogInOrRegister, setNavState }) {
  let [authMode, setAuthMode] = useState("signin");

  const [emailSignIn, setEmailSignIn] = useState("");
  const [SignInPassword, setSignInPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPassword2, setRegisterPassword2] = useState("");

  // login info handlers
  function handleSignInEmail(e) {
    setEmailSignIn(e.target.value);
  }
  function handleSignInPassword(e) {
    setSignInPassword(e.target.value);
  }

  //Register info handlers
  function handleRegisterName(e) {
    setFirstName(e.target.value);
  }
  function handleRegisterEmail(e) {
    setRegisterEmail(e.target.value);
  }
  function handleRegisterPassword(e) {
    setRegisterPassword(e.target.value);
  }
  function handleRegisterPassword2(e) {
    setRegisterPassword2(e.target.value);
  }

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  const SignIn = () => {
    if (validator.validate(emailSignIn)) {
      const data = { emailSignIn, SignInPassword };
      (async () => {
        const rawResponse = await fetch(`/user/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            Connection: "keep-alive",
            "Content-Length": 123,
          },
          body: JSON.stringify(data),
        });
        const content = await rawResponse.json();
        if (content.token === undefined) {
          alert("invalid username or password");
        } else {
          localStorage.setItem("token", content.token);
          localStorage.setItem("userid", content.userid);
          setLogInOrRegister(true);
          setNavState("Profile");
        }
      })();
    } else {
      alert("Invalid email");
    }
  };

  const Register = () => {
    if (validator.validate(registerEmail)) {
      if (registerPassword === registerPassword2) {
        const data = { registerEmail, registerPassword, firstName };
        (async () => {
          const rawResponse = await fetch(`/user/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "*/*",
              "Accept-Encoding": "gzip, deflate, br",
              Connection: "keep-alive",
              "Content-Length": 123,
            },
            body: JSON.stringify(data),
          });
          const content = await rawResponse.json();

          localStorage.setItem("token", content.token);
          localStorage.setItem("userid", content.userid);
          setLogInOrRegister(true);
          setNavState("Profile");
        })();
      } else {
        alert("Passwords don't match");
      }
    } else {
      alert("Invalid email");
    }
  };

  if (authMode === "signin") {
    return (
      <div className="League_selection">
        <div className="Form-container">
          <Form className="Auth-form">
            <Form.Group className="Auth-form-title">Sign In</Form.Group>
            <Form.Group>
              <div className="text-center">
                Not registered yet?{" "}
                <Button as={Link} to="/Register" onClick={changeAuthMode}>
                  Register
                </Button>
              </div>
            </Form.Group>
            <Form.Group id="SignInEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                value={emailSignIn}
                onChange={handleSignInEmail}
                placeholder="Enter email"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group id="SignInPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                value={SignInPassword}
                onChange={handleSignInPassword}
              />
            </Form.Group>
            <Button variant="outline-primary" onClick={SignIn}>
              {" "}
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }

  return (
    <section className="h-100 gradient-custom-2">
      <div className="container py-5 h-100">
        {" "}
        {/* Set distance from the top and bottom and sides*/}
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div>
            {/* Set distance from the sides*/}
            <div className="card">
              <div
                className="rounded-top text-white d-flex flex-row"
                style={{ backgroundColor: "#000", height: "200px" }}
              >
                <div
                  className="ms-4 mt-5 d-flex flex-column"
                  style={{ width: "150px" }}
                >
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                    alt="Generic placeholder image"
                    className="img-fluid img-thumbnail mt-4 mb-2"
                    style={{ width: "150px", zIndex: "1" }}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-dark"
                    data-mdb-ripple-color="dark"
                    style={{ zIndex: "1" }}
                  >
                    Edit profile
                  </button>
                </div>
                <div className="ms-3" style={{ marginTop: "130px" }}>
                  <h5>Andy Horwitz</h5>
                  <p>New York</p>
                </div>
              </div>
              <div
                className="p-4 text-black"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <p className="mb-1 h5">253</p>
                    <p className="small text-muted mb-0">Photos</p>
                  </div>
                  <div className="px-3">
                    <p className="mb-1 h5">1026</p>
                    <p className="small text-muted mb-0">Followers</p>
                  </div>
                  <div>
                    <p className="mb-1 h5">478</p>
                    <p className="small text-muted mb-0">Following</p>
                  </div>
                </div>
              </div>
              <div className="card-body p-4 text-black">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">About</p>
                  <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                    <p className="font-italic mb-1">Web Developer</p>
                    <p className="font-italic mb-1">Lives in New York</p>
                    <p className="font-italic mb-0">Photographer</p>
                  </div>
                </div>

                <FullCalendar
                  plugins={[dayGridPlugin]}
                  headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth timeGridWeek timeGridDay",
                  }}
                  initialView="dayGridMonth"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
  {
    /* <div className="League_selection">
      <div className="Form-container">
        <Form className="Auth-form">
          <Form.Group className="Auth-form-title">Register</Form.Group>
          <Form.Group>
            <div className="text-center">
              Already registered?{" "}
              <Button as={Link} to="/SignIn" onClick={changeAuthMode}>Sign In</Button>
            </div>
          </Form.Group>
          <Form.Group id="FirstName" className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              required
              value={firstName}
              onChange={handleRegisterName}
              type="email"
              placeholder="e.g Jane Doe"
            />
          </Form.Group>
          <Form.Group id="RegsiterEmail" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              value={registerEmail}
              onChange={handleRegisterEmail}
              type="email"
              placeholder="Email Address"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group id="registerPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              value={registerPassword}
              onChange={handleRegisterPassword}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group id="registerPassword2" className="mb-3">
            <Form.Label>Confrim Password</Form.Label>
            <Form.Control
              required
              value={registerPassword2}
              onChange={handleRegisterPassword2}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button variant="outline-primary" onClick={Register}>
            {" "}
            Submit
          </Button>
        </Form>
      </div>
    </div> */
  }
}
