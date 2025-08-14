// import React from "react";
import {
  confirmSignup,
  login,
  signup,
  // signUp,
} from "../ds/auth";

const useAuth = () => {
  const loginUser = async (data: Record<string, unknown>) => {
    console.log({ data }, "cont");
    const response = await login(data);
    return response;
  };
  const signupUser = async (data: Record<string, unknown>) => {
    const response = await signup(data);
    return response;
  };
  const confirmUserSignup = async (data: Record<string, unknown>) => {
    const response = await confirmSignup(data);
    return response;
  };

  return {
    loginUser,
    signupUser,
    confirmUserSignup,
  };
};

export default useAuth;
