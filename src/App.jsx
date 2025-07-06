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
import { ScrollToTop } from "./components/ScrollToTop";
import AdminPage from "./pages/admin/AdminPage";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Contact from "./components/Contact";
import DashboardOverview from "./pages/DashboardOverview";

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
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Layout */}
        <Route element={<LandingLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Protected Dashboard Layout */}
        <Route
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardOverview />} />
          <Route path="/payment-success" element={<SuccessPage />} />
          <Route path="/payment-cancelled" element={<CancelPage />} />
          <Route path="/prices" element={<Pricing />} />
          <Route path="/qrcodes" element={<Dashboard />} />
          <Route path="/linkpages" element={<LinkPageList />} />
          <Route path="/linkpages/create" element={<CreateLinkPage />} />
          <Route path="/linkpages/edit/:id" element={<EditLinkPage />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />

          {/* Admin-only route */}
          {userData?.role === "admin" && (
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <AdminPage />
                </PrivateRoute>
              }
            />
          )}
        </Route>

        {/* Public Link Page */}
        <Route path="/slug/:slug" element={<PublicLinkPage />} />
      </Routes>
    </>
  );
}

export default App;
