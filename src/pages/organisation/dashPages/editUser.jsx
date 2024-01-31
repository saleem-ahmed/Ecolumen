import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
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
import DatePicker from "react-datepicker";
import { useFormik } from "formik";
import OrgServices from "../../../apis/Organisation";
import { AddCircleOutline } from "@mui/icons-material";
import { useAuth } from "../../../Auth";
import Loader from "../../../components/loader";
import UploadImage from "../../../components/ImageUpload/imageupload";
import "../../../styles/globals/variables.scss";
// import { addUserSchema } from "../../../components/Validations/validation";

const EditUser = () => {
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loader, setloader] = useState(false);
  // const [Country, setCountry] = useState("");
  // const [City, setCity] = useState("");
  // const [Gender, setGender] = useState("");
  const [Role, setRole] = useState("");
  const [staffImage, setStaffImage] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [roles, setRoles] = useState();
  const handleImageUpdate = (newImage) => {
    setStaffImage(newImage);
  };

  useEffect(() => {
    OrgServices.getAllRoles(user ? user : null)
      .then((res) => {
        if (res.status === "success") {
          console.log(res.message, "success");
          setRoles(res.roles);
          console.log(roles);
        } else {
          console.log(res.message, "error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const formik = useFormik({
    // validationSchema: addUserSchema,
    enableReinitialize: true,
    initialValues: {
      firstName: location.state?.name || "",
      lastName: "",
      email: location.state?.email || "",
      phone: location.state?.phoneNumber || "",
      address: location.state?.address || "",
      state: location.state?.state || "",
      country: location.state?.country || "",
      city: location.state?.city || "",
      gender: location.state?.gender || "",
      dateOfBirth: location.state?.dob || new Date(),
      role: location.state?.roleName || "",
      staffImage: {},
    },

    onSubmit: async () => {
      const data = {
        name: formik.values.firstName + " " + formik.values.lastName,
        email: formik.values.email,
        phoneNumber: formik.values.phone,
        address: formik.values.address,
        state: formik.values.state,
        country: formik.values.country,
        city: formik.values.city,
        gender: formik.values.gender,
        dob: startDate,
        role: Role,
        staffImage: staffImage,
      };
      setloader(true);
      

      OrgServices.upStaff(data, user ? user : null, location.state)
        .then((res) => {
          if (res.status === "success") {
            navigate("/dashboard/users");
            console.log(res.message);
          } else {
            console.log(res.message);
            setloader(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setloader(false);
        });
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
            Edit Users {location.state.name}
          </Typography>
        </Box>
        <Box
          bgcolor={"#ffffff"}
          heigh
          py={"30px"}
          px={"30px"}
          sx={{ borderRadius: "12px", position: "relative" }}
        >
          <Box
            bgcolor={"#ffffff"}
            p={"5px"}
            width={"30px"}
            height={"30px"}
            sx={{
              position: "absolute",
              top: "10px",
              left: "10px",
              borderRadius: "50%",
            }}
          >
            <Link to="/dashboard/users">
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
                        // setCountry(e.target.value);
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
                        // setCity(e.target.value);
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
                        // setGender(e.target.value);
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
                  <Box width={"100%"}>
                    <FormControl fullWidth>
                      <InputLabel>Role</InputLabel>
                      <Select
                        value={formik.values.role}
                        label="Role"
                        {...{
                          formik,
                          checkValidation: true,
                        }}
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
                  <Button
                    color="success"
                    variant="contained"
                    startIcon={<AddCircleOutline />}
                    onClick={() => {
                      navigate("/dashboard/userRole");
                    }}
                    sx={{ fontSize: "12px", width: "100%", maxWidth: "150px" }}
                  >
                    Add role
                  </Button>
                </Box>

                <Box display={"flex"} justifyContent={"center"} gap={"20px"}>
                  <Button
                    color="success"
                    variant="outlined"
                    onClick={() => {
                      navigate("/dashboard/users");
                    }}
                  >
                    Back
                  </Button>
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

export default EditUser;
