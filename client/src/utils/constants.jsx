import path from "./path";
import { MdOutlineSpaceDashboard, MdDevicesOther } from "react-icons/md";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
export const navigation = [
  {
    id: 1,
    path: "/",
    text: "HOME",
  },
  {
    id: 2,
    path: `/${path.ABOUT_US}`,
    text: "ABOUT US",
  },
  {
    id: 3,
    path: `/${path.PERSONELS}`,
    text: "PERSONELS",
  },
  {
    id: 4,
    path: `/${path.PROPERTIES}`,
    text: "PROPERTIES",
  },
];
export const adminSidebar = [
  {
    id: 12,
    path: `/${path.ADMIN_LAYOUT}/${path.ADMIN_DASHBOARD}`,
    name: "Dashboard",
    icon: <MdOutlineSpaceDashboard />,
    type: "SINGLE",
  },
  {
    id: 13,
    name: "Property Type",
    icon: <MdDevicesOther />,
    type: "PARENT",
    subs: [
      {
        id: 14,
        path: `/${path.ADMIN_LAYOUT}/${path.MANAGE_PROPERTY_TYPE}`,
        name: "Manage Property Type",
      },
      {
        id: 15,
        path: `/${path.ADMIN_LAYOUT}/${path.CREATE_PROPERTY_TYPE}`,
        name: "Create Property Type",
      },
    ],
  },
  {
    id: 16,
    name: "Property",
    icon: <MdDevicesOther />,
    type: "PARENT",
    subs: [
      {
        id: 17,
        path: `/${path.ADMIN_LAYOUT}/${path.MANAGE_PROPERTIES}`,
        name: "Manage Properties",
      },
      {
        id: 18,
        path: `/${path.ADMIN_LAYOUT}/${path.CREATE_PROPERTY}`,
        name: "Create Property",
      },
    ],
  },
  {
    id: 19,
    name: "Department",
    icon: <MdOutlineLocalFireDepartment />,
    type: "PARENT",
    subs: [
      {
        id: 20,
        path: `/${path.ADMIN_LAYOUT}/${path.MANAGE_DEPARTMENTS}`,
        name: "Manage Departments",
      },
      {
        id: 21,
        path: `/${path.ADMIN_LAYOUT}/${path.CREATE_DEPARTMENT}`,
        name: "Create Department",
      },
    ],
  },
];
export const showOption = [
  {
    id: 1,
    name: "Personal",
    code: "ROL7",
    path: `/${path.USER_LAYOUT}/${path.PERSONAL}`,
  },
  {
    id: 2,
    name: "Staff",
    code: "ROL5",
    path: `/${path.STAFF_LAYOUT}/${path.STAFF_DASHBOARD}`,
  },
  {
    id: 3,
    name: "Manager",
    code: "ROL3",
    path: `/${path.MANAGER_LAYOUT}/${path.MANAGER_DASHBOARD}`,
  },
  {
    id: 4,
    name: "Admin",
    code: "ROL1",
    path: `/${path.ADMIN_LAYOUT}/${path.ADMIN_DASHBOARD}`,
  },
];
