import React, { useState, useEffect } from "react";
import { Row, Col, CardBody, Input } from "reactstrap";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Redirect } from "react-router-dom";
import url from "../../url.json";

const Add = () => {
  const [items, setItems] = useState([{}]);
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [price, setPrice] = useState();
  const [size, setSize] = useState();
  const [res1, setRes1] = useState();
  const [res2, setRes2] = useState();
  const [cpu, setCpu] = useState();
  const [memory, setMemory] = useState();
  const [storage, setStorage] = useState();
  const [battery, setBattery] = useState(-1);

  const [remove, setRemove] = useState();

  useEffect(() => {
    axios.get(url.url.concat("all_items")).then(response => {
      try {
        setItems(response.data.items);
      } catch (error) {}
    });
  }, []);

  const add = () => {
    if (battery > 0) {
      axios
        .post(url.url.concat("add_item"), {
          name: name,
          category: category,
          price: price,
          size: size,
          res1: res1,
          res2: res2,
          cpu: cpu,
          memory: memory,
          storage: storage,
          battery: battery
        })
        .then(function(response) {
          try {
            window.location.reload();
          } catch {}
        })
        .catch(function(error) {
          console.log(error);
        });
    }
    else{
      alert("failed")
    }
  };

  const rem = () => {
    axios
      .post(url.url.concat("remove_item"), {
        id: remove
      })
      .then(function(response) {
        try {
          window.location.reload();
        } catch {}
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  return (
    <div>
      {jwt_decode(localStorage.getItem("zx59ead7fd"))["username"] ===
      "admin" ? (
        <div>
          <Row>
            <Col md={8}>
              <CardBody style={{ maxHeight: "700px", overflow: "auto" }}>
                <p>Total items: {items.length}</p> <br />
                <table
                  style={{
                    fontSize: "9px",
                    "border-collapse": "collapse",
                    border: "1px solid black"
                  }}
                >
                  <tr>
                    <th style={{ border: "1px solid black" }}>ID</th>
                    <th style={{ border: "1px solid black" }}>Name</th>
                    <th style={{ border: "1px solid black" }}># Posts</th>
                    <th style={{ border: "1px solid black" }}>Details</th>
                    <th style={{ border: "1px solid black" }}>Ratings</th>
                  </tr>
                  {items.map((item, key) => {
                    return (
                      <tr style={{ border: "1px solid black" }}>
                        <td style={{ border: "1px solid black" }}>
                          {" "}
                          {item.id}{" "}
                        </td>
                        <td style={{ border: "1px solid black" }}>
                          {" "}
                          {item.name}{" "}
                        </td>
                        <td style={{ border: "1px solid black" }}>
                          {" "}
                          {item.num}{" "}
                        </td>
                        <td style={{ border: "1px solid black" }}>
                          {" "}
                          {JSON.stringify(item.details)}{" "}
                        </td>
                        <td style={{ border: "1px solid black" }}>
                          {" "}
                          {JSON.stringify(item.rating)}
                        </td>
                      </tr>
                    );
                  })}
                </table>
              </CardBody>
            </Col>
            <Col md={4}>
              <CardBody>
                <form onSubmit={add}>
                  <h3>Add new item</h3>
                  Name:
                  <br />
                  <Input onChange={e => setName(e.target.value)} />
                  <br />
                  Category (brand):
                  <br />
                  <Input onChange={e => setCategory(e.target.value)} />
                  <br />
                  Price (USD):
                  <br />
                  <Input onChange={e => setPrice(e.target.value)} />
                  <br />
                  Screen Size (inches):
                  <br />
                  <Input onChange={e => setSize(e.target.value)} />
                  <br />
                  Resolution:
                  <br />
                  <Input onChange={e => setRes1(e.target.value)} /> by{" "}
                  <Input onChange={e => setRes2(e.target.value)} />
                  <br />
                  CPU:
                  <br />
                  <Input onChange={e => setCpu(e.target.value)} />
                  <br />
                  Memory:
                  <br />
                  <Input onChange={e => setMemory(e.target.value)} />
                  <br />
                  Max Storage:
                  <br />
                  <Input onChange={e => setStorage(e.target.value)} />
                  <br />
                  Battery:
                  <br />
                  <Input onChange={e => setBattery(e.target.value)} />
                  <br />
                  <button className="btn btn-primary" type="submit">
                    Submit
                  </button>
                </form>
                <hr />
                <h3>Remove item</h3>
                Remove item:
                <br />
                <Input onChange={e => setRemove(e.target.value)} />
                <br />
                <br />
                <button className="btn btn-primary" onClick={rem}>
                  Remove
                </button>
              </CardBody>
            </Col>
          </Row>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
};

export default Add;
