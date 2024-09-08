import request from "./config";

function get(url) {
  return request({
    method: "GET",
    url,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*",
    },
    server: {
       "Strict-Transport-Security" : "max-age=31536000",
       "Content-Security-Policy":  "upgrade-insecure-requests"
    },
  });
}
function getWithBody(url, data, token) {
  return request({
    method: "GET",
    url,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function post({ url, data, token }) {
  return request({
    method: "POST",
    url,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*",
    },
  });
}

function update({ url, data, token }) {
  return request({
    method: "PUT",
    url,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*",
    },
  });
}

function remove({ url, data, token }) {
  return request({
    method: "DELETE",
    url,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*",
    },
  });
}

const Service = {
  get,
  post,
  update,
  remove,
  getWithBody,
};
export default Service;