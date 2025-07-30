import React from "react";
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

const HomeView = () => {
  return (
    <div className="">
      <HeroSection />
      <div className="relative z-10 mx-auto -mt-50 max-w-7xl">
        <ReleasesSection />
      </div>
      <BrowseSection />
      <LicensingSection />
      <SoundSection />
      <GetInTouch />
      <ServiceSection />
    </div>
  );
};

export default HomeView;
