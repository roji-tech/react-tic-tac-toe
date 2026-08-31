import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Outfit', 'Plus Jakarta Sans', sans-serif;
    user-select: none;
  }

  body {
    background-color: #0b0f19;
    background-image: 
      radial-gradient(at 0% 0%, rgba(0, 243, 255, 0.08) 0px, transparent 50%),
      radial-gradient(at 100% 100%, rgba(255, 0, 127, 0.08) 0px, transparent 50%),
      radial-gradient(at 50% 50%, rgba(168, 85, 247, 0.05) 0px, transparent 50%);
    background-attachment: fixed;
    color: #f8fafc;
    min-height: 100vh;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #0b0f19;
  }
  ::-webkit-scrollbar-thumb {
    background: #1e293b;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #334155;
  }

  button {
    font-family: inherit;
    border: none;
    outline: none;
  }
`;
