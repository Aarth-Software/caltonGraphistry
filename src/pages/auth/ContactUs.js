import { withTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Paper,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
// import Logo from "../../asserts/Logo";
import * as Yup from "yup";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { askHelp } from "../../redux/slices/contactSlice";
import { useNavigate } from "react-router-dom";
// import admin from "../../AdminSDK";

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)};

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)};
  }
  zoom: 0.85;
`;
const FlexContainer = styled(Box)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 50rem;
  margin-top: 0.9rem;
`;
const ContactUs = ({ theme }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      {/* <Logo size="18rem" mb="2rem" /> */}
      <Wrapper>
        <Typography
          sx={{ mb: 2 }}
          component="h1"
          variant="h2"
          align="left"
          gutterBottom
        >
          Contact us
        </Typography>
        <Typography
          sx={{ fontSize: 14.2 }}
          component="h2"
          variant="body1"
          align="left"
        >
          Please fill this form for help, feedback, or to request an invitation.
        </Typography>
        <Formik
          initialValues={{
            firstName: "",
            email: "",
            submit: false,
            feedback: "",
            request_access: false,
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().max(255).required("Name is required"),
            email: Yup.string()
              .email("Must be a valid email")
              .max(255)
              .required("Email is required"),
            feedback: Yup.string()
              .min(
                15,
                "Please enter at least 15 characters in the message field to submit your message"
              )
              .max(2000)
              .required("Message content is required"),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            const { firstName, email, feedback, request_access } = values;
            try {
              dispatch(
                askHelp(
                  {
                    name: firstName,
                    email,
                    request_access,
                    message: feedback,
                  },
                  navigate
                )
              );
            } catch (error) {
              const message = error.message || "Something went wrong";
              setStatus({ success: false });
              setErrors({ submit: message });
              setSubmitting(false);
            }
            // ApplicationToken();
          }}
        >
          {({
            errors,
            touched,
            values,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            setFieldTouched,
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              <FlexContainer>
                <TextField
                  type="text"
                  name="firstName"
                  label="Name*"
                  value={values.firstName}
                  error={Boolean(touched.firstName && errors.firstName)}
                  fullWidth
                  // helperText={touched.firstName && errors.firstName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  my={3}
                  sx={{ mr: 3 }}
                />
                <TextField
                  type="email"
                  name="email"
                  label="Email address*"
                  value={values.email}
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  // helperText={touched.email && errors.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  my={3}
                  sx={{ ml: 3 }}
                />
              </FlexContainer>
              <TextareaAutosize
                color="primary"
                type="textbox"
                name="feedback"
                disabled={false}
                minRows={16}
                maxRows={9}
                value={values.feedback}
                error={touched.feedback && errors.feedback ? "true" : "false"}
                // helperText={touched.feedback && errors.feedback}
                size="lg"
                style={{
                  width: "100%",
                  marginTop: 15,
                  fontSize: "1.4rem",
                  fontFamily: theme.typography.fontFamily,
                  padding: ".5em",
                  fontWeight: "normal",
                  outline: "none",
                  border: `1px solid ${
                    touched.feedback && errors.feedback ? "#d32f2f" : "#c4c4c4"
                  }`,
                }}
                onBlur={(e) => {
                  handleBlur(e);
                  setFieldTouched("feedback", true); // use setFieldTouched here
                }}
                onChange={handleChange}
                placeholder="Enter your message here"
                className="feedback-input"
              />
              <FormHelperText
                sx={{ pl: 3.5, fontSize: 12 }}
                error={touched.feedback && errors.feedback}
              >
                {touched.feedback && errors.feedback}
              </FormHelperText>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    checked={values.request_access}
                    value="remember"
                    color="primary"
                    name="request_access"
                  />
                }
                label="Request invitation to sign up for LitDig"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  mt: 5,
                  fontSize: 14.2,
                  bgcolor: theme.palette.secondary.main,
                  fontWeight: 600,
                }}
                disabled={isSubmitting}
              >
                Send
              </Button>
            </form>
          )}
        </Formik>
      </Wrapper>
    </>
  );
};

export default withTheme(ContactUs);
