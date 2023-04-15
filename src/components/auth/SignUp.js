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
import { Box, spacing } from "@mui/system";

import useAuth from "../../hooks/useAuth";
import { withTheme } from "@emotion/react";
import CountrySelect from "../../libs/InputComponents/Country/CountrySelect";
import SelectTextField from "../../libs/InputComponents/SelectBox/SelectTextField";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

function SignUp({ theme, email, inviteToken }) {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: email || "",
        password: "",
        confirmPassword: "",
        submit: false,
        state: "",
        country: "",
        institution: "",
        department: "",
        researchField: "",
        researchIntrests: "",
        jobTitle: "",
        institutionEmail: "",
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
        country: Yup.string().max(255).required("Affiliation is required"),
        state: Yup.string().max(255).required("Affiliation is required"),
        institution: Yup.string().max(255).required("Affiliation is required"),
        department: Yup.string().max(255).required("Affiliation is required"),
        researchField: Yup.string()
          .max(255)
          .required("Affiliation is required"),
        researchIntrests: Yup.string()
          .max(255)
          .required("Affiliation is required"),
        jobTitle: Yup.string().max(255).required("Affiliation is required"),
        institutionEmail: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await signUp(
            values.email,
            values.password,
            values.firstName,
            values.lastName,
            values.affiliation,
            values.organisation,
            inviteToken
          );
          navigate("/query");
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
        setFieldValue,
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          {errors.submit && (
            <Alert mt={2} mb={1} severity="warning">
              {errors.submit}
            </Alert>
          )}
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
            disabled={!!email}
            my={2}
          />
          <Box
            sx={{
              width: "100%",
              height: "auto",
              // bgcolor: "red",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <TextField
              type="text"
              name="firstName"
              label="First name*"
              value={values.firstName}
              error={Boolean(touched.firstName && errors.firstName)}
              fullWidth
              // helperText={touched.firstName && errors.firstName}
              onBlur={handleBlur}
              onChange={handleChange}
              my={2}
              mr={2}
            />
            <TextField
              type="text"
              name="lastName"
              label="Last name*"
              value={values.lastName}
              error={Boolean(touched.lastName && errors.lastName)}
              fullWidth
              // helperText={touched.lastName && errors.lastName}
              onBlur={handleBlur}
              onChange={handleChange}
              my={2}
              ml={2}
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <CountrySelect
              type="text"
              name="country"
              label="Country*"
              value={values}
              error={Boolean(touched.country && errors.country)}
              handleBlur={handleBlur}
              handleChange={handleChange}
            />
            <TextField
              type="text"
              name="state"
              label="State*"
              value={values.state}
              error={Boolean(touched.state && errors.state)}
              fullWidth
              // helperText={touched.state && errors.state}
              onBlur={handleBlur}
              onChange={handleChange}
              my={2}
              ml={2}
            />
          </Box>

          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <TextField
              type="text"
              name="institution"
              label="Institution*"
              value={values.institution}
              error={Boolean(touched.institution && errors.institution)}
              fullWidth
              // helperText={touched.institution && errors.institution}
              onBlur={handleBlur}
              onChange={handleChange}
              my={2}
              mr={2}
            />
            <TextField
              type="text"
              name="department"
              label="Department*"
              value={values.department}
              error={Boolean(touched.department && errors.department)}
              fullWidth
              // helperText={touched.department && errors.department}
              onBlur={handleBlur}
              onChange={handleChange}
              my={2}
              ml={2}
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <TextField
              type="text"
              name="researchField"
              label="Research Field*"
              value={values.researchField}
              error={Boolean(touched.researchField && errors.researchField)}
              fullWidth
              // helperText={touched.researchField && errors.researchField}
              onBlur={handleBlur}
              onChange={handleChange}
              my={2}
              mr={2}
            />
            <TextField
              type="text"
              name="researchIntrests"
              label="Research Intrests*"
              value={values.researchIntrests}
              error={Boolean(
                touched.researchIntrests && errors.researchIntrests
              )}
              fullWidth
              // helperText={touched.researchIntrests && errors.researchIntrests}
              onBlur={handleBlur}
              onChange={handleChange}
              my={2}
              ml={2}
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <SelectTextField
              type="text"
              name="jobTitle"
              label="Job Title*"
              value={values.jobTitle}
              error={Boolean(touched.jobTitle && errors.jobTitle)}
              fullWidth
              // helperText={touched.jobTitle && errors.jobTitle}
              onBlur={handleBlur}
              getValue={handleChange}
              setFieldValue={setFieldValue}
              my={2}
              mr={2}
            />
            <TextField
              type="text"
              name="institutionEmail"
              label="Institution Email*"
              value={values.institutionEmail}
              error={Boolean(
                touched.institutionEmail && errors.institutionEmail
              )}
              fullWidth
              // helperText={touched.institutionEmail && errors.institutionEmail}
              onBlur={handleBlur}
              onChange={handleChange}
              my={2}
              ml={2}
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <TextField
              type="password"
              name="password"
              label="Password*"
              value={values.password}
              error={Boolean(touched.password && errors.password)}
              fullWidth
              // helperText={touched.password && errors.password}
              onBlur={handleBlur}
              onChange={handleChange}
              my={2}
              mr={2}
              inputProps={{
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
            />
            <TextField
              type="password"
              name="confirmPassword"
              label="Confirm password*"
              value={values.confirmPassword}
              error={Boolean(touched.confirmPassword && errors.confirmPassword)}
              fullWidth
              // helperText={touched.confirmPassword && errors.confirmPassword}
              onBlur={handleBlur}
              onChange={handleChange}
              my={2}
              ml={2}
            />
          </Box>

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
              mt: 2,
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
