import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../styles/SignIn_Register.css";
import validator from "email-validator";
import { Link } from "react-router-dom";


export default function Guest_SignIn_Register({ setLogInOrRegister }) {
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
      <>
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
              <Button as={Link} to="/User" variant="outline-primary" onClick={SignIn}>
                {" "}
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="League_selection">
      <div className="Form-container">
        <Form className="Auth-form">
          <Form.Group className="Auth-form-title">Register</Form.Group>
          <Form.Group>
            <div className="text-center">
              Already registered?{" "}
              <Button as={Link} to="/SignIn" onClick={changeAuthMode}>
                Sign In
              </Button>
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
          <Button as={Link} to="/User" variant="outline-primary" onClick={Register}>
            {" "}
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}
