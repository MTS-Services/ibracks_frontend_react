import { useEffect, useState } from "react";

import HeroSection from "./components/sections/HeroSection";
import ApartSection from "./components/sections/ApartSection";
import DiscographySection from "./components/sections/DiscographySection";

import axios from "../../../utils/axiosInstance";

const AboutView = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/songs/published?limit=9");

        setSongs(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
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
