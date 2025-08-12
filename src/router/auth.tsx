// import SignIn from "../pages/auth/SignIn";

import ConfirmSignup from "../pages/auth/ConfirmSignup";
import SignIn from "../pages/auth/Signin";
import SignUp from "../pages/auth/Signup";
// import SignIn from "../pages/auth/Signup";

export const getAuthRouter = () => {
  return [
    {
      path: "/",
      element: <SignIn />,

      // errorElement: <ErrorPage />,
    },
    {
      path: "signin",
      element: <SignIn />,
      // errorElement: <ErrorPage />,
    },
    {
      path: "signup",
      element: <SignUp />,
      // errorElement: <ErrorPage />,
    },
    {
      path: "confirm-signup",
      element: <ConfirmSignup />,
      // errorElement: <ErrorPage />,
    },
  ];
};
