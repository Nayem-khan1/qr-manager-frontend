import { useContext } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { HiMiniHome } from "react-icons/hi2";
import { FaUser, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthProvider";

const Navbar = () => {
  const { user, logOut, userData } = useContext(AuthContext);
  const navigate = useNavigate();

  const logOutHandler = () => {
    logOut()
      .then(() => {
        alert("You are now logged out!");
        navigate("/sign-in");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full h-16 shadow bg-white flex items-center px-6 sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto w-full flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-indigo-600">
          LinkHub
        </Link>

        {/* Navigation Icons */}
        <ul className="flex items-center space-x-4 sm:space-x-6">
          {userData?.role === "admin" && <li className="">Admin</li>}
          {/* Home Icon */}
          <Link to="/">
            <li className="p-2 rounded hover:bg-gray-200 transition cursor-pointer">
              <HiMiniHome className="text-xl sm:text-2xl text-indigo-600 hover:text-indigo-700" />
            </li>
          </Link>

          {/* User Profile */}
          <Popover className="relative">
            <PopoverButton className="outline-none">
              <li className="p-2 rounded hover:bg-gray-200 cursor-pointer transition mt-1">
                <FaUser className="text-lg sm:text-xl text-indigo-600" />
              </li>
            </PopoverButton>
            <PopoverPanel className="absolute right-0 z-10 w-56 sm:w-64 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
              <div className="text-sm">
                <div className="flex items-center space-x-2">
                  <FaUser className="text-indigo-600" />
                  <p className="text-gray-700">{user?.email}</p>
                </div>

                <hr className="my-3 text-gray-300" />

                <button
                  onClick={logOutHandler}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition cursor-pointer"
                >
                  <span>Log out</span>
                  <FaArrowRight />
                </button>
              </div>
            </PopoverPanel>
          </Popover>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
