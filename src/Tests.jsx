import React, { useEffect, useState } from "react";
import axiosInstance from "./context/axiosInstance";

const Test = () => {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axiosInstance.get("/areas"); // Replace with your actual endpoint
        setAreas(response.data.data || []);
      } catch (err) {
        setError(err.message || "حدث خطأ ما");
      } finally {
        setLoading(false);
      }
    };

    fetchAreas();
  }, []);

  if (loading) return <div className="py-10 text-center">جاري التحميل...</div>;
  if (error)
    return <div className="py-10 text-center text-red-500">خطأ: {error}</div>;

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h2 className="mb-6 text-right text-2xl font-bold">📍 قائمة المناطق</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {areas.map((area) => (
          <div
            key={area.id}
            className="rounded-lg border bg-white p-4 shadow-md transition duration-200 hover:shadow-lg"
          >
            <h3 className="mb-2 text-right text-xl font-semibold">
              {area.name}
            </h3>
            <p className="mb-1 text-right text-sm text-gray-500">
              Slug: {area.slug}
            </p>
            <p className="mb-1 text-right text-sm text-gray-700">
              الحالة: {area.status_label}
            </p>
            <p className="text-right text-xs text-gray-400">
              تم الإنشاء: {area.created_at}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Test;
