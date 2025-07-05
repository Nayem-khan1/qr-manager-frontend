import React, { useContext, useEffect } from "react";
import { Link } from "react-router";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";
import { backendUrl } from "../config";

const SuccessPage = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const markAsPaid = async () => {
      try {
        const token = await user.getIdToken();

        await axios.post(
          backendUrl + "api/payment/mark-paid",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("User marked as paid.");
      } catch (err) {
        console.error("Failed to mark as paid:", err.message);
      }
    };

    if (user) {
      markAsPaid();
    }
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Payment Successful!
      </h1>
      <p className="text-gray-700">
        Thank you for your payment. Unlimited QR codes are now unlocked!
      </p>

      <Link
        to="/"
        className="mt-10 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default SuccessPage;
