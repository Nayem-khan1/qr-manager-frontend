import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const CTA = () => {
  return (
    <section className="w-full bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Ready to boost your brand with LinkHub?
          </h2>
          <p className="mt-4 text-lg text-white/90 max-w-xl">
            Create smart bio pages, dynamic QR codes, and track performance –
            all in one powerful platform.
          </p>
        </motion.div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Link
            to="/sign-up"
            className="inline-flex items-center justify-center bg-white text-violet-600 hover:bg-gray-100 font-semibold text-base 2xl:text-lg px-6 py-3 rounded-md shadow-lg transition-all"
          >
            Get Started Free
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      </div>

      {/* Decorative Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-white/20 blur-[100px] rounded-full" />
      </motion.div>
    </section>
  );
};

export default CTA;
