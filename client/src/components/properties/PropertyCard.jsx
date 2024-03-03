import React from "react";

const PropertyCard = ({ properties }) => {
  return (
    <div className="border rounded-md">
      <img
        src={properties?.images}
        alt=""
        className="w-full h-[240px] object-cover rounded-md"
      />
      <div className="p-4">
        <h1 className="text-4xl uppercase text-gray-700">{properties.name}</h1>
      </div>
    </div>
  );
};

export default PropertyCard;
