import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import StarRatings from "react-star-ratings";
import {
  Row,
  Col,
  Card,
  CardBody,
  Input,
  FormFeedback
} from "reactstrap";
import {  Redirect, Link } from "react-router-dom";
import {  toast } from 'react-toastify';
import ReactGA from 'react-ga';
import axios from "axios";

import ReactQuill from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6
import url from '../../../url.json'

const Review = () => {
  const [username, setUsername] = useState("");
  const [items, setItems] = useState([{}]);
  const [currentItem, setCurrentItem] = useState("");
  const [headline, setHeadline] = useState("");
  const [valid, setValid] = useState(true);
  const [rating, setRating] = useState({
    design: 0,
    durability: 0,
    camera: 0,
    features: 0,
    battery: 0,
    performance: 0
  });
  const [content, setContent] = useState("");
  const [posted, setPosted] = useState(false);

  useEffect(() => {
    var token = localStorage.getItem("zx59ead7fd");
    if (token !== null) {
      setUsername(jwt_decode(token)["username"]);
    }
  }, []);

  useEffect(() => {
    axios.get(url.url.concat("all_items")).then(response => {
      try {
        setItems(response.data.items);
      } catch (error) {}
    });
  }, []);

  const submit = () => {
    if(rating.desgin === 0 || rating.durability === 0 || rating.camera === 0 || rating.features === 0 || rating.battery === 0 || rating.performance ===0 ){
      toast.error("Ratings must be non zero", {
        position: toast.POSITION.TOP_CENTER
      });
    }
    else{
    if(headline.length > 3){
    const avg =
    (rating.design +
      rating.durability +
      rating.camera +
      rating.features +
      rating.battery +
      rating.performance) /
    6;
    const ob = {
      design: rating.design,
      durability: rating.durability,
      camera: rating.camera,
      features: rating.features,
      battery: rating.battery,
      performance: rating.performance,
      overall: parseFloat(avg.toFixed(2))
    }
    var config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    };
    axios
      .post(url.url.concat("post_item"), {
        item: currentItem,
        rating: ob,
        headline: headline,
        content: content,
        username: username,
        config
      })
      .then(function(response) {
        try {
          ReactGA.event({
            category: 'Post',
            action: 'Posted  '+headline+' by: '+username
          })
          setPosted(true);
          toast.success("Posted!", {
            position: toast.POSITION.TOP_CENTER
          });
        } catch {}
      })
      .catch(function(error) {
      });
    }
    else{
      toast.error("Headline must me longer than 3 characters", {
        position: toast.POSITION.TOP_CENTER
      });
    }
  }
  };

  const validate = () => {
    for (let i = 0; i < items.length; i++) {
      if (currentItem === items[i].name) {
        return setValid(true);
      }   
      
    }
    return setValid(false);
  };

  const star = name => {
    return (
      <StarRatings
        rating={rating[name]}
        starRatedColor="gold"
        changeRating={num => {
          setRating({ ...rating, [name]: num});
        }}
        starDimension="30px"
        numberOfStars={5}
        name={name}
      />
    );
  };
  const overallStar = () => {
    const avg =
      (rating.design +
        rating.durability +
        rating.camera +
        rating.features +
        rating.battery +
        rating.performance) /
      6;
    return (
      <StarRatings
        rating={avg}
        starRatedColor="gold"
        starDimension="30px"
        numberOfStars={5}
        name={"overall"}
      />
    );
  };

  // const imageHandler = () => {
  //   // const input = document.createElement('input');
  //   // input.setAttribute('type', 'file');
  //   // input.setAttribute('accept', 'image/*');
  //   // input.click();
  //   // input.onchange = async function() {
  //   //   const file = input.files[0];
  //   //   console.log('User trying to uplaod this:', file);
  //   //   const id = await uploadFile(file); // I'm using react, so whatever upload function
  //   //   const range = this.quill.getSelection();
  //   //   const link = `${ROOT_URL}/file/${id}`;
  //   //   // this part the image is inserted
  //   //   // by 'image' option below, you just have to put src(link) of img here.
  //   //   this.quill.insertEmbed(range.index, 'image', link);
  //   // }.bind(this); // react thing
  // };

  return (
    <div>
      {localStorage.getItem("zx59ead7fd") === null || posted ?
      (<Redirect to="/" />):
    (
      <div>
        <Card>
          <CardBody>
            <h2>Select device</h2>
            <br />
            <Input
              list="phones"
              placeholder="Choose device..."
              onChange={e => setCurrentItem(e.target.value)}
              onBlur={() => validate()}
              invalid={!valid}
            />
            <FormFeedback invalid>
              hmm... never heard of this phone!
            </FormFeedback>
            <datalist id="phones">
              {items.map((item, key) => {
                return <option value={item.name} />;
              })}
            </datalist>
          </CardBody>
        </Card>

        {currentItem.length > 0 ? (
          <div>
            {valid ? (
              <div>
                <Card>
                  <CardBody>
                    <h2>Ratings</h2>
                    <br />
                    <Row>
                      <Col md={4} style={{ "padding-left": "2vw" }}>
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
                      <br />
                      <Col md={4}>
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
                      <Col md={4}>
                        <br/>
                        <h5>Overall</h5>
                        <br />
                        {overallStar()}
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <h2>Review</h2>
                    <br />
                    <div className="form__form-group">
                      <Input
                        type="text"
                        placeholder="Headline"
                        onChange={e => setHeadline(e.target.value)}
                      />
                    </div>
                    <ReactQuill
                      value={content}
                      onChange={val =>
                        setContent(val )
                      }
                      modules={{
                        toolbar: [
                          [{ header: "1" }, { header: "2" }, { font: [] }],
                          [{ size: [] }],
                          [
                            "bold",
                            "italic",
                            "underline",
                            "strike",
                            "blockquote"
                          ],
                          [
                            { list: "ordered" },
                            { list: "bullet" },
                            { indent: "-1" },
                            { indent: "+1" }
                          ],
                          ["link", "image", "video"],
                          ["clean"]
                        ],
                        clipboard: {
                          // toggle to add extra line breaks when pasting HTML:
                          matchVisual: false
                        }
                      }}
                      formats={[
                        "header",
                        "font",
                        "size",
                        "bold",
                        "italic",
                        "underline",
                        "strike",
                        "blockquote",
                        "list",
                        "bullet",
                        "indent",
                        "link",
                        "image",
                        "video"
                      ]}
                    />
                    <br />
                    <Row>
                      <Col md={10} />
                      <Col md={2}>
                        <Link className="btn btn-secondary" push to='/'>Cancel</Link>
                        <button className="btn btn-primary" onClick={submit}>
                          Submit
                        </button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>)}
    </div>
  );
};

export default Review;
