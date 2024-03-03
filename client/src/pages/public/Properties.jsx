import React, { useEffect, useState } from "react";
import { BreadCrumb, PropertyCard } from "~/components";
import { apiGetProperties } from "~/apis/properties";

const Properties = () => {
  const [properties, setProperties] = useState();
  useEffect(() => {
    const fetchProperties = async () => {
      const reponse = await apiGetProperties({
        limit: import.meta.env.VITE_LIMITS,
      });
      if (reponse.success) setProperties(reponse.properties);
      console.log(reponse.properties.rows);
    };
    fetchProperties();
  }, []);
  return (
    <div className="w-full">
      <div className="relative w-full">
        <img src="Properties.png" alt="" className="w-full object-contain" />
        <div className="absolute inset-0 flex-col text-main-600 flex justify-center items-center">
          <h1 className="text-[48px] font-medium">Properties</h1>
          <div>
            <BreadCrumb />
          </div>
        </div>
      </div>
      <div className="w-main mx-auto my-20">
        <div>Sort by</div>
        <div className="w-full grid grid-cols-3 gap-4">
          {properties?.rows?.map((property) => (
            <PropertyCard key={property.id} properties={property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Properties;
