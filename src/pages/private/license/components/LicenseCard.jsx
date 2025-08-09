import { FiCheckCircle } from "react-icons/fi";
import { PropTypes } from "prop-types";

export function LicenseCard({ pack, onEdit, onDelete }) {
  const priceDisplay =
    typeof pack.price === "number" ? `$${pack.price.toFixed(2)}` : pack.price;

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-[#333] bg-[#1E1E1E]">
      <div className="border-b border-[#333] p-6">
        <h3 className="text-xl font-bold text-yellow-400">{pack.name}</h3>
        <p className="mt-2 text-3xl font-bold text-white">{priceDisplay}</p>
        <p className="mt-2 h-10 text-sm text-gray-400">{pack.description}</p>
      </div>
      <div className="flex-grow p-6">
        <ul className="space-y-3">
          {pack.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <FiCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
              <span className="text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto flex gap-3 bg-[#1E1E1E] p-4">
        <button
          onClick={() => onEdit(pack)}
          className="flex-1 rounded-md bg-gray-700 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(pack.id)}
          className="flex-1 rounded-md bg-red-800 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

LicenseCard.PropTypes = {
  pack: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
