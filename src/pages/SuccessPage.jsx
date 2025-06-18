import React from "react";
import { Link } from "react-router";

const SuccessPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
      <p className="text-gray-700">Thank you for your payment. Unlimited QR codes are now unlocked!</p>
      
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
