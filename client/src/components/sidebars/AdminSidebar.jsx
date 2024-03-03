import clsx from "clsx";
import React, { Fragment, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { adminSidebar } from "~/utils/constants";
import { FaAngleRight } from "react-icons/fa";
import { IoReturnDownBack } from "react-icons/io5";
const AdminSidebar = () => {
  const [activeTabs, setActiveTabs] = useState([]);
  const handleActiveTabs = (tabId) => {
    if (activeTabs.some((el) => el === tabId)) {
      setActiveTabs((prev) => prev.filter((el) => el !== tabId));
    } else {
      setActiveTabs((prev) => [...prev, tabId]);
    }
  };
  return (
    <div className="h-screen">
      <div className="w-full flex p-4 flex-col items-center justify-center">
        <img src="/black.png" alt="logo" className="w-2/5 object-contain" />
        <small className="text-xs text-gray-100 italic">Admin workspace</small>
      </div>
      <div className="mt-6">
        {adminSidebar.map((el) => (
          <Fragment key={el.id}>
            {el.type === "SINGLE" && (
              <NavLink
                to={el.path}
                className={({ isActive }) =>
                  clsx(
                    "flex items-center gap-2 px-4 py-3 hover:border-r-4 border-green-500 hover:bg-main-900",
                    isActive && "border-r-4 border-green-500 bg-main-900"
                  )
                }>
                <span className="text-2xl">{el.icon}</span>
                <span className="select-none">{el.name}</span>
              </NavLink>
            )}
            {el.type === "PARENT" && (
              <>
                <div
                  onClick={() => handleActiveTabs(el.id)}
                  className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-main-900">
                  <span className=" flex items-center gap-2">
                    <span className="text-2xl">{el.icon}</span>
                    <span className="select-none">{el.name}</span>
                  </span>
                  {activeTabs.some((tabId) => tabId === el.id) ? (
                    <FaAngleRight className="transform rotate-90" />
                  ) : (
                    <FaAngleRight />
                  )}
                </div>

                {activeTabs.some((tabId) => tabId === el.id) && (
                  <div className="">
                    {el.subs.map((sub) => (
                      <NavLink
                        key={sub.id}
                        to={sub.path}
                        className={({ isActive }) =>
                          clsx(
                            "flex items-center gap-2 px-4 py-3 hover:border-r-4 border-green-500 hover:bg-main-900",
                            isActive &&
                              "border-r-4 border-green-500 bg-main-900"
                          )
                        }>
                        <span className="select-none">{sub.name}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            )}
          </Fragment>
        ))}
        <Link
          to={"/"}
          className={clsx(
            "flex items-center gap-2 px-4 py-3 hover:border-r-4 border-green-500 hover:bg-main-900"
          )}>
          <span className="text-2xl">
            <IoReturnDownBack />
          </span>
          <span className="select-none">Go homepage</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
