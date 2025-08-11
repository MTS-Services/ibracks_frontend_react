import PropTypes from "prop-types";
import { LuTriangleAlert } from "react-icons/lu";

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
}) {
  if (!isOpen) return null;

  return (
    // Backdrop: Covers the screen and closes the modal on click
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
      onClick={onClose}
    >
      {/* Modal Card: With an entry animation */}
      <div
        className="animate-fade-scale-in w-full max-w-md transform rounded-lg border border-[#333] bg-[#1E1E1E] shadow-xl"
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
      >
        {/* Modal Body */}
        <div className="p-6">
          <div className="mb-4 flex items-center gap-4">
            {/* Icon for visual context */}
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-500/10">
              <LuTriangleAlert className="h-6 w-6 text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-white">{title}</h3>
          </div>

          {/* Softer, more readable description text */}
          <div className="ml-14 leading-relaxed text-white">{children}</div>
        </div>

        {/* Modal Footer: Contains the action buttons */}
        <div className="flex justify-center gap-3 rounded-b-lg border-t border-[#333] bg-[#121212]/50 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-md bg-gray-700 px-4 py-2 text-sm font-semibold text-gray-200 transition-colors hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-red-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
