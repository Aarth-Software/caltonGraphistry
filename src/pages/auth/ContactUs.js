import { withTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Paper, TextareaAutosize, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import StandardButton from "../../libs/Buttons/StandardButton";

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)};

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)};
  }
`;
const FlexContainer = styled(Box)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 50rem;
  margin-top: 0.5rem;
`;
const TextHint = styled(Typography)`
  font-size: 0.8rem;
`;
const ContactUs = ({ theme }) => {
  return (
    <React.Fragment>
      {/* <Brand /> */}
      <Wrapper>
        <Typography variant="h3">Contact Us</Typography>
        <TextHint variant="p">
          Please share your feedback or let us know how we can be of help.
        </TextHint>

        <FlexContainer>
          <TextField
            type="text"
            name="email"
            label="Name"
            variant="standard"
            //   value={values.email}
            //   error={Boolean(touched.email && errors.email)}
            fullWidth
            //   helperText={touched.email && errors.email}
            //   onBlur={handleBlur}
            //   onChange={handleChange}
            sx={{ mr: 3 }}
          />
          <TextField
            type="email"
            name="password"
            label="Email Address"
            variant="standard"
            //   value={values.password}
            //   error={Boolean(touched.password && errors.password)}
            fullWidth
            //   helperText={touched.password && errors.password}
            //   onBlur={handleBlur}
            //   onChange={handleChange}
            sx={{ ml: 3 }}
          />
        </FlexContainer>
        <TextareaAutosize
          color="primary"
          disabled={false}
          minRows={10}
          maxRows={10}
          placeholder="type something"
          size="lg"
          style={{ width: "100%", marginTop: 15 }}
        />
        <StandardButton
          text="Sign in"
          px={2}
          py={2}
          varient="standard"
          // bgcolor={"#F96167"}
          mx={3}
          //   onClick={navigateToLogin}
          color={theme.palette.text.primary}
          bgcolor={theme.palette.secondary.main}
        />
      </Wrapper>
    </React.Fragment>
  );
};

export default withTheme(ContactUs);
