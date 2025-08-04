import React, { useState, useEffect } from "react";
import axios from "../../../utils/axiosInstance";
import SalesFilterBar from "./components/SalesFilterBar";
import SummaryCard from "./components/SummaryCard";
import SalesChart from "./components/SalesChart";
import { RiBarChartBoxLine } from "react-icons/ri";
import { CiShoppingTag } from "react-icons/ci";

const normalizeAnalyticsData = (apiResponseObject, filter) => {
  const analytics = apiResponseObject?.analytics;
  const summary = {
    revenue: analytics?.summary?.totalRevenue ?? 0,
    purchases: analytics?.summary?.totalPurchases ?? 0,
    revenueChange: analytics?.summary?.revenueChange ?? 0,
    purchasesChange: analytics?.summary?.purchasesChange ?? 0,
  };
  let chartData = [];
  const salesStat = analytics?.salesStatistic ?? [];
  const dailyBreakdown = analytics?.dailyBreakdown ?? [];
  const monthlyStats = analytics?.monthlyStats ?? [];

  switch (filter) {
    case "24 hours":
    case "Single Day":
      chartData = salesStat.map((item) => ({
        label: item.timeLabel || item.dateLabel,
        revenue: item.totalRevenue,
        purchase: item.totalPurchase,
      }));
      break;
    case "7 days":
      chartData = dailyBreakdown.map((item) => ({
        label: item.dayName,
        revenue: item.revenue,
        purchase: item.sales,
      }));
      break;
    case "30 days":
      chartData = salesStat.map((item) => ({
        label: item.week,
        revenue: item.totalRevenue,
        purchase: item.totalPurchase,
      }));
      break;
    case "12 months":
      chartData = monthlyStats.map((item) => ({
        label: item.month,
        revenue: item.totalRevenue,
        purchase: item.totalPurchases,
      }));
      break;
    case "Custom":
      chartData = salesStat.map((item) => ({
        label: item.dateLabel,
        revenue: item.totalRevenue,
        purchase: item.totalPurchase,
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

const formatDate = (date) => {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const SalseAnalysis = () => {
  const [activeFilter, setFilter] = useState("24 hours");
  const [salesData, setSalesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState({ start: null, end: null });

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

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setSalesData(null);
      try {
        let response;
        let normalizedData;

        if (dateRange.start && dateRange.end) {
          const customEndpoint = `/payments/analytics/sales-custom-range?startDate=${formatDate(dateRange.start)}&endDate=${formatDate(dateRange.end)}`;
          response = await axios.get(customEndpoint);
          normalizedData = normalizeAnalyticsData(response.data, "Custom");
          normalizedData.summary.periodLabel = "Selected Range";
        } else if (dateRange.start && !dateRange.end) {
          const singleDayEndpoint = `/payments/analytics/daily?date=${formatDate(dateRange.start)}`;
          response = await axios.get(singleDayEndpoint);
          normalizedData = normalizeAnalyticsData(response.data, "Single Day");
          normalizedData.summary.periodLabel = "Selected Day";
        } else if (activeFilter) {
          const currentConfig = filterConfig[activeFilter];
          response = await axios.get(currentConfig.endpoint);
          normalizedData = normalizeAnalyticsData(response.data, activeFilter);
          normalizedData.summary.periodLabel = currentConfig.label;
        } else {
          setLoading(false);
          return;
        }
        setSalesData(normalizedData);
      } catch (err) {
        if (err.response && typeof err.response.data === "string") {
          setError(err.response.data);
        } else {
          setError("Failed to process data.");
        }
        console.error("API Error in SalseAnalysis:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeFilter, dateRange]);

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
      className="space-y-4 bg-gradient-to-b from-[#050306] to-[#5D006D] p-4 sm:p-6 md:p-10"
      aria-labelledby="sales-analysis-heading "
    >
      <h1 id="sales-analysis-heading" className="text-xl font-bold text-white">
        Sales Analysis
      </h1>
      <SalesFilterBar
        activeFilter={activeFilter}
        filters={filters}
        setFilter={setFilter}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
      {renderContent()}
    </section>
  );
};

export default SalseAnalysis;
