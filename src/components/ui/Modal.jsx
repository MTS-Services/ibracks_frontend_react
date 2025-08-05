const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  if (!isOpen) return null;

  // Tailwind width classes based on size
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "w-full h-full", // full screen modal
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div
        className={`fade-in-down w-full ${
          sizeClasses[size] || sizeClasses.md
        } rounded-2xl border border-gray-700 bg-gradient-to-b from-[#26073a] to-[#000000] shadow-lg`}
      >
        <div className="sticky top-0 flex items-center justify-between rounded-t-xl bg-blue-800 px-4 py-2">
          {/* Title */}
          <div>
            {title && (
              <h2 className="text-xl font-semibold text-gray-100">{title}</h2>
            )}
          </div>
          {/* Close button */}
          <button className="text-gray-100 hover:text-black" onClick={onClose}>
            ✕
          </button>
        </div>
        {/* Content */}
        <div className="max-h-[80vh] overflow-auto p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
