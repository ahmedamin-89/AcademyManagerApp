import { createContext, useState } from "react";

export const AcademyContext = createContext({
  academy: {
    id: "",
    name: "Academy Name",
    playersCount: 0,
    logoURL: "",
    staffCount: 0,
  },
  setAcademy: () => {},
});

export const AcademyContextProvider = ({ children }) => {
  const [academy, setAcademy] = useState({
    id: "",
    name: "Academy Name",
    playersCount: 0,
    logoURL: "",
    staffCount: 0,
  });

  return (
    <AcademyContext.Provider value={{ academy, setAcademy }}>
      {children}
    </AcademyContext.Provider>
  );
};
