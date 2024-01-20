import Service from "./services";

const OrgServices = {
  // for get organisation data
  getStaff: async (user) => {
    return await Service.get(
      `https://eco-lumen.onrender.com/api/organization/${user._id}/getAllStaff`
    );
  },
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
  // add staff
  AddStaff: async (data, user) => {
    return Service.post({
      url: `https://eco-lumen.onrender.com/api/organization/${user._id}/addStaff`,
      data,
    });
  },
    // delete staff
  deleteStaff: async (user , staff) => {
    return await Service.remove({
      url: `https://eco-lumen.onrender.com/api/organization/${user._id}/${staff._id}/deleteStaff`,
    });
  },
};

export default OrgServices;
