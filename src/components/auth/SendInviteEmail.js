import { withTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Alert, Button, Paper, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import useAuth from "../../hooks/useAuth";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)};
  width: 600px;
  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)};
  }
  zoom: 0.8;
`;

const SendInviteEmail = ({ theme }) => {
  const { sendLoginLink } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <Typography
        sx={{ mb: 2 }}
        component="h1"
        variant="h2"
        align="left"
        gutterBottom
      >
        Invite
      </Typography>
      <Typography
        sx={{ fontSize: 14.2 }}
        component="h2"
        variant="body1"
        align="left"
      >
        Invite a new user to sign up with email
      </Typography>
      <Formik
        initialValues={{
          name: "",
          email: "",
          submit: false,
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required("Name is required"),
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            sendLoginLink(values.email, values.name, dispatch, navigate);
          } catch (error) {
            const message = error.message || "Something went wrong";
            setStatus({ success: false });
            setErrors({ submit: message });
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            {errors.submit && (
              <Alert mt={2} mb={3} severity="warning">
                {errors.submit}
              </Alert>
            )}
            <TextField
              type="email"
              name="email"
              label="Email Address*"
              value={values.email}
              error={Boolean(touched.email && errors.email)}
              fullWidth
              helperText={touched.email && errors.email}
              onBlur={handleBlur}
              onChange={handleChange}
              my={2}
              sx={{ mt: 2 }}
            />
            <TextField
              type="name"
              name="name"
              label="Name*"
              value={values.name}
              error={Boolean(touched.name && errors.name)}
              fullWidth
              helperText={touched.name && errors.name}
              onBlur={handleBlur}
              onChange={handleChange}
              my={2}
              sx={{ mt: 4 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              sx={{
                fontSize: 14.2,
                bgcolor: theme.palette.secondary.main,
                fontWeight: 600,
                mt: 6,
              }}
            >
              Send
            </Button>
          </form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withTheme(SendInviteEmail);
