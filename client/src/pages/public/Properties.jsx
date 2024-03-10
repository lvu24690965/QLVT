import React, { useEffect, useState } from "react";
import { BreadCrumb, Button, InputSelect, PropertyCard } from "~/components";
import { apiGetProperties } from "~/apis/properties";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { Pagination } from "~/components/paginations";

const Properties = () => {
  const [properties, setProperties] = useState();
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState("ALL");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  useEffect(() => {
    const fetchProperties = async (params) => {
      const reponse = await apiGetProperties({
        limit: import.meta.env.VITE_LIMITS,
        ...params,
      });
      if (reponse.success) setProperties(reponse.properties);
    };
    const params = Object.fromEntries([...searchParams]);
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
        <div className="my-4 flex justify-between items-center text-base">
          <div>
            <InputSelect
              register={register}
              id="sort"
              errors={errors}
              options={[
                { value: "-createdAt", label: "Lastest" },
                { value: "createdAt", label: "Oldest" },
                { value: "name", label: "Name (A-Z)" },
                { value: "-name", label: "Name (Z-A)" },
              ]}
              containerClassname="flex-row items-center gap-2"
              placeholder="Select"
              label="Sort:"
              inputClassname="w-fit rounded-md"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button
              handleOnClick={() => setMode("ALL")}
              className={twMerge(
                clsx(
                  "whitespace-nowrap bg-transparent border-none text-black font-medium",
                  mode === "ALL" && "font-bold"
                )
              )}>
              All Properties
            </Button>
            <Button
              handleOnClick={() => setMode("Avalable")}
              className={twMerge(
                clsx(
                  "whitespace-nowrap bg-transparent border-none text-black font-medium",
                  mode === "Avalable" && "font-bold"
                )
              )}>
              Is Avalable
            </Button>
            <Button
              handleOnClick={() => setMode("Reparing")}
              className={twMerge(
                clsx(
                  "whitespace-nowrap bg-transparent border-none text-black font-medium",
                  mode === "Reparing" && "font-bold"
                )
              )}>
              Repairing
            </Button>
          </div>
        </div>
        <div className="w-main mx-auto my-20">
          <div className="w-full grid grid-cols-3 gap-4">
            {properties?.rows?.map((property) => (
              <PropertyCard key={property.id} properties={property} />
            ))}
          </div>
          <div className="flex items-center justify-center my-4">
            <Pagination
              total={properties?.count}
              limit={properties?.limit}
              page={properties?.page}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;
