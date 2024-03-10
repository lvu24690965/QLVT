import React, { Fragment, useState } from "react";
import { MdMailOutline } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import withRouter from "~/hocs/withRouter";
import { useUserStore } from "~/store/useUserStore";
import { showOption } from "~/utils/constants";
import { Link } from "react-router-dom";
import { set } from "react-hook-form";

const Topheader = ({ location }) => {
  const { current, logout } = useUserStore();
  const [isShowOption, setIsShowOption] = useState(false);

  return (
    <div
      className={twMerge(
        clsx(
          "h-[85px] bg-transparent border-b border-gray-300 flex items-center justify-between fixed z-50 w-full top-0 px-[100px] py-[26px] text-white",
          location.pathname !== "/" && "bg-main-600 text-black"
        )
      )}>
      <span className="flex items-center gap-2">
        <MdMailOutline />
        <span>Email us at:</span>
        <span className="text-gray-600">example@outlook.com</span>
      </span>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-6">
          <FaFacebookF />

          <FaInstagram />
          <FaYoutube />
        </div>
        <div className="flex items-center pl-8 border-l boder-main-100">
          <span
            className={twMerge(
              clsx(
                "flex items-center gap-2 text-white",
                location.pathname !== "/" && "text-black"
              )
            )}>
            <FiPhone />
            <span>096-109-6919</span>
          </span>
        </div>
        {current && (
          <div
            onClick={() => setIsShowOption(!isShowOption)}
            className="flex items-center relative cursor-pointer hover:bg-overlay-60 p-2 rounded-md gap-4 pl-8 border-l boder-main-100">
            <div className="flex flex-col gap-2">
              <span>{current?.name}</span>
              <span>
                ID: <span>{current?.id}</span>
              </span>
            </div>
            <img
              src={
                current?.avatar || location.pathname === "/"
                  ? "/user.svg"
                  : "./userb.svg"
              }
              alt="avatar"
              className="w-12 h-12 object-cover rounded-full"
            />
            {isShowOption && (
              <div className="absolute z-50 right-0 top-full rounded-md text-black bg-white drop-shadow-sm flex flex-col py-2 border ">
                {showOption.map((el) => (
                  <Fragment key={el.id}>
                    <>
                      {current?.userRoles?.some(
                        (role) => role.roleCode === el.code
                      ) && (
                        <Link
                          className="px-6 py-2 hover:bg-gray-100"
                          to={el.path}>
                          {el.name}
                        </Link>
                      )}
                    </>
                  </Fragment>
                ))}
                <span
                  onClick={() => logout()}
                  className="px-6 py-2 hover:bg-gray-100">
                  Logout
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default withRouter(Topheader);
