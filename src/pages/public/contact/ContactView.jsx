import { useState } from "react";
import toast, { Toaster } from "react-hot-toast"; // Toaster এবং toast ইমপোর্ট করুন

const ContactView = () => {
  // State variables to store form data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // State variables for form submission status
  const [submitting, setSubmitting] = useState(false);
  // const [submitted, setSubmitted] = useState(false); // আর দরকার নেই, টোস্ট ব্যবহার করব
  // const [error, setError] = useState(false); // আর দরকার নেই, টোস্ট ব্যবহার করব

  // Formspree endpoint URL (REPLACE 'yourformid' WITH YOUR ACTUAL FORMSPREE FORM ID)
  const FORMSPREE_URL = "https://formspree.io/f/mkgzbkwl"; // IMPORTANT: Replace 'yourformid' with your actual Formspree form ID

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setSubmitting(true);
    // setError(false); // এগুলোর দরকার নেই
    // setSubmitted(false); // এগুলোর দরকার নেই

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          message,
        }),
      });

      if (response.ok) {
        toast.success("Message sent successfully!"); // সফল হলে টোস্ট দেখান
        // Clear form fields after successful submission
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        toast.error("Failed to send message. Please try again."); // ব্যর্থ হলে টোস্ট দেখান
      }
    } catch (err) {
      toast.error("An error occurred. Please try again later."); // কোনো এরর হলে টোস্ট দেখান
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="m-auto flex justify-center py-8 sm:py-14 md:py-16"
      style={{
        background: "linear-gradient(180deg, #050306 0%, #5D006D 100%)",
      }}
    >
      <div className="m-auto inline-flex flex-col items-center justify-center gap-[30px] rounded-[20px] border border-[rgba(10,13,23,0.05)] bg-[rgba(255,255,255,0.08)] backdrop-blur-[190px] sm:px-8 lg:flex-row">
        {/* Form part */}
        <div className="mx-auto inline-flex w-full items-center justify-start gap-7 rounded-[20px] outline-offset-[-2px] lg:w-auto">
          <form
            onSubmit={handleSubmit}
            className="inline-flex w-full flex-col items-start justify-start gap-10 p-6 sm:p-10"
          >
            <div className="flex flex-col items-start justify-start gap-2 self-stretch">
              <div className="w-full justify-start font-['Inter'] text-3xl font-[600] text-white">
                Let’s connect
              </div>
              <div className="w-full justify-start font-['Poppins'] text-base font-[400] text-white capitalize opacity-80 lg:w-96">
                Let's align our constellations! Reach out and let the magic of
                collaboration illuminate our skies.
              </div>
            </div>
            <div className="flex w-full flex-col items-start justify-start gap-3.5 self-stretch">
              <div className="flex flex-col items-start justify-start gap-3.5 self-stretch lg:flex-row">
                <div className="inline-flex w-full flex-1 flex-col items-start justify-center gap-2.5 rounded-[5px] bg-white/5 px-3.5 py-3 outline outline-1 outline-white/20">
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName" // Added name attribute
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full justify-start border-none bg-transparent font-['Poppins'] text-sm font-[400] text-[#FFFFFF99] focus:outline-none"
                    required
                  />
                </div>
                <div className="inline-flex w-full flex-1 flex-col items-start justify-center gap-2.5 rounded-[5px] bg-white/5 px-3.5 py-3 outline outline-1 outline-white/20">
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName" // Added name attribute
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full justify-start border-none bg-transparent font-['Poppins'] text-sm font-[400] text-white/60 focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div className="inline-flex w-full flex-1 flex-col items-start justify-center gap-2.5 rounded-[5px] bg-white/5 px-3.5 py-3 outline outline-1 outline-white/20">
                <input
                  type="email"
                  placeholder="Email"
                  name="email" // Added name attribute
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full justify-start border-none bg-transparent font-['Poppins'] text-sm font-[400] text-white/60 focus:outline-none"
                  required
                />
              </div>
              <div className="flex w-full flex-col items-start justify-center gap-2.5 self-stretch rounded-[5px] bg-white/5 px-3.5 py-3 outline outline-1 outline-white/20">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  name="phone" // Added name attribute
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full justify-start border-none bg-transparent font-['Poppins'] text-xs font-[400] text-white/60 capitalize focus:outline-none"
                />
              </div>
              <div className="flex h-28 w-full flex-col items-start justify-start gap-2.5 self-stretch rounded-[5px] bg-white/5 px-3.5 py-3 outline outline-1 outline-white/20">
                <textarea
                  placeholder="Message"
                  name="message" // Added name attribute
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="h-full w-full resize-none justify-start border-none bg-transparent font-['Poppins'] text-xs font-[400] text-white/60 capitalize focus:outline-none"
                  required
                ></textarea>
              </div>
              <button
                type="submit" // Changed type to submit
                disabled={submitting} // Disable button while submitting
                data-property-1="Default"
                data-show-arrow-up-right="false"
                data-show-button="true"
                className="inline-flex w-full cursor-pointer items-center justify-center gap-1 self-stretch overflow-hidden rounded-lg bg-gradient-to-b from-orange-200 to-yellow-500 px-12 py-3 disabled:opacity-50"
              >
                <div className="justify-center text-center font-['Plus_Jakarta_Sans'] text-base leading-normal font-[600] text-gray-950 capitalize">
                  {submitting ? "Sending..." : "Send Message"}
                </div>
              </button>
              {/* <p className="mt-2 w-full text-center text-green-400"> // এই অংশগুলোর আর দরকার নেই
                            Message sent successfully!
                        </p>
                        <p className="mt-2 w-full text-center text-red-400">
                            Failed to send message. Please try again.
                        </p> */}
            </div>
          </form>
        </div>

        {/* Image part - Using a placeholder for the image path */}
        <div className="m-auto hidden items-center justify-center rounded-xl bg-gradient-to-l pr-10 lg:flex">
          <img
            src="/contactpage/img1.jpg" // Placeholder image
            alt="Contact Us"
            className="h-[470px] w-[416px] rounded-xl object-cover"
          />
        </div>
      </div>
      <Toaster /> {/* Toaster কম্পোনেন্ট যোগ করুন */}
    </div>
  );
};

export default ContactView;
