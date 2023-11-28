// import React from "react";
import { Grid, Box, Typography, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { addUserSchema } from "../../../components/Validations/validation";
import OrgServices from "../../../apis/Organisation";


const AddUsers = () => {
  const formik = useFormik({
    validationSchema: addUserSchema,
    enableReinitialize: true,
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      Role: "",
      divisions: "",
      passwords: "",
      confirmPassword: "",
    },
    onSubmit: async () => {
      const data = {
        name: formik.values.name,
        email: formik.values.email,
        position: formik.values.Role,
        phoneNumber: formik.values.phone,
      };
      console.log(data, "formik data add user");
      const result = await OrgServices.AddStaff(data);

      console.log(result);
    },
  });


  return (
    <>
      <Grid>
        <Box
          display={"flex"}
          flexDirection={"column"}
          my={"20px"}
          width={"100%"}
        >
          <Typography variant="h2" sx={{ color: "#000", fontSize: "26px" }}>
            AddUsers
          </Typography>
        </Box>
        <Box
          bgcolor={"#ffffff"}
          heigh
          py={"10px"}
          px={"30px"}
          sx={{ borderRadius: "12px" }}
        >
          <Box component={"div"} sx={{ my: "20px" }}>
            <Typography variant="h3">User Information</Typography>
          </Box>

          <Grid container display={"flex"} justifyContent={"space-between"}>
            <Grid item md={5} xs={12}>
              <input type="file" name="" id="" />
            </Grid>
            <Grid item md={7} xs={12}>
              <Box display={"flex"} gap={"20px"} my={2}>
                <TextField
                  label="First Name"
                  required
                  fullWidth
                  name="firstName"
                  onChange={(e) => {
                    formik.setFieldValue("firstName", e.target.value);
                  }}
                  value={formik.values.firstName}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    <Typography sx={{ fontSize: 10, color: "red" }}>
                      {formik.touched.firstName && formik.errors.firstName}
                    </Typography>
                  }
                />
                <TextField
                  label="Last Name"
                  required
                  fullWidth
                  name="lastName"
                  onChange={(e) => {
                    formik.setFieldValue("lastName", e.target.value);
                  }}
                  value={formik.values.lastName}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={
                    <Typography sx={{ fontSize: 10, color: "red" }}>
                      {formik.touched.lastName && formik.errors.lastName}
                    </Typography>
                  }
                />
              </Box>
              <Box display={"flex"} gap={"20px"} my={2}>
                <TextField
                  label="Email Address"
                  required
                  fullWidth
                  name="email"
                  onChange={(e) => {
                    formik.setFieldValue("email", e.target.value);
                  }}
                  value={formik.values.email}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={
                    <Typography sx={{ fontSize: 10, color: "red" }}>
                      {formik.touched.email && formik.errors.email}
                    </Typography>
                  }
                />
                <TextField
                  label="Phone Number"
                  required
                  fullWidth
                  name="phone"
                  onChange={(e) => {
                    formik.setFieldValue("phone", e.target.value);
                  }}
                  value={formik.values.phone}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={
                    <Typography sx={{ fontSize: 10, color: "red" }}>
                      {formik.touched.phone && formik.errors.phone}
                    </Typography>
                  }
                />
              </Box>
              <Box display={"flex"} gap={"20px"} my={2}>
                <TextField
                  label="Role"
                  required
                  fullWidth
                  name="Role"
                  onChange={(e) => {
                    formik.setFieldValue("Role", e.target.value);
                  }}
                  value={formik.values.Role}
                  error={formik.touched.Role && Boolean(formik.errors.Role)}
                  helperText={
                    <Typography sx={{ fontSize: 10, color: "red" }}>
                      {formik.touched.Role && formik.errors.Role}
                    </Typography>
                  }
                />
                <TextField
                  label="Division Assigned"
                  required
                  fullWidth
                  name="divisions"
                  onChange={(e) => {
                    formik.setFieldValue("divisions", e.target.value);
                  }}
                  value={formik.values.divisions}
                  error={
                    formik.touched.divisions && Boolean(formik.errors.divisions)
                  }
                  helperText={
                    <Typography sx={{ fontSize: 10, color: "red" }}>
                      {formik.touched.divisions && formik.errors.divisions}
                    </Typography>
                  }
                />
              </Box>
              <Box display={"flex"} gap={"20px"} my={2}>
                <TextField
                  label="Password"
                  required
                  fullWidth
                  name="Password"
                  onChange={(e) => {
                    formik.setFieldValue("Password", e.target.value);
                  }}
                  value={formik.values.Password}
                  error={
                    formik.touched.Password && Boolean(formik.errors.Password)
                  }
                  helperText={
                    <Typography sx={{ fontSize: 10, color: "red" }}>
                      {formik.touched.Password && formik.errors.Password}
                    </Typography>
                  }
                />
                <TextField
                  label="Confirm Password"
                  required
                  fullWidth
                  name="confirmPassword"
                  onChange={(e) => {
                    formik.setFieldValue("confirmPassword", e.target.value);
                  }}
                  value={formik.values.confirmPassword}
                  error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                  }
                  helperText={
                    <Typography sx={{ fontSize: 10, color: "red" }}>
                      {formik.touched.confirmPassword &&
                        formik.errors.confirmPassword}
                    </Typography>
                  }
                />
              </Box>
              <Box display={"flex"} justifyContent={"center"}>
                <Button
                  color="success"
                  variant="contained"
                  fullWidth
                  onClick={async () => {
                    formik.handleSubmit();
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </>
  );
};

export default AddUsers;
