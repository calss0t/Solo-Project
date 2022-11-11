import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/SignIn_Register.css";

export default function SignIn_Register(props) {
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
    console.log(emailSignIn, SignInPassword);
  };

  const Register = () => {
    console.log(firstName, registerEmail, registerPassword, registerPassword2);
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
                <Button onClick={changeAuthMode}>Register</Button>
              </div>
            </Form.Group>
            <Form.Group
              required
              id="SignInEmail"
              label="Sign In Email"
              value={emailSignIn}
              onChange={handleSignInEmail}
              className="mb-3"
            >
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group
              required
              id="SignInPassword"
              label="Sign In Password"
              value={SignInPassword}
              onChange={handleSignInPassword}
              className="mb-3"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
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
    <div className="League_selection">
      <div className="Form-container">
        <Form className="Auth-form">
          <Form.Group className="Auth-form-title">Register</Form.Group>
          <Form.Group>
            <div className="text-center">
              Already registered?{" "}
              <Button onClick={changeAuthMode}>Sign In</Button>
            </div>
          </Form.Group>
          <Form.Group
            required
            id="FirstName"
            label="First Name"
            value={firstName}
            onChange={handleRegisterName}
            className="mb-3"
          >
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="email" placeholder="e.g Jane Doe" />
          </Form.Group>
          <Form.Group
            required
            id="RegsiterEmail"
            label="Register Email"
            value={registerEmail}
            onChange={handleRegisterEmail}
            className="mb-3"
          >
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Email Address" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group
            required
            id="registerPassword"
            label="register password"
            value={registerPassword}
            onChange={handleRegisterPassword}
            className="mb-3"
          >
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group
            required
            id="registerPassword2"
            label="register password 2"
            value={registerPassword2}
            onChange={handleRegisterPassword2}
            className="mb-3"
          >
            <Form.Label>Confrim Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="outline-primary" onClick={Register}>
            {" "}
            Submit
          </Button>
        </Form>
      </div>
    </div>

    // <div className="Form-container">
    //   <form className="Auth-form">
    //     <div className="Auth-form-content">
    //       <h3 className="Auth-form-title">Sign In</h3>
    //       <div className="text-center">
    //         Already registered?{" "}
    //         <Button onClick={changeAuthMode}>Sign In</Button>
    //       </div>
    //       <div className="form-group mt-3">
    //         <label>Full Name</label>
    //         <input
    //           type="email"
    //           className="form-control mt-1"
    //           placeholder="e.g Jane Doe"
    //         />
    //       </div>
    //       <div className="form-group mt-3">
    //         <label>Email address</label>
    //         <input
    //           type="email"
    //           className="form-control mt-1"
    //           placeholder="Email Address"
    //         />
    //       </div>
    //       <div className="form-group mt-3">
    //         <label>Password</label>
    //         <input
    //           type="password"
    //           className="form-control mt-1"
    //           placeholder="Password"
    //         />
    //       </div>
    //       {<br></br>}
    //       <Button variant="outline-primary" onClick={() => console.log("test")}>
    //         {" "}
    //         Submit
    //       </Button>
    //     </div>
    //   </form>
    // </div>
  );
}
