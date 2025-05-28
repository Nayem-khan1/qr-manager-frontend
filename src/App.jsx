
import { RouterProvider, createBrowserRouter } from "react-router";
import PrivateRoute from "./routes/PrivateRoute";
import Dashboard from "./pages/Dashboard.jsx";
import SignUp from "./pages/SignUP.jsx";
import Main from "./layouts/Main/Main.jsx";
import Login from "./pages/Login.jsx";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

function App() {

  const router = createBrowserRouter([
    {
      path: "/sign-in",
      element: <Login/>
    },
    {
      path: "/sign-up",
      element: <SignUp/>
    },
    {
      path: "/",
      element: <Main/>,
      children: [
        {
          path: "/",
          element: <PrivateRoute><Dashboard/></PrivateRoute>
        }
      ]
    },
    
  ])

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
