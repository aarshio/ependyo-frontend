import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import LogInForm from "./components/LogInForm.js";
import ReactGA from "react-ga";

const LogIn = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  return (
    <div className="account">
      <div className="account__wrapper">
        <div className="account__card">
          <div className="account__head">
            <h3 className="account__title">
              <span className="account__logo">
                <span className="account__logo-accent">
                  <Link push to="/">
                    EPENDYO
                  </Link>
                </span>
              </span>
            </h3>
            <h4 className="account__subhead subhead">Share. Rate. Explore.</h4>
          </div>
          <LogInForm onSubmit />
          <div className="account__or">
            <p>New Users</p>
          </div>
          <br />
          <div className="account__btns">
            <Link
              className="btn btn-outline-primary account__btn"
              to="/register"
            >
              Create Account
            </Link>
          </div>
          {/* <div className="account__social">
          <Link
            className="account__social-btn account__social-btn--facebook"
            to="/dashboard_default"
          ><FacebookIcon />
          </Link>
          <Link
            className="account__social-btn account__social-btn--google"
            to="/dashboard_default"
          ><GooglePlusIcon />
          </Link>
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default LogIn;
