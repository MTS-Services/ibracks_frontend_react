import React from "react";
import {
  HeroSection,
  BrowseSection,
  LicensingSection,
  SoundSection,
  GetInTouch,
  ServiceSection,
} from "./components/sections/index";
import { FiPlay } from "react-icons/fi";
import ReleasesSectionTest from "./components/ReleasesSection/ReleasesSectionTest";

const HomeView = () => {
  return (
    <div className="">
      <HeroSection />
      <div className="relative z-10 mx-auto -mt-50 max-w-7xl">
        {/* ==============================================
                              main releasePart 
          ====================================================== */}
        {/* <ReleasesSection /> */}
        <ReleasesSectionTest />
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
