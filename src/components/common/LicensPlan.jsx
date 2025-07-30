import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../featured/cart/cartSlice";
import { HiOutlineShoppingBag, HiCheck } from "react-icons/hi";

const LicensPlan = ({ selectedSong, plans }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Track selection UI
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  // Get already added plan IDs for this song
  const addedPlanIds = useMemo(() => {
    if (!selectedSong?.id) return [];
    return cartItems
      .filter((item) => item.songId === selectedSong.id)
      .map((item) => item.planId);
  }, [cartItems, selectedSong?.id]);

  // If any license is already added, disable selection on others
  const isAnyLicenseAdded = addedPlanIds.length > 0;

  // Handle Add to Cart
  const handleAddToCart = (planId) => {
    const plan = plans.find((p) => p.id === planId);
    if (!plan || !selectedSong) return;

    const price = Number(plan.price);
    if (isNaN(price)) {
      console.error("Invalid price:", plan.price);
      return;
    }

    const cartItem = {
      id: `${selectedSong.id}-license-${plan.id}`,
      songId: selectedSong.id,
      songTitle: selectedSong.title,
      songThumbnail: selectedSong.thumbnail,
      planId: plan.id,
      planTier: plan.tier,
      planDescription: plan.description,
      price,
      quantity: 1,
      totalPrice: price,
    };

    dispatch(addItem(cartItem));
    setSelectedPlanId(planId);

    alert(`✅ Added: ${selectedSong.title} (${plan.tier})`);
  };

  if (!selectedSong || !plans?.length) {
    return (
      <div className="flex min-h-40 items-center justify-center">
        <p className="text-center text-gray-500">No licenses available</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
      {plans.map((plan) => {
        const isAdded = addedPlanIds.includes(plan.id);
        const isSelected = selectedPlanId === plan.id;

        const isInteractionDisabled = isAnyLicenseAdded && !isAdded;

        return (
          <div
            key={plan.id}
            className={`relative overflow-hidden rounded-2xl border-2 p-5 text-white shadow-lg transition-all duration-300 ${
              isAdded
                ? "border-green-600 bg-gradient-to-b from-green-900 to-black"
                : isSelected
                  ? "border-yellow-400 bg-gradient-to-b from-yellow-900 to-gray-900"
                  : "border-gray-700 bg-black"
            } ${isInteractionDisabled ? "pointer-events-none" : "cursor-pointer hover:border-gray-500"} `}
            onClick={() => {
              if (isAdded || isInteractionDisabled) return;
              setSelectedPlanId(plan.id);
            }}
          >
            {/* Badge */}
            {isAdded && (
              <div className="absolute top-4 right-4 rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-white uppercase">
                Added
              </div>
            )}
            {plan.popular && !isAdded && (
              <div className="absolute top-4 right-4 rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-black">
                Popular
              </div>
            )}

            {/* Tier */}
            <h3
              className={`mb-2 text-xl font-bold ${isAdded ? "text-green-100" : isSelected ? "text-yellow-100" : "text-white"} `}
            >
              {plan.tier}
            </h3>

            {/* Description */}
            <p className="mb-5 text-sm leading-relaxed text-gray-300">
              {plan.description}
            </p>

            {/* Price */}
            <div
              className={`mb-6 text-2xl font-extrabold ${isAdded ? "text-green-200" : isSelected ? "text-yellow-200" : "text-yellow-400"} `}
            >
              ${parseFloat(plan.price).toFixed(2)}
            </div>

            {/* Action */}
            {isAdded ? (
              <button
                disabled
                className="w-full cursor-default rounded-lg bg-green-700 py-3 text-sm font-bold text-white"
              >
                <div className="flex items-center justify-center gap-2">
                  <HiCheck /> <span> Added</span>
                </div>
              </button>
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(plan.id);
                }}
                className="group relative w-full rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 px-4 py-3 text-sm font-bold text-black transition hover:from-yellow-400 hover:to-yellow-500"
              >
                <span className="flex items-center justify-center gap-2">
                  <HiOutlineShoppingBag /> <span>Add to Cart</span>
                </span>
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LicensPlan;
