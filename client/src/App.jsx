import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import {
  AboutUs,
  Home,
  Personels,
  Properties,
  PublicLayout,
  Search,
} from "./pages/public";
import path from "./utils/path";
import { Modal } from "./components";
import { useAppStore } from "./store/useAppStore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDepartmentStore } from "./store/useDepartmentStore";
import { useUserStore } from "./store/useUserStore";
import {
  AdminLayout,
  CreateDepartment,
  CreateProperty,
  CreatePropertyType,
  ManageDepartment,
  Dashboard,
  ManageProperty,
  ManagePropertyType,
} from "./pages/admin";
import { Personal, UserLayout } from "./pages/user";
import { usePropertiesStore } from "./store/usePropertiesStore";

function App() {
  const { isShowModal } = useAppStore();
  const { getPropertyTypes } = usePropertiesStore();
  const { getDepartments } = useDepartmentStore();
  const { getCurrent, current, token, getRoles } = useUserStore();
  useEffect(() => {
    getCurrent();
    getRoles();
    getPropertyTypes();
    getDepartments({ fields: "id,name" });
  }, [token]);
  return (
    <>
      {isShowModal && <Modal />}
      <Routes>
        <Route path={path.PUBLIC_LAYOUT} element={<PublicLayout />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.ABOUT_US} element={<AboutUs />} />
          <Route path={path.PERSONELS} element={<Personels />} />
          <Route path={path.PROPERTIES} element={<Properties />} />
          <Route path={path.SEARCH} element={<Search />} />
        </Route>
        {/* Admin routes*/}
        <Route path={path.ADMIN_LAYOUT} element={<AdminLayout />}>
          <Route path={path.ADMIN_DASHBOARD} element={<Dashboard />} />
          <Route
            path={path.MANAGE_PROPERTY_TYPE}
            element={<ManagePropertyType />}
          />
          <Route
            path={path.CREATE_PROPERTY_TYPE}
            element={<CreatePropertyType />}
          />
          <Route path={path.MANAGE_PROPERTIES} element={<ManageProperty />} />
          <Route path={path.CREATE_PROPERTY} element={<CreateProperty />} />
          <Route path={path.CREATE_DEPARTMENT} element={<CreateDepartment />} />
          <Route
            path={path.MANAGE_DEPARTMENTS}
            element={<ManageDepartment />}
          />
        </Route>
        {/* User routes*/}
        <Route path={path.USER_LAYOUT} element={<UserLayout />}>
          <Route path={path.PERSONAL} element={<Personal />} />
        </Route>
      </Routes>
      {/* <ToastContainer /> */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
