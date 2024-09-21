/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  TableContainer,
  Dialog,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Menu,
  Switch,
  MenuItem,
  Pagination,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Search } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import OrgServices from "../../../apis/Organisation";
// Invalid Context API
import { AuthContext } from "../../../Auth";
import Loader from "../../../components/loader";
import Alerts from "../../../components/Customalerts";

const ITEM_HEIGHT = 48;
const Users = () => {
 
  return (
    <>
      <Loader loaderValue={loader} />
      <Alerts
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        handleClose={handleSnackbarClose}
      />

    </>
  );
};

export default Users;
