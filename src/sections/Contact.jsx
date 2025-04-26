import { useState } from "react";
import emailjs from "@emailjs/browser";
import Alert from "../components/Alert";

const Contact = ({ myName, myEmail }) => {
  const initialFormState = {
    name: "",
    email: "",
    message: "",
  };
  const [formData, setFormData] = useState(initialFormState);

  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ formData });
    setIsLoading(true);

    try {
      console.log("Form submitted:", formData);
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          to_name: myName,
          from_email: formData.email,
          to_email: myEmail,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      setIsLoading(false);
      setFormData(initialFormState);
      showAlertMessage("success", "Your message has been sent");
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      showAlertMessage("danger", "Something went wrong");
    }
  };

  return (
    <section className="relative flex items-center c-space section-spacing">
      {showAlert && <Alert type={alertType} text={alertMessage} />}
      <div className="flex flex-col items center justify-center max-w-md p-5 mx-auto border border-white/10 rounded-2xl bg-primary">
        <div className="flex flex-col items-start w-full gap-5 mb-10">
          <h2 className="text-heading">Let's Talk</h2>
          <p className="font-normal text-neutral-400">
            Whether you're looking to build a new website, improve your existing
            platform, or bring a unique project to life, I'm here to help.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="w-full">
          {/* Name */}
          <div className="mb-5">
            <label htmlFor="field-label">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              className="field-input field-input-focus"
              placeholder="John Doe"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          {/* Email */}
          <div className="mb-5">
            <label htmlFor="field-label">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="field-input field-input-focus"
              placeholder="JohnDoe@email.com"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          {/* Message */}
          <div className="mb-5">
            <label htmlFor="field-label">Message</label>
            <textarea
              id="message"
              name="message"
              type="text"
              rows="4"
              className="field-input field-input-focus"
              placeholder="Share your thoughts..."
              autoComplete="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-1 py-3 text-lg text-center rounded-md cursor-pointer bg-radial from-lavender to-royal hover-animation"
          >
            {!isLoading ? "Send" : "Sending..."}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
