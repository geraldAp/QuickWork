import { createContext, useState } from "react";

export const UtilContext = createContext();

export const UtilContextProvider = ({ children }) => {
  const [signUp, setSignUp] = useState(null);

  return (
    <UtilContext.Provider value={{ signUp, setSignUp }}>
      {children}
    </UtilContext.Provider>
  );
};
