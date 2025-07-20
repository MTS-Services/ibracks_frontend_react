import React from "react";
import {
  HeroSection,
  ReleasesSection,
  BrowseSection,
  LicensingSection,
  SoundSection,
  GetInTouch,
} from "./components/sections/index";

const HomeView = () => {
  return (
    <>
      <HeroSection />
      <ReleasesSection />
      <BrowseSection />
      <LicensingSection />
      <SoundSection />
      <GetInTouch />
    </>
  );
};

export default HomeView;
