import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    filterArray: [
      {
        name: "set1",
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
    filterOptions: [],
    openFilter: false,
  },
  reducers: {
    setFilterArray: (state, { payload }) => {
      // console.log(payload);
      state.filterArray = payload;
    },
    setInitilFilterState: (state, { payload }) => {
      const initia = [{ ...state.filterInitialState[0], options: payload }];
      state.filterInitialState = initia;
    },
    setFilterOptions: (state, { payload }) => {
      state.filterOptions = payload;
    },
    setOpenFilter: (state, { payload }) => {
      state.openFilter = payload;
    },
  },
});

export const selectBoxDynamicOptions = (idx, prev, referece) => (dispatch) => {
  const checkSelectedOptions = prev.map((eg) => eg.value);
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
    // console.log(value);
    const update = previous.map((set) =>
      set.name === name ? { ...set, value: value, autoCompleteValue: "" } : set
    );
    dispatch(setFilterArray(update));
  };

export const addFilterSet = (queryFilters, prev, reference) => (dispatch) => {
  const setName = `set${prev.length + 1}`;
  const addedElement = [
    ...prev,
    {
      name: setName,
      value: "",
      options: reference,
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
  const reCreateState = getRequiresFilters
    .map((ar, g) => {
      const mainMap = ar[1].map((eg, i) => {
        const data = {
          name: `Set${i + g}`,
          value: ar[0],
          autoCompleteValue: eg,
          options: [ar[0]],
        };
        return data;
      });
      return mainMap;
    })
    .flatMap((eg) => eg);
  dispatch(setFilterArray(reCreateState));
};

export const applyFilters =
  (filterArray, nodeState, setNodeState) => (dispatch) => {
    const mergedObj = filterArray.reduce(
      (acc, cur) => {
        acc[cur.value] = acc[cur.value]
          ? [...acc[cur.value], cur.autoCompleteValue].filter(
              (ed, i, ar) => i === ar.indexOf(ed)
            )
          : [cur.autoCompleteValue];
        return acc;
      },
      {
        ...nodeState,
        publicationFilter: [],
        publisherFilter: [],
        affiliationFilter: [],
      }
    );
    if (
      mergedObj.hasOwnProperty("") &&
      Array.isArray(mergedObj[""]) &&
      mergedObj[""].length === 1 &&
      mergedObj[""][0] === ""
    ) {
      delete mergedObj[""];
    }
    console.log(mergedObj);
    setNodeState(mergedObj);
  };

export const {
  setFilterArray,
  setInitilFilterState,
  setFilterOptions,
  setOpenFilter,
} = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
