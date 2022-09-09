import { createContext, useState, useContext } from "react";

const INITIAL_STATE = {
//   lightMode: false,
//   setLightMode: null,
};

const LightModeContext = createContext(INITIAL_STATE);

export const LightModeProvider = ({ children }) => {
  const [lightMode, setLightMode] = useState(false);
  return (
    <LightModeContext.Provider value={{ lightMode, setLightMode }}>
      {children}
    </LightModeContext.Provider>
  );
};

const LightModeFunc = () => {
  return useContext(LightModeContext);
};

export default LightModeFunc;
