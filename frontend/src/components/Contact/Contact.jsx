import { useEffect, useState } from "react";
import { fetchContactInfo, sendMessage } from "../../services";
import { GitHubIcon, LinkedInIcon } from "../SocialIcons/SocialIcons";

const initialFormState = {
  sender_name: "",
  sender_email: "",
  sender_message: "",
};

const socialLinkClassName =
  "inline-flex items-center gap-2 underline decoration-transparent underline-offset-4 transition hover:text-ink hover:decoration-ink";

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
      await sendMessage(formData);
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
      className="scroll-mt-28 mx-auto w-[92vw] rounded-xl border border-line/60 bg-surface px-5 py-8 text-ink md:w-[90vw] md:px-8 md:py-12 lg:w-[88vw]"
      aria-labelledby="contact-section-title"
    >
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
        <article className="space-y-6">
          <h2
            id="contact-section-title"
            className="font-display text-3xl font-light uppercase tracking-[0.2em] text-ink md:text-4xl"
          >
            Let&apos;s Connect
          </h2>

          {contactLoading && (
            <p className="font-body text-base leading-relaxed text-ink-muted">
              Loading contact information...
            </p>
          )}

          {!contactLoading && contactError && (
            <p className="font-body text-base leading-relaxed text-ink-muted">
              {contactError}
            </p>
          )}

          {!contactLoading && !contactError && (
            <address className="font-body not-italic text-base leading-relaxed text-ink-muted">
              {contactInfo?.email && (
                <p className="mb-3 break-words">
                  <span className="font-display text-xs font-medium uppercase tracking-[0.14em] text-ink">
                    Email:{" "}
                  </span>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="underline decoration-transparent underline-offset-4 transition hover:text-ink hover:decoration-ink"
                  >
                    {contactInfo.email}
                  </a>
                </p>
              )}

              {contactInfo?.phone_number && (
                <p className="mb-3">
                  <span className="font-display text-xs font-medium uppercase tracking-[0.14em] text-ink">
                    Phone:{" "}
                  </span>
                  <a
                    href={`tel:${contactInfo.phone_number}`}
                    className="underline decoration-transparent underline-offset-4 transition hover:text-ink hover:decoration-ink"
                  >
                    {contactInfo.phone_number}
                  </a>
                </p>
              )}

              {(contactInfo?.linkedin_link || contactInfo?.github_link) && (
                <div className="flex flex-wrap items-center justify-center gap-4 pt-1 text-center">
                  {contactInfo?.linkedin_link && (
                    <a
                      href={contactInfo.linkedin_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={socialLinkClassName}
                      aria-label="LinkedIn profile"
                    >
                    <LinkedInIcon size={18} />
                      <span>LinkedIn</span>
                    </a>
                  )}

                  {contactInfo?.github_link && (
                    <a
                      href={contactInfo.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={socialLinkClassName}
                      aria-label="GitHub profile"
                    >
                      <GitHubIcon size={18} />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              )}
            </address>
          )}
        </article>

        <article>
          {submitSuccess ? (
            <div
              className="rounded-xl border border-line/60 bg-[#ebe5da] p-8"
              role="status"
              aria-live="polite"
            >
              <h3 className="font-display text-xl font-medium uppercase tracking-[0.12em] text-ink md:text-2xl">
                Thank you for reaching out.
              </h3>
              <p className="font-body mt-3 text-base leading-relaxed text-ink-muted">
                Your message landed safely in my inbox. I appreciate your time
                and will get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label
                  htmlFor="sender_name"
                  className="font-body mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-ink"
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
                  className="font-body w-full rounded-lg border border-line/70 bg-[#f2eee6] px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-ink"
                />
              </div>

              <div>
                <label
                  htmlFor="sender_email"
                  className="font-body mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-ink"
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
                  className="font-body w-full rounded-lg border border-line/70 bg-[#f2eee6] px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-ink"
                />
              </div>

              <div>
                <label
                  htmlFor="sender_message"
                  className="font-body mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-ink"
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
                  className="font-body w-full rounded-lg border border-line/70 bg-[#f2eee6] px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-ink"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="font-body rounded-sm bg-ink px-6 py-3 text-sm font-medium uppercase tracking-[0.12em] text-surface transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              {submitError && (
                <p
                  className="font-body text-sm text-ink-muted"
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
