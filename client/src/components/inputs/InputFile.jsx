import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { FiUpload } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import { apiUploadImages } from "~/apis/beyond";
import { IoIosClose } from "react-icons/io";
import { toast } from "react-toastify";

const InputFile = ({
  containerClassname,
  label,
  id,
  validate,
  multiple,
  getImages,
  errors,
}) => {
  const { register, watch } = useForm();
  const rawImages = watch(id);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const handleUpload = async (files) => {
    const formData = new FormData();
    setIsLoading(true);
    const uploadPromises = [];
    for (let file of files) {
      formData.append("file", file);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );
      uploadPromises.push(apiUploadImages(formData));
    }
    const response = await Promise.all(uploadPromises);
    setIsLoading(false);

    if (response && response.length > 0) {
      const tempArrImage = [];
      for (let result of response) {
        if (result.status === 200)
          tempArrImage.push({
            id: result.data.public_id,
            path: result.data.secure_url,
          });
      }
      setImages(tempArrImage);
    } else toast.error("Upload image failed");
  };
  useEffect(() => {
    if (rawImages && rawImages instanceof FileList && rawImages.length > 0) {
      handleUpload(rawImages);
    }
  }, [rawImages]);
  useEffect(() => {
    getImages(images);
  }, [images]);
  const handleDeleteImage = (e, imageId) => {
    e.preventDefault();
    setImages((prev) => prev.filter((el) => el.id !== imageId));
  };
  return (
    <div
      className={twMerge(
        clsx("flex flex-col gap-2 w-full", containerClassname)
      )}>
      {label && (
        <span className="font-medium text-main-700" htmlFor={id}>
          {label}
        </span>
      )}
      <input
        id={id}
        type="file"
        className="hidden"
        {...register(id, validate)}
        multiple={multiple}
      />

      <label
        htmlFor={id}
        className="bg-gray-100 w-full p-16 flex flex-col gap-2 justify-center items-center">
        {isLoading ? (
          <span className="animate-spin text-main-600">
            <ImSpinner2 size={25} />
          </span>
        ) : images?.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {images?.map((el, idx) => (
              <div key={idx} className="col-span-1 relative">
                <span
                  onClick={(e) => handleDeleteImage(e, el.id)}
                  className="absolute top-1 right-1 w-6 h-6 bg-gray-100 rounded-full flex justify-center cursor-pointer items-center">
                  <IoIosClose size={20} />
                </span>
                <img src={el.path} alt="" className="w-full object-contain" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <span>
              <FiUpload />
            </span>
            <small className="text-gray-300 italic">
              Only support image with extension JPEG, PNG, JPG
            </small>
          </>
        )}
      </label>
      {errors[id] && (
        <small className="text-red-500">{errors[id]?.message}</small>
      )}
    </div>
  );
};

export default InputFile;
