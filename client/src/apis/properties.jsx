import axios from "~/axios";
export const apiGetProperties = (params) =>
  axios({
    url: "/properties/",
    method: "get",
    params,
  });
export const apiCreateNewProperty = (data) =>
  axios({
    url: "/properties/",
    method: "post",
    data,
  });
