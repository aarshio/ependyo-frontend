import React, { useState, useEffect } from "react";
import { Row, Col, Container, Card, CardBody, Input } from "reactstrap";
import jwt_decode from "jwt-decode";
import axios from "axios";
import StarRatings from "react-star-ratings";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import url from "../../url.json";
import YoutubeCounterButton from "../Like";
import Moment from "react-moment";
import { toast } from "react-toastify";
import ReactGA from 'react-ga';

const Item = props => {
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState("");
  const [header, setHeader] = useState();
  const [HTML, setHTML] = useState();
  const [comments, setComments] = useState();
  const [postComment, setPostComment] = useState();
  const [likes, setLikes] = useState("0");
  const [dislikes, setDislikes] = useState("0");
  const [author, setAuthor] = useState();
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [rating, setRating] = useState({});
  const [name, setName] = useState();
  const [date, setDate] = useState();
  // const [chasLiked, setcHasLiked] = useState(false);
  // const [chasDisliked, setcHasDisliked] = useState(false);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  useEffect(() => {
    var token = localStorage.getItem("zx59ead7fd");
    if (token === null) {
      setAuth(false);
    } else {
      setAuth(true);
      setUsername(jwt_decode(token)["username"]);
    }
  }, []);

  useEffect(() => {
   getPost()
  }, []);

  const getPost = () =>{
    axios
    .get(url.url.concat("get_post") + props.location.search)
    .then(response => {
      try {
        setHeader(response.data.post.name);
        setHTML(response.data.post.content);
        setComments(response.data.post.post_comment.reverse());
        setLikes(response.data.post.likes);
        setDislikes(response.data.post.dislikes);
        setAuthor(response.data.post.post_user);
        setDate(response.data.post.date.concat("Z"));
        setRating(response.data.post.rating);
        setName(response.data.item.name);
      } catch (error) {}
    });
  }

  const submitForm = (e) => {
    e.preventDefault()
    if (postComment === undefined || postComment.length > 0) {
      axios
        .post(url.url.concat("post_comment"), {
          username: username,
          post_id: props.location.search,
          comment: postComment
        })
        .then(function(response) {
          try {
            setHeader(response.data.post.name);
            setHTML(response.data.post.content);
            setComments(response.data.post.post_comment.reverse());
            setLikes(response.data.post.likes);
            setDislikes(response.data.post.dislikes);
            document.getElementById('comment_input').value = ''
            setPostComment('')
            toast.success("Comment posted", {
              position: toast.POSITION.TOP_CENTER
            });
          } catch {}
        })
        .catch(function(error) {});
    } else {
      toast.error("Comment is empty", {
        position: toast.POSITION.TOP_CENTER
      });
    }
  };

  const deletePost = () => {
    axios
      .post(url.url.concat("delete_post"), {
        post_id: props.location.search
      })
      .then(function(response) {
        try {
          toast.success("Deleted " + header, {
            position: toast.POSITION.TOP_CENTER
          });
        } catch {}
      })
      .catch(function(error) {});
  };

  const submitLike = () => {
    axios
      .post(url.url.concat("post_like"), {
        username: username,
        post_id: props.location.search
      })
      .then(function(response) {
        try {
          setHeader(response.data.post.name);
          setHTML(response.data.post.content);
          setComments(response.data.post.post_comment);
          setLikes(response.data.post.likes);
          setDislikes(response.data.post.dislikes);
          setHasLiked(true);
          setHasDisliked(false);
        } catch {}
      })
      .catch(function(error) {});
  };
  const submitDislike = () => {
    axios
      .post(url.url.concat("post_dislike"), {
        username: username,
        post_id: props.location.search
      })
      .then(function(response) {
        try {
          setHeader(response.data.post.name);
          setHTML(response.data.post.content);
          setComments(response.data.post.post_comment);
          setLikes(response.data.post.likes);
          setDislikes(response.data.post.dislikes);
          setHasLiked(response.data.didLike);
          setHasDisliked(response.data.didDislike);
          setHasLiked(false);
          setHasDisliked(true);
        } catch {}
      })
      .catch(function(error) {});
  };
  const star = name => {
    return (
      <StarRatings
        rating={rating[name]}
        starRatedColor="gold"
        starDimension="20px"
        numberOfStars={5}
        name={name}
      />
    );
  };

  const csubmitLike = (cid) => {
    axios
      .post(url.url.concat("comment_like"), {
        username: username,
        comment_id: cid
      })
      .then(function(response) {
        try {
          getPost()
        } catch {}
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  const csubmitDislike = (cid) => {
    axios
      .post(url.url.concat("comment_dislike"), {
        username: username,
        comment_id: cid
      })
      .then(function(response) {
        try {
          getPost()
        } catch {}
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const deleteComment = (cid) => {
    axios
      .post(url.url.concat("delete_comment"), {
        id: cid
      })
      .then(function(response) {
        try {
          setHeader(response.data.post.name);
          setHTML(response.data.post.content);
          setComments(response.data.post.post_comment.reverse());
          setLikes(response.data.post.likes);
          setDislikes(response.data.post.dislikes);
          setHasLiked(true);
          setHasDisliked(false);
          toast.success("Comment deleted", {
            position: toast.POSITION.TOP_CENTER
          });
        } catch {}
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  return (
    <Container>
      <Row>
        <Col md={3} />
        <Col md={6}>
          <Container>
            <Card>
              <CardBody style={{ height: "auto" }}>
                <h1>{header}</h1>
                <Link
                  style={{ color: "gray" }}
                  to={{
                    pathname: "/profile",
                    search:
                      "?" + new URLSearchParams({ user: author }).toString()
                  }}
                >
                  <p style={{ color: "CornflowerBlue " }}>{author}</p>
                </Link>
                <p>{name}</p>
                <p>
                  <Moment format="MMM D YYYY">{date}</Moment>
                </p>
                <br />
                <br />
                <div dangerouslySetInnerHTML={{ __html: HTML }} />
                <br />
                <br />
                <Row>
                  <Col md={4} style={{ "padding-left": "2vw" }}>
                    <br />
                    <h5>Display and Design</h5>
                    <br />
                    {star("design")}
                    <br />
                    <br />
                    <h5>Durability</h5>
                    <br />
                    {star("durability")}
                    <br />
                    <br />
                    <h5>Camera Quality</h5>
                    <br />
                    {star("camera")}
                    <br />
                  </Col>
                  <Col md={4} style={{ "padding-left": "2vw" }}>
                    <br />
                    <h5>Features</h5>
                    <br />
                    {star("features")}
                    <br />
                    <br />
                    <h5>Battery Life</h5>
                    <br />
                    {star("battery")}
                    <br />
                    <br />
                    <h5>Performance and Speed</h5>
                    <br />
                    {star("performance")}
                    <br />
                  </Col>
                  <Col md={4} style={{ "padding-left": "2vw" }}>
                    <br />
                    <h5>Overall</h5>
                    <br />
                    {star("overall")}
                  </Col>
                </Row>
                <br />
                <hr />
                <Container>
                  <Row>
                    <Col>
                      <p>
                        <div style={{ display: "flex" }}>
                          <YoutubeCounterButton
                            number={likes}
                            position="-66px -69px"
                            tooltip="Like"
                            onClick={submitLike}
                            active={hasLiked}
                            type="like"
                          />

                          <div style={{ width: "12px" }} />
                          <YoutubeCounterButton
                            number={dislikes}
                            position="-390px -148px"
                            tooltip="Dislike"
                            onClick={submitDislike}
                            active={hasDisliked}
                            type="dislike"
                          />
                        </div>
                      </p>
                    </Col>
                    <Col md={4}></Col>
                    {author === username || username === "admin" ? (
                      <div>
                        {/* TODO! ADD EDIT! <Link to="/">
                          <MdModeEdit title="Edit Post" size="20px" />{" "}
                        </Link> */}
                        <Link to="/">
                          <MdDeleteForever
                            title="Delete Post"
                            size="20px"
                            onClick={deletePost}
                          />{" "}
                        </Link>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </Row>
                </Container>
              </CardBody>
            </Card>
          </Container>
          <Container>
            {auth ? (
              <Card>
                <CardBody style={{ height: "auto" }}>
                  <div>
                    <form onSubmit={submitForm}>
                    <Input
                      placeholder="What do you think about this review?"
                      onChange={e => {
                        setPostComment(e.target.value);
                      }}
                      type='textarea'
                      id="comment_input"
                    />
                    <br />
                    <Row>
                      <Col md={10} />
                      <Col md={2}>
                        <button
                          style={{ "margin-bottom": "0" }}
                          className="btn btn-primary btn-sm"
                          type="submit"
                        >
                          Post
                        </button>
                      </Col>
                    </Row>
                    </form>
                  </div>
                </CardBody>
              </Card>
            ) : (
              <div></div>
              // <Card>
              //   <CardBody style={{ height: "auto" }}>
              //     <div>
              //       <Input disabled type="textarea" />
              //       <br />
              //       <Row>
              //         <Col md={9} />
              //         <Col md={3}>
              //           <button
              //             style={{ "margin-bottom": "0" }}
              //             className="btn btn-primary btn-sm"
              //           >
              //             Login to comment
              //           </button>
              //         </Col>
              //       </Row>
              //     </div>
              //   </CardBody>
              // </Card>
            )}
          </Container>
          <Container>
            <Card>
              <CardBody>
                <h3>Comments</h3>
                <br />
                {comments !== undefined ? (
                  comments.map((comment, key) => {
                    return (
                      // <Comment
                      //   props={{ comment: comment, username: username }}
                      // />
                      <div>
                        <Row>
                          <Col md={4}>
                            <Link
                              style={{ color: "gray" }}
                              to={{
                                pathname: "/profile",
                                search:
                                  "?" +
                                  new URLSearchParams({
                                    user: comment.comment_user
                                  }).toString()
                              }}
                            >
                              <p style={{ color: "CornflowerBlue " }}>
                                {comment.comment_user}
                              </p>
                            </Link>
                          </Col>
                          <Col md={5} />
                          <Col md={3}>
                            {" "}
                            <h6>
                              <br />
                              <Moment local fromNow interval={30000}>
                                {comment.date.concat("Z")}
                              </Moment>
                            </h6>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <p>{comment.content}</p>
                          </Col>
                        </Row>
                        <br />
                        <Row>
                          <Col>
                            <p>
                              <div style={{ display: "flex" }}>
                                <YoutubeCounterButton
                                  number={comment.likes}
                                  position="-66px -69px"
                                  tooltip="Like"
                                  onClick={() => csubmitLike(comment.id)}
                                  // active={chasLiked}
                                  type="like"
                                />

                                <div style={{ width: "12px" }} />
                                <YoutubeCounterButton
                                  number={comment.dislikes}
                                  position="-390px -148px"
                                  tooltip="Dislike"
                                  onClick={() => csubmitDislike(comment.id)}
                                  // active={chasDisliked}
                                  type="dislike"
                                />
                              </div>
                            </p>
                          </Col>
                          <Col md={7}></Col>
                          <Col>
                            {username === "admin" ||
                            username ===
                              comment.comment_user ? (
                              <div>
                                {/* TODO! ADD EDIT! <Link to="/">
                          <MdModeEdit title="Edit Post" size="20px" />{" "}
                        </Link> */}
                                <MdDeleteForever
                                  title="Delete"
                                  size="20px"
                                  onClick={()=>deleteComment(comment.id)}
                                  style={{ cursor: "pointer" }}
                                />{" "}
                              </div>
                            ) : (
                              <div></div>
                            )}
                          </Col>
                        </Row>
                        <hr />
                      </div>
                    );
                  })
                ) : (
                  <></>
                )}
              </CardBody>
            </Card>
          </Container>
        </Col>
        <Col md={3} />
      </Row>
    </Container>
  );
};

export default Item;
