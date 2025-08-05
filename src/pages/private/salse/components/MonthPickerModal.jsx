import React from "react";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MonthPickerModal = ({ isOpen, onClose, onMonthSelect }) => {
  if (!isOpen) return null;

  const handleSelect = (monthIndex) => {
    onMonthSelect(monthIndex + 1); // We send month number (1-12)
    onClose();
  };

  return (
    <div className="absolute top-full right-0 z-30 mt-2 w-72 rounded-xl bg-neutral-800 p-4 shadow-lg">
      <p className="mb-4 text-center font-bold text-white">Select a Month</p>
      <div className="grid grid-cols-3 gap-2">
        {months.map((month, index) => (
          <button
            key={month}
            onClick={() => handleSelect(index)}
            className="rounded-lg py-2 text-sm text-neutral-200 transition-colors hover:bg-white/20"
          >
            {month}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MonthPickerModal;
