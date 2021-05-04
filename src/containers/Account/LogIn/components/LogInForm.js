import React, { useState } from "react";
import { Button, Input } from "reactstrap";
import EyeIcon from "mdi-react/EyeIcon";
import KeyVariantIcon from "mdi-react/KeyVariantIcon";
import AccountOutlineIcon from "mdi-react/AccountOutlineIcon";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import url from "../../../../url.json";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import isEmail from "validator/lib/isEmail";
import ReactGA from 'react-ga';

const LogInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [auth, setAuth] = useState();

  const submitForm = e => {
    e.preventDefault();
    if (username.length < 3 || password.length < 4) {
      toast.error("Invalid username or password", {
        position: toast.POSITION.TOP_CENTER
      });
    } else {
      axios
        .post(url.url.concat("login"), {
          username: username,
          password: password,
          email: isEmail(username)
        })
        .then(function(response) {
          try {
            if (response.data.token === "invalid") {
              setAuth(false);
              toast.warn("Incorrect username or password!", {
                position: toast.POSITION.TOP_CENTER
              });
            } else {
              var token = localStorage.getItem("zx59ead7fd");
              if (localStorage.getItem("zx59ead7fd") === null) {
                localStorage.setItem("zx59ead7fd", response.data.token);
              }
              ReactGA.event({
                category: 'Login',
                action: 'Loged in,  '+jwt_decode(token)["username"]
              })
              toast.info("Welcome " + jwt_decode(token)["username"], {
                position: toast.POSITION.TOP_CENTER
              });
              setAuth(true);
            }
          } catch {
            setAuth(false);
          }
        })
        .catch(function(error) {
          toast.error("" + error, {
            position: toast.POSITION.TOP_CENTER
          });
        });
    }
  };

  const showPassword = e => {
    e.preventDefault();
    setShow(!show);
  };

  return (
    <div>
      {auth ? (
        <Redirect to="/" />
      ) : (
        <div>
          <form className="form" onSubmit={submitForm}>
            <span className="form__form-group-label"></span>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <AccountOutlineIcon />
              </div>
              <div className="form__form-group">
                <Input
                  name="username"
                  component="input"
                  type="text"
                  placeholder="Username or Email"
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
            </div>

            <span className="form__form-group-label"></span>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <KeyVariantIcon />
              </div>
              <div className="form__form-group">
                <Input
                  name="password"
                  component="input"
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <button
                type="button"
                className={`form__form-group-button${show ? " active" : ""}`}
                onClick={e => showPassword(e)}
              >
                <EyeIcon />
              </button>
            </div>
            <div className="account__btns" style={{ marginTop: "20px" }}>
              <Button type="submit" className="btn btn-primary account__btn">
                <span style={{ color: "white" }}>Log In</span>
              </Button>
            </div>
          </form>
          <div style={{ marginTop: "7px" }}>
            <Link push to="/reset">
              Forgot a password?
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogInForm;
