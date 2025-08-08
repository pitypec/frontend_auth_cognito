// import React from "react";
import {
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

  //   const logoutAction = () => {
  //     dispatch(logout());
  //     localStorage.clear();
  //     navigate("/signin");
  //   };
  return {
    loginUser,
    signupUser,
    // createUser,
    // resetUserPassword,
  };
};

export default useAuth;
