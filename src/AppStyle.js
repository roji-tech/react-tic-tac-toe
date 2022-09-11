import styled from "styled-components";

const AppStyle = styled.div`
  display: grid;
  place-content: center;
  place-items: center;
  width: 100%;
  height: 100vh;

  .btns {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    flex-wrap: wrap;

    .start {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: aliceblue;
      color: black;
      padding: 7px;
      letter-spacing: 2px;
      border: 2px solid aquamarine;
      font-weight: 1000;
      text-transform: uppercase;
      cursor: pointer;
      gap: 5px;
      user-select: none;

      .ball {
        width: 20px;
        aspect-ratio: 1/1;
        background-color: ${({ state }) =>
          state === "started" ? "lightgreen" : "red"};
        border-radius: 400px;
      }

      :hover {
        background-color: #aeeff6;
      }
    }

    .history {
      * {
        color: black;
        text-decoration: none;
      }

      display: grid;
      place-content: center;
      place-items: center;
      font-weight: 900;
      background-color: #aeeff6;
      color: black;
      padding: 7px;
      letter-spacing: 1px;
      border: 2px solid aquamarine;
      text-transform: uppercase;
      cursor: pointer;
      user-select: none;

      :hover {
        background-color: aliceblue;
      }
    }
  }

  .board {
    width: 500px;
    aspect-ratio: 1/1;
    background-color: #6df0ff;
    display: grid;
    grid-template-rows: repeat(3, 1fr);
  }

  @media screen and (max-width: 550px) {
    .board {
      width: 90vw;
      aspect-ratio: 1/1;
      background-color: #6df0ff;
      display: grid;
      grid-template-rows: repeat(3, 1fr);
    }
  }
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  place-content: center;
  place-items: center;
  box-sizing: border-box;
  /* background-color: red; */
`;

export default AppStyle;
