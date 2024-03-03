import React from "react";
import { Title, Button, InputForm, TextArea, InputFile } from "~/components";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { toast } from "react-toastify";
import { apiCreateNewPropertyType } from "~/apis/propertyType";
const CreatePropertyType = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    setError,
    clearErrors,
  } = useForm();
  const handleCreateNewPropertyType = async (data) => {
    if (!data.images || data.images.length === 0) {
      setError("images", {
        type: "required",
        message: "This field cannot empty",
      });
    } else {
      const { images, ...rest } = data;
      const response = await apiCreateNewPropertyType({
        ...rest,
        image: images[0],
      });
      if (response.success) {
        toast.success(response.mes);
        reset();
        getImages([]);
      } else {
        toast.error(response.mes);
      }
    }
  };
  const getImage = (images) => {
    if (images && images.length > 0) clearErrors("images");
    setValue(
      "images",
      images?.map((el) => el.path)
    );
  };
  return (
    <div className="">
      <Title title="Create New Property Type">
        <Button
          className="font-semibold"
          handleOnClick={handleSubmit(handleCreateNewPropertyType)}>
          Create
        </Button>
      </Title>
      <form className="p-4 flex flex-col gap-4">
        <InputForm
          id="name"
          register={register}
          errors={errors}
          validate={{ require: "This field cannot empty" }}
          label="Property Type Name"
        />
        <TextArea
          id="description"
          register={register}
          errors={errors}
          validate={{ require: "This field cannot empty" }}
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

export default CreatePropertyType;
