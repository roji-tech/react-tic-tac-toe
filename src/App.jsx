import { useState, useEffect, useCallback } from "react";
import AppStyle, { Row } from "./AppStyle";
import Square from "./Square";
import { Patterns } from "./patterns";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import AllHistory from "./AllHistory";

const MainApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="history" element={<AllHistory />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("X");
  const [winner, setwinner] = useState(null);
  const [state, setState] = useState(null);
  const [history, setHistory] = useState([]);

  const chooseSquare = (square) => {
    if (state !== "started") {
      alert("Please click the start button");
      return;
    }
    setBoard(
      board.map((value, index) => {
        // console.log(value)
        if (index === square && value === "") return player;
        return value;
      })
    );
    if (player === "X") setPlayer(() => "O");
    else setPlayer(() => "X");
  };

  const saveToLocal = (array) => {
    localStorage.setItem("history", JSON.stringify(array));
  };

  const newHistory = useCallback(
    (prev, theWinner) => {
      let list = [...prev];
      let newDict = {
        theWinner,
        game: [...board]
      };
      list.push(newDict);
      return list;
    },
    [board]
  );

  const checkWinState = useCallback(() => {
    Patterns.forEach((currentPattern) => {
      let theWinner = "";
      let foundAWinnigPattern = true;
      const firstPlayer = board[currentPattern[0]];

      if (firstPlayer === "") return;

      currentPattern.forEach((index) => {
        if (board[index] !== firstPlayer) {
          return (foundAWinnigPattern = false);
        } else theWinner = board[index];
      });

      if (foundAWinnigPattern) {
        setState(() => "ended");
        setwinner(theWinner);
        setHistory((prev) => newHistory(prev, theWinner));
        saveToLocal(history);
      }
    });
  }, [board, newHistory, history]);

  const startGame = () => {
    if (state === "ended" || state === "started") {
      setwinner(() => null);
      setState(() => null);
      setPlayer(() => "X");
      return setBoard(["", "", "", "", "", "", "", "", ""]);
    } else if (state !== "started") setState(() => "started");
  };

  useEffect(() => {
    checkWinState();
  }, [board, checkWinState]);

  useEffect(() => {
    if (winner) {
      alert(
        "Player " +
          winner +
          " is the WINNER, You can click restart to play again."
      );
    }
  }, [winner]);

  useEffect(() => {
    if (state === null) {
      setBoard(["", "", "", "", "", "", "", "", ""]);
      setwinner(() => null);
      setPlayer(() => "X");
    }
  }, [state]);

  return (
    <AppStyle state={state}>
      <div className="btns">
        <div className="start" onClick={startGame}>
          <div className="ball" state={state}></div>
          {state === "started" || winner !== null ? "restart" : "start"}
        </div>
        <div className="history">
          <Link to="/history">View History</Link>
        </div>
      </div>
      <div className="board">
        <Row>
          <Square value={board[0]} chooseSquare={() => chooseSquare(0)} />
          <Square value={board[1]} chooseSquare={() => chooseSquare(1)} />
          <Square value={board[2]} chooseSquare={() => chooseSquare(2)} />
        </Row>
        <Row>
          <Square value={board[3]} chooseSquare={() => chooseSquare(3)} />
          <Square value={board[4]} chooseSquare={() => chooseSquare(4)} />
          <Square value={board[5]} chooseSquare={() => chooseSquare(5)} />
        </Row>
        <Row>
          <Square value={board[6]} chooseSquare={() => chooseSquare(6)} />
          <Square value={board[7]} chooseSquare={() => chooseSquare(7)} />
          <Square value={board[8]} chooseSquare={() => chooseSquare(8)} />
        </Row>
      </div>
    </AppStyle>
  );
};

export default MainApp;
