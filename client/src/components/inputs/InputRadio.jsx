import clsx from "clsx";
import React from "react";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";

const InputRadio = ({
  style = "form-radio",
  containerClassname,
  optionsClassname,
  id,
  label,
  register,
  errors = {},
  inputClassname,
  validate,
  placeholder,
  option = [],
}) => {
  return (
    <div
      className={twMerge(
        clsx("flex flex-col gap-2 w-full", containerClassname)
      )}>
      {label && (
        <label className="font-medium text-main-700" htmlFor={id}>
          {label}
        </label>
      )}
      <div className={twMerge(clsx(optionsClassname))}>
        {option.map((el) => (
          <div className="flex items-center gap-2" key={el.value}>
            <input
              name={id}
              type="radio"
              id={el.value}
              value={el.value}
              className={twMerge(
                clsx(style, "placeholder:text-sm", inputClassname)
              )}
              {...register(id, validate)}
              placeholder={placeholder}
            />
            <label
              className="font-medium  cursor-pointer text-main-700"
              htmlFor={el.value}>
              {el.label}
            </label>
          </div>
        ))}
      </div>
      {errors[id] && (
        <small className="text-red-500">{errors[id]?.message}</small>
      )}
    </div>
  );
};

export default InputRadio;
