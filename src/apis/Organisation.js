import Service from "./services";

const URL = "https://eco-lumen.onrender.com/api";


console.log("baseUrl", URL);

const OrgServices = {
  // for get organisation data
  getStaff: async (_id, currentPage) => {
    console.log("CURRENT PAGE IN API=", currentPage);
    return await Service.get(
      `${URL}/organization/${_id}/getAllStaff?page=${currentPage}`
    );
  },

  //get roles
  getRoles: async (org, currentPage) => {
    return await Service.get(
      `${URL}/organization/${org._id}/getAllRoles?page=${currentPage}`
    );
  },


  getAllRoles: async (_id) => {
    return await Service.get(
      `${URL}/organization/${_id}/getRoles`
    );
  },

  //staffcount
  staffCount: async (org) => {
    return await Service.get(
      `${URL}/organization/${org._id}/staffCounts`
    );
  },
  // update organisation data
  upStaff: async (data, _id, staff) => {
    return await Service.update({
      url: `${URL}/organization/${_id}/${staff._id}/editStaff`,
      data,
    });
  },
  // update organisation data
  upRole: async (data, org, role) => {
    return await Service.update({
      url: `${URL}/organization/${org._id}/${role._id}/editRole`,
      data,
    });
  },
  // switch org
  toggleStaff: async (_id, staff) => {
    return await Service.update({
      url: `${URL}/organization/${_id}/${staff._id}/toggleStaff`,
    });
  },
  // add staff
  AddStaff: async (data, _id) => {
    return Service.post({
      url: `${URL}/organization/${_id}/addStaff`,
      data,
    });
  },
  //Add Role
  AddRole: async (data, _id) => {
    return Service.post({
      url: `${URL}/organization/${_id}/addRole`,
      data,
    });
  },

  // set permission
  setPermission: async (data, org, id) => {
    return Service.post({
      url: `${URL}/organization/${org._id}/${id}/permissions`,
      data,
    });
  },

  // forget password
  forgetPass: async (data) => {
    return Service.post({
      url: `${URL}/organization/forgot-password`,
      data,
    });
  },

  // verify email
  verifyEmail: async (data) => {
    return Service.post({
      url: `${URL}/organization/Verify-email`,
      data,
    });
  },
  // delete staff
  deleteStaff: async (org, staff) => {
    return await Service.remove({
      url: `${URL}/organization/${org._id}/${staff._id}/deleteStaff`,
    });
  },

  // delete staff
  deleteRole: async (org, role) => {
    return await Service.remove({
      url: `${URL}/organization/${org._id}/${role._id}/deleteRole`,
    });
  },
};

export default OrgServices;
