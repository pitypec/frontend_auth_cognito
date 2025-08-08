import DashboardLayout from "../component/shared/layouts/DashboardLayout";
import Dashboard from "../pages/dashboard";

export const getDashboardRouter = () => {
  return [
    {
      path: "/",
      element: <DashboardLayout />,
      // errorElement: <ErrorBoundary />,
      children: [
        {
          children: [
            {
              path: "/dashboard",
              element: (
                // <AuthGuard>
                <Dashboard />
                // </AuthGuard>
              ),
              // errorElement: <ErrorBoundary />,
            },
          ],
        },
      ],
    },
  ];
};
