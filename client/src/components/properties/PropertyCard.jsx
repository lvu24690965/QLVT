import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

const PropertyCard = ({ properties }) => {
  const isAvalable = properties?.isAvalable ? "Available" : "Not Available";
  const statusType = properties?.statusType;
  return (
    <div className="border rounded-md">
      <img
        src={properties?.images}
        alt=""
        className="w-full h-[240px] object-cover rounded-md"
      />
      <div className="p-4">
        <h1 className="text-4xl uppercase text-gray-700">{properties.name}</h1>
        <div className="flex items-center py-4 gap-3 text-sm">
          <span
            className={twMerge(
              clsx(
                "",
                statusType === "RECEIVE"
                  ? "text-green-600"
                  : statusType === "REPAIR"
                  ? "text-yellow-600"
                  : "text-red-600"
              )
            )}>
            {properties?.statusType}
          </span>
          <span>{isAvalable}</span>
          <span>{properties?.rUser?.name}</span>
        </div>
        <div>
          <div className="flex py-3 border-t border-gray-300 my-auto items-center gap-4">
            <img
              src={properties?.propertyDepartment?.departmentName?.image}
              alt=""
              className="w-10 h-10 object-cover items-center my-auto justify-between rounded-full"
            />
            <span className="font-medium">
              {properties?.propertyDepartment?.departmentName?.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
