// const ServiceDetailsModal = ({ isOpen, onClose, service }) => {
//   if (!isOpen || !service) return null;

//   return (
//     <div className="bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
//       <div className="relative w-full max-w-md overflow-hidden rounded-lg border-2 border-[rgba(239,166,69,0.2)] bg-[#5D006D] p-4 shadow-lg md:max-w-lg lg:max-w-xl">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           // Changed text color to white and hover effect
//           className="absolute top-3 right-3 rounded-3xl bg-white p-2 text-3xl font-bold hover:text-gray-300"
//         >
//           <IoClose className="h-8 w-8 text-[#F2B600]" />
//         </button>
//         {/* Modal Content */}
//         <div className="flex flex-col items-center">
//           <img
//             className="mb-4 h-48 w-full rounded-lg object-cover"
//             src={service.img}
//             alt={service.title}
//           />
//           <h2
//             // Changed text color to white
//             className="gap-1 bg-gradient-to-b from-orange-100 to-yellow-300 bg-clip-text text-2xl font-semibold text-transparent"
//           >
//             {service.title}
//           </h2>
//           <p
//             // Changed text color to white
//             className="gap-1 bg-gradient-to-b from-orange-100 to-yellow-300 bg-clip-text text-lg font-semibold text-transparent"
//           >
//             {service.subtitle}
//           </p>

//           <div
//             // Changed base text color for this section to white
//             className="w-full pt-1 text-white"
//           >
//             <h3
//               // Font weight is already semibold, which is good
//               className="mb-2 text-xl font-semibold text-white"
//             >
//               Services Included:
//             </h3>
//             <ul className="mb-1 list-inside list-disc space-y-1 text-xs">
//               {service.details.mixingServices.map((serviceItem, index) => (
//                 <li
//                   key={index}
//                   // Text color already inherited from parent div (text-white)
//                   className="block border-b-1 border-[rgba(239,166,69,0.2)] px-4 py-2 text-sm font-[400] text-white transition-colors duration-200 hover:bg-purple-800"
//                 >
//                   {serviceItem}
//                 </li>
//               ))}
//             </ul>

//             <p className="block border-b-1 border-[rgba(239,166,69,0.2)] px-4 py-2 text-sm font-[400] text-white transition-colors duration-200 hover:bg-purple-800">
//               <span className="font-semibold">Revisions:</span>{" "}
//               {service.details.revisions}
//             </p>
//             <p className="block border-b-1 border-[rgba(239,166,69,0.2)] px-4 py-2 text-sm font-[500] text-white transition-colors duration-200 hover:bg-purple-800">
//               <span className="font-semibold">Email Files To:</span>{" "}
//               <a
//                 href={`mailto:${service.details.emailFilesTo}`}
//                 // Kept blue for links, but you can change to white if preferred for consistency
//                 className="gap-1 bg-gradient-to-b from-orange-100 to-yellow-300 bg-clip-text text-sm font-semibold text-transparent"
//               >
//                 {service.details.emailFilesTo}
//               </a>
//             </p>

//             <Link to="/contact">
//               <div className="pt-3">
//                 <div
//                   // This is the outer container for the border effect
//                   className="inline-flex items-center justify-center gap-1 rounded-md p-[1px] shadow-2xl transition-all duration-300 ease-in-out"
//                   style={{
//                     background: "linear-gradient(to bottom, #F5DEB3, #DAA520)", // Gradient for the "border"
//                     borderRadius: "8px", // Apply border-radius here
//                   }}
//                 >
//                   <div
//                     // This is the inner button content
//                     className="inline-flex items-center justify-center gap-1 rounded-[7px] bg-[#43024F] px-4 py-[6px] transition-all duration-300 ease-in-out hover:bg-gradient-to-t hover:from-[#DAA520] hover:to-[#F5DEB3]"
//                   >
//                     <div className="flex cursor-pointer items-center gap-1 text-center text-sm leading-normal font-semibold text-white capitalize shadow-2xl">
//                       <MdOutlineEmail className="h-4 w-4 font-bold text-white" />
//                       GET A MASSAGE
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// //
