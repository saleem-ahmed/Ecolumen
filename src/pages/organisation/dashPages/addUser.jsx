/* eslint-disable no-undef */
// import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Grid,
  Box,
  Typography,
  FormControl,
  Button,
  Select,
  MenuItem,
  Checkbox,
  TextField,
  InputLabel,
  OutlinedInput,
  ListItemText,
} from "@mui/material";
import { useFormik } from "formik";
import { AddCircleOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import UploadImage from "../../../components/ImageUpload/imageupload";
import OrgServices from "../../../apis/Organisation";
import { useAuth } from "../../../Auth";
import Loader from "../../../components/loader";
import "../../../styles/globals/variables.scss";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ["update", "read", "create", "delete"];

const AddUsers = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loader, setloader] = useState(false);
  const [Country, setCountry] = useState("");
  const [City, setCity] = useState("");
  const [Gender, setGender] = useState("");
  const [Role, setRole] = useState("");
  const [Permission, setPermission] = useState([]);
  const [staffImage, setStaffImage] = useState({});
  const [startDate, setStartDate] = useState(new Date());

  const handleImageUpdate = (newImage) => {
    setStaffImage(newImage);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPermission(typeof value === "string" ? value.split(",") : value);
  };
  const formik = useFormik({
    // validationSchema: addUserSchema,
    enableReinitialize: true,
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      state: "",
      country: "",
      city: "",
      gender: "",
      dateOfBrith: "",
      role: "",
      permission: "",
    },

    onSubmit: async () => {
      const data = {
        name: formik.values.firstName + " " + formik.values.lastName,
        email: formik.values.email,
        phoneNumber: formik.values.phone,
        address: formik.values.address,
        state: formik.values.state,
        country: Country,
        city: City,
        gender: Gender,
        dob: startDate,
        role: Role,
        permissions: Permission,
        staffImage: staffImage,
      };
      setloader(true);
      const result = await OrgServices.AddStaff(data, user ? user : null);
      console.log(result);
      navigate("/dashboard/users");
    },
  });

  return (
    <>
      <Loader loaderValue={loader} />
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
          py={"30px"}
          px={"30px"}
          sx={{ borderRadius: "12px" }}
        >
          <Grid container display={"flex"} justifyContent={"center"}>
            <Grid item md={12} xs={12}>
              <UploadImage
                imageProp={staffImage}
                onImageChange={handleImageUpdate}
              />
            </Grid>

            <Grid
              item
              md={12}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <Box sx={{ maxWidth: "636px", width: "100%" }}>
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
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
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
                    label="Email"
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
                    label="Address"
                    required
                    fullWidth
                    name="address"
                    onChange={(e) => {
                      formik.setFieldValue("address", e.target.value);
                    }}
                    value={formik.values.address}
                    error={
                      formik.touched.address && Boolean(formik.errors.address)
                    }
                    helperText={
                      <Typography sx={{ fontSize: 10, color: "red" }}>
                        {formik.touched.address && formik.errors.address}
                      </Typography>
                    }
                  />
                  <TextField
                    label="State"
                    required
                    fullWidth
                    name="state"
                    onChange={(e) => {
                      formik.setFieldValue("state", e.target.value);
                    }}
                    value={formik.values.state}
                    error={formik.touched.state && Boolean(formik.errors.state)}
                    helperText={
                      <Typography sx={{ fontSize: 10, color: "red" }}>
                        {formik.touched.state && formik.errors.state}
                      </Typography>
                    }
                  />
                </Box>
                <Box display={"flex"} gap={"20px"} my={2}>
                  <FormControl fullWidth>
                    <InputLabel>Country</InputLabel>
                    <Select
                      defaultValue={formik.values.country}
                      label="Country"
                      {...{
                        formik,
                        checkValidation: true,
                      }}
                      onChange={(e) => {
                        setCountry(e.target.value);
                        formik.setFieldValue("country", e.target.value);
                      }}
                      error={
                        formik.touched.country && Boolean(formik.errors.country)
                      }
                      // country
                    >
                      <MenuItem value="Pakistan">Pakistan</MenuItem>
                      <MenuItem value="China">China</MenuItem>
                      <MenuItem value="Afghanistan">Afghanistan</MenuItem>
                      <MenuItem value="Iran">Iran</MenuItem>
                      <MenuItem value="India">India</MenuItem>
                      <MenuItem value="Russia">Russia</MenuItem>
                    </Select>
                    {formik.errors.country && (
                      <Typography
                        sx={{ fontSize: 10, color: "red", paddingLeft: "10px" }}
                      >
                        {formik.errors.country}
                      </Typography>
                    )}
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>City</InputLabel>
                    <Select
                      defaultValue={formik.values.city}
                      label="City"
                      {...{
                        formik,
                        checkValidation: true,
                      }}
                      onChange={(e) => {
                        setCity(e.target.value);
                        formik.setFieldValue("city", e.target.value);
                      }}
                      error={formik.touched.city && Boolean(formik.errors.city)}
                      // city
                    >
                      <MenuItem value="Pakistan">Pakistan</MenuItem>
                      <MenuItem value="China">China</MenuItem>
                      <MenuItem value="Afghanistan">Afghanistan</MenuItem>
                      <MenuItem value="Iran">Iran</MenuItem>
                      <MenuItem value="India">India</MenuItem>
                      <MenuItem value="Russia">Russia</MenuItem>
                    </Select>
                    {formik.errors.city && (
                      <Typography
                        sx={{ fontSize: 10, color: "red", paddingLeft: "10px" }}
                      >
                        {formik.errors.city}
                      </Typography>
                    )}
                  </FormControl>
                </Box>
                <Box
                  display={"flex"}
                  gap={"20px"}
                  sx={{ width: "100%", boxSizing: "border-box" }}
                  my={2}
                >
                  <FormControl fullWidth>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      defaultValue={formik.values.gender}
                      label="Gender"
                      {...{
                        formik,
                        checkValidation: true,
                      }}
                      onChange={(e) => {
                        setGender(e.target.value);
                        formik.setFieldValue("gender", e.target.value);
                      }}
                      error={
                        formik.touched.gender && Boolean(formik.errors.gender)
                      }
                      // country
                    >
                      <MenuItem value="Pakistan">Male</MenuItem>
                      <MenuItem value="China">Female</MenuItem>
                    </Select>
                    {formik.errors.gender && (
                      <Typography
                        sx={{ fontSize: 10, color: "red", paddingLeft: "10px" }}
                      >
                        {formik.errors.gender}
                      </Typography>
                    )}
                  </FormControl>
                  <Box width={"100%"} display={"flex"} alignItems={"center"}>
                    <DatePicker
                      showIcon
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                  </Box>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  gap={"20px"}
                  my={2}
                >
                  <Typography variant="h2">Role</Typography>
                  <Button
                    color="success"
                    variant="contained"
                    startIcon={<AddCircleOutline />}
                    onClick={() => {
                      // formik.handleSubmit();
                    }}
                  >
                    Add role
                  </Button>
                </Box>
                <Box display={"flex"} gap={"20px"} my={2}>
                  <FormControl fullWidth>
                    <InputLabel>Role</InputLabel>
                    <Select
                      defaultValue={formik.values.role}
                      label="Role"
                      {...{
                        formik,
                        checkValidation: true,
                      }}
                      onChange={(e) => {
                        setRole(e.target.value);

                        formik.setFieldValue("role", e.target.value);
                      }}
                      error={formik.touched.role && Boolean(formik.errors.role)}
                      // country
                    >
                      <MenuItem value="admin">admin</MenuItem>
                      <MenuItem value="staff">staff</MenuItem>
                      <MenuItem value="manager">manager</MenuItem>
                    </Select>
                    {formik.errors.role && (
                      <Typography
                        sx={{ fontSize: 10, color: "red", paddingLeft: "10px" }}
                      >
                        {formik.errors.role}
                      </Typography>
                    )}
                  </FormControl>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  gap={"20px"}
                  my={2}
                >
                  <Typography variant="h2">Permission</Typography>
                  <Button
                    color="success"
                    variant="contained"
                    onClick={() => {
                      // formik.handleSubmit();
                    }}
                  >
                    <AddCircleOutline />
                  </Button>
                </Box>
                <Box display={"flex"} gap={"20px"} my={2}>
                  <FormControl fullWidth>
                    <InputLabel id="Permission">Permission</InputLabel>
                    <Select
                      labelId="Permission"
                      id="demo-multiple-checkbox"
                      multiple
                      value={Permission}
                      onChange={handleChange}
                      input={<OutlinedInput label="Permission" />}
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}
                    >
                      {names.map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox checked={Permission.indexOf(name) > -1} />
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Box display={"flex"} justifyContent={"center"}>
                  <Button
                    color="success"
                    variant="contained"
                    onClick={() => {
                      formik.handleSubmit();
                    }}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </>
  );
};

export default AddUsers;
