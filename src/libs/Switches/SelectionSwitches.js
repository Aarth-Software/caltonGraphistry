import {
  singleNodeA,
  doubleNodeA,
  doubleNodeB,
  doubleNodeC,
  tripleNodeA,
  tripleNodeB,
  tripleNodeC,
  tripleNodeD,
  pTripleNodeA,
  pTripleNodeB,
  pTripleNodeC,
  pTripleNodeD,
  // ==================
  aSingleNodeA,
  aDoubleNodeA,
  aDoubleNodeB,
  aDoubleNodeC,
  aTripleNodeA,
  aTripleNodeB,
  aTripleNodeC,
  aTripleNodeD,
  aPtripleNodeA,
  aPtripleNodeB,
  aPtripleNodeC,
  aPtripleNodeD,
} from "../../asserts/index";

export const btnArray = [
  {
    btn: singleNodeA,
    grow: 2,
    active: aSingleNodeA,
    nodeA: true,
    nodeB: false,
    nodeC: false,
    code: "sN",
    selection_type: "1node",
  },
  {
    btn: doubleNodeA,
    grow: 2,
    active: aDoubleNodeA,
    nodeA: true,
    nodeB: false,
    nodeC: true,
    unUsedC: true,
    code: "doubleNrD",
    selection_type: "2node",
  },
  {
    btn: doubleNodeB,
    grow: 2,
    active: aDoubleNodeB,
    nodeA: true,
    nodeB: false,
    nodeC: true,
    code: "doubleN",
    selection_type: "2node",
  },
  {
    btn: doubleNodeC,
    grow: 2,
    active: aDoubleNodeC,
    nodeA: true,
    nodeB: false,
    nodeC: true,
    unUsedA: true,
    code: "doubleNlD",
    selection_type: "2node",
  },
  {
    btn: tripleNodeA,
    grow: 3,
    active: aTripleNodeA,
    nodeA: true,
    nodeB: true,
    nodeC: true,
    series: true,
    unUsedB: true,
    code: "tripleNcD",
    selection_type: "3anode",
  },
  {
    btn: tripleNodeB,
    grow: 3,
    active: aTripleNodeB,
    nodeA: true,
    nodeB: true,
    nodeC: true,
    series: true,
    unUsedC: true,
    code: "tripleNrD",
    selection_type: "3anode",
  },
  {
    btn: tripleNodeC,
    grow: 3,
    active: aTripleNodeC,
    nodeA: true,
    nodeB: true,
    nodeC: true,
    series: true,
    unUsedA: true,
    code: "tripleNlD",
    selection_type: "3anode",
  },
  {
    btn: tripleNodeD,
    grow: 3,
    active: aTripleNodeD,
    nodeA: true,
    nodeB: true,
    nodeC: true,
    series: true,
    unUsedA: true,
    unUsedC: true,
    code: "tripleNcA",
    selection_type: "3anode",
  },
  {
    btn: pTripleNodeD,
    grow: 4,
    active: aPtripleNodeD,
    nodeA: true,
    nodeB: true,
    nodeC: true,
    unUsedA: true,
    unUsedC: true,
    code: "triplePerNcA",
    selection_type: "3bnode",
  },
  {
    btn: pTripleNodeC,
    grow: 4,
    active: aPtripleNodeC,
    nodeA: true,
    nodeB: true,
    nodeC: true,
    unUsedA: true,
    code: "triplePerNlD",
    selection_type: "3bnode",
  },
  {
    btn: pTripleNodeB,
    grow: 4,
    active: aPtripleNodeB,
    nodeA: true,
    nodeB: true,
    nodeC: true,
    unUsedC: true,
    code: "triplePerNrD",
    selection_type: "3bnode",
  },
  {
    btn: pTripleNodeA,
    grow: 4,
    active: aPtripleNodeA,
    nodeA: true,
    nodeB: true,
    nodeC: true,
    unUsedB: true,
    code: "triplePerNcD",
    selection_type: "3bnode",
  },
];

const nodeDesables = {
  sN: {
    nodeA: {
      value: "",
      inputValue: "",
      disableInput: true,
      error: false,
      disableDropDown: false,
      message: "",
    },
    fromYear: [],
    toYear: [],
    publicationFilter: [],
    publisherFilter: [],
    affiliationFilter: [],
  },
  doubleNrD: {
    nodeA: {
      value: "",
      inputValue: "",
      disableInput: true,
      error: false,
      pointer: "nodeC",
      disableDropDown: false,
      message: "",
    },
    nodeC: { value: "", disableDropDown: false, error: false, message: "" },
    fromYear: [],
    toYear: [],
    publicationFilter: [],
    publisherFilter: [],
    affiliationFilter: [],
  },
  doubleN: {
    nodeA: {
      value: "",
      inputValue: "",
      pointer: "nodeC",
      disableInput: true,
      error: false,
      disableDropDown: false,
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
  },
  doubleNlD: {
    nodeA: {
      value: "",
      disableDropDown: false,
      error: false,
      pointer: "nodeC",
      message: "",
    },
    nodeC: {
      value: "",
      inputValue: "",
      disableInput: true,
      error: false,
      disableDropDown: true,
      message: "",
    },
    fromYear: [],
    toYear: [],
    publicationFilter: [],
    publisherFilter: [],
    affiliationFilter: [],
  },
  tripleNcD: {
    nodeA: {
      value: "",
      inputValue: "",
      pointer: "nodeB",
      disableInput: true,
      error: false,
      disableDropDown: false,
      message: "",
    },
    nodeB: {
      value: "",
      disableDropDown: false,
      error: false,
      pointer: "nodeC",
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
  },
  tripleNrD: {
    nodeA: {
      value: "",
      inputValue: "",
      pointer: "nodeB",
      disableInput: true,
      error: false,
      disableDropDown: false,
      message: "",
    },
    nodeB: {
      value: "",
      inputValue: "",
      disableInput: true,
      disableDropDown: true,
      error: false,
      pointer: "nodeC",
      message: "",
    },
    nodeC: { value: "", disableDropDown: false, error: false, message: "" },
    fromYear: [],
    toYear: [],
    publicationFilter: [],
    publisherFilter: [],
    affiliationFilter: [],
  },
  tripleNlD: {
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
  },
  tripleNcA: {
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
      disableInput: true,
      error: false,
      pointer: "nodeC",
      disableDropDown: false,
      message: "",
    },
    nodeC: { value: "", disableDropDown: true, error: false, message: "" },
    fromYear: [],
    toYear: [],
    publicationFilter: [],
    publisherFilter: [],
    affiliationFilter: [],
  },
  triplePerNcA: {
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
      disableInput: true,
      error: false,
      pointer: "nodeC",
      disableDropDown: true,
      message: "",
    },
    nodeC: { value: "", disableDropDown: false, error: false, message: "" },
    fromYear: [],
    toYear: [],
    publicationFilter: [],
    publisherFilter: [],
    affiliationFilter: [],
  },
  triplePerNlD: {
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
  },
  triplePerNrD: {
    nodeA: {
      value: "",
      inputValue: "",
      pointer: "nodeB",
      disableInput: true,
      error: false,
      disableDropDown: false,
      message: "",
    },
    nodeB: {
      value: "",
      inputValue: "",
      disableInput: true,
      disableDropDown: true,
      error: false,
      pointer: "nodeC",
      message: "",
    },
    nodeC: { value: "", disableDropDown: false, error: false, message: "" },
    fromYear: [],
    toYear: [],
    publicationFilter: [],
    publisherFilter: [],
    affiliationFilter: [],
  },
  triplePerNcD: {
    nodeA: {
      value: "",
      inputValue: "",
      pointer: "nodeB",
      disableInput: true,
      error: false,
      disableDropDown: false,
      message: "",
    },
    nodeB: {
      value: "",
      disableDropDown: false,
      error: false,
      pointer: "nodeC",
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
  },
};

const selectionNodeInfoObject = {
  "1node": {
    icons: [singleNodeA],
    info: "For literature queries on a single asset (construct, hypothesis, paper, etc).",
  },
  "2node": {
    icons: [doubleNodeA, doubleNodeB, doubleNodeC],
    info: "For literature queries on relationships between two assets (construct-construct, hypothesis-construct, paper-hypothesis, etc) *",
  },
  "3anode": {
    icons: [tripleNodeA, tripleNodeB, tripleNodeC, tripleNodeD],
    info: "For literature queries on mediation relationships between constructs (Ind Var – Mediator – Dep Var)*",
  },
  "3bnode": {
    icons: [pTripleNodeA, pTripleNodeB, pTripleNodeC, pTripleNodeD],
    info: "literature queries on moderation relationships between constructs (Ind Var – Moderator – Dep Var) *",
  },
  undefined: {
    icons: [],
    info: "* A solid node is used to look for an asset by specific keyword. A hollow node is used to look for an asset openly without a keyword.",
  },
};

export const getInfoContent = (v) => {
  return selectionNodeInfoObject[v];
};

export const changeDesable = (v) => {
  return nodeDesables[v];
};
export const getAccessPatternVariables = (v) => {
  return nodeDesables[v];
};
