import { useState } from "react";
import { sendMessage } from "../../services";

const Contact = ({ contactInfo, contactLoading, contactError }) => {
  // PART 2: Form data (user input only)
  const [formData, setFormData] = useState({
    sender_name: "",
    sender_email: "",
    sender_message: "",
  });

  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const safeContactInfo = contactInfo || {};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    setIsSubmitting(true);

    try {
      // Send only user-filled fields
      await sendMessage(formData);
      setStatus("Message sent successfully!");
      // Reset form
      setFormData({
        sender_name: "",
        sender_email: "",
        sender_message: "",
      });
    } catch (error) {
      setStatus("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto mt-10 w-[92vw] md:w-[90vw] lg:w-[88vw] rounded-2xl md:rounded-3xl bg-white p-4 sm:p-6 md:p-8 shadow-xl hover:shadow-2xl hover:shadow-indigo-100">
      <h2 className="mb-6 text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 to-violet-900 sm:text-4xl md:mb-8">
        Get in Touch
      </h2>

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        {/* PART 1: Static Professional Info Display */}
        {contactLoading ? (
          <p className="text-center text-gray-500 lg:text-left">
            Loading contact information...
          </p>
        ) : contactError ? (
          <p className="text-center text-red-600 lg:text-left">
            Unable to load contact information right now.
          </p>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 md:p-5">
            <h3 className="mb-3 text-lg font-bold text-gray-800">
              Contact Information
            </h3>
            <p className="mb-3 break-words text-sm sm:text-base">
              <strong>Email:</strong>{" "}
              {safeContactInfo.email ? (
                <a
                  href={`mailto:${safeContactInfo.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {safeContactInfo.email}
                </a>
              ) : (
                "Not provided"
              )}
            </p>
            <p className="mb-3 text-sm sm:text-base">
              <strong>Phone:</strong>{" "}
              {safeContactInfo.phone_number || "Not provided"}
            </p>
            {safeContactInfo.linkedin_link && (
              <p className="text-sm sm:text-base">
                <strong>LinkedIn:</strong>{" "}
                <a
                  href={safeContactInfo.linkedin_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Profile
                </a>
              </p>
            )}
            {safeContactInfo.github_link && (
              <p className="mt-3 text-sm sm:text-base">
                <strong>GitHub:</strong>{" "}
                <a
                  href={safeContactInfo.github_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Profile
                </a>
              </p>
            )}
          </div>
        )}

        {/* PART 2: Contact Form (User Input Only) */}
        <div>
          <h3 className="mb-4 text-lg font-bold text-gray-800">
            Send a Message
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="sender_name"
              placeholder="Your Name"
              value={formData.sender_name}
              onChange={handleChange}
              required
              className="w-full rounded border border-gray-300 p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 sm:text-base"
            />
            <input
              type="email"
              name="sender_email"
              placeholder="Your Email"
              value={formData.sender_email}
              onChange={handleChange}
              required
              className="w-full rounded border border-gray-300 p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 sm:text-base"
            />
            <textarea
              name="sender_message"
              placeholder="Your Message"
              value={formData.sender_message}
              onChange={handleChange}
              required
              className="h-32 w-full rounded border border-gray-300 p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 sm:text-base"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl border-2 border-violet-900 bg-white px-6 py-3 font-bold text-violet-900 transition-all hover:bg-purple-50 sm:w-auto"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
          {status && (
            <p className="mt-4 text-center font-medium text-blue-600 lg:text-left">
              {status}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
