import styled from "@emotion/styled";
import { TextField, Typography } from "@mui/material";
import React from "react";
import StandardButton from "../../../../libs/Buttons/StandardButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { withTheme } from "@emotion/react";
const SavePopContainer = styled("div")`
  background: ${(props) => props.theme.palette.background.paper} ,
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  color: black;
  // background : green;
`;
const FlexItems = styled("div")({
  // height: "3rem",
  width: "100%",
  // background: "red",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  // marginTop: "1rem",
  marginBottom: "2rem",
});
const Items = styled("div")({
  // height: "7rem",
  width: "96%",
  // background: "green",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "6rem",
  margin: "auto auto",
});
const BtnFlex = styled("div")({
  // height: "3rem",
  width: "100%",
  //   background: "green",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
  marginTop: "2rem",
  // background: "yellow",
});

// const HeaderTitle = styled(Typography)`
//   color: ${(props) => props.theme.palette.text.primary};
// `;
const CrossIcon = styled(CloseIcon)`
  color: ${(props) => props.theme.palette.text.primary};
`;

const SavePopPanel = ({
  theme,
  getSave,
  inputValue,
  setInputValue,
  closeWithCrossICon,
  headTitle,
  close,
}) => {
  const dispatch = useDispatch();
  const { saveName } = useSelector((state) => state.service);
  console.log(saveName.length);
  return (
    <SavePopContainer>
      <FlexItems>
        <Typography
          sx={{ mb: 2 }}
          component="h1"
          variant="h3"
          align="left"
          gutterBottom
        >
          {headTitle}
        </Typography>
        <CrossIcon
          sx={{ fontSize: "2rem", cursor: "pointer" }}
          onClick={closeWithCrossICon}
        />
      </FlexItems>
      <Items>
        <TextField
          label="title *"
          id="standard-size-large"
          size="large"
          variant="standard"
          value={inputValue}
          fullWidth
          onChange={(e) => {
            const input = e.target.value;
            if (input.length <= 140) {
              dispatch(setInputValue(input));
            }
          }}
        />
      </Items>
      <BtnFlex>
        <StandardButton
          text="Cancel"
          varient="outlined"
          px={5}
          mt={0.8}
          mr={0.4}
          py={1}
          fontSize={12}
          fontWeight={600}
          onClick={close}
          color={theme.palette.secondary.main}
        />
        <StandardButton
          text="Save"
          varient="contained"
          px={7}
          mt={0.8}
          mr={0.4}
          py={1.3}
          fontSize={12}
          fontWeight={600}
          onClick={getSave}
          bgcolor={theme.palette.secondary.main}
        />
      </BtnFlex>
    </SavePopContainer>
  );
};

export default withTheme(SavePopPanel);
