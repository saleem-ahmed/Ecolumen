/* eslint-disable no-undef */
// import React from "react";
import { useContext, useEffect, useState } from "react";
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
  TextField,
  InputLabel,
} from "@mui/material";
import { useFormik } from "formik";
import { AddCircleOutline } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import UploadImage from "../../../components/ImageUpload/imageupload";
import OrgServices from "../../../apis/Organisation";
import { AuthContext } from "../../../Auth";
import Loader from "../../../components/loader";
import "../../../styles/globals/variables.scss";
import { addUserSchema } from "../../../components/Validations/validation";
import Alerts from "../../../components/Customalerts";

const AddUsers = () => {
  const navigate = useNavigate();

  const { staff } = useContext(AuthContext);
  

  const [loader, setLoader] = useState(false);
  const [Country, setCountry] = useState("");
  const [City, setCity] = useState("");
  const [Gender, setGender] = useState("");
  const [Role, setRole] = useState("");
  const [staffImage, setStaffImage] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    OrgServices.getAllRoles(staff?.organization)
      .then((res) => {
        if (res.status === "success") {
          setRoles(res.roles);
          console.log(res.roles, "sucess");
        } else {
          console.log(res.message, "error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleImageUpdate = (newImage) => {
    setStaffImage(newImage);
  };
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSnackbarOpen = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
      password: "",
      dateOfBrith: {},
      role: "",
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
        password: "12345678",
        staffImage: "staffImage",
      };
      console.log(data, "values after submit");
      setLoader(true);
      try {
        const res = await OrgServices.AddStaff(data, staff?.organization);
        console.log(res, "res.adduser 200");
        if (res.status === "success") {
          handleSnackbarOpen(res.message, "success");
          navigate("/staffDashboard/users");
        } else {
          setLoader(false);
          handleSnackbarOpen(res.message, "error");
        }
      } catch (error) {
        setLoader(false);
        handleSnackbarOpen(error.data.message, "error");
      } finally {
        setLoader(false);
      }
    },
  });

  return (
    <>
      <Loader loaderValue={loader} />
      <Alerts
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleClose={handleSnackbarClose}
      />
      <Grid>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            my: "20px",
            width: "100%",
          }}
        >
          <Typography variant="h2" sx={{ color: "#000", fontSize: "26px" }}>
            Add Staff
          </Typography>
        </Box>

        <Box
          sx={{
            borderRadius: "12px",
            position: "relative",
            px: { xs: "10px", md: "30px" },
            py: "30px",
            bgcolor: "#ffffff",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "10px",
              left: "10px",
              borderRadius: "50%",
              height: "30px",
              width: "30px",
              p: "5px",
              bgcolor: "#ffffff",
            }}
          >
            <Link to="/staffDashboard/users">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
              >
                <path
                  d="M15.0001 0L15.0004 0.0043945C19.1444 0.0043945 22.8946 1.68212 25.6065 4.39401C28.3184 7.1059 29.9961 10.8556 29.9961 14.9996H30.0005V15.0001H29.9961C29.9961 19.1446 28.3181 22.8943 25.6065 25.6062C22.8943 28.3179 19.1449 29.9956 15.0006 29.9956V30H15.0001V29.9956C10.8559 29.9956 7.1059 28.3179 4.39401 25.606C1.68212 22.8941 0.0043945 19.1446 0.0043945 15.0004H0V14.9999H0.0043945C0.0043945 10.8556 1.68212 7.1059 4.39401 4.39376C7.1059 1.68212 10.8556 0.0043945 14.9999 0.0043945L15.0001 0ZM17.505 10.371C17.9708 9.89201 17.9598 9.12566 17.4811 8.65984C17.0018 8.19378 16.2355 8.20452 15.7696 8.68352L10.4381 14.1815L11.3056 15.0253L10.4345 14.1805C9.96794 14.6617 9.97966 15.43 10.4609 15.8966C10.475 15.9103 10.4892 15.9232 10.5036 15.9362L15.7699 21.3211C16.2357 21.8001 17.0021 21.8109 17.4813 21.3448C17.9601 20.879 17.971 20.1126 17.5052 19.6334L12.9948 15.0216L17.505 10.371Z"
                  fill="#284259"
                />
              </svg>
            </Link>
          </Box>
          <Grid container sx={{ display: "flex", justifyContent: "center" }}>
            <Grid item md={12} xs={12}>
              <UploadImage
                imageProp={staffImage}
                onImageChange={handleImageUpdate}
              />
            </Grid>

            <Grid
              item
              md={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box sx={{ maxWidth: "636px", width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: "20px",
                    my: 2,
                  }}
                >
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
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: "20px",
                    my: 2,
                  }}
                >
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
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: "20px",
                    my: 2,
                  }}
                >
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

                  <FormControl fullWidth>
                    <InputLabel>State</InputLabel>
                    <Select
                      label="State"
                      value={formik.values.state}
                      onChange={formik.handleChange}
                      name="state"
                      error={
                        formik.touched.state && Boolean(formik.errors.state)
                      }
                    >
                      <MenuItem value="">
                        <em>Select State</em>
                      </MenuItem>
                      <MenuItem value="punjab">
                        <em>Punjab</em>
                      </MenuItem>
                      <MenuItem value="sindh">
                        <em>Sindh</em>
                      </MenuItem>
                      <MenuItem value="kpk">
                        <em>KPK</em>
                      </MenuItem>
                      <MenuItem value="gilgit-baltistan">
                        <em>Gilgit Baltistan</em>
                      </MenuItem>
                      <MenuItem value="balochistan">
                        <em>Balochistan</em>
                      </MenuItem>
                    </Select>
                    {formik.touched.state && formik.errors.state && (
                      <Typography
                        sx={{ fontSize: 10, color: "red", paddingLeft: "10px" }}
                      >
                        {formik.errors.state}
                      </Typography>
                    )}
                  </FormControl>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: "20px",
                    my: 2,
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel>Country</InputLabel>
                    <Select
                      value={formik.values.country}
                      label="Country"
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
                      value={formik.values.city}
                      label="City"
                      onChange={(e) => {
                        setCity(e.target.value);
                        formik.setFieldValue("city", e.target.value);
                      }}
                      error={formik.touched.city && Boolean(formik.errors.city)}
                      // city
                    >
                      <MenuItem value="">
                        <em>Select City</em>
                      </MenuItem>
                      <MenuItem value="Karachi">Karachi</MenuItem>
                      <MenuItem value="Lahore">Lahore</MenuItem>
                      <MenuItem value="Islamabad">Islamabad</MenuItem>
                      <MenuItem value="Rawalpindi">Rawalpindi</MenuItem>
                      <MenuItem value="Faisalabad">Faisalabad</MenuItem>
                      <MenuItem value="Multan">Multan</MenuItem>
                      <MenuItem value="Peshawar">Peshawar</MenuItem>
                      <MenuItem value="Quetta">Quetta</MenuItem>
                      <MenuItem value="Sialkot">Sialkot</MenuItem>
                      <MenuItem value="Gujranwala">Gujranwala</MenuItem>
                      <MenuItem value="Hyderabad">Hyderabad</MenuItem>
                      <MenuItem value="Sargodha">Sargodha</MenuItem>
                      <MenuItem value="Bahawalpur">Bahawalpur</MenuItem>
                      <MenuItem value="Sukkur">Sukkur</MenuItem>
                      <MenuItem value="Jhang">Jhang</MenuItem>
                      <MenuItem value="Larkana">Larkana</MenuItem>
                      <MenuItem value="Sheikhupura">Sheikhupura</MenuItem>
                      <MenuItem value="Rahim Yar Khan">Rahim Yar Khan</MenuItem>
                      <MenuItem value="Sahiwal">Sahiwal</MenuItem>
                      <MenuItem value="Mardan">Mardan</MenuItem>
                      <MenuItem value="Gujrat">Gujrat</MenuItem>
                      <MenuItem value="Kasur">Kasur</MenuItem>
                      <MenuItem value="Dera Ghazi Khan">
                        Dera Ghazi Khan
                      </MenuItem>
                      <MenuItem value="Nawabshah">Nawabshah</MenuItem>
                      <MenuItem value="Okara">Okara</MenuItem>
                      <MenuItem value="Chiniot">Chiniot</MenuItem>
                      <MenuItem value="Jacobabad">Jacobabad</MenuItem>
                      <MenuItem value="Kohat">Kohat</MenuItem>
                      <MenuItem value="Jhelum">Jhelum</MenuItem>
                      <MenuItem value="Gilgit">Gilgit</MenuItem>
                      <MenuItem value="Skardu">Skardu</MenuItem>
                      <MenuItem value="Hunza">Hunza</MenuItem>
                      <MenuItem value="Chilas">Chilas</MenuItem>
                      <MenuItem value="Astore">Astore</MenuItem>
                      <MenuItem value="Khaplu">Khaplu</MenuItem>
                      <MenuItem value="Nagar">Nagar</MenuItem>
                      <MenuItem value="Ghanche">Ghanche</MenuItem>
                      <MenuItem value="Ghizer">Ghizer</MenuItem>
                      <MenuItem value="Shigar">Shigar</MenuItem>
                      <MenuItem value="Rondu">Rondu</MenuItem>
                      <MenuItem value="Yasin">Yasin</MenuItem>
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
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: "20px",
                    my: 2,
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      value={formik.values.gender}
                      label="Gender"
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
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      maxWidth: "303px",
                      border: "1px solid #c4c4c4",
                      borderRadius: "6px",
                      overflow: "hidden",
                    }}
                  >
                    <DatePicker
                      showIcon
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    gap: "20px",
                    my: 2,
                  }}
                >
                  <Box width={"100%"}>
                    <FormControl fullWidth>
                      <InputLabel>Role</InputLabel>
                      <Select
                        value={formik.values.role}
                        label="Role"
                        // {...{
                        //   formik,
                        //   checkvalidation: true,
                        // }}
                        onChange={(e) => {
                          setRole(e.target.value);

                          formik.setFieldValue("role", e.target.value);
                        }}
                        error={
                          formik.touched.role && Boolean(formik.errors.role)
                        }
                        // country
                      >
                        {roles?.map((role) => (
                          <MenuItem key={role.roleName} value={role.roleName}>
                            {role.roleName}
                          </MenuItem>
                        ))}
                      </Select>
                      {formik.errors.role && (
                        <Typography
                          sx={{
                            fontSize: 10,
                            color: "red",
                            paddingLeft: "10px",
                          }}
                        >
                          {formik.errors.role}
                        </Typography>
                      )}
                    </FormControl>
                  </Box>
                  {/* <Button
                    color="success"
                    variant="contained"
                    startIcon={<AddCircleOutline />}
                    onClick={() => {
                      navigate("/staffDashboard/userRole");
                    }}
                    sx={{ fontSize: "12px", width: "100%", maxWidth: "150px" }}
                  >
                    Add role
                  </Button> */}
                </Box>

                <Box display={"flex"} justifyContent={"center"} gap={"20px"}>
                  <Button
                    color="success"
                    variant="outlined"
                    onClick={() => {
                      navigate("/staffDashboard/users");
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    // type="submit"
                    color="success"
                    variant="contained"
                    onClick={() => formik.handleSubmit()}
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
