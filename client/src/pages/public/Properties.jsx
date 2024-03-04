import React, { useEffect, useState } from "react";
import { BreadCrumb, PropertyCard } from "~/components";
import { apiGetProperties } from "~/apis/properties";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const Properties = () => {
  const [properties, setProperties] = useState();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const fetchProperties = async (params) => {
      const reponse = await apiGetProperties({
        limit: import.meta.env.VITE_LIMITS,
        ...params,
      });
      if (reponse.success) setProperties(reponse.properties);
    };
    const params = Object.fromEntries(searchParams);
    fetchProperties(params);
  }, [searchParams]);
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
