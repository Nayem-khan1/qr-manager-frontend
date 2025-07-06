import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import { useContext, useMemo } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate, useLocation } from "react-router";
import { backendUrl } from "../config";

// All plans
const allPlans = [
  {
    title: "Free",
    price: "$0",
    subtitle: "Perfect for getting started",
    features: ["1 Bio Page", "5 QR Codes", "Basic Analytics", "Limited Themes"],
    unavailable: ["Custom Domain", "Team Access", "Priority Support"],
    button: {
      text: "Get Started",
      action: "dashboard",
    },
  },
  {
    title: "Pro",
    price: "$5",
    subtitle: "Lifetime access – one-time payment",
    highlighted: true,
    features: [
      "Unlimited Bio Pages",
      "Unlimited QR Codes",
      "Advanced Analytics",
      "Custom Domain",
      "Priority Support",
    ],
    unavailable: ["Team Access"],
    button: {
      text: "Upgrade to Pro",
      action: "upgrade",
    },
  },
  {
    title: "Business",
    price: "$29",
    subtitle: "For teams & agencies",
    features: [
      "Unlimited Everything",
      "Team Access",
      "Custom Branding",
      "Dedicated Manager",
      "All Pro Features",
    ],
    unavailable: [],
    button: {
      text: "Contact Sales",
      action: "contact",
    },
  },
];

const Pricing = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboard = useMemo(() => {
    return location.pathname.includes("/dashboard");
  }, [location]);

  const filteredPlans = useMemo(() => {
    return isDashboard ? allPlans.filter((p) => p.title !== "Free") : allPlans;
  }, [isDashboard]);

  const handleUpgrade = async () => {
    if (!user) return navigate("/sign-in");
    const token = await user.getIdToken();
    const res = await fetch(
      `${backendUrl}api/qrcodes/create-checkout-session`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <section className="bg-white w-full pt-40 pb-20 px-4" id="pricing">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
        >
          Simple & Transparent Pricing
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-gray-600 mb-12 max-w-xl mx-auto"
        >
          Choose the plan that fits your needs. No hidden fees, no surprises.
        </motion.p>

        <div
          className={`grid grid-cols-1 ${
            filteredPlans.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"
          } gap-6`}
        >
          {filteredPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className={`rounded-xl border ${
                plan.highlighted
                  ? "bg-gradient-to-br from-violet-50 to-fuchsia-50 border-violet-400 shadow-lg"
                  : "bg-white border-gray-200 shadow"
              } p-6 flex flex-col items-start justify-between`}
            >
              <div className="w-full">
                <h3 className="text-xl font-bold text-gray-900">
                  {plan.title}
                </h3>
                <p className="text-gray-500 text-sm">{plan.subtitle}</p>

                <div className="my-6">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {plan.price}
                  </span>
                  {plan.title !== "Pro" && (
                    <span className="text-sm text-gray-500 ml-1">/mo</span>
                  )}
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center text-gray-700 text-sm"
                    >
                      <CheckCircle className="w-4 h-4 text-violet-600 mr-2" />
                      {feature}
                    </li>
                  ))}
                  {plan.unavailable.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center text-gray-400 text-sm line-through"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => {
                  if (plan.button.action === "dashboard") {
                    navigate("/dashboard");
                  } else if (plan.button.action === "upgrade") {
                    handleUpgrade();
                  } else if (plan.button.action === "contact") {
                    navigate("/contact");
                  }
                }}
                className={`w-full text-center py-2 px-4 rounded-md text-sm font-medium transition cursor-pointer ${
                  plan.highlighted
                    ? "bg-violet-600 hover:bg-violet-700 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                }`}
              >
                {plan.button.text}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
