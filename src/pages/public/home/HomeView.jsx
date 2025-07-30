import React, { useEffect, useState } from "react";
import {
  HeroSection,
  ReleasesSection,
  BrowseSection,
  LicensingSection,
  SoundSection,
  GetInTouch,
  ServiceSection,
} from "./components/sections/index";

import axios from "../../../utils/axiosInstance";

import { getAllSongs } from "../../../featured/song/trackService";
import { getAllPlans } from "../../../featured/plans/planService";

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
