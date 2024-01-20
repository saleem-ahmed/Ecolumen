/* eslint-disable react/prop-types */
import { Snackbar, Alert } from "@mui/material";

const Alerts = ({ open, message, severity, handleClose }) => {
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default Alerts;
