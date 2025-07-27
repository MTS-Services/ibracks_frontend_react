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

const HomeView = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllSongs();
        const limitedData = data.slice(0, 6);
        setSongs(limitedData);
      } catch (err) {
        console.error(err, "Could not load songs");
      }
    })();
  }, []);

  return (
    <>
      <HeroSection />
      <ReleasesSection songs={songs} />
      <BrowseSection songs={songs} />
      <LicensingSection />
      <SoundSection />
      <GetInTouch />
      <ServiceSection />
    </>
  );
};

export default HomeView;
