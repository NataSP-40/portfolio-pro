import { useEffect, useState } from "react";
import { fetchContactInfo, submitMessage } from "../../services/api.js";

const initialFormState = {
  sender_name: "",
  sender_email: "",
  sender_message: "",
};

const Contact = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const [contactLoading, setContactLoading] = useState(true);
  const [contactError, setContactError] = useState("");

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const loadContactInfo = async () => {
      setContactLoading(true);
      setContactError("");

      try {
        const response = await fetchContactInfo();
        const payload = Array.isArray(response?.data)
          ? response.data[0]
          : response?.data;
        setContactInfo(payload || null);
      } catch (error) {
        setContactError("Unable to load contact information right now.");
      } finally {
        setContactLoading(false);
      }
    };

    loadContactInfo();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      await submitMessage(formData);
      setSubmitSuccess(true);
      setFormData(initialFormState);
    } catch (error) {
      setSubmitError("Message failed to send. Please try again shortly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="scroll-mt-28 mx-auto w-[92vw] rounded-2xl bg-[#f3f5ed] px-5 py-8 text-[#2b2a27] md:w-[90vw] md:px-8 md:py-12 lg:w-[88vw]"
      aria-labelledby="contact-section-title"
    >
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
        <article className="space-y-6">
          <h2
            id="contact-section-title"
            className="font-['Space_Grotesk'] text-4xl font-bold tracking-tight text-[#2b2a27]"
          >
            Let&apos;s Connect
          </h2>

          {contactLoading && (
            <p className="font-['Inter'] text-base leading-relaxed text-[#2b2a27]">
              Loading contact information...
            </p>
          )}

          {!contactLoading && contactError && (
            <p className="font-['Inter'] text-base leading-relaxed text-[#2b2a27]">
              {contactError}
            </p>
          )}

          {!contactLoading && !contactError && (
            <address className="not-italic font-['Inter'] text-base leading-relaxed text-[#2b2a27]">
              {contactInfo?.email && (
                <p className="mb-3 break-words">
                  <span className="font-semibold">Email: </span>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="underline decoration-transparent underline-offset-4 transition hover:decoration-[#2b2a27]"
                  >
                    {contactInfo.email}
                  </a>
                </p>
              )}

              {contactInfo?.phone_number && (
                <p className="mb-3">
                  <span className="font-semibold">Phone: </span>
                  <a
                    href={`tel:${contactInfo.phone_number}`}
                    className="underline decoration-transparent underline-offset-4 transition hover:decoration-[#2b2a27]"
                  >
                    {contactInfo.phone_number}
                  </a>
                </p>
              )}

              {contactInfo?.linkedin_link && (
                <p className="mb-3">
                  <span className="font-semibold">LinkedIn: </span>
                  <a
                    href={contactInfo.linkedin_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-transparent underline-offset-4 transition hover:decoration-[#2b2a27]"
                  >
                    View profile
                  </a>
                </p>
              )}

              {contactInfo?.github_link && (
                <p>
                  <span className="font-semibold">GitHub: </span>
                  <a
                    href={contactInfo.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-transparent underline-offset-4 transition hover:decoration-[#2b2a27]"
                  >
                    View repository profile
                  </a>
                </p>
              )}
            </address>
          )}
        </article>

        <article>
          {submitSuccess ? (
            <div
              className="rounded-2xl bg-[#e6e9df] p-8"
              role="status"
              aria-live="polite"
            >
              <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-[#2b2a27]">
                Thank you for reaching out.
              </h3>
              <p className="mt-3 font-['Inter'] text-base leading-relaxed text-[#2b2a27]">
                Your message landed safely in my inbox. I appreciate your time
                and will get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label
                  htmlFor="sender_name"
                  className="mb-2 block font-['Inter'] text-sm font-medium text-[#2b2a27]"
                >
                  Name
                </label>
                <input
                  id="sender_name"
                  aria-label="Name"
                  type="text"
                  name="sender_name"
                  value={formData.sender_name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg bg-[#e6e9df] px-4 py-3 font-['Inter'] text-[#2b2a27] focus:outline-none focus:ring-2 focus:ring-[#2b2a27]"
                />
              </div>

              <div>
                <label
                  htmlFor="sender_email"
                  className="mb-2 block font-['Inter'] text-sm font-medium text-[#2b2a27]"
                >
                  Email
                </label>
                <input
                  id="sender_email"
                  aria-label="Email"
                  type="email"
                  name="sender_email"
                  value={formData.sender_email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg bg-[#e6e9df] px-4 py-3 font-['Inter'] text-[#2b2a27] focus:outline-none focus:ring-2 focus:ring-[#2b2a27]"
                />
              </div>

              <div>
                <label
                  htmlFor="sender_message"
                  className="mb-2 block font-['Inter'] text-sm font-medium text-[#2b2a27]"
                >
                  Message
                </label>
                <textarea
                  id="sender_message"
                  aria-label="Message"
                  name="sender_message"
                  value={formData.sender_message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full rounded-lg bg-[#e6e9df] px-4 py-3 font-['Inter'] text-[#2b2a27] focus:outline-none focus:ring-2 focus:ring-[#2b2a27]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-md bg-[#2b2a27] px-6 py-3 font-['Inter'] text-base font-medium text-[#f3f5ed] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              {submitError && (
                <p
                  className="font-['Inter'] text-sm text-[#2b2a27]"
                  role="alert"
                  aria-live="polite"
                >
                  {submitError}
                </p>
              )}
            </form>
          )}
        </article>
      </div>
    </section>
  );
};

export default Contact;
