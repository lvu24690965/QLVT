import React, { useEffect } from "react";
import {
  Title,
  Button,
  InputForm,
  TextArea,
  InputFile,
  InputRadio,
  SelectLib,
} from "~/components";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { toast } from "react-toastify";
import { apiCreateNewProperty } from "~/apis/properties";
import { useUserStore } from "~/store/useUserStore";
import { usePropertiesStore } from "~/store/usePropertiesStore";
import { useDepartmentStore } from "~/store/useDepartmentStore";
const CreateProperty = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    setError,
    clearErrors,
  } = useForm();
  const { current } = useUserStore();
  const { propertyTypes } = usePropertiesStore();
  const { departments } = useDepartmentStore();
  const getImage = (images) => {
    if (images && images.length > 0) clearErrors("images");
    setValue(
      "images",
      images?.map((el) => el.path)
    );
  };
  useEffect(() => {
    // Kiểm tra nếu current tồn tại và có id
    if (current?.id) {
      // Đặt giá trị mặc định cho postedBy bằng current.id
      setValue("postedBy", current.id);
    }
  }, [current?.id, setValue]);
  const handleCreateNewProperty = async (data) => {
    if (!data.images || data.images.length === 0) {
      setError("images", {
        type: "required",
        message: "This field cannot empty",
      });
    } else {
      const { images, ...rest } = data;
      const response = await apiCreateNewProperty({
        ...rest,
        images: images[0],
      });
      if (response.success) {
        toast.success(response.mes);
        getImage([]);
        reset();
      } else {
        toast.error(response.mes);
      }
    }
  };
  return (
    <div className="">
      <Title title="Create New Property">
        <Button
          className="font-semibold"
          handleOnClick={handleSubmit(handleCreateNewProperty)}>
          Create
        </Button>
      </Title>
      <form className="p-4 flex flex-col gap-4">
        <InputForm
          id="postedBy"
          containerClassname={twMerge("hidden")}
          register={register}
          errors={errors}
        />
        <InputForm
          id="name"
          register={register}
          errors={errors}
          validate={{ require: "This field cannot empty" }}
          label="Property Name"
        />
        <InputRadio
          register={register}
          id="statusType"
          optionsClassname="grid grid-cols-3 gap-4"
          label="Status Property"
          validate={{ required: "This field is required" }}
          errors={errors}
          option={[
            { value: "RECEIVE", label: "Receive" },
            { value: "REPAIR", label: "Repair" },
            { value: "RENTED", label: "Rented" },
          ]}
        />
        <InputRadio
          register={register}
          id="isAvalable"
          label={"Avalable"}
          optionsClassname="grid grid-cols-2 gap-4"
          validate={{ required: "This field is required" }}
          errors={errors}
          option={[
            { value: "true", label: "Avalable" },
            { value: "false", label: "Not Avalable" },
          ]}
        />
        <SelectLib
          id="propertyTypeId"
          register={register}
          errors={errors}
          label={"Property Type"}
          placeholder="Type or Select Property Type"
          options={propertyTypes?.map((el) => ({ ...el, label: el.name }))}
          onChange={(val) => setValue("propertyTypeId", val?.id)}
        />
        <SelectLib
          id="departmentId"
          register={register}
          errors={errors}
          label={"Department"}
          placeholder="Type or Select Department"
          options={departments?.map((el) => ({ ...el, label: el.name }))}
          onChange={(val) => setValue("departmentId", val?.id)}
        />
        <TextArea
          id="description"
          register={register}
          errors={errors}
          label="Description"
        />
        <InputFile
          id="images"
          register={register}
          errors={errors}
          validate={{ require: "This field cannot empty" }}
          label="Image"
          getImages={getImage}
        />
      </form>
    </div>
  );
};

export default CreateProperty;
