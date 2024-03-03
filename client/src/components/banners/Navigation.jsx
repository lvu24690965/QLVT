import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "..";
import { navigation } from "~/utils/constants";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import withRouter from "~/hocs/withRouter";
import Login from "../login/Login";
import { useAppStore } from "~/store/useAppStore";
import { useUserStore } from "~/store/useUserStore";
const Navigation = ({ location }) => {
  const { setModal } = useAppStore();
  const { current } = useUserStore();
  return (
    <div
      className={twMerge(
        clsx(
          "h-[85px] bg-transparent flex items-center justify-between  fixed z-10 top-[85px] w-full px-[100px] py-[26px]",
          location.pathname !== "/" && "bg-white text-main-600"
        )
      )}>
      <Link to="/">
        {location.pathname === "/" ? (
          <img
            src="./logo.png"
            alt="logo"
            className="w-[120px] object-contain"
          />
        ) : (
          <img
            src="./black.png"
            alt="logo"
            className="w-[120px] object-contain"
          />
        )}
      </Link>
      <div
        className={twMerge(
          clsx(
            "flex text-white items-center gap-6",
            location.pathname !== "/" && "bg-white text-black"
          )
        )}>
        {navigation.map((el) => (
          <NavLink
            className={({ isActive }) =>
              clsx(isActive && "text-main-600 font-bold")
            }
            key={el.id}
            to={el.path}>
            {el.text}
          </NavLink>
        ))}
        {current ? (
          <Button
            className={clsx(
              "bg-main-600 border-main-600 border px-14",
              location.pathname === "/"
                ? "text-white"
                : "text-black border-main-600 border px-14"
            )}
            handleOnClick={() => setModal(false, <Login />)}>
            Submission
          </Button>
        ) : (
          <Button
            className={clsx(
              "bg-main-600 border-main-600 border px-14",
              location.pathname === "/"
                ? "text-amber-100"
                : "text-black border-amber-600 border px-14"
            )}
            handleOnClick={() => setModal(true, <Login />)}>
            Sign in
          </Button>
        )}
      </div>
    </div>
  );
};

export default withRouter(Navigation);
