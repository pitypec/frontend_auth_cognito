import React, { useState } from "react";
import { Form, Formik } from "formik";
import CustomImage from "../../component/shared/customImage";
import Logo from "../../assets/react.svg";
import InputText from "../../component/shared/input/InputText";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import type { CustomError } from "../../types/error";
import useAuth from "../../hooks/useAuth";
import AuthLayout from "../../component/shared/layouts/AuthLayout";
import { signUpSchema } from "../../validationSchema/auth";

const SignUp = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signupUser } = useAuth();

  const initialValues = {
    username: "",
    password: "",
    name: "",
    email: "",
  };
  const signUp = async (data: Record<string, unknown>) => {
    try {
      setLoading(true);
      const payload = {
        username: data?.username,
        password: data?.password,
        attributes: {
          name: data?.name,
          preferred_username: data?.username,
          email: data?.email,
        },
      };
      localStorage.setItem("username", data?.username as string);
      const res = await signupUser(payload);
      const { data: signupRes } = res;
      if (res?.code === "00" && !signupRes.UserConfirmed) {
        navigate("/confirm-signup");
      }
      if (res?.code === "01" && res?.message) {
        toast.error(res?.data?.message || "something went wrong");
      }
    } catch (error: unknown) {
      console.log({ error });
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
            <div className="w-[85.67px] h-[57.59px]">
              <CustomImage src={Logo} alt="builder" />
            </div>
            <div className="pt-[20px]">
              <h1 className="font-semibold text-[20px] text-[#095C37]">
                Welcome To Client side
              </h1>
              <p className="text-[14px] text-center">
                Sign in with your credentials below.
              </p>
            </div>
          </div>
          <div className="w-full">
            <Formik
              initialValues={initialValues}
              validationSchema={signUpSchema}
              onSubmit={signUp}
            >
              {({ handleChange, errors, values, handleSubmit }) => {
                return (
                  <Form>
                    <div className="mb-3 w-full">
                      <InputText
                        placeholder={"Enter your email"}
                        label={"Email"}
                        handleChange={(
                          e: React.ChangeEvent<HTMLInputElement>
                        ) => handleChange(e)}
                        value={values.email}
                        name={"email"}
                        unit={""}
                        type={"email"}
                        error={errors.email}
                        fieldRequired={false}
                        labelStyle="text-start"
                        readOnly={false}
                        disabled={false}
                        textStyle={""}
                        viewPassword={false}
                        inputClassName={""}
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <InputText
                        placeholder={"Enter your fullname"}
                        label={"Full Name"}
                        handleChange={(
                          e: React.ChangeEvent<HTMLInputElement>
                        ) => handleChange(e)}
                        value={values.name}
                        name={"name"}
                        unit={""}
                        type={"text"}
                        error={errors.name}
                        fieldRequired={false}
                        labelStyle="text-start"
                        readOnly={false}
                        disabled={false}
                        textStyle={""}
                        viewPassword={false}
                        inputClassName={""}
                      />
                    </div>
                    <div className="mb-3 w-full">
                      <InputText
                        placeholder={"Enter your username"}
                        label={"Username"}
                        handleChange={(
                          e: React.ChangeEvent<HTMLInputElement>
                        ) => handleChange(e)}
                        value={values.username}
                        name={"username"}
                        unit={""}
                        type={"text"}
                        error={errors.username}
                        fieldRequired={false}
                        labelStyle="text-start"
                        readOnly={false}
                        disabled={false}
                        textStyle={""}
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
                        error={errors?.password}
                        fieldRequired={false}
                        readOnly={false}
                        disabled={false}
                        labelStyle="text-start"
                        rightIcon
                        viewPassword={viewPassword}
                        textStyle={""}
                        inputClassName={""}
                        setViewPassword={setViewPassword}
                      />
                    </div>
                    <div
                      className="mt-4 mb-[32px] flex items-center justify-start lg:justify-start gap-1 w-full"
                      style={{ cursor: "pointer" }}
                    >
                      Already have an account?
                      <Link to={"/"} className="mb-0 text-sm text-[#475467]">
                        Signin
                      </Link>
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

export default SignUp;
