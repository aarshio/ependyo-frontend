import React, { useState, useEffect } from "react";
import { Col, Container, Row, Card, CardBody } from "reactstrap";
// import ProfileMain from "./components/ProfileMain";
// import ProfileCalendar from "./components/ProfileCalendar";
// import ProfileTasks from "./components/ProfileTasks";
import ProfileTabs from "./components/ProfileTabs";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import url from "../../../url.json";
import Moment from "react-moment";
import jwt_decode from "jwt-decode";
import ReactGA from 'react-ga';

const Profile = props => {
  const [username, setUsername] = useState();
  const [bio, setBio] = useState();
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState();
  const [likesRecieved, setLikesRecieved] = useState();
  const [date, setDate] = useState([]);
  const [curUser, setCurUser] = useState();

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  useEffect(() => {
    var token = localStorage.getItem("zx59ead7fd");
    if (localStorage.getItem("zx59ead7fd") !== null) {
      setCurUser(jwt_decode(token)["username"]);
    }
  }, []);

  useEffect(() => {
    axios
      .get(url.url.concat("get_user") + props.location.search)
      .then(response => {
        try {
          const ext = response.data.user;
          setUsername(ext.username);
          setBio(ext.bio);
          setPosts(ext.user_post.reverse());
          setComments(ext.user_comment);
          setLikesRecieved(ext.likes_recieved);
          setDate(ext.date.concat("Z"));
        } catch (error) {}
      });
  }, []);

  const deleteUser = () => {
    axios
      .post(url.url.concat("delete_user"), {
        user: { username }
      })
      .then(function(response) {
        try {
        } catch {}
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  return (
    <Container>
      <div className="profile">
        <Row>
          <Col md={12} lg={12} xl={4}>
            <Row>
              <Col md={12} lg={12} xl={12}>
                <Card>
                  <CardBody className="profile__card">
                    <div className="profile__information">
                      <div className="profile__avatar">
                        <img
                          src="data:image/png;base64,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"
                          alt="avatar"
                        />
                      </div>
                      <div className="profile__data">
                        <p className="profile__name">{username}</p>
                        <p className="profile__work">
                          Joined{" "}
                          <p>
                            <Moment format="MMM D YYYY">{date}</Moment>
                          </p>
                        </p>
                        <p className="profile__contact">
                          {bio === null ? <></> : bio}
                        </p>
                      </div>
                    </div>
                    <div className="profile__stats">
                      <div className="profile__stat">
                        <p className="profile__stat-number">{posts.length}</p>
                        <p className="profile__stat-title">Posts</p>
                      </div>
                      <div className="profile__stat">
                        <p className="profile__stat-number">{likesRecieved}</p>
                        <p className="profile__stat-title">Likes Received</p>
                      </div>
                      {/* <div className="profile__stat">
                        <p className="profile__stat-number">12</p>
                        <p className="profile__stat-title">Reports</p>
                      </div> */}
                    </div>
                    {curUser === "admin" ? (
                      <div>
                        {/* TODO! ADD EDIT! <Link to="/">
                          <MdModeEdit title="Edit Post" size="20px" />{" "}
                        </Link> */}
                        <Link to="/">
                          <MdDeleteForever
                            title="Delete"
                            size="20px"
                            onClick={deleteUser}
                          />{" "}
                        </Link>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
          <ProfileTabs
            props={{
              posts: posts,
              comments: comments,
              profileUser: username,
              bio: bio
            }}
          />
        </Row>
      </div>
    </Container>
  );
};

export default Profile;
