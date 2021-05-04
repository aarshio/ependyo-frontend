import React, { useState, useEffect } from "react";
import { Row, Col, Container, Card, CardBody } from "reactstrap";
import Posts from "./components/Posts";
import Category from "./components/Category";
import axios from "axios";
import { Link } from "react-router-dom";
import url from "../../url.json";
import { toast } from "react-toastify";
import ReactGA from 'react-ga';

const home = () => {
  const [auth, setAuth] = useState(false);
  const [posts, setPosts] = useState();

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, []);

  useEffect(() => {
    var token = localStorage.getItem("zx59ead7fd");
    if (token === null) {
      setAuth(false);
    } else {
      setAuth(true);
    }
  }, []);

  useEffect(() => {
    axios.get(url.url.concat("all_posts")).then(response => {
      try {
        setPosts(response.data["posts"].reverse());
      } catch (error) {
        toast.error("" + error, {
          position: toast.POSITION.TOP_CENTER
        });
      }
    });
  }, []);

  return (
    <Container>
      <Row>
        <Col md={3}>
          <Card style={{ height: "200px" }}>
            <CardBody>
              <h3>Have something to say?</h3>
              <br />
              <Row>
                <Col>
                  {/* <button className="btn btn-primary" style={{'width':'100%'}}>Quick Rating</button> */}
                  {auth ? (
                    <Link
                      className="btn btn-primary"
                      style={{ width: "100%" }}
                      to="/review"
                    >
                      Write Review
                    </Link>
                  ) : (
                    <Link
                      className="btn btn-primary"
                      style={{ width: "100%" }}
                      push
                      to="/login"
                    >
                      Login & Write Review
                    </Link>
                  )}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>

        <Col md={5}>
          {posts !== undefined ? (
            posts.map((post, key) => {
              return <Posts props={post} />;
            })
          ) : (
            <div />
          )}
        </Col>
        <Col md={3}>
          <Category></Category>
        </Col>
      </Row>
    </Container>
  );
};

export default home;
