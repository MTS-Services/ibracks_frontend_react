import { FiPlusCircle } from "react-icons/fi";
import { PropTypes } from "prop-types";

export function PageHeader({ onCreateClick }) {
  return (
    <header className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
      <div>
        <h2 className="text-3xl font-bold text-white">License Info Packs</h2>
        <p className="mt-1 text-gray-400">
          Manage your license pricing and features.
        </p>
      </div>
      <button
        onClick={onCreateClick}
        className="mt-4 flex items-center gap-2 rounded-lg bg-yellow-400 px-4 py-2 font-semibold text-black transition-colors hover:bg-yellow-300 md:mt-0"
      >
        <FiPlusCircle className="h-5 w-5" />
        Create New Pack
      </button>
    </header>
  );
}

PageHeader.propTypes = {
  onCreateClick: PropTypes.func.isRequired,
};
