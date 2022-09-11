import styled from "styled-components";

const Square = ({ value, chooseSquare }) => {
  return (
    <Container value={value}>
      <div value={value} onClick={chooseSquare} />
    </Container>
  );
};

export default Square;

const Container = styled.div`
  background-color: whitesmoke;
  width: 90%;
  aspect-ratio: 1/1;
  display: grid;
  place-items: center;

  div {
    width: 70%;
    border-radius: 40px;
    background-color: #05707b;
    cursor: pointer;
    aspect-ratio: 1/1;
    font-size: 45px;
    transition: box-shadow 0.3s ease-in-out;
    user-select: none;
    position: relative;

    ::before {
      content: attr(value);
      border-radius: 40px;
      display: grid;
      place-content: center;
      place-items: center;
      transform: ${({ value }) =>
        value !== "" ? "translate(-2px, -2px)" : "translate(-6px, -6px)"};
      background-color: #00eaff;
      z-index: 4;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;

      :active::before {
        transform: translate(0px, 0px);
      }
    }
  }
`;
