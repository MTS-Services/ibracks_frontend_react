import React, { useState, useEffect } from "react";
import axios from "../../../utils/axiosInstance";
import SalesFilterBar from "./components/SalesFilterBar";
import SummaryCard from "./components/SummaryCard";
import SalesChart from "./components/SalesChart";
import { RiBarChartBoxLine } from "react-icons/ri";
import { CiShoppingTag } from "react-icons/ci";

const normalizeAnalyticsData = (apiResponseObject, filter) => {
  const analytics = apiResponseObject.analytics;

  const summary = {
    revenue: analytics.summary.totalRevenue,
    purchases: analytics.summary.totalPurchases,
    revenueChange: analytics.summary.revenueChange,
    purchasesChange: analytics.summary.purchasesChange,
  };

  let chartData = [];
  switch (filter) {
    case "24 hours":
      chartData = analytics.salesStatistic.map((item) => ({
        label: item.timeLabel,
        revenue: item.totalRevenue,
        purchase: item.totalPurchase,
      }));
      break;
    case "7 days":
      chartData = analytics.dailyBreakdown.map((item) => ({
        label: item.dayName,
        revenue: item.revenue,
        purchase: item.sales,
      }));
      break;
    case "30 days":
      chartData = analytics.salesStatistic.map((item) => ({
        label: item.week,
        revenue: item.totalRevenue,
        purchase: item.totalPurchase,
      }));
      break;
    case "12 months":
      chartData = analytics.monthlyStats.map((item) => ({
        label: item.month,
        revenue: item.totalRevenue,
        purchase: item.totalPurchases,
      }));
      break;
    default:
      chartData = [];
  }
  return { summary, chartData };
};

const formatChange = (value, periodLabel) => {
  if (typeof value !== "number") return "";
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value}% from ${periodLabel}`;
};

const SalseAnalysis = () => {
  const [activeFilter, setFilter] = useState("24 hours");
  const [salesData, setSalesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const filterConfig = {
      "24 hours": {
        endpoint: "/payments/analytics/daily/24hour",
        label: "yesterday",
      },
      "7 days": { endpoint: "/payments/analytics/weekly", label: "last week" },
      "30 days": {
        endpoint: "/payments/analytics/monthly/30days",
        label: "last month",
      },
      "12 months": {
        endpoint: "/payments/analytics/12-monthly",
        label: "last year",
      },
    };
    const currentConfig = filterConfig[activeFilter];
    if (!currentConfig) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setSalesData(null);
      try {
        const response = await axios.get(currentConfig.endpoint);

        const normalizedData = normalizeAnalyticsData(
          response.data,
          activeFilter,
        );

        normalizedData.summary.periodLabel = currentConfig.label;
        setSalesData(normalizedData);
      } catch (err) {
        setError("Failed to process data.");
        console.error("API Error in SalseAnalysis:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeFilter]);

  const filters = ["24 hours", "7 days", "30 days", "12 months"];
  const renderContent = () => {
    if (loading)
      return (
        <div className="p-10 text-center text-white/80">
          Loading Analytics...
        </div>
      );
    if (error)
      return <div className="p-10 text-center text-red-400">{error}</div>;
    if (salesData) {
      return (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            <SummaryCard
              icon={<RiBarChartBoxLine className="text-lg" />}
              value={`$${salesData.summary.revenue.toLocaleString()}`}
              title="Total revenue"
              change={formatChange(
                salesData.summary.revenueChange,
                salesData.summary.periodLabel,
              )}
              bgColor="bg-amber-400"
              textColor="text-black"
            />
            <SummaryCard
              icon={<CiShoppingTag className="text-xl" />}
              value={salesData.summary.purchases.toLocaleString()}
              title="Total purchase"
              change={formatChange(
                salesData.summary.purchasesChange,
                salesData.summary.periodLabel,
              )}
              bgColor="bg-violet-500"
              textColor="text-white"
            />
          </div>
          <SalesChart data={salesData.chartData} />
        </>
      );
    }
    return null;
  };

  return (
    <section
      className="space-y-4 p-4 sm:p-6 md:p-10"
      aria-labelledby="sales-analysis-heading"
    >
      <h1 id="sales-analysis-heading" className="text-xl font-bold text-white">
        Sales Analysis
      </h1>
      <SalesFilterBar
        activeFilter={activeFilter}
        filters={filters}
        setFilter={setFilter}
      />
      {renderContent()}
    </section>
  );
};

export default SalseAnalysis;
