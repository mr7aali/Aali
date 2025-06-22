"use client";
import { useState } from "react";
import { BsRocketTakeoff } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import { BiErrorCircle } from "react-icons/bi";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";

interface IFormInputs {
  name: string;
  email: string;
  message: string;
}

type SubmissionState = "idle" | "loading" | "success" | "error";

const ContactForm = () => {
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const backgroundColors = {
    indigo: "#4f46e5",
    pink: "#ec4899",
    blue: "#3b82f6",
    emerald: "#10b981",
    amber: "#f59e0b",
    red: "#ef4444",
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    trigger,
    reset,
  } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    setSubmissionState("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setSubmissionState("success");
        reset();
        // Auto-hide success message after 5 seconds
        setTimeout(() => setSubmissionState("idle"), 5000);
      } else {
        setSubmissionState("error");
        setErrorMessage(
          result.message || "Failed to send message. Please try again."
        );
      }
    } catch (error) {
      setSubmissionState("error");
      setErrorMessage(
        "Network error. Please check your connection and try again."
      );
    }
  };

  const renderSubmissionFeedback = () => {
    switch (submissionState) {
      case "loading":
        return (
          <div className="flex items-center justify-center p-4 mb-4 border border-blue-200 rounded-lg bg-blue-50">
            <Loader2
              className="mr-2 animate-spin"
              style={{ color: backgroundColors.blue }}
            />
            <span
              style={{ color: backgroundColors.blue }}
              className="font-mono font-semibold"
            >
              Sending your message...
            </span>
          </div>
        );

      case "success":
        return (
          <div className="flex items-center p-4 mb-4 border border-green-200 rounded-lg bg-green-50">
            <CheckCircle
              className="mr-2"
              style={{ color: backgroundColors.emerald }}
            />
            <div>
              <p
                style={{ color: backgroundColors.emerald }}
                className="font-mono font-semibold"
              >
                Message sent successfully! 🚀
              </p>
              <p className="font-mono text-sm text-gray-600">
                {"Thank you for reaching out. I'll get back to you soon!"}
              </p>
            </div>
          </div>
        );

      case "error":
        return (
          <div className="flex items-center p-4 mb-4 border border-red-200 rounded-lg bg-red-50">
            <XCircle className="mr-2" style={{ color: backgroundColors.red }} />
            <div>
              <p
                style={{ color: backgroundColors.red }}
                className="font-mono font-semibold"
              >
                Failed to send message
              </p>
              <p className="font-mono text-sm text-gray-600">{errorMessage}</p>
              <button
                onClick={() => setSubmissionState("idle")}
                className="mt-1 font-mono text-sm underline"
                style={{ color: backgroundColors.blue }}
              >
                Try again
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      id="CONTACT"
      className="max-w-[1280px] mt-16 mx-auto grid sm:grid-cols-2 px-5"
    >
      <div className="mb-8">
        <h1
          className="font-bold text-[45px] font-serif py-2 text-transparent bg-clip-text"
          style={{
            backgroundImage: `linear-gradient(45deg, ${backgroundColors.indigo}, ${backgroundColors.pink})`,
          }}
        >
          Got a problem to solve?
        </h1>
        <p
          className="text-[20px] font-serif font-thin"
          style={{ color: backgroundColors.blue }}
        >
          Get your space suit ready and tell me your ideas to{" "}
          <strong style={{ color: backgroundColors.emerald }}>develop</strong>{" "}
          your{" "}
          <strong style={{ color: backgroundColors.emerald }}>
            dream website
          </strong>
          .
        </p>
      </div>

      <div className="bg-transparent">
        {renderSubmissionFeedback()}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col sm:px-4"
          style={{ caretColor: backgroundColors.amber }}
        >
          <div>
            <label
              htmlFor="HomePageNameField"
              className="uppercase font-mono font-bold text-[20px]"
              style={{ color: backgroundColors.indigo }}
            >
              Your Name
            </label>
            <input
              {...register("name", { required: true })}
              onBlur={() => trigger("name")}
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
              type="text"
              id="HomePageNameField"
              placeholder="Enter Your Name"
              disabled={submissionState === "loading"}
              className="w-full border-[2px] focus-within:border-3 outline-none my-3 font-mono font-extrabold text-[18px] h-[60px] p-[12px] bg-gray-800/90 disabled:opacity-50"
              style={{
                borderImage: `linear-gradient(45deg, ${backgroundColors.blue}, ${backgroundColors.indigo}) 1`,
                color: backgroundColors.indigo,
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderImage = `linear-gradient(45deg, ${backgroundColors.pink}, ${backgroundColors.amber}) 1`)
              }
            />
            {errors.name && (
              <p
                className="text-red-600 mb-2 ml-0 font-serif text-[12px] font-semibold flex items-center"
                style={{ color: backgroundColors.red }}
              >
                <BiErrorCircle
                  className="mr-2"
                  style={{ color: backgroundColors.red }}
                />{" "}
                Name cannot be empty
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="HomePageEmailField"
              className="uppercase font-mono font-bold text-[20px]"
              style={{ color: backgroundColors.indigo }}
            >
              Your Email Address
            </label>
            <input
              {...register("email", { required: true })}
              onBlur={(e) => {
                trigger("email");
                e.currentTarget.style.borderImage = `linear-gradient(45deg, ${backgroundColors.blue}, ${backgroundColors.indigo}) 1`;
              }}
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              type="email"
              id="HomePageEmailField"
              placeholder="Enter Your Email"
              disabled={submissionState === "loading"}
              className="w-full border-[2px] focus-within:border-3 outline-none my-3 font-mono font-extrabold text-[18px] h-[60px] p-[12px] bg-gray-800/90 disabled:opacity-50"
              style={{
                borderImage: `linear-gradient(45deg, ${backgroundColors.blue}, ${backgroundColors.indigo}) 1`,
                color: backgroundColors.indigo,
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderImage = `linear-gradient(45deg, ${backgroundColors.pink}, ${backgroundColors.amber}) 1`)
              }
            />
            {errors.email && (
              <p
                className="text-red-600 mb-2 ml-0 font-serif text-[12px] font-semibold flex items-center"
                style={{ color: backgroundColors.red }}
              >
                <BiErrorCircle
                  className="mr-2"
                  style={{ color: backgroundColors.red }}
                />{" "}
                Invalid Email
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="HomeMessageField"
              className="uppercase font-mono font-bold text-[20px]"
              style={{ color: backgroundColors.indigo }}
            >
              Type Your Message
            </label>
            <textarea
              {...register("message", { required: true })}
              onBlur={(e) => {
                trigger("message");
                e.currentTarget.style.borderImage = `linear-gradient(45deg, ${backgroundColors.blue}, ${backgroundColors.indigo}) 1`;
              }}
              aria-invalid={errors.message ? "true" : "false"}
              aria-describedby={errors.message ? "message-error" : undefined}
              name="message"
              id="HomeMessageField"
              placeholder="Type message..."
              disabled={submissionState === "loading"}
              className="w-full border-[2px] focus-within:border-3 outline-none my-3 font-mono font-extrabold text-[18px] h-[120px] p-[12px] bg-gray-800/90 disabled:opacity-50"
              style={{
                borderImage: `linear-gradient(45deg, ${backgroundColors.blue}, ${backgroundColors.indigo}) 1`,
                color: backgroundColors.indigo,
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderImage = `linear-gradient(45deg, ${backgroundColors.pink}, ${backgroundColors.amber}) 1`)
              }
            ></textarea>
            {errors.message && (
              <p
                className="text-red-600 mb-2 ml-0 font-serif text-[12px] font-semibold flex items-center"
                style={{ color: backgroundColors.red }}
              >
                <BiErrorCircle
                  className="mr-2"
                  style={{ color: backgroundColors.red }}
                />{" "}
                Message box cannot be empty
              </p>
            )}
          </div>

          <div className="flex items-center w-full">
            <p
              className="flex-1 text-[14px] sm:text-[18px] font-mono flex items-center"
              style={{ color: backgroundColors.emerald }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = backgroundColors.pink)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = backgroundColors.emerald)
              }
            >
              <span className="mt-2">
                <FiMail style={{ color: backgroundColors.emerald }} />
              </span>
              <span className="px-2">mr7aali@gmail.com</span>
            </p>
            <button
              type="submit"
              disabled={submissionState === "loading"}
              className="no-underline w-[120px] sm:w-full lg:w-auto py-2 px-3 lg:py-3 lg:px-5 text-[12px] sm:text-[15px] lg:text-[18px] cursor-pointer text-center flex items-center justify-center font-semibold uppercase disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                borderImage: `linear-gradient(45deg, ${backgroundColors.emerald}, ${backgroundColors.blue}) 1`,
                borderWidth: "2px",
                background: `linear-gradient(45deg, ${backgroundColors.indigo}, ${backgroundColors.pink})`,
                color: "#ffffff",
              }}
              onMouseEnter={(e) => {
                if (submissionState !== "loading") {
                  e.currentTarget.style.background = `linear-gradient(45deg, ${backgroundColors.pink}, ${backgroundColors.amber})`;
                }
              }}
              onMouseLeave={(e) => {
                if (submissionState !== "loading") {
                  e.currentTarget.style.background = `linear-gradient(45deg, ${backgroundColors.indigo}, ${backgroundColors.pink})`;
                }
              }}
            >
              {submissionState === "loading" ? (
                <>
                  <Loader2 className="mr-2 animate-spin" size={16} />
                  Sending...
                </>
              ) : (
                <>
                  Hit Me Up
                  <span
                    className="px-1 text-[14px] sm:text-[18px] mt-1 ml-2"
                    style={{ color: backgroundColors.amber }}
                  >
                    <BsRocketTakeoff />
                  </span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
