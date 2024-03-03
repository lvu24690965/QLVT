import axios from "~/axios";
export const apiCreateNewDepartment = (data) =>
  axios({
    url: "/department/",
    method: "post",
    data,
  });
export const apiGetDepartments = (params) =>
  axios({
    url: "/department/",
    method: "get",
    params,
  });
