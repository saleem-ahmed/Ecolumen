/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import {
  Box,
  Table,
  Typography,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  Pagination,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Loader from "../../../components/loader";
import Alerts from "../../../components/Customalerts";
import OrgServices from "../../../apis/Organisation";
import { useAuth } from "../../../Auth";
import { useFormik } from "formik";
import {
  AddRoleSchema,
  EditRoleSchema,
} from "../../../components/Validations/validation.js";
const ITEM_HEIGHT = 48;
const userRoles = () => {
  const { user } = useAuth();
  const [pageInfo, setPageInfo] = useState({
    totalRoles: 1,
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
  });
  const [orgRoles, setOrgRoles] = useState();
  useEffect(() => {
    FetchRoles();
  }, [pageInfo.currentPage, pageInfo.totalRoles]);

  const FetchRoles = async () => {
    await OrgServices.getRoles(user ? user : null, pageInfo.currentPage)
      .then((res) => {
        console.log(res, "role res");
        setOrgRoles(res.roles);
        if (res.status === "success") {
          setPageInfo({ ...pageInfo, totalPages: res.pageInfo.totalPages });
          console.log(pageInfo, "useffect pageinfo");
          if (
            pageInfo.currentPage !== res.pageInfo.currentPage ||
            pageInfo.totalRoles !== res.pageInfo.totalRoles
          ) {
            setPageInfo({
              ...pageInfo,
              currentPage: res.pageInfo.currentPage,
              totalRoles: res.pageInfo.totalRoles,
            });
          }
          setloader(false);
          handleSnackbarOpen(res.message, "success");
        } else {
          setloader(false);
          handleSnackbarOpen(res.message, "error");
        }
      })
      .catch((error) => {
        setloader(false);
        handleSnackbarOpen(error);
      });
  };

  const [loader, setloader] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [isModalOpen, setIsModalOpen] = useState(false); //for add roles modal
  const [anchorElObj, setAnchorElObj] = useState({});
  const [removeConfirmation, setRemoveConfirmation] = useState({
    open: false,
    user: null,
  });
  // Add new state variables
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const formik = useFormik({
    validationSchema: AddRoleSchema,
    enableReinitialize: true,
    initialValues: {
      name: "",
    },

    onSubmit: async () => {
      handleCloseModal();
      const data = {
        roleName: formik.values.name,
      };
      await OrgServices.AddRole(data, user ? user : null)
        .then((res) => {
          console.log(res);
          if (res.status === "success") {
            setloader(false);
            handleSnackbarOpen(res.message, "success");
            FetchRoles();
          } else {
            setloader(false);
            handleSnackbarOpen(res.message, "error");
          }
        })
        .catch((error) => {
          setloader(false);
          handleSnackbarOpen(error);
        });
    },
  });

  const formik1 = useFormik({
    validationSchema: EditRoleSchema,
    enableReinitialize: true,
    initialValues: {
      name: "",
      id: "",
    },
    onSubmit: async () => {
      console.log("ID=", formik1.values.id);
      const data = {
        roleName: formik1.values.name,
      };
      const updatedRole = {
        _id: formik1.values.id, // Ensure you have the role ID here
      };
      setloader(true);
      await OrgServices.upRole(data, user, updatedRole)
        .then((res) => {
          if (res.status === "success") {
            handleCloseEditModal();
            setloader(false);
            handleSnackbarOpen(res.message, "success");
            FetchRoles(); // Refresh the roles list
          } else {
            setloader(false);
            handleSnackbarOpen(res.message, "error");
          }
        })
        .catch((error) => {
          console.log(error);
          setloader(false);
        });
    },
  });

  // add roles model
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  //Alert
  const handleSnackbarOpen = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Actions of roles table

  const handleMenuClick = (event, index) => {
    setAnchorElObj((prevObj) => ({
      ...prevObj,
      [index]: event.currentTarget,
    }));
  };
  const handleMenuClose = (index) => {
    setAnchorElObj((prevObj) => ({
      ...prevObj,
      [index]: null,
    }));
  };

  const handleRemoveClick = (index, staffMember) => {
    handleMenuClose(index);
    setRemoveConfirmation({ open: true, user: staffMember });
  };
  const handleRemoveConfirm = async () => {
    setRemoveConfirmation({ open: false, user: null });
    await OrgServices.deleteRole(user, removeConfirmation.user)
      .then((res) => {
        if (res.status === "success") {
          handleSnackbarOpen(res.message, "success");
          FetchRoles();
        } else {
          handleSnackbarOpen(res.message, "error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRemoveCancel = () => {
    setRemoveConfirmation({ open: false, user: null });
  };

  //edit modal
  const handleOpenEditModal = (role) => {
    // setEditingRole(role);
    formik1.setValues({ name: role.roleName, id: role._id });
    setIsEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    // setEditingRole(null);
  };
  const handleEditClick = (index, role) => {
    handleMenuClose(index);
    handleOpenEditModal(role);
  };
  const renderEditDialog = () => (
    <Dialog open={isEditModalOpen} onClose={handleCloseEditModal}>
      <DialogTitle>Edit Role</DialogTitle>
      <DialogContent>
        <TextField
          label="Role Name"
          required
          fullWidth
          name="name"
          onChange={formik1.handleChange}
          value={formik1.values.name}
          error={formik1.touched.name && Boolean(formik1.errors.name)}
          helperText={formik1.touched.name && formik1.errors.name}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseEditModal}>Cancel</Button>
        <Button onClick={formik1.handleSubmit} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );

  // pagination
  const handlePageChange = (event, value) => {
    setPageInfo({ ...pageInfo, currentPage: value });
  };
  return (
    <>
      <Alerts
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleClose={handleSnackbarClose}
      />
      <Box>
        <Typography variant="h2">Roles List</Typography>
      </Box>
      <Box bgcolor={"#ffffff"} py={"10px"} sx={{ borderRadius: "12px" }}>
        <TableContainer>
          <Box
            component={"div"}
            display={"flex"}
            justifyContent={"flex-end"}
            sx={{ my: "20px", px: "20px" }}
          >
            <Button
              color="success"
              variant="contained"
              onClick={handleOpenModal}
            >
              Add Role
            </Button>

            <Dialog open={isModalOpen} onClose={handleCloseModal}>
              <DialogTitle
                sx={{
                  bgcolor: "#284259",
                  color: "#fff",
                  mb: "10px",
                }}
              >
                Add Role
              </DialogTitle>
              <DialogContent>
                <TextField
                  label="name"
                  required
                  fullWidth
                  name="name"
                  onChange={(e) => {
                    formik.setFieldValue("name", e.target.value);
                  }}
                  value={formik.values.name}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={
                    <Typography sx={{ fontSize: 10, color: "red" }}>
                      {formik.touched.name && formik.errors.name}
                    </Typography>
                  }
                />
                <DialogActions>
                  <Button onClick={handleCloseModal} color="primary">
                    Back
                  </Button>
                  <Button
                    type="submit"
                    color="success"
                    variant="contained"
                    onClick={() => {
                      handleCloseModal();
                      formik.handleSubmit();
                    }}
                  >
                    Submit
                  </Button>
                </DialogActions>
              </DialogContent>
            </Dialog>
          </Box>
          <Loader loaderValue={loader} />
          <Table style={{ tableLayout: "auto" }}>
            <TableHead>
              <TableRow>
                <TableCell>serial No.</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                orgRoles === null ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ height: "10vh" }}>
                      <Typography variant="p">no roles added</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  orgRoles?.map((roles, index) => (
                    <TableRow key={roles._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{roles.roleName}</TableCell>
                      <TableCell>{roles.createdAt}</TableCell>
                      <TableCell>
                        <div>
                          <IconButton
                            aria-label="more"
                            id={`long-button-${index}`}
                            aria-controls={open ? `long-menu-${index}` : undefined}
                            aria-expanded={open ? "true" : undefined}
                            aria-haspopup="true"
                            onClick={(event) => handleMenuClick(event, index)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                          <Menu
                            id={`long-menu-${index}`}
                            MenuListProps={{
                              "aria-labelledby": `long-button-${index}`,
                            }}
                            anchorEl={anchorElObj[index]}
                            open={Boolean(anchorElObj[index])}
                            onClose={() => handleMenuClose(index)}
                            PaperProps={{
                              style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: "20ch",
                              },
                            }}
                          >
                            <MenuItem onClick={() => handleEditClick(index, roles)}>
                              Edit
                            </MenuItem>

                            <MenuItem
                              onClick={() => handleRemoveClick(index, roles)}
                            >
                              Remove
                            </MenuItem>
                          </Menu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )
              }
            </TableBody>
          </Table>
          <Pagination
            count={pageInfo.totalPages}
            page={pageInfo.currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </TableContainer>
      </Box>
      <Dialog
        open={removeConfirmation.open}
        onClose={handleRemoveCancel}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to delete this user?"}
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleRemoveCancel}>Cancel</Button>
          <Button onClick={handleRemoveConfirm} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {renderEditDialog()}
    </>
  );
};

export default userRoles;
