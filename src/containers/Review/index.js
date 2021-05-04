import React, { useEffect } from "react";
import { Container } from "reactstrap";
import Select from "./components/Select";
import ReactGA from "react-ga";

const Review = () => {

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  return (
    
    <Container>
      <Select />
    </Container>
  );
};

export default Review;
