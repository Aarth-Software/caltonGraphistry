import React from "react";
import { Autocomplete, createFilterOptions } from "@mui/material";
import { BiSearch } from "react-icons/bi";
import "./AutoCompleteField.css";
import { useNavigate } from "react-router";
import styled from "@emotion/styled";
import { Box } from "@mui/system";
const InputContainer = styled(Box)`
  display: flex;
  padding-right: 1;
`;
const AutoInputField = ({
  options = [],
  getSelect,
  selectedValue,
  disabled,
}) => {
  // console.log(options);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const firstLetterToUpperCase =
    inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
  const OPTIONS_LIMIT = 14;
  const defaultFilterOptions = createFilterOptions();

  const filterOptions = (options, state) => {
    return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
  };

  const getBlur = () => {};
  const getFocus = () => {};

  return (
    // <div className="searchInputInCascadingScreen inputDemandForeCast">
    <Autocomplete
      value={selectedValue}
      disabled={disabled}
      ListboxProps={{
        style: {
          maxHeight: "15em",
          fontSize: ".8rem",
          // fontFamily: `'Roboto', sans-serif`,
          // padding: '0px, 0px',
        },
      }}
      noOptionsText={
        <span style={{ padding: "-1em", fontSize: ".7em" }}>select filter</span>
      }
      clearOnBlur
      selectOnFocus
      onChange={getSelect}
      onBlur={getBlur}
      onFocus={getFocus}
      open={open}
      onOpen={() => {
        if (inputValue) {
          setOpen(true);
        }
      }}
      onClose={() => setOpen(false)}
      inputValue={firstLetterToUpperCase}
      onInputChange={(e, value) => {
        setInputValue(value);

        if (!value) {
          setOpen(false);
        }
      }}
      sx={{
        display: "flex",
        flexDirection: "column",
        marginRight: 1,
        width: "100%",
        "& input": {
          bgcolor: "background.paper",
          color: (theme) =>
            theme.palette.getContrastText(theme.palette.background.paper),
        },
        ".MuiAutocomplete-noOptions": {
          fontSize: "10em",
        },
      }}
      filterOptions={filterOptions}
      options={[...new Set(options)]}
      renderInput={(params) => (
        <InputContainer className="input-iconflex" ref={params.InputProps.ref}>
          <div
            className="iconContainerInInputSearchInInventoryy"
            style={{
              // backgroundColor: `${true ? "#79b259" : "#f2f2f2"}`,
              // border: ".08rem solid #79b259",
              backgroundColor: "white",
            }}
          >
            <BiSearch
              size={"1.3em"}
              className="icon"
              style={{
                // color: `${false ? "#79b259" : "white"}`,
                color: "#cbcbcb",
              }}
            />
          </div>
          <input
            className="input-materialui"
            placeholder={`Search...`}
            type="text"
            {...params.inputProps}
            style={{
              border: `.1rem solid #cbcbcb`,
              fontSize: ".9rem",
              borderRadius: ".18rem",
            }}
          />
        </InputContainer>
      )}
    />
    // </div>
  );
};

export default AutoInputField;
