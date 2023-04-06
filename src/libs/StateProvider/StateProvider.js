import React, { createContext } from "react";
const StateContext = createContext();
const StateProvider = ({ children }) => {
  const [nodeState, setNodeState] = React.useState({
    nodeA: {
      value: "",
      disableDropDown: false,
      error: false,
      pointer: "nodeB",
      message: "",
    },
    nodeB: {
      value: "",
      inputValue: "",
      pointer: "nodeC",
      disableInput: true,
      error: false,
      disableDropDown: true,
      message: "",
    },
    nodeC: {
      value: "",
      inputValue: "",
      disableInput: true,
      disableDropDown: true,
      error: false,
      message: "",
    },
    fromYear: [],
    toYear: [],
    publicationFilter: [],
    publisherFilter: [],
    affiliationFilter: [],
  });
  return (
    <StateContext.Provider value={{ nodeState, setNodeState }}>
      {children}
    </StateContext.Provider>
  );
};

export { StateContext, StateProvider };
