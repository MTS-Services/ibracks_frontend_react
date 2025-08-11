import React, { useEffect, useState } from "react";

// Sections
import {
  HeroSection,
  BrowseSection,
  LicensingSection,
  SoundSection,
  GetInTouch,
  ServiceSection,
} from "./components/sections/index";
import ReleasesSectionTest from "./components/ReleasesSection/ReleasesSectionTest";

// Services
import { getAllSongs } from "../../../featured/song/trackService";
import { getAllPlans } from "../../../featured/plans/planService";
import { getAllOrders } from "../../../featured/orders/OrderHistoryService";

const HomeView = () => {
  const [songs, setSongs] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderHistory, setOrderHistory] = useState([]);
  console.log("Order History Data:", orderHistory);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Use your service functions (better abstraction)
        const songsData = await getAllSongs({ limit: 6, published: true });
        const plansData = await getAllPlans();
        const orderHistoryData = await getAllOrders();
        console.log("Order History Data:", orderHistoryData?.orders);
        setSongs(songsData?.data || []);
        setPlans(plansData?.data || []);
        setOrderHistory(orderHistoryData?.data || []);
      } catch (error) {
        console.error("Error fetching home data:", error);
        setSongs([]);
        setPlans([]);
        setOrderHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <HeroSection />
      {/* <ReleasesSection songs={songs} /> */}
      <ReleasesSectionTest />
      <BrowseSection orderHistory={orderHistory} songs={songs} plans={plans} />
      <LicensingSection plans={plans} />

      {/* Test Section - Positioned with negative margin */}

      {/* Avoid duplicate sections unless intentional */}
      {/* If you need a second browse or license section, make sure it's unique */}
      {/* Otherwise, remove duplicates */}

      <SoundSection />
      <GetInTouch />
      <ServiceSection />
    </>
  );
};

export default HomeView;
