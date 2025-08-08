import React, { useState } from "react";
import { Form, Formik } from "formik";
import CustomImage from "../../component/shared/customImage";
import Logo from "../../assets/react.svg";
import InputText from "../../component/shared/input/InputText";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthLayout from "../../component/shared/layouts/AuthLayout";
import { signInSchema } from "../../validationSchema/auth";
import useAuth from "../../hooks/useAuth";
import type { CustomError } from "../../types/error";

const SignIn = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const initialValues = {
    username: "",
    password: "",
  };
  const signIn = async (data: Record<string, unknown>) => {
    console.log({ data }, "submit");
    try {
      setLoading(true);
      const res = await loginUser(data);
      console.log({ res });
      if (res?.data) {
        localStorage.setItem("accessToken", res?.data?.AccessToken);
        const { user } = res.data;
        console.log({ user });
        // dispatch(setUserData(user));
        navigate("/dashboard");
      }
      if (res?.data?.code === "01" && res?.data.message) {
        toast.error(res?.data?.message || "something went wrong");
      }
    } catch (error: unknown) {
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
    <AuthLayout>
      <div className="grow flex flex-col lg:flex-row lg:w-full gap-[32px] lg:gap-[88px] px-[16px] lg:px-[64px]">
        <div className="flex flex-col justify-center gap-[24px] lg:w-[411px] border border-[#EAECF0] p-[32px]">
          <div className="flex flex-col items-center">
            <div className="w-[30px] h-[30px]">
              <CustomImage src={Logo} alt="builder" />
            </div>
            <div className="pt-[20px]">
              <h1 className="font-semibold text-[20px] text-[#095C37]">
                Welcome To Nebula Logix
              </h1>
              <p className="text-[14px] text-center">
                Sign in with your credentials below.
              </p>
            </div>
          </div>
          <div className="w-full">
            <Formik
              initialValues={initialValues}
              validationSchema={signInSchema}
              onSubmit={signIn}
            >
              {({ handleChange, errors, values, handleSubmit }) => {
                return (
                  <Form>
                    <div className="mb-3 w-full">
                      <InputText
                        placeholder={"Enter your username"}
                        label={"Email"}
                        handleChange={(
                          e: React.ChangeEvent<HTMLInputElement>
                        ) => handleChange(e)}
                        value={values.username}
                        name={"username"}
                        unit={""}
                        type={"text"}
                        //   inputClassName={"w-full h-[44px]"}
                        error={errors.username}
                        fieldRequired={false}
                        labelStyle="text-start"
                        readOnly={false}
                        disabled={false}
                        textStyle={"justify-start"}
                        viewPassword={false}
                        inputClassName={""}
                      />
                    </div>

                    <div className="mb-3 w-full">
                      <InputText
                        placeholder={"Enter your password"}
                        label={"Password"}
                        handleChange={(
                          e: React.ChangeEvent<HTMLInputElement>
                        ) => handleChange(e)}
                        value={values.password}
                        name={"password"}
                        unit={""}
                        type={`${viewPassword ? "text" : "password"}`}
                        //   inputClassName={"w-full h-[44px]"}
                        error={errors?.password}
                        fieldRequired={false}
                        readOnly={false}
                        disabled={false}
                        labelStyle="text-start"
                        rightIcon
                        viewPassword={viewPassword}
                        textStyle={""}
                        inputClassName={""} //   viewPassword={false}
                        setViewPassword={setViewPassword}
                      />
                    </div>

                    <div className="mt-2 w-full">
                      <button
                        className="bg-[#095C37] cursor-pointer rounded-[8px] w-full flex justify-center items-center p-4 text-white h-[44px]"
                        type="submit"
                        onClick={() => handleSubmit()}
                      >
                        {loading ? "loading..." : "Sign in"}
                      </button>
                    </div>
                    <div className="mt-4 flex items-center justify-end gap-1 w-full">
                      Don't have an account?
                      <Link
                        to={"/signup"}
                        className="mb-0 text-sm text-[#475467]"
                      >
                        Signup
                      </Link>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
