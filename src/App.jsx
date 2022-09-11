import { useState, useEffect, useCallback } from "react";
import AppStyle, { Row } from "./AppStyle";
import Square from "./Square";
import { Patterns } from "./patterns";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import AllHistory from "./AllHistory";

const MainApp = () => {
  const [history, setHistory] = useState([]);
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [state, setState] = useState(null);
  const [save, setSave] = useState(false);
  const [winner, setWinner] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <App
              history={history}
              state={state}
              board={board}
              setHistory={setHistory}
              setBoard={setBoard}
              setState={setState}
              save={save}
              winner={winner}
              setWinner={setWinner}
              setSave={setSave}
            />
          }
        />
        <Route
          path="history"
          element={
            <AllHistory
              historyFunc={setHistory}
              setBoard={setBoard}
              setState={setState}
              setSave={setSave}
              save={save}
              setWinner={setWinner}
              u
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

const App = ({
  history,
  setHistory,
  board,
  setBoard,
  state,
  setState,
  setSave,
  winner,
  setWinner,
  save
}) => {
  const [player, setPlayer] = useState("X");
  const navigate = useNavigate();

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
      console.log("new====================");
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
        setWinner(theWinner);
        setHistory((prev) => newHistory(prev, theWinner));
      }
    });
  }, [board, newHistory]);

  const startGame = () => {
    if (state === "ended" || state === "started") {
      setWinner(() => null);
      setSave(false);
      setState(() => null);
      setPlayer(() => "X");
      return setBoard(["", "", "", "", "", "", "", "", ""]);
    } else if (state !== "started") {
      setSave(true);
      setState(() => "started");
    }
  };

  const gotToHistory = () => {
    setBoard(() => ["", "", "", "", "", "", "", "", ""]);
    setState(() => null);
    setWinner(null);
    navigate("/history");
  };

  useEffect(() => {
    if (save) checkWinState();
  }, [board, save, checkWinState]);

  useEffect(
    useCallback(() => {
      if (winner) {
        alert(
          "Player " +
            winner +
            " is the WINNER, You can click restart to play again."
        );
        if (save) {
          saveToLocal(history);
          setSave(false);
        }
      }
    }, [winner, save, history]),
    [winner, history]
  );

  useEffect(() => {
    if (state === null) {
      setBoard(["", "", "", "", "", "", "", "", ""]);
      setWinner(() => null);
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
          <div onClick={gotToHistory} to="/history">
            View History
          </div>
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
