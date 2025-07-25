import DiscographyDisplay from "../../../components/About/AboutDiscography";
import AboutMainSection from "../../../components/About/AboutMainSection";
import WhatSetsUsApart from "../../../components/About/aboutwhatset/WhatSetsUsApart";

const AboutView = () => {
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #050306 0%, #5D006D 100%)",
      }}
    >
      <AboutMainSection />
      <WhatSetsUsApart />
      <DiscographyDisplay />
    </div>
  );
};

export default AboutView;
