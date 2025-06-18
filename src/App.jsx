import { Navigate, RouterProvider, createBrowserRouter } from "react-router";
import PrivateRoute from "./routes/PrivateRoute";
import Dashboard from "./pages/Dashboard.jsx";
import SignUp from "./pages/SignUP.jsx";
import Main from "./layouts/Main/Main.jsx";
import Login from "./pages/Login.jsx";
import SuccessPage from "./pages/SuccessPage.jsx";
import CancelPage from "./pages/CancelPage.jsx";
import { AuthContext } from "./context/AuthProvider.jsx";
import { useContext } from "react";
import AdminPage from "./pages/admin/AdminPage.jsx";
import Loader from "./components/Loader.jsx";
import Pricing from "./pages/Pricing.jsx";

function App() {
  const { loading, userData } = useContext(AuthContext);
  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Loader /></div>;
  }

  const router = createBrowserRouter([
    {
      path: "/sign-in",
      element: <Login />,
    },
    {
      path: "/sign-up",
      element: <SignUp />,
    },
    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: "/",
          element: (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          ),
        },
        {
          path: "/payment-success",
          element: <SuccessPage />,
        },
        {
          path: "/payment-cancelled",
          element: <CancelPage />,
        },
        {
          path: "/prices",
          element: (
            <PrivateRoute>
              <Pricing />
            </PrivateRoute>
          ),
        }
      ],
    },
    {
      path: "/admin",
      element:
        userData?.role === "admin" ? (
          <PrivateRoute>
            <AdminPage />
          </PrivateRoute>
        ) : (
          <Navigate to="/sign-in" />
        ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
