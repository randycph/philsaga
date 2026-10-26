import { useRef, useState, type FormEvent } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Copy,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../components/ui/dialog";
import {
  contactOffices,
  createContactDraft,
  inquiryTypes,
  type ContactMessage,
} from "../data/contact";
import { site } from "../data/site";
import { assetPath } from "../lib/assets";
import "./ContactPage.css";

export function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [message, setMessage] = useState<ContactMessage | null>(null);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [formError, setFormError] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const draft = message ? createContactDraft(message) : null;

  function prepareMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const readValue = (name: string) => {
      return String(values.get(name) || "").trim();
    };
    const nextMessage = {
      name: readValue("name"),
      email: readValue("email"),
      phone: readValue("phone"),
      inquiry: readValue("inquiry"),
      subject: readValue("subject"),
      message: readValue("message"),
    };
    const emptyField = ["name", "subject", "message"].find(
      (name) => !readValue(name),
    );

    if (emptyField) {
      setFormError(
        "Please complete your name, subject, and message with more than spaces.",
      );
      const field = formRef.current?.elements.namedItem(emptyField);

      if (field instanceof HTMLElement) {
        field.focus();
      }

      return;
    }

    setFormError("");
    setCopyStatus("");
    setMessage(nextMessage);
    setReviewOpen(true);
  }

  async function copyMessage() {
    if (!draft) {
      return;
    }

    try {
      await navigator.clipboard.writeText(draft.text);
      setCopyStatus(
        "Message copied. Paste it into an email to info@philsaga.com.",
      );
    } catch {
      setCopyStatus(
        "Select and copy your message below, then email info@philsaga.com.",
      );
    }
  }

  return (
    <div className="contact-page">
      <section className="contact-banner" aria-labelledby="contact-title">
        <img
          src={assetPath("assets/careers-team.png")}
          alt="Mining facilities and forested mountains at sunrise"
          fetchPriority="high"
        />
        <div className="contact-banner__panel" aria-hidden="true" />
        <div className="contact-container contact-banner__content">
          <p className="contact-eyebrow">Contact PMC</p>
          <h1 id="contact-title">
            Let’s start
            <br />a conversation.
          </h1>
          <p>
            Questions, partnerships, and community inquiries — we’re here to
            connect.
          </p>
        </div>
      </section>

      <section
        className="contact-container contact-main"
        aria-label="Get in touch with Philsaga"
      >
        <div className="contact-form-section" id="contact-message">
          <p className="contact-eyebrow">Get in Touch</p>
          <h2>Send us a message</h2>
          <p>
            We welcome your inquiries, feedback, and partnership opportunities.
            Reach out to our team using the form below.
          </p>
          <form
            ref={formRef}
            onSubmit={prepareMessage}
            className="contact-form"
            aria-label="Contact inquiry"
          >
            <div className="contact-form__row">
              <label htmlFor="contact-name">
                Full name <span aria-hidden="true">*</span>
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={120}
                  placeholder="Enter your full name"
                />
              </label>
              <label htmlFor="contact-email">
                Email address <span aria-hidden="true">*</span>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  placeholder="you@company.com"
                />
              </label>
            </div>
            <div className="contact-form__row">
              <label htmlFor="contact-phone">
                Phone number
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  maxLength={40}
                  placeholder="e.g. +63 912 345 6789"
                />
              </label>
              <label htmlFor="contact-inquiry">
                Inquiry type <span aria-hidden="true">*</span>
                <span className="contact-select">
                  <select id="contact-inquiry" name="inquiry" required>
                    {inquiryTypes.map((type) => (
                      <option key={type}>{type}</option>
                    ))}
                  </select>
                  <ChevronDown size={17} aria-hidden="true" />
                </span>
              </label>
            </div>
            <label htmlFor="contact-subject">
              Subject <span aria-hidden="true">*</span>
              <input
                id="contact-subject"
                name="subject"
                required
                maxLength={160}
                placeholder="Briefly describe your inquiry"
              />
            </label>
            <label htmlFor="contact-body">
              Message <span aria-hidden="true">*</span>
              <textarea
                id="contact-body"
                name="message"
                required
                maxLength={4000}
                rows={5}
                placeholder="Type your message here…"
              />
            </label>
            <div className="contact-consent">
              <input
                id="contact-consent"
                name="consent"
                type="checkbox"
                required
              />
              <label htmlFor="contact-consent">
                I agree that the information I provide will be used to respond
                to my inquiry in accordance with our{" "}
                <a
                  href="https://www.philsaga.com/data-privacy-policy"
                  target="_blank"
                  rel="noreferrer"
                >
                  Privacy Policy
                </a>
                .
              </label>
            </div>
            {formError && (
              <p className="contact-form-error" role="alert">
                {formError}
              </p>
            )}
            <button type="submit" className="contact-button">
              Continue to Email <ArrowRight size={18} aria-hidden="true" />
            </button>
            <p className="contact-form-note">
              This form prepares an email to {site.email}. Review your message,
              then send it from your email app.
            </p>
          </form>
        </div>

        <aside
          className="contact-information"
          aria-labelledby="contact-information-title"
        >
          <p className="contact-eyebrow">Contact Information</p>
          <h2 id="contact-information-title">Reach Us</h2>
          <p>You can also contact us through the office details below.</p>
          <div className="contact-information__items">
            {contactOffices.map((office) => (
              <div className="contact-information__item" key={office.id}>
                <span className="contact-icon">
                  <MapPin aria-hidden="true" />
                </span>
                <div>
                  <h3>{office.shortName}</h3>
                  <address>{office.address}</address>
                </div>
              </div>
            ))}
            <div className="contact-information__item">
              <span className="contact-icon">
                <Mail aria-hidden="true" />
              </span>
              <div>
                <h3>Email</h3>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </div>
            </div>
            <div className="contact-information__item">
              <span className="contact-icon">
                <Phone aria-hidden="true" />
              </span>
              <div>
                <h3>Telephone</h3>
                <a href={site.phoneHref}>{site.phone}</a>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <section
        className="contact-locations"
        aria-labelledby="contact-locations-title"
      >
        <div className="contact-container">
          <p className="contact-eyebrow">Our Locations</p>
          <h2 id="contact-locations-title">Where to Find Us</h2>
          <p className="contact-locations__intro">
            Our offices support our operations and help us work closely with our
            host communities.
          </p>
        </div>
        <figure className="contact-panorama">
          <img
            src={assetPath("assets/careers-future.png")}
            alt="A Philsaga team member overlooking the processing plant and green mountain landscape"
            loading="lazy"
          />
        </figure>
        <div className="contact-container contact-office-grid">
          {contactOffices.map((office) => (
            <article className="contact-office" key={office.id}>
              <div
                className={`contact-office__marker contact-office__marker--${office.id}`}
                aria-hidden="true"
              >
                <MapPin />
                <span>{office.city}</span>
              </div>
              <div>
                <h3>{office.name}</h3>
                <address>{office.address}</address>
                <a
                  href={office.directions}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Get directions to ${office.name}`}
                >
                  <span>
                    <ArrowRight size={19} aria-hidden="true" />
                  </span>
                  Get Directions <ArrowRight size={15} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="contact-together"
        aria-labelledby="contact-together-title"
      >
        <img
          src={assetPath("assets/purpose-mine.png")}
          alt="Winding mine road surrounded by forested hills"
          loading="lazy"
        />
        <div className="contact-container">
          <p className="contact-eyebrow">Let’s Work Together</p>
          <h2 id="contact-together-title">
            Building connections.
            <br />
            Creating progress.
          </h2>
          <p>
            Whether you’re a community member, partner, or stakeholder, we’re
            always open to meaningful conversations.
          </p>
          <a className="contact-button" href="#contact-message">
            Get in Touch <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>
      </section>

      <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
        <DialogContent className="max-w-2xl rounded-xl bg-[#faf8f3] p-7 sm:p-9">
          <DialogTitle className="pr-9 text-2xl font-semibold tracking-tight">
            Review your message
          </DialogTitle>
          <DialogDescription className="mt-3 text-sm leading-6 text-[#657570]">
            Open your email app to send this message to {site.email}. You can
            also copy it into the email service you use.
          </DialogDescription>
          {draft && (
            <>
              <div className="contact-review">
                <dl>
                  <div>
                    <dt>To</dt>
                    <dd>{site.email}</dd>
                  </div>
                  <div>
                    <dt>Subject</dt>
                    <dd>{draft.subject}</dd>
                  </div>
                </dl>
                <pre tabIndex={0}>{draft.body}</pre>
              </div>
              <div className="contact-review__actions">
                <a href={draft.href} className="contact-button">
                  <Mail size={17} aria-hidden="true" /> Open Email App{" "}
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
                <button type="button" onClick={copyMessage}>
                  {copyStatus.startsWith("Message copied") ? (
                    <Check size={16} aria-hidden="true" />
                  ) : (
                    <Copy size={16} aria-hidden="true" />
                  )}
                  Copy Message
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setReviewOpen(false);
                  }}
                >
                  Edit Message
                </button>
              </div>
              <p
                className="contact-copy-status"
                role="status"
                aria-live="polite"
              >
                {copyStatus}
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
