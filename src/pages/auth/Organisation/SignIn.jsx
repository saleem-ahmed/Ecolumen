import { useEffect, useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Logo from "../../../assets/logo.svg";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Grid,
  Box,
  Container,
  TextField,
  Stack,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "react-intl-tel-input/dist/main.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Alerts from "../../../components/Customalerts";
import { useAuth } from "../../../Auth/index";
import Loader from "../../../components/loader";
import Service from "../../../apis/services"
import {
  stepOneValidationSchema,
  stepTwoValidationSchema,
  stepThreeValidationSchema,
  VerifySchema,
} from "../../../components/Validations/validation";
import OrgServices from "../../../apis/Organisation"

const steps = [
  {
    label: "Organization Details",
  },
  {
    label: "Contact Person Details",
  },
  {
    label: "Privacy",
  },
  // {
  //   label: "Verification",
  // },
  {
    label: "Confirmation",
  },
];

export default function SignIn() {
  const { registerOrg } = useAuth();
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [Country, setCountry] = useState("");
  const [State, setState] = useState("");
  const [City, setCity] = useState("");
  const [Type, setType] = useState("");
  const [Find, setFind] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  const handleSnackbarOpen = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };


  //selects country / state / city
  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch('http://api.geonames.org/countryInfoJSON?username=ahmedsaleem');
      const data = await response.json();
      setCountries(data.geonames);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchStates = async (countryCode) => {
    try {
      const response = await fetch(`http://api.geonames.org/childrenJSON?geonameId=${countryCode}&username=ahmedsaleem`);
      const data = await response.json();
      setStates(data.geonames);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const fetchCities = async (stateCode) => {
    try {
      const response = await fetch(`http://api.geonames.org/childrenJSON?geonameId=${stateCode}&username=ahmedsaleem`);
      const data = await response.json();
      setCities(data.geonames);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleCountryChange = (event) => {
    const countryCode = event.target.value;
    setSelectedCountry(countryCode);
    setSelectedState('');
    setSelectedCity('');
    fetchStates(countryCode);
  };

  const handleStateChange = (event) => {
    const stateCode = event.target.value;
    setSelectedState(stateCode);
    setSelectedCity('');
    fetchCities(stateCode);
  };

  const handleCityChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);
  };

  const formik1 = useFormik({
    validationSchema: stepOneValidationSchema,
    enableReinitialize: true,
    initialValues: {
      orgname: "",
      country: "",
      state: "",
      city: "",
      postalCode: "",
      type: "",
      website: "",
      numberOfEmployees: "",
      find: "",
    },
    onSubmit: async () => {
      const data = {
        orgname: formik1.values.orgname,
        country: selectedCountry,
        state: selectedState,
        city: selectedCity,
        postalcode: formik1.values.postalCode,
        orgtype: formik1.values.type,
        website: formik1.values.website,
        empnumber: formik1.values.numberOfEmployees,
        find: Find,
      }
      handleNext();
      console.log(data)
    },
  });

  const formik2 = useFormik({
    validationSchema: stepTwoValidationSchema,
    enableReinitialize: true,
    initialValues: {
      email: "",
      phone: "",
    },
    onSubmit: async () => {
      handleNext();
    },
  });

  const formik3 = useFormik({
    validationSchema: stepThreeValidationSchema,
    enableReinitialize: true,
    initialValues: {
      password: "",
      confirmPassword: "",
    },

    onSubmit: async () => {
      // setLoading(true);
      // const data = {
      //   email: formik2.values.email,
      // }
      // await OrgServices.verifyEmail(data)
      //   .then((res) => {
      //     setLoading(false);
      //     handleNext();
      //     console.log(res.data)
      //     handleSnackbarOpen(res.message, "success")
      //     console.log(res);
      //   }).catch((error) => {
      //     setLoading(false);
      //     console.log('Error:', error.data)
      //     handleSnackbarOpen(error.data.message, "error");
      //   });
      handleNext();
    },
  });

  // const formik4 = useFormik({
  //   enableReinitialize: true,
  //   validationSchema: VerifySchema,
  //   initialValues: {
  //     code: "",
  //   },
  //   onSubmit: async () => {


  //     handleNext();
  //   },
  // });

  const apiCall = async () => {
    const data = {
      name: formik1.values.orgname,
      country: Country,
      state: State,
      city: City,
      postalcode: formik1.values.postalCode,
      orgtype: formik1.values.type,
      website: formik1.values.website,
      empnumber: formik1.values.numberOfEmployees,
      findus: Find,
      email: formik2.values.email,
      phone: formik2.values.phone,
      password: formik3.values.password,
    };
    await registerOrg(data)
      .then((res) => {
        if (res.status === "success") {
          console.log(res, "RegisterOrg");
          handleSnackbarOpen(res.message);
          Navigate("/orglogin");
        } else {
          console.log(res.message);
        }
      })
      .catch((error) => {
        console.log(error, "err");
      });
  };

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Grid container>
      <Loader loaderValue={loading} />
      <Alerts
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleClose={handleSnackbarClose}
      />
      <Grid
        item
        xs={12}
        md={4}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={"20px"}
        bgcolor={"#284259"}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"flex-start"}
          justifyContent={"center"}
          gap={"20px"}
          py={"30px"}
        >
          <img src={Logo} alt="" width={"124px"} />
          <Typography variant="h2" sx={{ fontSize: "16px", color: "#FFF" }}>
            Enter your organization details to get access.
          </Typography>
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "max-content",
            }}
          >
            {steps.map((step) => (
              <Step key={step.label}>
                <StepLabel
                  sx={{
                    color: "#fff",
                  }}
                >
                  <Typography variant="caption"> {step.label}</Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Grid>
      <Grid item xs={12} md={8} height={"100vh"}>
        {activeStep === 0 ? (
          <Container
            maxWidth="md"
            style={{ width: "100%", maxWidth: "513px", height: "100%" }}
          >

            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              height={"100%"}
              justifyContent={"center"}
            >
              <Grid container direction={"column"} spacing={2}>
                <Grid item sx={{ pl: 0 }}>
                  <Typography
                    variant="h2"
                    sx={{ fontSize: "26px", textAlign: "center" }}
                  >
                    Your Organization Details
                  </Typography>
                </Grid>
                <Grid item>
                  <TextField
                    label="Name"
                    required
                    fullWidth
                    name="orgname"
                    onChange={(e) => {
                      formik1.setFieldValue("orgname", e.target.value);
                    }}
                    value={formik1.values.orgname}
                    error={
                      formik1.touched.orgname && Boolean(formik1.errors.orgname)
                    }
                    helperText={
                      <Typography sx={{ fontSize: 10, color: "red" }}>
                        {formik1.touched.orgname && formik1.errors.orgname}
                      </Typography>
                    }
                  />
                </Grid>
                <Grid item display={"flex"} flexDirection={"row"} gap={"20px"}>
                  <FormControl fullWidth>
                    <InputLabel>Country</InputLabel>
                    <Select
                      label="Country"
                      value={Country}
                      onChange={(e) => {
                        handleCountryChange(e);
                        setCountry(e.target.value);
                        formik1.setFieldValue("country", e.target.value);
                      }}
                      error={formik1.touched.country && Boolean(formik1.errors.country)}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            width: 100,
                            maxHeight: 200,
                          },
                        },
                      }}
                    >
                      <MenuItem value="">
                        <em>Select Country</em>
                      </MenuItem>
                      {countries?.map((country) => (
                        <MenuItem key={country.geonameId} value={country.geonameId}>
                          {country.countryName}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik1.touched.country && formik1.errors.country && (
                      <Typography sx={{ fontSize: 10, color: "red", paddingLeft: "10px" }}>
                        {formik1.errors.country}
                      </Typography>
                    )}
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>State</InputLabel>
                    <Select
                      value={selectedState}
                      label="State"
                      onChange={(e) => {
                        handleStateChange(e);
                        setState(e.target.value);
                        formik1.setFieldValue("state", e.target.value);
                      }}
                      error={formik1.touched.state && Boolean(formik1.errors.state)}
                    >
                      <MenuItem value="">
                        <em>Select State</em>
                      </MenuItem>
                      {states?.map((state) => (
                        <MenuItem key={state.geonameId} value={state.geonameId}>
                          {state.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik1.touched.state && formik1.errors.state && (
                      <Typography sx={{ fontSize: 10, color: "red", paddingLeft: "10px" }}>
                        {formik1.errors.state}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                <Grid item display={"flex"} flexDirection={"row"} gap={"30px"}>
                  <FormControl fullWidth>
                    <InputLabel>City</InputLabel>

                    <Select
                      value={selectedCity}
                      label="City"
                      onChange={(e) => {
                        handleCityChange(e);
                        formik1.setFieldValue("city", e.target.value);
                        setCity(e.target.value);
                      }}
                      error={
                        formik1.touched.city && Boolean(formik1.errors.city)
                      }
                    >
                      {cities?.map((city) => (
                        <MenuItem key={city.geonameId} value={city.name}>
                          {city.name}
                        </MenuItem>
                      ))}

                    </Select>
                    {formik1.errors.city && (
                      <Typography
                        sx={{ fontSize: 10, color: "red", paddingLeft: "10px" }}
                      >
                        {formik1.errors.city}
                      </Typography>
                    )}
                  </FormControl>
                  <TextField
                    label="Postal code"
                    required
                    fullWidth
                    name="postalCode"
                    onChange={(e) => {
                      formik1.setFieldValue("postalCode", e.target.value);
                    }}
                    value={formik1.values.postalCode}
                    error={
                      formik1.touched.postalCode &&
                      Boolean(formik1.errors.postalCode)
                    }
                    helperText={
                      <Typography sx={{ fontSize: 10, color: "red" }}>
                        {formik1.touched.postalCode &&
                          formik1.errors.postalCode}
                      </Typography>
                    }
                  />
                </Grid>
                <Grid item display={"flex"} flexDirection={"row"} gap={"30px"}>
                  <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select
                      defaultValue={Type}
                      label="Type"

                      onChange={(e) => {
                        formik1.setFieldValue("type", e.target.value);
                        setType(e.target.value);
                      }}
                      error={
                        formik1.touched.type && Boolean(formik1.errors.type)
                      }
                    >
                      <MenuItem value={"Governoment"}>Governoment</MenuItem>
                      <MenuItem value={"Private"}>Private</MenuItem>
                      <MenuItem value={"ngo"}>NGO</MenuItem>
                    </Select>
                    {formik1.errors.type && (
                      <Typography
                        sx={{ fontSize: 10, color: "red", paddingLeft: "10px" }}
                      >
                        {formik1.errors.type}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                <Grid item>
                  <TextField
                    label="website"
                    required
                    fullWidth
                    name="website"
                    onChange={(e) => {
                      formik1.setFieldValue("website", e.target.value);
                    }}
                    value={formik1.values.website}
                    error={
                      formik1.touched.website && Boolean(formik1.errors.website)
                    }
                    helperText={
                      <Typography sx={{ fontSize: 10, color: "red" }}>
                        {formik1.touched.website && formik1.errors.website}
                      </Typography>
                    }
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Number of Employee"
                    required
                    fullWidth
                    name="numberOfEmployees"
                    onChange={(e) => {
                      formik1.setFieldValue(
                        "numberOfEmployees",
                        e.target.value
                      );
                    }}
                    value={formik1.values.numberOfEmployees}
                    error={
                      formik1.touched.numberOfEmployees &&
                      Boolean(formik1.errors.numberOfEmployees)
                    }
                    helperText={
                      <Typography sx={{ fontSize: 10, color: "red" }}>
                        {formik1.touched.numberOfEmployees &&
                          formik1.errors.numberOfEmployees}
                      </Typography>
                    }
                  />
                </Grid>
                <Grid item display={"flex"} flexDirection={"row"} gap={"30px"}>
                  <FormControl fullWidth>
                    <InputLabel>How did you find us</InputLabel>
                    <Select
                      defaultValue={formik1.values.find}
                      label="Find"
                      // {...{
                      //   formik1,
                      //   checkvalidation: true,
                      // }}
                      onChange={(e) => {
                        formik1.setFieldValue("find", e.target.value);
                        setFind(e.target.value);
                      }}
                      error={
                        formik1.touched.find && Boolean(formik1.errors.find)
                      }
                    >
                      <MenuItem value={"facebook"}>facebook</MenuItem>
                      <MenuItem value={"twitter"}>twitter</MenuItem>
                      <MenuItem value={"other"}>Other</MenuItem>
                    </Select>
                    {formik1.errors.find && (
                      <Typography
                        sx={{ fontSize: 10, color: "red", paddingLeft: "10px" }}
                      >
                        {formik1.errors.find}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
              </Grid>

              <Button
                type="submit"
                color="success"
                variant="contained"
                sx={{ marginTop: "20px", width: "100%" }}
                onClick={() => {
                  formik1.handleSubmit();
                }}
              >
                Next
              </Button>
              <Typography
                variant="subtitle1"
                sx={{
                  textAlign: "left",
                  width: "100%",
                  mt: "18px",
                  fontSize: "14px",
                }}
              >
                Already have an account?{" "}
                <Link to="/orglogin" style={{ textDecoration: "none" }}>
                  {" "}
                  <Typography
                    variant="a"
                    sx={{ cursor: "pointter", color: "#284259" }}
                  >
                    Login
                  </Typography>
                </Link>
              </Typography>
            </Box>
          </Container>
        ) : null}
        {activeStep === 1 ? (
          <Box height={"100%"} position={"relative"}>
            <Container
              maxWidth="lg"
              fullWidth
              display={"flex"}
              flexDirection={"column"}
              style={{
                width: "100%",
                maxWidth: "400px",
                height: "100%",
                position: "relative",
              }}
            >
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                height={"100%"}
                justifyContent={"center"}
              >
                <Grid container direction={"column"} spacing={2}>
                  <Grid item>
                    <Typography
                      variant="h2"
                      sx={{ fontSize: "28px", textAlign: "center" }}
                    >
                      Personal Details
                    </Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      label="Email "
                      required
                      fullWidth
                      name="email"
                      onChange={(e) => {
                        formik2.setFieldValue("email", e.target.value);
                      }}
                      value={formik2.values.email}
                      error={
                        formik2.touched.email && Boolean(formik2.errors.email)
                      }
                      helperText={
                        <Typography sx={{ fontSize: 10, color: "red" }}>
                          {formik2.touched.email && formik2.errors.email}
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item className="countryNumber">
                    <TextField
                      label="Phone "
                      required
                      fullWidth
                      name="phone"
                      onChange={(e) => {
                        formik2.setFieldValue("phone", e.target.value);
                      }}
                      value={formik2.values.phone}
                      error={
                        formik2.touched.phone && Boolean(formik2.errors.phone)
                      }
                      helperText={
                        <Typography sx={{ fontSize: 10, color: "red" }}>
                          {formik2.touched.phone && formik2.errors.phone}
                        </Typography>
                      }
                    />
                  </Grid>
                </Grid>

                <Button
                  color="success"
                  variant="contained"
                  sx={{ marginTop: "20px", width: "100%" }}
                  onClick={() => {
                    formik2.handleSubmit();
                  }}
                >
                  Next
                </Button>
              </Box>
            </Container>
            <Button
              sx={{ position: "absolute", top: "10px", left: "0" }}
              onClick={handleBack}
            >
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
            </Button>
          </Box>
        ) : null}
        {activeStep === 2 ? (
          <Box height={"100%"} position={"relative"}>
            <Container
              maxWidth="md"
              style={{ width: "100%", maxWidth: "400px", height: "100%" }}
            >
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                height={"100%"}
                justifyContent={"center"}
                position={"relative"}
              >
                <Grid container direction={"column"} spacing={2}>
                  <Grid item>
                    <Typography
                      variant="h2"
                      sx={{ fontSize: "28px", textAlign: "center" }}
                    >
                      Password
                    </Typography>
                  </Grid>

                  <Grid item>
                    <TextField
                      label="Password "
                      fullWidth
                      type="password"
                      name="password"
                      onChange={(e) => {
                        formik3.setFieldValue("password", e.target.value);
                      }}
                      value={formik3.values.password}
                      error={
                        formik3.touched.password &&
                        Boolean(formik3.errors.password)
                      }
                      helperText={
                        <Typography sx={{ fontSize: 10, color: "red" }}>
                          {formik3.touched.password && formik3.errors.password}
                        </Typography>
                      }
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label="Confrim Password "
                      type="password"
                      fullWidth
                      name="confirmPassword"
                      onChange={(e) => {
                        formik3.setFieldValue(
                          "confirmPassword",
                          e.target.value
                        );
                      }}
                      value={formik3.values.confirmPassword}
                      error={
                        formik3.touched.confirmPassword &&
                        Boolean(formik3.errors.confirmPassword)
                      }
                      helperText={
                        <Typography sx={{ fontSize: 10, color: "red" }}>
                          {formik3.touched.confirmPassword &&
                            formik3.errors.confirmPassword}
                        </Typography>
                      }
                    />
                  </Grid>
                </Grid>
                <Button
                  color="success"
                  variant="contained"
                  sx={{ marginTop: "20px", width: "100%" }}
                  onClick={() => {
                    formik3.handleSubmit();
                  }}
                >
                  Next
                </Button>
              </Box>
            </Container>
            <Button
              sx={{ position: "absolute", top: "10px", left: "0" }}
              onClick={handleBack}
            >
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
            </Button>
          </Box>
        ) : null}
        {activeStep === 3 ? (
          <Box height={"100%"} position={"relative"}>
            <Container
              maxWidth="md"
              style={{ width: "100%", maxWidth: "577px", height: "100%" }}
            >
              <Grid container spacing={0} height={"100%"} position={"relative"}>
                <Grid
                  item
                  xs={12}
                  p={"10px"}
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems="center"
                  justifyContent="center"
                  height={"100%"}
                  gap={"20px"}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: {
                        xs: 18,
                        sm: 20,
                        md: 25,
                        lg: 27,
                        xl: 28,
                      },
                    }}
                  >
                    Terms and conditions
                  </Typography>
                  <Box display={"flex"} alignItems={"flex-start"}>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label=""
                      size="small"
                    // sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                    />
                    <Typography variant="subtitle1">
                      By clicking Register, you agree to our Terms of Use and
                      Privacy Policy. You may receive email notifications from
                      us and can opt out at any time.
                    </Typography>
                  </Box>

                  <Stack
                    direction="column"
                    alignItems={"center"}
                    spacing={2}
                    width={"100%"}
                  >
                    <Link href="/dashboard" style={{ width: "100%" }}>
                      <Button
                        color="success"
                        variant="contained"
                        sx={{ width: "100%" }}
                        onClick={() => apiCall()}
                      >
                        Register
                      </Button>
                    </Link>
                  </Stack>
                </Grid>
              </Grid>
            </Container>
            <Button
              sx={{ position: "absolute", top: "10px", left: "0" }}
              onClick={handleBack}
            >
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
            </Button>
          </Box>
        ) : null}
      </Grid>
    </Grid>
  );
}
