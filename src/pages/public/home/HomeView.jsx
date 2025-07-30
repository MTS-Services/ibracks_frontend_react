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

import { getAllSongs } from "../../../featured/song/trackService";
import { getAllPlans } from "../../../featured/plans/planService";

const HomeView = () => {
  const [songs, setSongs] = useState([]);
  const [plans, setPlans] = useState([]);

  // console.log("Songs: ", songs);
  // console.log("Plans: ", plans);

  useEffect(() => {
    (async () => {
      try {
        const songs = await getAllSongs();
        const limitedData = songs.slice(0, 6);

        setSongs(limitedData);

        const plans = await getAllPlans();
        setPlans(plans);
      } catch (err) {
        console.error(err, "Could not load songs");
      }
    })();
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
