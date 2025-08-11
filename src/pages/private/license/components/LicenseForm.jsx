import { useState, useEffect } from "react";
import { FiMinusCircle } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { PropTypes } from "prop-types";

export function LicenseForm({ isOpen, onClose, onSubmit, initialData }) {
  const [formState, setFormState] = useState({
    name: "",
    price: "",
    description: "",
    features: [""],
  });
  const [errors, setErrors] = useState({});

  const isEditing = !!initialData;

  useEffect(() => {
    if (isEditing) {
      setFormState({
        name: initialData.name,
        price: initialData.price,
        description: initialData.description,
        features: initialData.features.length > 0 ? initialData.features : [""],
      });
    } else {
      setFormState({ name: "", price: "", description: "", features: [""] });
    }
    setErrors({}); // Reset errors when form opens/changes mode
  }, [isOpen, initialData, isEditing]);

  const validate = () => {
    const newErrors = {};
    if (!formState.name || formState.name.length < 3)
      newErrors.name = "Name must be at least 3 characters.";
    if (
      !formState.price ||
      isNaN(formState.price) ||
      Number(formState.price) <= 0
    )
      newErrors.price = "Price must be a positive number.";
    if (!formState.description || formState.description.length < 10)
      newErrors.description = "Description must be at least 10 characters.";
    if (formState.features.some((f) => !f.trim()))
      newErrors.features = "All feature fields must be filled out.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formState.features];
    newFeatures[index] = value;
    setFormState((prev) => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormState((prev) => ({ ...prev, features: [...prev.features, ""] }));
  };

  const removeFeature = (index) => {
    setFormState((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const submissionData = {
      ...formState,
      price: Number(formState.price),
      features: formState.features.filter((f) => f.trim()), // Clean up empty features
    };
    onSubmit(submissionData);
  };

  return (
    <aside
      className={`fixed top-0 right-0 z-50 h-full w-full transform overflow-y-auto bg-[#181818] p-6 shadow-2xl transition-transform duration-300 ease-in-out md:w-96 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white">
          {isEditing ? "Edit License Pack" : "Create New Pack"}
        </h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <IoCloseSharp className="h-6 w-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="name"
            className="mb-1 block text-sm font-medium text-gray-300"
          >
            Pack Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formState.name}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g., Premium"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="price"
            className="mb-1 block text-sm font-medium text-gray-300"
          >
            Price ($)
          </label>
          <input
            type="number"
            name="price"
            id="price"
            value={formState.price}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g., 50.00"
            step="0.01"
          />
          {errors.price && (
            <p className="mt-1 text-xs text-red-500">{errors.price}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="description"
            className="mb-1 block text-sm font-medium text-gray-300"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formState.description}
            onChange={handleChange}
            rows="4"
            className="w-full"
            placeholder="A short description of the pack"
          ></textarea>
          {errors.description && (
            <p className="mt-1 text-xs text-red-500">{errors.description}</p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-300">
            Features
          </label>
          <div className="space-y-2">
            {formState.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  className="form-input flex-grow"
                  placeholder="Feature description"
                />
                {formState.features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <FiMinusCircle className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
            {errors.features && (
              <p className="mt-1 text-xs text-red-500">{errors.features}</p>
            )}
          </div>
          <button
            type="button"
            onClick={addFeature}
            className="mt-3 flex items-center gap-1 text-sm text-yellow-400 hover:text-yellow-300"
          >
            <FaPlus className="h-4 w-4" />
            Add Feature
          </button>
        </div>
        <div className="pt-4">
          <button
            type="submit"
            className="w-full rounded-lg bg-yellow-400 py-2.5 font-semibold text-black transition-colors hover:bg-yellow-300"
          >
            {isEditing ? "Update Pack" : "Create Pack"}
          </button>
        </div>
      </form>
    </aside>
  );
}

// Basic CSS for form inputs in your global CSS file (e.g., index.css)
// @layer components {
//   .form-input {
//     @apply bg-[#2D2D2D] border border-[#444] text-white w-full rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400;
//   }
// }

LicenseForm.PropTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.object, // Not required, only present in edit mode
};
