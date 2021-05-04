import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import ReactGA from "react-ga";

const Register = () => {
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
            <h4 className="account__subhead subhead">Create an account</h4>
          </div>
          <RegisterForm onSubmit />
          <div className="account__have-account">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
