import { motion } from "framer-motion";
import { LinkIcon, QrCodeIcon, BarChart2, Settings } from "lucide-react";

const features = [
  {
    icon: <LinkIcon className="w-6 h-6 text-violet-600" />,
    title: "Smart Link Management",
    description:
      "Shorten, brand, and track your links with advanced analytics and custom domains.",
  },
  {
    icon: <QrCodeIcon className="w-6 h-6 text-violet-600" />,
    title: "Dynamic QR Codes",
    description:
      "Create customizable and trackable QR codes for your business, campaigns, or products.",
  },
  {
    icon: <BarChart2 className="w-6 h-6 text-violet-600" />,
    title: "Powerful Analytics",
    description:
      "Track link performance with real-time analytics: clicks, geography, devices, and more.",
  },
  {
    icon: <Settings className="w-6 h-6 text-violet-600" />,
    title: "Customizable Bio Pages",
    description:
      "Design mobile-first link-in-bio pages that reflect your brand identity.",
  },
];

const Feature = () => {
  return (
    <section className="w-full bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
        >
          Everything You Need in One Hub
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto"
        >
          LinkHub empowers creators, brands, and businesses to manage and grow
          with ease.
        </motion.p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div className="mb-4 flex flex-col justify-center items-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;
