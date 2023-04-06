export const refreshState = (setFunction) => {
  setFunction((prev) => {
    const updatedState = {};
    // eslint-disable-next-line no-unused-vars
    for (const [_, key] of Object.entries(["nodeA", "nodeB", "nodeC"])) {
      if (prev.hasOwnProperty(key)) {
        updatedState[key] = {
          ...prev[key],
          ...(prev[key].error !== undefined && {
            error: false,
          }),
        };
      }
    }
    return { ...prev, ...updatedState };
  });
};

export const retriveSavedGraphValues = (e, setFunction) => {
  // have to make this logic dynamically
  const { filters } = e;

  setFunction((prev) => {
    const updatedState = {};
    for (const [idx, key] of Object.entries(["nodeA", "nodeB", "nodeC"])) {
      if (prev.hasOwnProperty(key)) {
        updatedState[key] = {
          ...prev[key],
          ...(prev[key].disableDropDown !== undefined && {
            disableDropDown: true,
          }),
          ...(prev[key].disableInput !== undefined && { disableInput: true }),
          value:
            e[
              `node${
                e.selection_type === "2node"
                  ? parseInt(idx) !== 2
                    ? parseInt(idx) + 1
                    : parseInt(idx)
                  : parseInt(idx) + 1
              }`
            ],
          inputValue:
            e[
              `keyword${
                e.selection_type === "2node"
                  ? parseInt(idx) !== 2
                    ? parseInt(idx) + 1
                    : parseInt(idx)
                  : parseInt(idx) + 1
              }`
            ],
        };
      }
    }
    return {
      ...prev,
      ...updatedState,
      ...filters,
    };
  });
};

export const selectDropDownValues = (
  e,
  nodeState,
  setNodeState,
  enqueueSnackbar
) => {
  const { name, value } = e.target;
  if (value === "No options") {
    return enqueueSnackbar("Please select the previous node", {
      variant: "warning",
      autoHideDuration: 2000,
      style: { width: 300, left: "calc(50% - 150px)" },
    });
  }

  if (!!nodeState[name].pointer) {
    let nextUnUsed =
      nodeState[nodeState[name].pointer].disableInput === undefined &&
      nodeState[nodeState[name].pointer].inputValue === undefined;
    if (!nextUnUsed && nodeState[name].disableInput === undefined) {
      setNodeState({
        ...nodeState,
        [name]: { ...nodeState[name], value: value },
        [nodeState[name].pointer]: {
          ...nodeState[nodeState[name].pointer],
          value: "",
          error: false,
          disableDropDown: false,
          message: "",
        },
      });
    } else if (nextUnUsed) {
      setNodeState({
        ...nodeState,
        [name]: { ...nodeState[name], value: value, disableInput: false },
        [nodeState[name].pointer]: {
          ...nodeState[nodeState[name].pointer],
          value: "",
          error: false,
          disableDropDown: false,
          message: "",
        },
      });
    } else if (!nextUnUsed) {
      setNodeState({
        ...nodeState,
        [name]: { ...nodeState[name], value: value, disableInput: false },
        [nodeState[name].pointer]: {
          ...nodeState[nodeState[name].pointer],
          value: "",
          disableInput: true,
          error: false,
          inputValue: "",
          disableDropDown: false,
          message: "",
        },
      });
    }
  }
  let Pointer = !!nodeState[name].pointer;
  if (!Pointer) {
    let unUsed =
      nodeState[name].disableInput === undefined &&
      nodeState[name].inputValue === undefined;
    if (unUsed) {
      setNodeState({
        ...nodeState,
        [name]: { ...nodeState[name], value: value, message: "" },
      });
    } else if (!unUsed) {
      setNodeState({
        ...nodeState,
        [name]: {
          ...nodeState[name],
          value: value,
          disableInput: false,
          message: "",
        },
      });
    }
  }
};

export const checkError = (cloneObject, errorCatch) => {
  for (let x in cloneObject) {
    if (cloneObject[x].disableInput !== undefined) {
      if (cloneObject[x].inputValue === "" && cloneObject[x].value === "") {
        // cloneObject[x].message = "input and select values are mandatory";
        // valueError = true;
        // inputValuError = true;
      } else if (cloneObject[x].inputValue === "") {
        // cloneObject[x].message = "input value mandatory";
      }
      cloneObject[x].error =
        !cloneObject[x].inputValue || !cloneObject[x].value;
      errorCatch.push(cloneObject[x].error);
    } else if (cloneObject[x].disableInput === undefined) {
      if (cloneObject[x].value === "") {
        // cloneObject[x].message = "select value mandatory";
        // valueError = true;
      }
      if (cloneObject[x].error) {
        cloneObject[x].error = !cloneObject[x]?.value;
      }
      errorCatch.push(cloneObject[x].error);
    }
  }
};

export const mergeObjects = (obj) => {
  const {
    affiliationFilter,
    publisherFilter,
    fromYear,
    toYear,
    publicationFilter,
  } = obj;
  console.log(obj);

  const dropDownSelectedValues = ["nodeA", "nodeB", "nodeC"].reduce(
    (result, key) => {
      result[key] = obj[key]?.value || null;
      result[key.replace("node", "keyword")] = obj[key]?.inputValue || null;
      return result;
    },
    {
      publisherFilter,
      fromYear,
      toYear,
      publicationFilter,
      affiliationFilter,
    }
  );
  if (Object.keys(obj).length === 7) {
    const getproperMap = [dropDownSelectedValues].map((el, i) => {
      const data = {
        ...el,
        nodeB: el.nodeC,
        nodeC: el.nodeB,
        keywordB: el.keywordC,
        keywordC: el.keywordB,
      };
      return data;
    });
    return getproperMap[0];
  }
  return dropDownSelectedValues;
};

export function remToPx(rem) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export const addCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
