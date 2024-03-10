import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";
import { ImSpinner2 } from "react-icons/im";

const PropertyType = ({
  children,
  className,
  handleOnClick,
  type = "button",
  disabled,
}) => {
  return (
    <button
      type={type}
      onClick={handleOnClick}
      className={twMerge(
        clsx(
          "py-3 px-4 flex justify-center text-amber-100 bg-transparent items-center gap-5",
          className,
          disabled && "opacity-50"
        )
      )}
      disabled={disabled}>
      {disabled && (
        <span className="animate-spin ">
          <ImSpinner2 />
        </span>
      )}
      {children}
    </button>
  );
};

export default PropertyType;
