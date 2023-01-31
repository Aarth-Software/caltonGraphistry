const nodeDesables = {
  sN: {
    nodeA: { value: "", inputValue: "", disableInput: true, error: false },
  },
  doubleNrD: {
    nodeA: { value: "", inputValue: "", disableInput: true, error: false },
    nodeC: { value: "", disableDropDown: false, error: false },
  },
  doubleN: {
    nodeA: {
      value: "",
      inputValue: "",
      pointer: "nodeC",
      disableInput: true,
      error: false,
    },
    nodeC: {
      value: "",
      inputValue: "",
      disableInput: true,
      disableDropDown: true,
      error: false,
    },
  },
  doubleNlD: {
    nodeA: { value: "", disableDropDown: false, error: false },
    nodeC: { value: "", inputValue: "", disableInput: true, error: false },
  },
  tripleNcD: {
    nodeA: {
      value: "",
      inputValue: "",
      pointer: "nodeC",
      disableInput: true,
      error: false,
    },
    nodeB: { value: "", disableDropDown: false, error: false },
    nodeC: {
      value: "",
      inputValue: "",
      disableInput: true,
      disableDropDown: true,
      error: false,
    },
  },
  tripleNrD: {
    nodeA: {
      value: "",
      inputValue: "",
      pointer: "nodeB",
      disableInput: true,
      error: false,
    },
    nodeB: {
      value: "",
      inputValue: "",
      disableInput: true,
      disableDropDown: true,
      error: false,
    },
    nodeC: { value: "", disableDropDown: false, error: false },
  },
  tripleNlD: {
    nodeA: { value: "", disableDropDown: false, error: false },
    nodeB: {
      value: "",
      inputValue: "",
      pointer: "nodeC",
      disableInput: true,
      error: false,
    },
    nodeC: {
      value: "",
      inputValue: "",
      disableInput: true,
      disableDropDown: true,
      error: false,
    },
  },
  tripleNcA: {
    nodeA: { value: "", disableDropDown: false, error: false },
    nodeB: { value: "", inputValue: "", disableInput: true, error: false },
    nodeC: { value: "", disableDropDown: false, error: false },
  },
  triplePerNcA: {
    nodeA: { value: "", disableDropDown: false, error: false },
    nodeB: { value: "", inputValue: "", disableInput: true, error: false },
    nodeC: { value: "", disableDropDown: false, error: false },
  },
  triplePerNlD: {
    nodeA: { value: "", disableDropDown: false, error: false },
    nodeB: {
      value: "",
      inputValue: "",
      pointer: "nodeC",
      disableInput: true,
      error: false,
    },
    nodeC: {
      value: "",
      inputValue: "",
      disableInput: true,
      disableDropDown: true,
      error: false,
    },
  },
  triplePerNrD: {
    nodeA: {
      value: "",
      inputValue: "",
      pointer: "nodeA",
      disableInput: true,
      error: false,
    },
    nodeB: {
      value: "",
      inputValue: "",
      disableInput: true,
      disableDropDown: true,
      error: false,
    },
    nodeC: { value: "", disableDropDown: false, error: false },
  },
  triplePerNcD: {
    nodeA: {
      value: "",
      inputValue: "",
      pointer: "nodeC",
      disableInput: true,
      error: false,
    },
    nodeB: { value: "", disableDropDown: false, error: false },
    nodeC: {
      value: "",
      inputValue: "",
      disableInput: true,
      disableDropDown: true,
      error: false,
    },
  },
};

export const changeDesable = (v) => {
  return nodeDesables[v];
};
export const getAccessPatternVariables = (v) => {
  return nodeDesables[v];
};
