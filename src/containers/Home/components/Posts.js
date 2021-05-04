import React, { useState, useEffect } from "react";
import { CardBody, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import url from "../../../url.json";
import Moment from "react-moment";

const Posts = props => {
  const [name, setName] = useState();
  useEffect(() => {
    axios
      .post(url.url.concat("get_item"), {
        id: props.props.post_item
      })
      .then(function(response) {
        try {
          setName(response.data.item.name);
        } catch {}
      })
      .catch(function(error) {});
  }, []);

  return (
    <div>
      <Link
        style={{ color: "gray" }}
        to={{
          pathname: "/post",
          search: "?" + new URLSearchParams({ id: props.props.id }).toString()
        }}
      >
        <CardBody>
          <Row style={{ padding: "10px" }}>
            <Col md={12}>
              <Row>
                <h3>{props.props.name}</h3>
              </Row>
              <Row>{props.props.post_user}</Row>
              <Row>{name}</Row>
              <Row>
                <Moment format="MMM D YYYY">
                  {props.props.date.toString().concat("Z")}
                </Moment>
              </Row>
              <Row>
                <div
                  style={{ "max-height": "200px", overflow: "hidden" }}
                  dangerouslySetInnerHTML={{ __html: props.props.content }}
                />
              </Row>
              <br />
              <Row>
                <p>
                  {parseInt(props.props.likes) + parseInt(props.props.dislikes)}{" "}
                  impressions
                </p>
              </Row>
            </Col>
            <Col md={0}>
              <br />
              {/* <img
                className="post-img"
                src="https://tornadohunter.com/wp-content/uploads/2014/05/123-GJ-TORNADO-WEB-PIC-1000x610.jpg"
              /> */}
            </Col>
          </Row>
        </CardBody>
      </Link>
      <br />
    </div>
  );
};

export default Posts;
