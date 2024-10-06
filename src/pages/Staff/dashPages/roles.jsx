/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useContext } from "react";
import {
  Box,
  Table,
  Typography,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  Pagination,
} from "@mui/material";
import Loader from "../../../components/loader";
import OrgServices from "../../../apis/Organisation";
import { AuthContext } from "../../../Auth";

const userRoles = () => {
  const { staff } = useContext(AuthContext);
  const [pageInfo, setPageInfo] = useState({
    totalRoles: 1,
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
  });
  const [orgRoles, setOrgRoles] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      if (!staff?.organization) return;
      
      console.log("Fetching roles for organization:", staff.organization);
      console.log("Current page info:", pageInfo);

      setLoader(true);
      try {
        const res = await OrgServices.getAllRoles(staff.organization);
        console.log("API response:", res);
        if (res.status === "success") {
          setOrgRoles(res.roles);
          // setPageInfo((prev) => ({
          //   ...prev,
          //   totalPages: res.pageInfo.totalPages,
          //   currentPage: res.pageInfo.currentPage,
          //   totalRoles: res.pageInfo.totalRoles,
          // }));
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
      } finally {
        setLoader(false);
      }
    };

    fetchRoles();
  }, [staff?.organization, pageInfo.currentPage]);

  // pagination
  const handlePageChange = (event, value) => {
    setPageInfo((prev) => ({ ...prev, currentPage: value }));
  };

  return (
    <>
      <Box>
        <Typography variant="h2">Roles List</Typography>
      </Box>
      <Box bgcolor={"#ffffff"} py={"10px"} sx={{ borderRadius: "12px" }}>
        <TableContainer>
          <Loader loaderValue={loader} />
          <Table style={{ tableLayout: "auto" }}>
            <TableHead>
              <TableRow>
                <TableCell>Serial No.</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orgRoles === null ? (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ height: "10vh" }}>
                    <Typography variant="body1">No roles added</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                orgRoles.map((role, index) => (
                  <TableRow key={role._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{role.roleName}</TableCell>
                    <TableCell>{role._id}</TableCell>
                  </TableRow>
                ))
              )}
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
    </>
  );
};

export default userRoles;
