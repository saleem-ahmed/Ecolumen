import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Button,
} from "@mui/material";
import OrgServices from "../../../apis/Organisation";
import { useAuth } from "../../../Auth";
import { useFormik } from "formik";
import Loader from "../../../components/loader";
import Alerts from "../../../components/Customalerts";
import { permissionSchema } from "../../../components/Validations/validation";

const UserPermissions = () => {
  const { user } = useAuth();
  const [roles, setRoles] = useState();
  const [Role, setRole] = useState();
  const [Permission, setPermission] = useState([]);
  const [loader, setloader] = useState(false);
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

  useEffect(() => {
    FetchRoles();
  }, []);

  const FetchRoles = async () => {
    await OrgServices.getAllRoles(user ? user : null)
      .then((res) => {
        if (res.status === "success") {
          console.log(res.message, "success");
          setRoles(res.roles);
        } else {
          console.log(res.message, "error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const RolesPermission = [
    "value1",
    "value2",
    "value3",
    "value4",
    "value5",
    "value6",
    "value7",
    "value8",
    "value9",
    "value10",
    "value11",
    "value12",
    "value13",
  ];

  const formik = useFormik({
    validationSchema: permissionSchema,
    enableReinitialize: true,
    initialValues: {
      role: "",
      permission: "",
    },

    onSubmit: async () => {
      const data = {
        permissions: Permission,
      };
      console.log(data);
      setloader(true);
      OrgServices.setPermission(data, user, Role).then((res) => {
        console.log(Role, "role Send to api")
        if (res.status === "success") {
          setloader(false);
          handleSnackbarOpen(res.message, "success");
        } else {
          console.log("error: ", res.status)
          setloader(false);
          handleSnackbarOpen(res.message, "error");
        }
      }).catch((error) => {
        setloader(false)
        handleSnackbarOpen(error);

      });
      resetForm();
    },
  });

  const handlePermissionChange = (event) => {
    const value = event.target.value;
    setPermission(typeof value === "string" ? value.split(",") : value);
    formik.setFieldValue(
      "permission",
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <>
      <Loader loaderValue={loader} />
      <Alerts
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleClose={handleSnackbarClose}
      />
      <Box>
        <Typography variant="h2">Set Permission</Typography>
      </Box>
      <Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          gap={"20px"}
          bgcolor={"#fff"}
          p={2}
        >
          <Box width={"100%"}>
            <FormControl
              sx={{
                width: { xs: "100%", lg: "50%" },
              }}
            >
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
                error={formik.touched.role && Boolean(formik.errors.role)}

              >
                {roles?.map((role) => (
                  <MenuItem key={role.roleName} value={role._id}>
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
          <Box width={"100%"}>
            <FormControl fullWidth>
              <InputLabel>Permissions</InputLabel>
              <Select
                label="Permission"
                multiple
                value={Permission}
                onChange={handlePermissionChange}
                renderValue={(selected) => selected.join(", ")}
                error={formik.touched.permission && Boolean(formik.errors.permission)}
                
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 48 * 4.5 + 8,
                      width: 500,
                    },
                  },
                }}
              >
                {RolesPermission.map((value) => (
                  <MenuItem key={value} value={value}>
                    <Checkbox checked={Permission.includes(value)} />
                    <ListItemText primary={value} />
                  </MenuItem>
                ))}
              </Select>
              {formik.errors.permission && (
                <Typography
                  sx={{
                    fontSize: 10,
                    color: "red",
                    paddingLeft: "10px",
                  }}
                >
                  {formik.errors.permission}
                </Typography>
              )}
            </FormControl>
          </Box>
          <Box>
            <Button
              color="success"
              variant="contained"
              onClick={() => formik.handleSubmit()}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserPermissions;