import React, { useState } from "react";
import DatePicker from "react-datepicker";

const ScheduleModal = ({ isOpen, onClose, onConfirm, isSubmitting }) => {
  const [scheduleDate, setScheduleDate] = useState(new Date());

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(scheduleDate.toISOString());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-md rounded-2xl bg-neutral-800 bg-gradient-to-b from-[#5D006D] to-[#4b0058] p-6 text-white shadow-lg">
        <h2 className="text-center text-xl font-bold text-white">
          Schedule Publication
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-400">
          Select the date and time you want this song to be published.
        </p>

        <div className="my-6 flex justify-center">
          <DatePicker
            selected={scheduleDate}
            onChange={(date) => setScheduleDate(date)}
            showTimeSelect
            inline
            dateFormat="MMMM d, yyyy h:mm aa"
            className="bg-transparent text-white"
            showTimeInput
            timeInputLabel="Custom Time:"
          />
        </div>

        <div className="mr-8.5 flex justify-end gap-6">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-lg border border-orange-200 px-10 py-2.5 font-semibold text-white transition-colors hover:bg-orange-200/10 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="rounded-lg bg-gradient-to-b from-orange-200 to-yellow-500 px-6 py-2 font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isSubmitting ? "Scheduling..." : "Confirm Schedule"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;
