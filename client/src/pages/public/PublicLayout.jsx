import clsx from "clsx";
import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation, Topheader } from "~/components";
import withRouter from "~/hocs/withRouter";

const PublicLayout = ({ location }) => {
  return (
    <main>
      <Topheader />
      <Navigation />
      <div className={clsx(location.pathname === "/" ? "pt-0" : "pt-[170px]")}>
        <Outlet />
      </div>
    </main>
  );
};

export default withRouter(PublicLayout);
