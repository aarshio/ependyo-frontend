import React, { useState, useEffect } from "react";
import {
  Card,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Input
} from "reactstrap";
import classnames from "classnames";
import ProfilePosts from "./ProfilePosts";
import jwt_decode from "jwt-decode";
import axios from 'axios';
import url from '../../../../url.json'
import {  toast } from 'react-toastify';

const ProfileTabs = props => {
  const [activeTab, setActiveTab] = useState("1");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState(props.props.bio);

  useEffect(() => {
    var token = localStorage.getItem("zx59ead7fd");
    if (token !== null) {
      setUsername(jwt_decode(token)["username"]);
    }
  }, []);

  const updateBio = () => {
    axios
    .post(url.url.concat("update_bio"), {
      username: username,
      bio:bio
    })
    .then(function(response) {
      toast.success("Bio updated", {
        position: toast.POSITION.TOP_CENTER
      });
      try {
      } catch {}
    })
    .catch(function(error) {
      console.log(error);
    });
  };

  const toggle = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  return (
    <Col md={12} lg={12} xl={8}>
      <Card>
        <div className="profile__card tabs tabs--bordered-bottom">
          <div className="tabs__wrap">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "1" })}
                  onClick={() => {
                    toggle("1");
                  }}
                >
                  Posts
                </NavLink>
              </NavItem>

              {username === props.props.profileUser ? (
                <div>
                  {/* <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "2" })}
                  onClick={() => {
                    toggle("2");
                  }}
                >
                  TimeLine
                </NavLink>
              </NavItem> */}
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "3" })}
                      onClick={() => {
                        toggle("3");
                      }}
                    >
                      Settings
                    </NavLink>
                  </NavItem>
                </div>
              ) : (
                <div></div>
              )}
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <ProfilePosts posts={props.props.posts} />
              </TabPane>
               <TabPane tabId="3">
                <div>
                  <Input
                    name="username"
                    value={bio}
                    type="textarea"
                    style={{ "min-height": "120px" }}
                    maxLength="300"
                    onChange={(e)=>setBio(e.target.value)}
                  />
                  <br />
                  <button className="btn btn-primary btn-sm" onClick={updateBio}>Update Bio</button>
                </div>
              </TabPane>
            </TabContent>
          </div>
        </div>
      </Card>
    </Col>
  );
};

export default ProfileTabs;
