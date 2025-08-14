import { useState } from "react";
import OTPInput from "../../component/shared/otp";
import useAuth from "../../hooks/useAuth";
import type { CustomError } from "../../types/error";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ConfirmSignup = () => {
  const [value, setValue] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const { confirmUserSignup } = useAuth();
  const navigate = useNavigate();

  const onComplete = async (data: string) => {
    setValue(data);
  };

  const handleClick = async () => {
    try {
      setLoading(true);
      console.log({ value });
      const username = localStorage.getItem("username");
      const res = await confirmUserSignup({
        code: value,
        username: username,
      });
      if (res.code === "00") {
        navigate("/");
        toast.success(res?.message);
      }
      setLoading(false);
    } catch (error) {
      const axiosError = error as CustomError;
      if (axiosError) {
        toast.error(
          (axiosError?.response?.data as { message: string }).message || ""
        );
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex  h-screen items-center justify-center">
      <div className="flex flex-col gap-[10px]">
        <h1>Input Code Sent</h1>
        <OTPInput onComplete={onComplete} />
        <button
          className="bg-[#095C37] cursor-pointer rounded-[8px] w-full flex justify-center items-center p-4 text-white h-[44px]"
          onClick={handleClick}
        >
          {loading ? "loading..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default ConfirmSignup;
