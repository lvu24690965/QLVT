import React from "react";
import usePagination from "~/hooks/usePagination";
import PaginationItem from "./PaginationItem";
import { Button } from "..";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import withRouter from "~/hocs/withRouter";

const Pagination = ({ total, limit, page, sibling, navigate, location }) => {
  const [searchParams] = useSearchParams();
  const paginations = usePagination({
    total,
    limit,
    currentPage: page,
    sibling,
  });
  const handleNextPage = () => {
    if (+page >= Math.ceil(+total / +limit)) return;
    navigate({
      pathname: location.pathname,
      search: createSearchParams({ page: +page + 1 }).toString(),
    });
  };
  const handleBackPage = () => {
    if (+page === 1) return;
    navigate({
      pathname: location.pathname,
      search: createSearchParams({ page: +page - 1 }).toString(),
    });
  };
  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        handleOnClick={handleBackPage}
        className={twMerge(
          clsx(!page || +page === 1 ? "cursor-not-allowed opacity-50" : "")
        )}>
        <FaArrowLeft />
      </Button>
      {paginations?.map((el, idx) => (
        <PaginationItem
          page={searchParams.get("page")}
          content={el}
          key={idx}
        />
      ))}
      <Button
        handleOnClick={handleNextPage}
        className={twMerge(
          clsx(
            +page === Math.ceil(+total / +limit)
              ? "cursor-not-allowed opacity-50"
              : ""
          )
        )}>
        <FaArrowRight />
      </Button>
    </div>
  );
};

export default withRouter(Pagination);
