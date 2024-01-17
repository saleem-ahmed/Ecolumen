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
  // password: yup
  //   .string()
  //   .required("Required field *")
  //   .min(8, "Must be at least 8 characters.")
  //   .matches(
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
  //     "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
  //   ),
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

export const stepTwoValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Required field *")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Invalid email address format"
    ),
  // phone: yup.string().required("Country is required"),
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
  phone: yup
    .string()
    .required("Required field *")
    .matches(/^[0-9]{10}$/, "Invalid phone number"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Required field *")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Invalid email address format"
    ),
  // Role: yup.string().required("Required field *"),
  confirmPassword: yup.string().required("Required field *"),
  passwords: yup.string().required("Required field *"),
  // divisions: yup.string().required("Required field *"),
});

// export const classesSchema = yup.object().shape({
//   name: yup.string().required("Required field *"),
//   description: yup.string().required("Required field *"),
//   type: yup.string().required("Required field *"),
//   trainer: yup.string().required("Required field *"),
//   duration: yup.string().required("Required field *"),
//   capacity: yup.string().required("Required field *"),
// });

// export const newMemberSchema = yup.object().shape({
//   name: yup.string().required("Required field *"),
//   surname: yup.string().required("Required field *"),
//   phone: yup
//     .string()
//     .required("Required field *")
//     .matches(/^[0-9]{10}$/, "Invalid phone number"),
//   email: yup
//     .string()
//     .email("Invalid email address")
//     .required("Required field *")
//     .matches(
//       /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//       "Invalid email address format"
//     ),
//   address: yup.string().required("Required field *"),
// });

// export const addStaffSchema = yup.object().shape({
//   name: yup.string().required("Required field *"),
//   surname: yup.string().required("Required field *"),
//   phone: yup
//     .string()
//     .required("Required field *")
//     .matches(/^[0-9]{10}$/, "Invalid phone number"),
//   email: yup
//     .string()
//     .email("Invalid email address")
//     .required("Required field *")
//     .matches(
//       /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//       "Invalid email address format"
//     ),
//   password: yup
//     .string()
//     .required("Required field *")
//     .min(8, "Must be at least 8 characters.")
//     .matches(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
//       "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
//     ),
//   role: yup.string().required("Required field *"),
// });

// export const createNewProductSchema = yup.object().shape({
//   productName: yup.string().required("Required field *"),
//   smartBillCode: yup.string().required("Required field *"),
//   category: yup.string().required("Required field *"),
//   price: yup.string().required("Required field *"),
//   VAT: yup.string().required("Required field *"),
//   stock: yup.string().required("Required field *"),
// });
