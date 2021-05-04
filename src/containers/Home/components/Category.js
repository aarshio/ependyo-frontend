import React, { useState, useEffect } from "react";
import { Card, CardBody, Table } from "reactstrap";
import axios from "axios";
import url from '../../../url.json'

const Category = () => {
  const [battery, setBattery] = useState({});
  const [camera, setCamera] = useState({});
  const [design, setDesign] = useState({});
  const [durability, setDurability] = useState({});
  const [features, setFeatures] = useState({});
  const [performance, setPerformance] = useState({});
  const [overall, setOverall] = useState([]);

  useEffect(() => {
    axios.get(url.url.concat("get_overall")).then(response => {
      try {
        setOverall(response.data.top);
      } catch (error) {}
    });

    axios.get(url.url.concat("get_best")).then(response => {
      try {
        setBattery(response.data.battery);
        setCamera(response.data.camera);
        setDesign(response.data.design);
        setDurability(response.data.durability);
        setFeatures(response.data.features);
        setPerformance(response.data.performance);
      } catch (error) {}
    });
  }, []);

  const read = txt => {
    return txt
      .replace(/\{/g, "")
      .replace(/\}/g, "")
      .replace(/\[/g, "")
      .replace(/\]/g, "")
      .replace(/"/g, "")
      .replace(/:/g, ": ");
  };
  return (
    <div>
      <Card>
        <CardBody>
          <h3>Community Top Picks</h3>
          <br />
          <Table responsive hover>
            <thead>
              <tr>
                <th> </th>
                <th>Phone</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr>
          <td>1</td>
          <td>Maria</td>
          <td>
            <Badge color="success">Work</Badge>
          </td>
        </tr> */}

              {overall.map(function(item, i) {
                return (
                  <tr>
                    <td>{i + 1}</td>
                    <td
                      title={read(
                        item.name + JSON.stringify(item.details, null, 2)
                      )}
                    >
                      {item.name}
                    </td>
                    <td
                      title={read(
                        item.name + JSON.stringify(item.rating, null, 2)
                      )}
                    >
                      {item.rating.overall}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          {/* {form.map(function(item, i) {
            return <a href='./'>{item}</a>;
          })} */}
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <h3>Category Top Picks</h3>
          <br/>
          <table>
            <tr>
              <td>
                <h4>Battery</h4>
              </td>
              <td style={{ paddingLeft: "25px" }}>
                <p>{battery.name}</p>
              </td>
            </tr>
            <tr>
              <td>
                <h4>Camera</h4>
              </td>
              <td style={{ paddingLeft: "25px" }}>
                <p>{camera.name}</p>
              </td>
            </tr>
            <tr>
              <td>
                <h4>Design</h4>
              </td>
              <td style={{ paddingLeft: "25px" }}>
                <p>{design.name}</p>
              </td>
            </tr>
            <tr>
              <td>
                <h4>Durability</h4>
              </td>
              <td style={{ paddingLeft: "25px" }}>
                <p>{durability.name}</p>
              </td>
            </tr>
            <tr>
              <td>
                <h4>Features</h4>
              </td>
              <td style={{ paddingLeft: "25px" }}>
                <p>{features.name}</p>
              </td>
            </tr>
            <tr>
              <td>
                <h4>Performance</h4>
              </td>
              <td style={{ paddingLeft: "25px" }}>
                <p>{performance.name}</p>
              </td>
            </tr>
          </table>
        </CardBody>
      </Card>
    </div>
  );
};

export default Category;
