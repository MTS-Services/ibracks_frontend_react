import HeroSection from "./components/sections/HeroSection";
import ApartSection from "./components/sections/ApartSection";
import DiscographySection from "./components/sections/DiscographySection";
import { useEffect, useState } from "react";
import { getAllSongs } from "../../../featured/song/trackService";

const AboutView = () => {
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
      <ApartSection />
      <DiscographySection songs={songs} />
    </>
  );
};

export default AboutView;
