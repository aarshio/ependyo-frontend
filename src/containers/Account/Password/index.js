import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { Input } from "reactstrap";
import { toast } from "react-toastify";
import axios from "axios";
import url from "../../../url.json";
import ReactGA from 'react-ga';

const Password = () => {
  const [auth, setAuth] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("zx59ead7fd") !== null) {
      setAuth(true);
    }
  }, [auth, setAuth]);

  const submit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        position: toast.POSITION.TOP_CENTER
      });
    } else {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      axios
        .post(url.url.concat("password"), {
          token: token,
          password: password
        })
        .then(function(response) {
          try {
            if (response.data.status === "403") {
              toast.warn("Invalid or expired token", {
                position: toast.POSITION.TOP_CENTER
              });
            } 
            else if (response.data.status === "200") {
              toast.success(
                "Your password has been reset",
                {
                  position: toast.POSITION.TOP_CENTER
                }
              );
            }
            else{
              toast.error("Unable to reset password at this time", {
                position: toast.POSITION.TOP_CENTER
              });
            }
          } catch {
            toast.error("Unable to reset password at this time", {
              position: toast.POSITION.TOP_CENTER
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };
  return (
    <div>
      {auth ? (
        <Redirect to="/" />
      ) : (
        <div className="account">
          <div className="account__wrapper">
            <div className="account__card">
              <div className="account__head">
                <h3 className="account__title">
                  <span className="account__logo">
                    <span className="account__logo-accent"><Link push to="/">EPENDYO</Link></span>
                  </span>
                </h3>
                {/* <h4 className="account__subhead subhead">Share. Rate. Explore.</h4> */}
                <h4>Reset Password</h4>
              </div>
              <form onSubmit={submit}>
                <span className="form__form-group-label">New Password</span>
                <Input type='password' onChange={e => setPassword(e.target.value)}></Input>
                <br />
                <span className="form__form-group-label">Confirm Password</span>
                <Input
                  type='password'
                  onChange={e => setConfirmPassword(e.target.value)}
                ></Input>
             
              <br />
              <button className="btn btn-primary btn-sm tn-lg btn-block" type="submit">
                Submit
              </button>
              </form>
              <div className="account__btns">
                <Link
                  className="btn btn-outline-primary account__btn"
                  to="/login"
                >
                  <p>Already have an account?</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Password;
