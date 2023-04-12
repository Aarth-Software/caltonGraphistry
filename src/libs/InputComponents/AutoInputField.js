import React from "react";
import { Autocomplete, Paper, createFilterOptions } from "@mui/material";
import { BiSearch } from "react-icons/bi";
import "./AutoCompleteField.css";
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

  const CustomPaper = (props) => {
    return <Paper elevation={8} {...props} />;
  };

  return (
    <Autocomplete
      value={selectedValue}
      disabled={disabled}
      ListboxProps={{
        style: {
          maxHeight: "30rem",
          fontSize: ".8rem",
          // border: "1rem solid #66666 !important",
          // boxShadow:
          //   "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12) !important",
          // backgroundColor: "red",
        },
      }}
      PaperComponent={CustomPaper}
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
        outline: "none",
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
              backgroundColor: "white",
            }}
          >
            <BiSearch
              size={"1.3em"}
              className="icon"
              style={{
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
              outline: "none",
            }}
          />
        </InputContainer>
      )}
    />
    // </div>
  );
};

export default AutoInputField;
