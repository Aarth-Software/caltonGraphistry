import React, { createContext } from "react";
const StateContext = createContext();
const StateProvider = ({ children }) => {
  const [nodeState, setNodeState] = React.useState({
    nodeA: { value: "", inputValue: "", disableInput: true },
    nodeB: { value: "", inputValue: "", disableInput: true },
    nodeC: { value: "", inputValue: "", disableInput: true },
    fromYear: "",
    toYear: "",
    publicationFilter: "",
    publisherFilter: "",
    affiliationFilter: "",
  });
  return (
    <StateContext.Provider value={{ nodeState, setNodeState }}>
      {children}
    </StateContext.Provider>
  );
};

export { StateContext, StateProvider };
