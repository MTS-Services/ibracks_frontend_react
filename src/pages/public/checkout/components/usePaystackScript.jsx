// import { useState, useEffect } from "react";

// const usePaystackScript = () => {
//   const [status, setStatus] = useState("loading");

//   useEffect(() => {
//     // Check if Paystack is already loaded
//     if (window.PaystackPop) {
//       setStatus("ready");
//       return;
//     }

//     // Check for existing script to avoid duplicates
//     const existingScript = document.querySelector(
//       "script[src='https://js.paystack.co/v1/inline.js']",
//     );

//     if (existingScript) {
//       // If script exists but Paystack isn't loaded, wait a bit
//       const checkLoaded = () => {
//         if (window.PaystackPop) {
//           setStatus("ready");
//         } else {
//           setTimeout(checkLoaded, 100);
//         }
//       };
//       checkLoaded();
//       return;
//     }

//     const script = document.createElement("script");
//     script.src = "https://js.paystack.co/v1/inline.js";
//     script.async = true;

//     script.onload = () => {
//       if (window.PaystackPop) {
//         setStatus("ready");
//       } else {
//         console.error("Paystack script loaded but PaystackPop not available");
//         setStatus("error");
//       }
//     };

//     script.onerror = () => {
//       console.error("Failed to load Paystack script");
//       setStatus("error");
//     };

//     document.body.appendChild(script);

//     return () => {
//       if (script.parentNode) {
//         document.body.removeChild(script);
//       }
//     };
//   }, []);

//   return status;
// };

// export default usePaystackScript;
