import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { Input } from "reactstrap";
import isEmail from "validator/lib/isEmail";
import { toast } from "react-toastify";
import axios from "axios";
import url from "../../../url.json";
import ReactGA from 'react-ga';

const Reset = () => {
  const [auth, setAuth] = useState(false);
  const [email, setEmail] = useState();

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("zx59ead7fd") !== null) {
      setAuth(true);
    }
  }, [auth, setAuth]);

  const submit = e => {
    e.preventDefault();
    if (!isEmail(email)) {
      toast.error("This is not an email", {
        position: toast.POSITION.TOP_CENTER
      });
    } else {
      toast.info(
        "An email has been sent with instructions to reset your password",
        {
          position: toast.POSITION.TOP_CENTER
        }
      );
      axios
        .post(url.url.concat("reset"), {
          email: email
        })
        .then(function(response) {
          try {
            if (response.data.status === "403") {
              toast.warn("No such user exists", {
                position: toast.POSITION.TOP_CENTER
              });
            }
            if (response.data.status === "200") {
              ReactGA.event({
                category: 'Reset Email',
                action: 'Request mail '+email.substring(0, email.lastIndexOf("@")) +", "+ email.substring(email.lastIndexOf("@") +1)
              })
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
              <form onSubmit={submit} style={{'marginTop':'40px', 'marginBottom':'40px'}}>
                <span className="form__form-group-label">Email</span>
                <Input onChange={e => setEmail(e.target.value)}></Input>
              </form>
              <br />
              <button
                className="btn btn-primary btn-sm tn-lg btn-block"
                type="submit"
              >
                Reset
              </button>
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

export default Reset;
