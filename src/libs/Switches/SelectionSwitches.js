const nodeDesables = {
  sN: { nodeA: { value: "", inputValue: "", disableInput: true } },
  doubleNrD: {
    nodeA: { value: "", inputValue: "", disableInput: true },
    nodeC: {},
  },
  doubleN: {
    nodeA: { value: "", inputValue: "", pointer: "nodeC", disableInput: true },
    nodeC: {
      value: "",
      inputValue: "",
      disableInput: true,
      disableDropDown: true,
    },
  },
  doubleNlD: {
    nodeA: {},
    nodeC: { value: "", inputValue: "", disableInput: true },
  },
  tripleNcD: {
    nodeA: { value: "", inputValue: "", pointer: "nodeC", disableInput: true },
    nodeB: {},
    nodeC: {
      value: "",
      inputValue: "",
      disableInput: true,
      disableDropDown: true,
    },
  },
  tripleNrD: {
    nodeA: { value: "", inputValue: "", pointer: "nodeB", disableInput: true },
    nodeB: {
      value: "",
      inputValue: "",
      disableInput: true,
      disableDropDown: true,
    },
    nodeC: {},
  },
  tripleNlD: {
    nodeA: {},
    nodeB: { value: "", inputValue: "", pointer: "nodeC", disableInput: true },
    nodeC: {
      value: "",
      inputValue: "",
      disableInput: true,
      disableDropDown: true,
    },
  },
  tripleNcA: {
    nodeA: {},
    nodeB: { value: "", inputValue: "", disableInput: true },
    nodeC: {},
  },
  triplePerNcA: {
    nodeA: {},
    nodeB: { value: "", inputValue: "", disableInput: true },
    nodeC: {},
  },
  triplePerNlD: {
    nodeA: {},
    nodeB: { value: "", inputValue: "", pointer: "nodeC", disableInput: true },
    nodeC: {
      value: "",
      inputValue: "",
      disableInput: true,
      disableDropDown: true,
    },
  },
  triplePerNrD: {
    nodeA: { value: "", inputValue: "", pointer: "nodeA", disableInput: true },
    nodeB: {
      value: "",
      inputValue: "",
      disableInput: true,
      disableDropDown: true,
    },
    nodeC: {},
  },
  triplePerNcD: {
    nodeA: { value: "", inputValue: "", pointer: "nodeC", disableInput: true },
    nodeB: {},
    nodeC: {
      value: "",
      inputValue: "",
      disableInput: true,
      disableDropDown: true,
    },
  },
};

export const changeDesable = (v) => {
  return nodeDesables[v];
};
export const getAccessPatternVariables = (v) => {
  return nodeDesables[v];
};
