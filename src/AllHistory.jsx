import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const AllHistory = ({
  historyFunc,
  setBoard,
  setState,
  setSave,
  save,
  setWinner
}) => {
  const clearHistory = () => {
    historyFunc(() => []);
    localStorage.removeItem("history");
  };

  const navigate = useNavigate();
  const getHistory = () => {
    let list = localStorage.getItem("history");
    console.log(save);
    return JSON.parse(list);
  };

  let historyArray = getHistory();

  const showGame = (item) => {
    setSave(false);
    setWinner(() => null);
    setState(() => "ended");
    setBoard(() => [...item]);
    console.log(save);
    navigate("/");
  };

  return (
    <Container>
      <nav>
        <li>
          <Link to={"/"}>BACK</Link>
        </li>
        <li onClick={clearHistory} className="clear">
          Clear History
        </li>
      </nav>
      <div className="head">
        <h1>History</h1>
      </div>
      <div className="history">
        {historyArray?.map((item, index) => (
          <li key={index} onClick={() => showGame(item.game)} className="box">
            <h3>{index + 1}.</h3>
            <h3>{item?.theWinner}</h3>
          </li>
        ))}
        <br />
      </div>
    </Container>
  );
};

export default AllHistory;

const Container = styled.div`
  display: grid;
  place-content: center;
  place-items: center;

  nav {
    font-weight: 1000;
    padding: 10px;
    list-style-type: none;
    letter-spacing: 3px;
    display: flex;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;

    .clear {
      display: grid;
      place-content: center;
      place-items: center;
      padding: 3px;
      cursor: pointer;
      user-select: none;
      background-color: #c8f7ff;
      font-weight: 900;
      font-size: 16px;
      border: 5px solid #c8f7ff;

      :hover {
        background-color: aliceblue;
      }

      * {
        color: black;
      }
    }

    .head {
      display: flex;
      gap: 10px;
    }
  }

  .history {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    background-color: lightblue;

    .box {
      display: flex;
      gap: 20px;
      place-content: center;
      place-items: center;
      width: 150px;
      aspect-ratio: 1/1;
      cursor: pointer;
    }
  }
`;
