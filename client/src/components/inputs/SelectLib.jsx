import clsx from "clsx";
import React from "react";
import Select from "react-select";
import { twMerge } from "tailwind-merge";

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    maxHeight: "200px", // Change this to your desired max height
    overflow: "auto", // Add this line
  }),
};

const SelectLib = ({
  style = "form-select",
  containerClassname,
  label,
  id,
  type = "text",
  register,
  errors = {},
  inputClassname,
  validate,
  placeholder,
  options = [],
  onChange,
}) => {
  return (
    <div
      className={twMerge(
        clsx("flex flex-col gap-2 w-full ", containerClassname)
      )}>
      {label && (
        <label className="font-medium text-main-700" htmlFor={id}>
          {label}
        </label>
      )}

      <Select
        {...register(id, validate)}
        placeholder={placeholder}
        isClearable
        options={options}
        isSearchable
        onChange={(val) => onChange(val)}
        formatOptionLabel={(option) => (
          <div className="flex items-center gap-2">
            <img src={option.image} alt="" className="w-5 h-5 object-cover" />
            <span>{option.label}</span>
          </div>
        )}
        className={{
          control: () => clsx(""),
          input: () => "",
          option: () => "",
        }}
        styles={customStyles}
      />

      {errors[id] && (
        <small className="text-red-500">{errors[id]?.message}</small>
      )}
    </div>
  );
};

export default SelectLib;
