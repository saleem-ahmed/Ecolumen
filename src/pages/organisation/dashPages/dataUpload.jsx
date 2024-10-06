import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Input,
  Grid,
  Stack,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import Loader from "../../../components/loader";
import Alerts from "../../../components/Customalerts";

const validationSchema = Yup.object({
  file: Yup.mixed().required("A file is required"),
});

const OrgUpload = () => {
  const [loader, setLoader] = useState(false);
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
    initialValues: {
      file: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoader(true);
      setTimeout(() => {
        setLoader(false);
        handleSnackbarOpen("Successfully uploaded file", "success");
        formik.resetForm();
      }, 1000); // Simulate a delay for the upload process
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    formik.setFieldValue("file", file);
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
      <Grid sx={{ height: "85vh" }}>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack
            spacing={2}
            sx={{
              width: "100%",
              maxWidth: "600px",
              bgcolor: "#fff",
              borderRadius: 3,
              p: 5,
              boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h2" sx={{ textAlign: "center" }}>
              Upload
            </Typography>
            <Typography
              variant="body1"
              align="center"
              sx={{ color: "red", mb: 2 }}
            >
              *Please upload specific files: .json
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Input
                type="file"
                onChange={handleFileChange}
                inputProps={{ accept: ".json" }}
                fullWidth
                sx={{
                  display: "none",
                }}
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px dashed #444",
                    borderRadius: 2,
                    padding: 4,
                    cursor: "pointer",
                    "&:hover": {
                      borderColor: "#1976d2",
                    },
                  }}
                >
                  <Stack alignItems="center" spacing={1}>
                    <NoteAddIcon fontSize="large" sx={{ color: "#1976d2" }} />
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#1976d2",
                      }}
                    >
                      Click to upload file
                    </Typography>
                  </Stack>
                </Box>
              </label>
              {formik.errors.file && formik.touched.file ? (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {formik.errors.file}
                </Typography>
              ) : null}
              <List>
                {formik.values.file && (
                  <ListItem
                    sx={{
                      flexDirection: "column",
                      alignItems: "flex-start",
                      borderBottom: "1px solid #f0f0f0",
                      py: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <ListItemIcon>
                        {formik.values.file.type === "application/pdf" ? (
                          <PictureAsPdfIcon />
                        ) : (
                          <InsertDriveFileIcon />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={formik.values.file.name}
                        primaryTypographyProps={{
                          sx: { fontWeight: "500", color: "#3a5a76" },
                        }}
                      />
                    </Box>
                  </ListItem>
                )}
              </List>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!formik.values.file}
                fullWidth
                sx={{
                  padding: "10px 0",
                  borderRadius: "8px",
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "16px",
                  backgroundColor: "#3a5a76",
                  "&:hover": {
                    backgroundColor: "#3a5a76",
                  },
                }}
              >
                Upload
              </Button>
            </form>
          </Stack>
        </Box>
      </Grid>
    </>
  );
};

export default OrgUpload;
