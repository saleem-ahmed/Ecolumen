import { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  FormGroup,
  FormControlLabel,
  Button,
} from "@mui/material";
import OrgServices from "../../../apis/Organisation";
import { AuthContext } from "../../../Auth";
import { useFormik } from "formik";
import Loader from "../../../components/loader";
import Alerts from "../../../components/Customalerts";
import { permissionSchema } from "../../../components/Validations/validation";

const UserPermissions = () => {
  const { org } = useContext(AuthContext);
  const [roles, setRoles] = useState();
  const [Role, setRole] = useState();
  // const [Permission, setPermission] = useState([]);
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
    await OrgServices.getAllRoles(org?._id)
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
    "read",
    "update",
    "delete",
    "create",
    "view map",
    "upload data",
    "download report",
  ];

  const formik = useFormik({
    validationSchema: permissionSchema,
    enableReinitialize: true,
    initialValues: {
      role: "",
      permissions: [],
    },

    onSubmit: async (values) => {
      const data = {
        permissions: values.permissions,
      };
      console.log(data);
      setloader(true);
      OrgServices.setPermission(data, org, Role)
        .then((res) => {
          console.log(Role, "role Send to api");
          if (res.status === "success") {
            setloader(false);
            handleSnackbarOpen(res.message, "success");
          } else {
            console.log("error: ", res.status);
            setloader(false);
            handleSnackbarOpen(res.message, "error");
          }
        })
        .catch((error) => {
          setloader(false);
          handleSnackbarOpen(error);
        });
      formik.resetForm();
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
            <Box display={"content"} sx={{ display: "content" }}>
              {RolesPermission.map((permission) => (
                <FormControlLabel
                  key={permission}
                  control={
                    <Checkbox
                      checked={formik.values.permissions.includes(permission)}
                      onChange={(e) => {
                        const permissions = [...formik.values.permissions];
                        if (e.target.checked) {
                          permissions.push(permission);
                        } else {
                          const index = permissions.indexOf(permission);
                          permissions.splice(index, 1);
                        }
                        formik.setFieldValue("permissions", permissions);
                      }}
                      value={permission}
                    />
                  }
                  label={permission}
                  error={
                    formik.touched.permissions &&
                    Boolean(formik.errors.permissions)
                  }
                  sx={{ width: "100%", maxWidth: "200px" }}
                />
              ))}
              {formik.errors.permissions && (
                <Typography
                  sx={{
                    fontSize: 10,
                    color: "red",
                    paddingLeft: "10px",
                  }}
                >
                  {formik.errors.permissions}
                </Typography>
              )}
            </Box>
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
