import React, { useEffect, useState } from "react";
import {
  HeroSection,
  BrowseSection,
  LicensingSection,
  SoundSection,
  GetInTouch,
  ServiceSection,
  ReleasesSection,
} from "./components/sections/index";
import { FiPlay } from "react-icons/fi";

import ReleasesSectionTest from "./components/ReleasesSection/ReleasesSectionTest";
import axios from "../../../utils/axiosInstance";

const HomeView = () => {
  const [songs, setSongs] = useState([]);
  const [plans, setPlans] = useState([]);

  // console.log("Songs: ", songs);
  // console.log("Plans: ", plans);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/songs/published?limit=6");
        console.log(res.data.data);
        setSongs(res.data.data);

        const ress = await axios.get("/licenses");
        console.log(ress.data.data);
        setPlans(ress.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <HeroSection />
      <ReleasesSection songs={songs} />
      <ReleasesSectionTest></ReleasesSectionTest>
      <BrowseSection songs={songs} plans={plans} />
      <LicensingSection plans={plans} />
      <SoundSection />
      <GetInTouch />
      <ServiceSection />

      {/* =================== shakil munshi ================== */}

      {/* =================== shakil munshi ================== */}
    </>
  );
};

export default HomeView;
