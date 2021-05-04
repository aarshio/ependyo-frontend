import React, { useState, useEffect } from "react";
import DownIcon from "mdi-react/ChevronDownIcon";
import { Collapse } from "reactstrap";
import TopbarMenuLink from "./TopbarMenuLink";
import {  Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import url from "../../../url.json";
import axios from "axios";

const Ava = `${process.env.PUBLIC_URL}/img/ava.png`;

const TopbarProfile = () => {
  const [collapse, setCollapse] = useState(false);
  const [auth, setAuth] = useState(false);
  const [toLogin, setToLogin] = useState(false);
  const [toRegister, setToRegister] = useState(false);
  const [username, setUsername] = useState("");

  const toggle = () => {
    setCollapse(!collapse);
  };

  useEffect(() => {
    if (localStorage.getItem("zx59ead7fd") === null) {
      setAuth(false);
    } else {
      setAuth(true);
      var token = localStorage.getItem("zx59ead7fd");
      setUsername(jwt_decode(token)["username"]);
    }
  }, []);

  const clearSession = () => {
    axios.get(url.url.concat("logout")).then(response => {
      try {
        setAuth(false);
        setToLogin(true);
      } catch (error) {}
    });
  };

  return (
    <div className="topbar__profile">
      {toLogin ? (
        <Redirect push to="/login" />
      ) : toRegister ? (
        <Redirect push to="/register" />
      ) : auth ? (
        <div style={{ paddingTop: "10px" }}>
          <div className="topbar__profile">
            <button
              className="topbar__avatar"
              type="button"
              onClick={() => toggle()}
            >
              <img className="topbar__avatar-img" src={Ava} alt="avatar" />
              <p className="topbar__avatar-name">{username}</p>
              <DownIcon className="topbar__icon" />
            </button>
            {collapse && (
              <button
                className="topbar__back"
                type="button"
                onClick={() => toggle()}
              />
            )}
            <Collapse isOpen={collapse} className="topbar__menu-wrap">
              <div className="topbar__menu">
                <TopbarMenuLink
                  title="My Profile"
                  icon="user"
                  path={"/profile?user=" + username}
                />
                {/* <TopbarMenuLink
                title="Calendar"
                icon="calendar-full"
                path="/default_pages/calendar"
              />
              <TopbarMenuLink
                title="Tasks"
                icon="list"
                path="/default_pages/calendar"
              />
              <TopbarMenuLink title="Inbox" icon="inbox" path="/mail" /> */}
                <div className="topbar__menu-divider" />
                {/* <TopbarMenuLink
                title="Account Settings"
                icon="cog"
                path={"/profile?user="+username}
              /> */}
                {/* <TopbarMenuLink
                title="Lock Screen"
                icon="lock"
                path="/lock_screen"
              /> */}
                {/* <TopbarMenuLink title="Log Out" icon="exit" path="/home">
              <Button>log out</Button>
            </TopbarMenuLink> */}
                <div
                  className="topbar__link"
                  onClick={() => {
                    localStorage.removeItem("zx59ead7fd");
                    clearSession()
                  }}
                >
                  <span className={`topbar__link-icon lnr lnr-exit`} />
                  <p className="topbar__link-title">Log Out</p>
                </div>
              </div>
            </Collapse>
          </div>
        </div>
      ) : (
        <div className="topbar__profile">
          <div style={{ "padding-top": "13px" }}>
            <button
              className="btn btn-outline-primary btn-sm"
              type="button"
              onClick={() => {
                setToLogin(!toLogin);
              }}
            >
              Log in
            </button>
            <button
              className="btn btn-primary btn-sm"
              type="button"
              onClick={() => {
                setToRegister(!toRegister);
              }}
            >
              Register
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopbarProfile;
