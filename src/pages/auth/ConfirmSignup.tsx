import OTPInput from "../../component/shared/otp";

const ConfirmSignup = () => {
  return (
    <div className="flex  h-screen items-center justify-center">
      <div className="flex flex-col gap-[10px]">
        <h1>Input Code Sent</h1>
        <OTPInput />
      </div>
    </div>
  );
};

export default ConfirmSignup;
