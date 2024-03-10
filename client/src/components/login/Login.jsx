import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { Button, InputForm, InputRadio, OtpVerifier, SelectLib } from "..";
import { apiRegister, apiSignIn } from "~/apis/auth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useAppStore } from "~/store/useAppStore";
import { useUserStore } from "~/store/useUserStore";
import auth from "~/utils/firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { twMerge } from "tailwind-merge";
import { useDepartmentStore } from "~/store/useDepartmentStore";

const Login = () => {
  const [variant, setVariant] = useState("LOGIN");
  const [isLogin, setIsLogin] = useState(false);
  const [isShowConfirmOTP, setIsShowConfirmOTP] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
  const { setModal } = useAppStore();
  const { departments } = useDepartmentStore();
  const { token, setToken, roles } = useUserStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm();
  const department = watch("departmentId");
  useEffect(() => {
    reset();
  }, [variant]);
  const handleCaptchaVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-verifier",
        {
          size: "invisible",
          callback: (response) => {},
          "expired-callback": (response) => {},
        }
      );
    }
  };
  const handleSendOTP = (phone) => {
    setIsLogin(true);
    handleCaptchaVerify();
    const verifier = window.recaptchaVerifier;
    const formatPhone = "+84" + phone.slice(1);
    signInWithPhoneNumber(auth, formatPhone, verifier)
      .then((result) => {
        setIsLogin(false);
        window.confirmationResult = result;
        toast.success("OTP has been sent to your phone");
        setIsShowConfirmOTP(true);
      })
      .catch((error) => {
        setIsLogin(false);
        window.isSentOTP = false;
        toast.error("OTP has been sent to your phone");
      });
  };
  const onSubmit = async (data) => {
    if (variant === "REGISTER") {
      handleSendOTP(data.phone);
    }

    if (variant === "LOGIN") {
      const { name, roleCode, ...payload } = data;
      setIsLogin(true);
      const response = await apiSignIn(payload);
      setIsLogin(false);
      if (response.success) {
        toast.success(response.mes);
        setToken(response.accessToken);
        setModal(false, null);
      } else {
        toast.error(response.mes);
      }
    }
  };
  const handleRegister = async (data) => {
    const response = await apiRegister(data);
    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Register success",
        text: response.mes,
        showConfirmButton: true,
        confirmButtonText: "Go to login page",
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          setVariant("LOGIN");
          setIsShowConfirmOTP(false);
        }
      });
    } else {
      toast.error(response.mes);
    }
  };
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={twMerge(
        clsx(
          "bg-white text-base items-center rounded-md px-6 py-12 w-[500px] flex flex-col gap-6 relative",
          isShowConfirmOTP && "w-[600px] h-[270px]"
        )
      )}>
      {isShowConfirmOTP && (
        <div className="absolute inset-0 bg-white rounded-md ">
          <OtpVerifier cb={handleSubmit(handleRegister)} />
        </div>
      )}
      <h1 className="text-5xl font-dacing font-semibold tracking-tight">
        Welcome to Rou
      </h1>
      <div
        className={twMerge(
          clsx(
            "flex border-b w-full justify-start gap-6",
            isShowConfirmOTP && "hidden"
          )
        )}>
        <span
          onClick={() => setVariant("LOGIN")}
          className={clsx(
            variant === "LOGIN" && "border-b-4 border-main-700",
            "cursor-pointer"
          )}>
          Login
        </span>
        <div id="recaptcha-verifier"></div>
        <span
          onClick={() => setVariant("REGISTER")}
          className={clsx(
            variant === "REGISTER" && "border-b-4 border-main-700",
            "cursor-pointer"
          )}>
          New account
        </span>
      </div>
      <form
        className={twMerge(
          clsx("flex flex-col w-full", isShowConfirmOTP && "hidden")
        )}>
        <InputForm
          inputClassname="rounded-md"
          register={register}
          id="phone"
          label="Phone Number"
          placeholder="Enter your phone number"
          validate={{
            required: "This field is required",
            pattern: {
              value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
              message: "Invalid phone number",
            },
          }}
          errors={errors}
        />
        <InputForm
          inputClassname="rounded-md"
          register={register}
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          validate={{ required: "This field is required" }}
          errors={errors}
        />
        {variant === "REGISTER" && (
          <InputForm
            inputClassname="rounded-md"
            register={register}
            id="name"
            label="Your full name"
            placeholder="Enter your password"
            validate={{ required: "This field is required" }}
            errors={errors}
          />
        )}
        {/*variant === "REGISTER" && (
          <InputRadio
            register={register}
            id="roleCode"
            optionsClassname="grid grid-cols-2 gap-4"
            label="Type of account"
            validate={{ required: "This field is required" }}
            errors={errors}
            option={roles
              ?.filter((el) => el.roleCode !== "ROL1" && el.roleCode !== "ROL7")
              ?.map((el) => ({
                value: el.roleCode,
                label: el.value,
              }))}
          />
            )*/}
        {variant === "REGISTER" && (
          <SelectLib
            id="departmentId"
            register={register}
            errors={errors}
            label={"Department"}
            placeholder="Type your required Department"
            options={departments?.map((el) => ({ ...el, label: el.name }))}
            onChange={(val) => setValue("departmentId", val?.id)}
          />
        )}

        <Button
          disabled={isLogin}
          handleOnClick={handleSubmit(onSubmit)}
          className="py-1 my-6">
          {variant === "LOGIN" ? "Sign in" : "Register"}
        </Button>
        <span className="cursor-pointer w-full text-center text-main-500 hover:underline">
          Forgot your password?
        </span>
      </form>
    </div>
  );
};

export default Login;
