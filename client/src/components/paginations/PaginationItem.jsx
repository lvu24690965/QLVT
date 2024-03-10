import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";
import { createSearchParams, useNavigate } from "react-router-dom";
import withRouter from "~/hocs/withRouter";

const PaginationItem = ({ content, page, navigate, location }) => {
  const handleChangePage = () => {
    navigate({
      pathname: location.pathname,
      search: createSearchParams({ page: content }).toString(),
    });
  };
  if (!Number(content))
    return (
      <div className="w-10 h-10 rounded-md px-1 bg-main-100 text-main-600 font-bold flex items-end justify-center">
        {content}
      </div>
    );
  return (
    <button
      type="button"
      onClick={handleChangePage}
      className={twMerge(
        clsx(
          "w-10 h-10 rounded-md cursor-pointer px-1 bg-main-100 text-main-600 font-bold flex items-center justify-center",
          !page && +content === 1 && "bg-main-600 text-white",
          +page && +content === +page && "bg-main-600 text-white"
        )
      )}>
      {content}
    </button>
  );
};

export default withRouter(PaginationItem);
