import React from "react";
import {
  HeroSection,
  ReleasesSection,
  BrowseSection,
  LicensingSection,
  SoundSection,
  GetInTouch,
  ServiceSection,
} from "./components/sections/index";

const HomeView = () => {
  return (
    <div className="bg-gradient-to-b from-purple-900 to-purple-950">
      <HeroSection />
      <ReleasesSection />
      <BrowseSection />
      <LicensingSection />
      <SoundSection />
      <GetInTouch />
      <ServiceSection />
    </div>
  );
};

export default HomeView;
