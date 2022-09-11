import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  html{
      scroll-behavior: smooth;
  }

  :root {
  /* DarkMode */

    width: 99.99%;
    display: flex;
    justify-content: center;
  }

  * {
  padding: 0;
  border: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

  body {
    width: 99.95%;
    font-size: 1.1rem;
    height: 100vh;

    
    
    margin: 0;
    padding: 0;
    

    ::-webkit-scrollbar{
      display: none;
    }
    

  }



  section{
    width: var(--lg-width);
    padding: 10% 0;
    
    @media screen and (max-width: 1125px) {
      width: var(--md-width);
    }
    
    @media screen and (max-width: 600px) {
      width: var(--sm-width);
    }
  }


  p{
  }
  
  .satisfy{
    /* font-family: 'Lato', sans-serif; */
    font-family: "Satisfy", cursive;
  }

  /* =========================
      CUSTOM 3D TITLE
    ========================= */

  .custom-3D-title {
    font-size: 4em;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #5482ff;
    -webkit-transform: skew(-5deg, -5deg) rotate(5deg);
    transform: skew(-5deg, -5deg) rotate(5deg);
    -webkit-transform-origin: center center;
    transform-origin: center center;
    text-shadow: 1px 1px #2ea9be, 2px 2px #2ea9be, 4px 4px #2ea9be,
      5px 5px #2ea9be, 4px 4px #195eb3, 6px 6px #195eb3, 3px 3px #195eb3,
      8px 8px #195eb3, 9px 9px #195eb3, 10px 10px #195eb3;
  }


`;

export default GlobalStyle;

export const Heading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: "center";
  align-items: center;
  align-self: start;
  gap: 5px;
  margin-bottom: 30px;
  font-weight: 1000;
  /* transform: skew(2deg); */

  @media screen and (max-width: 800px) {
    align-self: center;
  }
`;
