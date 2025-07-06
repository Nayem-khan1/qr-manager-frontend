import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const Hero = () => {
  return (
    <section className="relative w-full bg-gradient-to-br from-violet-100 via-white to-fuchsia-100 overflow-hidden py-24 px-6 text-center">
      {/* Background Gradient Glow */}
      <div className="absolute -top-32 left-1/2 transform -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-purple-300/40 via-fuchsia-300/20 to-transparent rounded-full blur-3xl z-0" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="inline-block text-sm md:text-base font-medium text-violet-700 bg-violet-200/50 px-4 py-1 rounded-full shadow-sm mb-6"
        >
          🔗 The Future of Link Management
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold  leading-normal tracking-tight text-gray-900"
        >
          Create. Manage. Grow with <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500">
            LinkHub
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-6 text-lg md:text-xl text-gray-700 max-w-2xl mx-auto"
        >
          One hub for all your links, QR codes, and audience insights –
          beautifully organized in one place.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/dashboard"
            className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm flex items-center gap-2 transition"
          >
            Get Started Free <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="#"
            className="px-6 py-3 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 text-sm font-medium transition"
          >
            Learn More
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
