import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const InputText = ({
  label,
  containerClassname,
  height = 500,
  register,
  errors,
  validate,
  id,
  setValue,
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
      <Editor
        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
        //onInit={(evt, editor) => (editorRef.current = editor)}
        //initialValue="<p>This is the initial content of the editor.</p>"
        {...register(id, validate)}
        onChange={(e) => setValue(id, e.target.getContent())}
        init={{
          height,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      {errors[id] && (
        <small className="text-red-500">{errors[id]?.message}</small>
      )}
    </div>
  );
};

export default InputText;
