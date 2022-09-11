import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const AllHistory = ({ history }) => {
  return (
    <Container>
      <nav>
        <li>
          <Link to={"/"}>BACK</Link>
        </li>
      </nav>
      History
    </Container>
  );
};

export default AllHistory;

const Container = styled.div``;
