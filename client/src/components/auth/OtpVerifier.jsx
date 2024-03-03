import React from "react";
import OtpInput from "react-otp-input";
import { useState } from "react";
import { Button } from "..";
const OtpVerifier = ({ phone, cb }) => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleConfirmOTP = () => {
    setIsLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        setIsLoading(false);
        cb();
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };
  return (
    <div className="p-4 flex items-center justify-center h-full flex-col gap-12 ">
      <span>
        We sent OTP code to your phone number <span>{phone}</span>. Please check
        your phone
      </span>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        separator={<span>-</span>}
        renderInput={(props) => <input {...props} />}
        inputStyle="h-16 border rounded-md otp-item outline-none inline-block text-lg mx-2"
        shouldAutoFocus={true}
      />
      <div className="flex gap-4 items-center justify-center">
        <Button disabled={isLoading} handleOnClick={handleConfirmOTP}>
          Confirm OTP
        </Button>
        <Button handleOnClick={() => setOtp("")} className="bg-red-400">
          Clear
        </Button>
      </div>
    </div>
  );
};

export default OtpVerifier;
