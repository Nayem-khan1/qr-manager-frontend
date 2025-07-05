import { Navigate, Route, Routes } from "react-router";
import LandingLayout from "./layouts/LandingLayout/LandingLayout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUP";
import PrivateRoute from "./routes/PrivateRoute";
import DashboardLayout from "./layouts/DashboardLayout/DashboardLayout";
import Home from "./pages/LandingPage/Home";
import Dashboard from "./pages/Dashboard";
import LinkPageList from "./pages/LinkPageList";
import SuccessPage from "./pages/SuccessPage";
import CancelPage from "./pages/CancelPage";
import Pricing from "./pages/Pricing";
import { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";
import CreateLinkPage from "./pages/CreateLinkPage";
import PublicLinkPage from "./pages/PublicLinkPage";
import EditLinkPage from "./pages/EditLinkPage";
import Loader from "./components/Loader";

function App() {
  const { loading, userData } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }
  return (
    <Routes>
      {/* Public Layout */}
      <Route element={<LandingLayout />}>
        <Route path="/" element={<Home />} />
        {/* <Route path="/pricing" element={<Pricing />} /> */}
        <Route path="/sign-up" element={<Login />} />
        <Route path="/sign-in" element={<SignUp />} />
      </Route>

      {/* Protected Dashboard Layout */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/linkpage" element={<LinkPageList />} />
        <Route path="/linkpages/create" element={<CreatePage />} />
        <Route path="/settings" element={<Settings />} /> */}
        <Route path="/payment-success" element={<SuccessPage />} />
        <Route path="/payment-cancelled" element={<CancelPage />} />
        <Route path="/prices" element={<Pricing />} />
        <Route path="/qrcodes" element={<Dashboard />} />
        <Route path="/linkpages" element={<LinkPageList />} />
        <Route path="/linkpages/create" element={<CreateLinkPage />} />
        <Route path="/linkpages/edit/:id" element={<EditLinkPage />} />
        {userData?.role === "admin" && <AdminPage />}
      </Route>
      <Route path="/slug/:slug" element={<PublicLinkPage />} />
    </Routes>
  );
}

export default App;
