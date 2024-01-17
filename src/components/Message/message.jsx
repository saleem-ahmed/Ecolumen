// import { useState, forwardRef } from "react";
// import Snackbar from "@mui/material/Snackbar";
// import MuiAlert from "@mui/material/Alert";

const Message = ({ message }) => {
  console.log(message, "propsprops");
  // const [openSnackbar, setOpenSnackbar] = useState(false);
  // const Alert = forwardRef(function Alert(props, ref) {
  //   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  // });
  // const handleCloseSnackbar = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setOpenSnackbar(false);
  // };

  return (
    <>
      hello
      {/* <Snackbar
        open={openSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {props.message}
        </Alert>
      </Snackbar> */}
    </>
  );
};

export default Message;
