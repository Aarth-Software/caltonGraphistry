import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    filterArray: [
      {
        name: "setOne",
        value: "",
        options: ["affiliationFilter", "publicationFilter", "publisherFilter"],
        autoCompleteValue: "",
      },
    ],
    filterInitialState: [
      {
        name: "setOne",
        value: "",
        options: [],
        autoCompleteValue: "",
      },
    ],
  },
  reducers: {
    setFilterArray: (state, { payload }) => {
      console.log(payload);
      state.filterArray = payload;
    },
    setInitilFilterState: (state, { payload }) => {
      const initia = [{ ...state.filterInitialState[0], options: payload }];
      state.filterInitialState = initia;
    },
  },
});

export const selectBoxDynamicOptions = (idx, prev, referece) => (dispatch) => {
  const checkSelectedOptions = prev.map((eg) => eg.value);
  console.log(checkSelectedOptions);
  const updatedOptions = prev.map((set, i) =>
    i > idx
      ? {
          ...set,
          options: referece.filter((ed) => !checkSelectedOptions.includes(ed)),
        }
      : set
  );
  dispatch(setFilterArray(updatedOptions));
};

export const selectBoxHandleChange =
  (e, name, idx, previous, reference) => (dispatch) => {
    const { value } = e.target;
    console.log(value);
    const update = previous.map((set) =>
      set.name === name ? { ...set, value: value } : set
    );
    dispatch(setFilterArray(update));
    const overrideNextInputs = update.map((set, i) =>
      i > idx
        ? {
            ...set,
            value: "",
            autoCompleteValue: "",
          }
        : set
    );
    // dispatch(setFilterArray(overrideNextInputs));
    dispatch(selectBoxDynamicOptions(idx, overrideNextInputs, reference));
  };

export const addFilterSet = (queryFilters, prev, reference) => (dispatch) => {
  if (Object.keys(queryFilters).length - 2 === prev.length) {
    return;
  }
  const setName = `set${prev.length + 1}`;
  const addedElement = [
    ...prev,
    {
      name: setName,
      value: "",
      options: reference.filter(
        (ed) => !prev.map((eg) => eg.value).includes(ed)
      ),
      autoCompleteValue: "",
    },
  ];
  dispatch(setFilterArray(addedElement));
};

export const getSelectAutoInput = (e, name, prev) => (dispatch) => {
  const { innerText } = e.target;

  const previous = prev.map((set) =>
    set.name === name ? { ...set, autoCompleteValue: innerText } : set
  );
  dispatch(setFilterArray(previous));
};

export const retriveFilterValues = (el) => (dispatch) => {
  const getRequiresFilters = Object.entries(el.filters).filter(
    (eg) => !["fromYear", "toYear", ""].includes(eg[0])
  );
  const reCreateState = getRequiresFilters.map((ed, i) => {
    const Data = {
      name: `Set${i}`,
      value: ed[0],
      autoCompleteValue: ed[1],
      options: [ed[0]],
    };
    return Data;
  });
  dispatch(setFilterArray(reCreateState));
};

export const { setFilterArray, setInitilFilterState } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
