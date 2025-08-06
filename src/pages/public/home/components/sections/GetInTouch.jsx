import { useState } from "react";
import toast, { Toaster } from "react-hot-toast"; // Import toast and Toaster for notifications

const GetInTouch = () => {
  // State variables to store form data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // This state is available but not used in the current UI
  const [subject, setSubject] = useState(""); // New state for the 'Subject' field
  const [message, setMessage] = useState("");

  // State variable for form submission status
  const [submitting, setSubmitting] = useState(false);

  // Formspree endpoint URL (IMPORTANT: Replace 'yourformid' with your actual Formspree form ID)
  const FORMSPREE_URL = "https://formspree.io/f/mkgzbkwl";

  /**
   * Handles the form submission.
   * Prevents default form submission, sets submitting state,
   * sends data to Formspree, and shows toast notifications.
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default browser form submission
    setSubmitting(true); // Set submitting to true to disable the button and show loading text

    try {
      // Send form data to Formspree
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone, // Include phone in the payload even if not explicitly in UI
          subject, // Include the new subject field
          message,
        }),
      });

      // Check if the response was successful
      if (response.ok) {
        toast.success("Message sent successfully!"); // Show success toast
        // Clear form fields after successful submission
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setSubject(""); // Clear subject field
        setMessage("");
      } else {
        toast.error("Failed to send message. Please try again."); // Show error toast for failed submission
      }
    } catch (err) {
      console.error("Submission error:", err); // Log the actual error for debugging
      toast.error("An error occurred. Please try again later."); // Show generic error toast for network issues
    } finally {
      setSubmitting(false); // Reset submitting state regardless of success or failure
    }
  };

  return (
    <section className="bg-gradient-to-b from-[#150630] to-[#150620] px-4 py-10 sm:py-16 md:py-10">
      <div className="mx-auto max-w-7xl">
        {/* Layered Background Style */}
        <div className="rounded-2xl border border-stone-500 bg-white/5 p-6 shadow backdrop-blur-[100px] sm:rounded-3xl sm:p-8 md:p-12 lg:p-16">
          {/* Form Content */}
          <div className="flex flex-col items-center">
            <h2 className="font-poppins mb-8 text-center text-2xl font-semibold text-white capitalize sm:mb-10 sm:text-3xl md:text-4xl">
              Get in touch
            </h2>

            <form
              className="flex w-full flex-col gap-5 sm:gap-6"
              onSubmit={handleSubmit}
            >
              {/* First Name and Last Name Inputs */}
              <div className="flex flex-col gap-5 sm:flex-row sm:gap-6">
                <div className="flex-1 border-b border-neutral-400 px-2 pt-3 pb-2">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName} // Connect to firstName state
                    onChange={(e) => setFirstName(e.target.value)} // Update firstName state on change
                    className="font-poppins w-full bg-transparent text-base leading-relaxed font-normal text-white placeholder-white/70 outline-none sm:text-lg md:text-xl"
                  />
                </div>
                <div className="flex-1 border-b border-neutral-400 px-2 pt-3 pb-2">
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName} // Connect to lastName state
                    onChange={(e) => setLastName(e.target.value)} // Update lastName state on change
                    className="font-poppins w-full bg-transparent text-base leading-relaxed font-normal text-white placeholder-white/70 outline-none sm:text-lg md:text-xl"
                  />
                </div>
              </div>

              {/* E-mail Address Input */}
              <div className="border-b border-neutral-400 px-2 pt-3 pb-2">
                <input
                  type="email"
                  placeholder="E-mail Address"
                  value={email} // Connect to email state
                  onChange={(e) => setEmail(e.target.value)} // Update email state on change
                  className="font-poppins w-full bg-transparent text-base leading-relaxed font-normal text-white placeholder-white/70 outline-none sm:text-lg md:text-xl"
                />
              </div>

              {/* Subject Input */}
              <div className="border-b border-neutral-400 px-2 pt-3 pb-2">
                <input
                  type="text"
                  placeholder="Subject"
                  value={subject} // Connect to subject state
                  onChange={(e) => setSubject(e.target.value)} // Update subject state on change
                  className="font-poppins w-full bg-transparent text-base leading-relaxed font-normal text-white placeholder-white/70 outline-none sm:text-lg md:text-xl"
                />
              </div>

              {/* Message Textarea */}
              <div className="border-b border-neutral-400 px-2 pt-3 pb-2">
                <textarea
                  placeholder="Message"
                  rows="4"
                  value={message} // Connect to message state
                  onChange={(e) => setMessage(e.target.value)} // Update message state on change
                  className="font-poppins w-full resize-none bg-transparent text-base leading-relaxed font-normal text-white placeholder-white/70 outline-none sm:text-lg md:text-xl"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={submitting} // Disable button while submitting
                  className="w-full rounded-lg bg-gradient-to-b from-orange-200 to-yellow-500 px-6 py-3 text-base font-semibold text-black capitalize transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-8 sm:text-lg"
                >
                  {submitting ? "Submitting..." : "Submit"}{" "}
                  {/* Change button text based on submitting state */}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster />{" "}
      {/* This component is necessary to display the toast notifications */}
    </section>
  );
};

export default GetInTouch;
