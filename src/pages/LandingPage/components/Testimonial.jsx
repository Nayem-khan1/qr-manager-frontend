import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Emily Carter",
    role: "Content Creator",
    review:
      "LinkHub has transformed how I share my content. The QR codes and bio pages are top-notch!",
    rating: 5,
  },
  {
    name: "James Anderson",
    role: "Digital Marketer",
    review:
      "The analytics and tracking features are extremely helpful for campaigns. I love the simplicity.",
    rating: 5,
  },
  {
    name: "Sana Rahman",
    role: "Business Owner",
    review:
      "I’ve tried many tools, but LinkHub feels the most complete. Beautiful interface and reliable.",
    rating: 4,
  },
];

const TestimonialCard = ({ testimonial, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.2, duration: 0.6 }}
    className="bg-white border border-gray-100 shadow-md rounded-xl p-6 flex flex-col justify-between h-full hover:shadow-xl transition"
  >
    <div className="mb-4">
      <p className="text-gray-700 text-sm">{testimonial.review}</p>
    </div>
    <div className="mt-auto">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-base font-semibold text-gray-900">
          {testimonial.name}
        </span>
        <div className="flex gap-[2px] text-yellow-400">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      </div>
      <span className="text-xs text-gray-500">{testimonial.role}</span>
    </div>
  </motion.div>
);

const Testimonial = () => {
  return (
    <section className="bg-gray-50 py-20 px-4 w-full">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
        >
          What Our Users Say
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto"
        >
          Join thousands of happy users who trust LinkHub to manage and grow
          their online presence.
        </motion.p>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
