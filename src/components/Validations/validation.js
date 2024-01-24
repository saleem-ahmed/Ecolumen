// move to utils

import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Required field *")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Invalid email address format"
    ),
  password: yup.string().required("password is reuried"),
 
});

export const ForgetSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Required field *")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Invalid email address format"
    ),
});

export const VerifySchema = yup.object().shape({
  code: yup
    .string()
    .matches(/^[0-9]{6}$/, "Invalid code, it should be a 6-digit number")
    .required("Required field *"),
});

export const OrgSchema = yup.object().shape({
  code: yup
    .string()
    .matches(/^[0-9]{6}$/, "Invalid code, it should be a 6-digit number")
    .required("Required field *"),
});

export const stepOneValidationSchema = yup.object().shape({
  orgname: yup.string().required("Name is required"),
  country: yup.string().required("Country is required"),
  state: yup.string().required("State is required"),
  city: yup.string().required("City is required"),
  postalCode: yup.string().required("Postal code is required"),
  type: yup.string().required("Type is required"),
  website: yup.string().required("Website is required"),
  numberOfEmployees: yup
    .number()
    .required("Number of employees is required")
    .positive("Number of employees must be positive"),
  find: yup.string().required("How did you find us is required"),
});

export const AddRoleSchema = yup.object().shape({
  name: yup.string().required("Country is required"),
});
export const EditRoleSchema = yup.object().shape({
  name: yup.string().required("Country is required"),
});
export const stepTwoValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Required field *")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Invalid email address format"
    ),
});

export const stepThreeValidationSchema = yup.object().shape({
  password: yup
    .string()
    .required("Required field *")
    .min(8, "Must be at least 8 characters.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    ),
  confirmPassword: yup
    .string()
    .required("Required field *")
    .min(8, "Must be at least 8 characters.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    ),
});

export const addUserSchema = yup.object().shape({
  firstName: yup.string().required("Required field *"),
  lastName: yup.string().required("Required field *"),
  phone: yup.string().required("Required field *"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Required field *")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Invalid email address format"
    ),
  address: yup.string().required("Required field *"),
  state: yup.string().required("Required field *"),
  country: yup.string().required("Required field *"),
  city: yup.string().required("Required field *"),
  gender: yup.string().required("Required field *"),
  Role: yup.string().required("Required field *"),
  dateOfBrith: yup.string().required("Required field *"),
});
