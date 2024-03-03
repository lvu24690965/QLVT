import React from "react";
import SearchItem from "./SearchItem";
import { Button, InputForm, InputSelect, SelectLib } from "..";
import { useForm } from "react-hook-form";
import { useDepartmentStore } from "~/store/useDepartmentStore";
import { usePropertiesStore } from "~/store/usePropertiesStore";
import withRouter from "~/hocs/withRouter";
import { createSearchParams } from "react-router-dom";
import path from "~/utils/path";
const Search = ({ navigate }) => {
  const { register, errors, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      department: "",
      propertyType: "",
    },
  });
  const { departments } = useDepartmentStore();
  const { propertyTypes } = usePropertiesStore();
  const propertyType = watch("propertyType");
  const department = watch("department");
  const handleSearchParams = (data) => {
    const params = new Object();

    if (department) params.department = data.department.name;
    if (propertyType) params.propertyType = data.propertyType.name;

    navigate({
      pathname: `/${path.PROPERTIES}`,
      search: createSearchParams(params).toString(),
    });
  };

  return (
    <form className="h-[128px] py-8 mt-[-64px] grid grid-cols-3 relative z-20 bg-white rounded-md shadow-lg w-[822px] mx-auto border">
      <SearchItem title="Departments">
        <SelectLib
          id="department"
          register={register}
          errors={errors}
          placeholder="Type your required Department"
          options={departments?.map((el) => ({ ...el, label: el.name }))}
          onChange={(val) => setValue("department", val)}
        />
      </SearchItem>
      <SearchItem title="Property Type">
        <SelectLib
          id="propertyType"
          register={register}
          errors={errors}
          placeholder="Select Property Type"
          options={propertyTypes?.map((el) => ({ ...el, label: el.name }))}
          onChange={(val) => setValue("propertyType", val)}
        />
      </SearchItem>
      <div className="flex justify-center items-center">
        <Button handleOnClick={handleSubmit(handleSearchParams)}>Search</Button>
      </div>
    </form>
  );
};

export default withRouter(Search);
