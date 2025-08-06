import React, { useEffect, useState } from "react";

// Sections
import {
  HeroSection,
  BrowseSection,
  LicensingSection,
  SoundSection,
  GetInTouch,
  ServiceSection,
  ReleasesSection,
} from "./components/sections/index";
import ReleasesSectionTest from "./components/ReleasesSection/ReleasesSectionTest";

// Services
import { getAllSongs } from "../../../featured/song/trackService";
import { getAllPlans } from "../../../featured/plans/planService";

const HomeView = () => {
  const [songs, setSongs] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Use your service functions (better abstraction)
        const songsData = await getAllSongs({ limit: 6, published: true });
        const plansData = await getAllPlans();

        setSongs(songsData?.data || []);
        setPlans(plansData?.data || []);
      } catch (error) {
        console.error("Error fetching home data:", error);
        setSongs([]);
        setPlans([]);
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
      <BrowseSection songs={songs} plans={plans} />
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
