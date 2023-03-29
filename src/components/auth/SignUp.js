import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import * as Yup from "yup";
import { Formik } from "formik";

import {
  Alert as MuiAlert,
  Button,
  TextField as MuiTextField,
} from "@mui/material";
import { spacing } from "@mui/system";

import useAuth from "../../hooks/useAuth";
import Loader from "../Loader";
import { withTheme } from "@emotion/react";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

function SignUp({ theme }) {
  const navigate = useNavigate();
  const { signUp, isAuthenticated, isInitialized } = useAuth();
  const [loading, setLoading] = React.useState(true);
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    if (isInitialized) {
      setLoading(false);
    }
  }, [isInitialized]);

  React.useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const email = queryParams.get("email");
    setEmail(email);
  }, []);

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/generateQuery");
    }
  }, [isAuthenticated, navigate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: email || "",
        password: "",
        confirmPassword: "",
        submit: false,
      }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string().max(255).required("First name is required"),
        lastName: Yup.string().max(255).required("Last name is required"),
        email: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),
        password: Yup.string()
          .min(12, "Must be at least 12 characters")
          .max(255)
          .required("Required"),
        confirmPassword: Yup.string().when("password", {
          is: (val) => (val && val.length > 0 ? true : false),
          then: Yup.string().oneOf(
            [Yup.ref("password")],
            "Both password need to be the same"
          ),
        }),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await signUp(
            values.email,
            values.password,
            values.firstName,
            values.lastName
          );
          navigate("/generateQuery");
        } catch (error) {
          console.log(error);
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
            <Alert mt={2} mb={1} severity="warning">
              {errors.submit}
            </Alert>
          )}
          <TextField
            type="text"
            name="firstName"
            label="First name"
            value={values.firstName}
            error={Boolean(touched.firstName && errors.firstName)}
            fullWidth
            helperText={touched.firstName && errors.firstName}
            onBlur={handleBlur}
            onChange={handleChange}
            my={3}
          />
          <TextField
            type="text"
            name="lastName"
            label="Last name"
            value={values.lastName}
            error={Boolean(touched.lastName && errors.lastName)}
            fullWidth
            helperText={touched.lastName && errors.lastName}
            onBlur={handleBlur}
            onChange={handleChange}
            my={3}
          />
          <TextField
            type="email"
            name="email"
            label="Email address"
            value={values.email}
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            onBlur={handleBlur}
            onChange={handleChange}
            disabled={!!email}
            my={3}
          />
          <TextField
            type="password"
            name="password"
            label="Password"
            value={values.password}
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            onBlur={handleBlur}
            onChange={handleChange}
            my={3}
          />
          <TextField
            type="password"
            name="confirmPassword"
            label="Confirm password"
            value={values.confirmPassword}
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            fullWidth
            helperText={touched.confirmPassword && errors.confirmPassword}
            onBlur={handleBlur}
            onChange={handleChange}
            my={3}
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
            }}
          >
            Sign up
          </Button>
        </form>
      )}
    </Formik>
  );
}

export default withTheme(SignUp);
