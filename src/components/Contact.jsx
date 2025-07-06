import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ✅ Submit logic here (e.g. send to backend or email service)
    console.log("Form submitted:", formData);
    setSubmitted(true);
    // Optionally reset
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="w-full bg-white py-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
        <p className="text-gray-600 mb-12">
          Have questions or need help? Fill out the form and we’ll get back to
          you shortly.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 text-left max-w-xl mx-auto"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Your Name
            </label>
            <input
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border py-1 border-gray-300 shadow-sm focus:ring-violet-500 focus:border-violet-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Your Email
            </label>
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border py-1 border-gray-300 shadow-sm focus:ring-violet-500 focus:border-violet-500"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Your Message
            </label>
            <textarea
              required
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-violet-500 focus:border-violet-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-violet-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-violet-700 transition"
          >
            Send Message
          </button>

          {submitted && (
            <p className="text-green-600 text-sm mt-4">
              ✅ Message sent successfully!
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
