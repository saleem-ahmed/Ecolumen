import Service from "./services";

const OrgServices = {
  // for get organisation data
  getStaff: async (user, currentPage) => {
    console.log("CURRENT PAGE IN API=", currentPage);
    return await Service.get(
      `https://eco-lumen.onrender.com/api/organization/${user._id}/getAllStaff?page=${currentPage}`
    );
  },

  //get roles
  getRoles: async (user, currentPage) => {
    return await Service.get(
      `https://eco-lumen.onrender.com/api/organization/${user._id}/getAllRoles?page=${currentPage}`
    );
  },
  getAllRoles: async (user) => {
    return await Service.get(
      `https://eco-lumen.onrender.com/api/organization/${user._id}/getRoles`
    );
  },

  //staffcount
  staffCount: async (user) => {
    return await Service.get(
      `https://eco-lumen.onrender.com/api/organization/${user._id}/staffCounts`
    );
  },
  // update organisation data
  upStaff: async (data, user, staff) => {
    return await Service.update({
      url: `https://eco-lumen.onrender.com/api/organization/${user._id}/${staff._id}/editStaff`,
      data,
    });
  },
  // update organisation data
  upRole: async (data, user, role) => {
    return await Service.update({
      url: `https://eco-lumen.onrender.com/api/organization/${user._id}/${role._id}/editRole`,
      data,
    });
  },
  // switch user
  toggleStaff: async (user, staff) => {
    return await Service.update({
      url: `https://eco-lumen.onrender.com/api/organization/${user._id}/${staff._id}/toggleStaff`,
    });
  },
  // add staff
  AddStaff: async (data, user) => {
    return Service.post({
      url: `https://eco-lumen.onrender.com/api/organization/${user._id}/addStaff`,
      data,
    });
  },
  //Add Role
  AddRole: async (data, user) => {
    return Service.post({
      url: `https://eco-lumen.onrender.com/api/organization/${user._id}/addRole`,
      data,
    });
  },

  setPermission: async (data, user, id) => {
    return Service.post({
      url: `https://eco-lumen.onrender.com/api/organization/${user._id}/${id}/permissions`,
      data,
    });
  },

  // delete staff
  deleteStaff: async (user, staff) => {
    return await Service.remove({
      url: `https://eco-lumen.onrender.com/api/organization/${user._id}/${staff._id}/deleteStaff`,
    });
  },

  // delete staff
  deleteRole: async (user, role) => {
    return await Service.remove({
      url: `https://eco-lumen.onrender.com/api/organization/${user._id}/${role._id}/deleteRole`,
    });
  },
};

export default OrgServices;
