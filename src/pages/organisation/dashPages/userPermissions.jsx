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
// import { addUserSchema } from "../../../components/Validations/validation";
const UserPermissions = () => {
  const { user } = useAuth();
  const [roles, setRoles] = useState();
  const [Role, setRole] = useState();
  const [Permission, setPermission] = useState([]);
  console.log(Role);

  useEffect(() => {
    FetchRoles();
  }, []);

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

  const FetchRoles = async () => {
    await OrgServices.getRoles(user ? user : null, 1)
      .then((res) => {
        if (res.status === "success") {
          console.log(res.message, "success");
          setRoles(res.roles);
          // console.log(roles);
        } else {
          console.log(res.message, "error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formik = useFormik({
    // validationSchema: addUserSchema,
    enableReinitialize: true,
    initialValues: {
      role: "",
      permission: "",
    },

    onSubmit: async () => {
      const data = {
        roleName: Role,
        permissions: Permission,
      };
      console.log(data);
    },
  });

  const handlePermissionChange = (event) => {
    const value = event.target.value;
    // Ensure it's an array even when a single value is selected
    setPermission(typeof value === "string" ? value.split(",") : value);
    formik.setFieldValue(
      "permission",
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <>
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
          <Box width={"100%"}>
            <FormControl fullWidth>
              <InputLabel>Permissions</InputLabel>
              <Select
                label="Permission"
                multiple
                value={Permission}
                onChange={handlePermissionChange}
                renderValue={(selected) => selected.join(", ")}
                error={
                  formik.touched.permission && Boolean(formik.errors.permission)
                }
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
            </FormControl>
          </Box>
          <Box>
            <Button
              color="success"
              variant="contained"
              onClick={() => {
                formik.handleSubmit();
              }}
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
