export const refreshState = (setFunction) => {
  setFunction((prev) => {
    const updatedState = {};
    for (const [idx, key] of Object.entries(["nodeA", "nodeB", "nodeC"])) {
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
    return { ...prev, ...updatedState };
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
    console.log(nextUnUsed);
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
      console.log("unSolidNode");
      setNodeState({
        ...nodeState,
        [name]: { ...nodeState[name], value: value, message: "" },
      });
    } else if (!unUsed) {
      console.log("solidNode");
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
