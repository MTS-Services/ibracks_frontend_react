import { LicenseCard } from "./LicenseCard";
import { PropTypes } from "prop-types";
export function LicensePackList({ packs, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {packs.map((pack) => (
        <LicenseCard
          key={pack.id}
          pack={pack}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

LicensePackList.PropTypes = {
  packs: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
