import { Suspense, useEffect, useState, type JSX } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";
import "./App.css";
import { getAuthRouter } from "./router/auth";
import { getDashboardRouter } from "./router/dashboard";
import { Toaster } from "react-hot-toast";

function App() {
  const [router, setRouter] = useState<any>([]);
  const [hasRouter, setHasRouter] = useState(false);

  useEffect(() => {
    const createRoute = async () => {
      try {
        const routerArray: any[] = [];
        const dashboardRouters: { path: string; element: JSX.Element }[] =
          getDashboardRouter();
        const authRouters: { path: string; element: JSX.Element }[] =
          getAuthRouter();
        const defaultRouter: RouteObject[] = routerArray.concat(
          authRouters,
          dashboardRouters
        );
        setRouter(createBrowserRouter(defaultRouter));
        setHasRouter(true);
      } catch (e: unknown) {
        const routerArray: any[] = [];
        const dashboardRouters = getDashboardRouter();
        const authRouters = getAuthRouter();
        const defaultRouter = routerArray.concat(authRouters, dashboardRouters);
        setRouter(createBrowserRouter(defaultRouter));
        setHasRouter(true);
      }
    };
    createRoute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {hasRouter && (
        <Suspense fallback={<div>Loading...</div>}>
          <Toaster />
          <RouterProvider router={router} />
        </Suspense>
      )}
    </>
  );
}

export default App;
