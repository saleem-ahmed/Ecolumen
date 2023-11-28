import Service from "./services";

// import axios from "./config";
// import { GET_STAFF } from "../util/ORGCONSTANTS";

// CRUD

/* 
1. Get Staff
const getStaff = () => {
  axios.get(GET_STAFF)
    .then((res) => {
      if(res && res.status === 200){
        return res;
      }else{
        console.log('Error')
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
2. Delete Staff
3. Update Staff
*/
const OrgServices = {
  // for get organisation data
  //   getOrgData: async () => {
  //     try {
  //       return await Service.get(`url`);
  //     } catch (error) {
  //       throw error;
  //     }
  //   },

  // update organisation data
  //   upOrgGym: async (data) => {
  //     try {
  //       return await Service.update({
  //         url: `endpointhere`,
  //         data,
  //       });
  //     } catch (error) {
  //       throw error;
  //     }
  //   },

  // RegisterOrg: async (data) => {
    // try {
    //   return await Service.post({
    //     url: "api/register",
    //     data,
    //   });
    // } catch (error) {
    //     throw error;
    //   }

    // In this simplified code, any errors thrown during the Service.post call will automatically propagate up the call stack, so there's no need for the explicit try/catch block.

    // return Service.post({
    //   url: "organization/register",
    //   data,
    // });
  // },

  // add staff
    AddStaff: async (data) => {
      return Service.post({
        url: "/organization/65241ba4216d135086596e57/addStaff",
        data,
      });
    },

  // delete staff
  //   deleteStaff: async (id) => {
  //     try {
  //       return await Service.remove({
  //         url: `endpointhere/${id}`,
  //       });
  //     } catch (error) {
  //       throw error;
  //     }
  //   },
};

export default OrgServices;
