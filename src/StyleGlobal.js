import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  html{
      scroll-behavior: smooth;
  }

  :root {
  --bg-white: #fff;
  --white2: #ffffff10;

  --bg-lighter: #d7e1fc;

  --blue: 	#119bf1;
  --blue1: 	#0769ff;
  --blue2: 	#4db5ff;
  --lightB: 	#3AB4F2;

  --trans: #00000060;



  --trans2: rgba(77, 181, 255, 0.4);
  --black: rgba(0, 0, 0, 0.9);

  --lg-width : 70%;
  --md-width : 85%;
  --sm-width : 90%;

  
  /* DarkMode */
  --dark: 	#1f1f38;
  --dark-trans: 	#1f1f3880;
  --bg-blue: 	#2c2c6c;
  --white:  rgba(255, 255, 255, 0.8);

    /* LightMode */
  --bg-light:	 #81c1ee;
  --bg-blue: 	#2c2c6c;
  --white:  rgba(255, 255, 255, 0.8);

    width: 99.99%;
    display: flex;
    justify-content: center;
    background-color: var(--bg-white);
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

    
    
    margin: 0;
    padding: 0;
    
    .App{
      display: flex;
      flex-direction: column;
      align-items: center;
        color: ${({ lightMode }) =>
          !lightMode ? "var(--white)" : "var(--black)"};
    }

    @media screen and (max-width: 1025px) {
      ::-webkit-scrollbar{
        display: none;
      }
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
